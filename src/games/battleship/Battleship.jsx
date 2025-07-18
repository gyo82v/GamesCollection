import { useUser } from "../../context/UserContext"
import { useGamesData } from "../../context/GamesDataContext"
import { updateGameLeaderboard, updateUserRecord } from "../../firebase"
import { useState, useEffect } from "react"
import { generateBoard,
         placeShip,
         fireAtCell,
         computeIndicesForPlacement,
         isValidPlacement,
         areAllShipSunk,
         getRandomMessage
        } from "./utils"
import { fleet } from "./config"
import useSounds from "../../hooks/useSounds"

import Header from "./components/Header"
import LeaderboardBattleship from "./components/LeaderboardBattleship"
import InfosectionBattleship from "./components/InfoSectionBattleship"
import DeployementPanel from "./components/DeployementPanel"
import Board from "./components/Board"
import GameStatus from "./components/GameStatus"
import Button from "./components/Button"

export default function Battleship(){
    const [info, setInfo] = useState(false)
    const [leaderboard, setLeaderboard] = useState(false)
    const [gamePhase, setGamePhase] = useState("idle")
    const [gameWon, setGameWon] = useState(false)
    const [record, setRecord] = useState(false)
    /*ship placement states */
    const [shipToPlace, setShipToPlace] = useState([...fleet])
    const [orientation, setOrientation] = useState("horizontal")
    const [selectedShip, setSelectedShip] = useState(null)

    const [gameStats, setGameStats] = useState({time : 0, count : 0})
    const [userBoard, setUserBoard] = useState(() => generateBoard())
    const [aiBoard, setAiBoard] = useState(() => generateBoard())
    const [userTurn, setTurn] = useState(true)
    const [message, setMessage] = useState("")

    const {user, userLoading} = useUser()
    const {gamesData, dataLoading} = useGamesData()
    const {playHit, playMiss} = useSounds()

    const allShipsId = fleet.map(s => s.id)
    
    if(userLoading || dataLoading){
        return <h3>loading...</h3>
    }

    const styleMainContainer = `bg-gradient-to-br from-indigo-100 via-indigo-50 to-indigo-100 to-sky-100
                                p-3 rounded-lg shadow-lg flex flex-col items-center`

    //timer

    useEffect(() => {
      let interval;
      
      if(gamePhase === "playing"){
        const start = Date.now()
        interval = setInterval(() => {
          setGameStats((prev) => ({...prev, time : Math.floor((Date.now() - start) / 1000)}))
        }, 1000)
      }
      if(gamePhase === "gameOver") clearInterval(interval)
       return () => clearInterval(interval)
    }, [gamePhase])

    useEffect(() => {
      if(gamePhase === "gameOver" && gameWon){
        async function updateRecords() {
          const gameName = "battleship";
          const { uid, name: username } = user; 
          try {
            const isUserRecord = await updateUserRecord(gameName, gameStats, uid);
            const isLeaderboardRecord = await updateGameLeaderboard(gameName, gameStats, username);
            console.log("Records updated successfully.");
            setRecord(isUserRecord || isLeaderboardRecord)
          } catch (err) {
            console.error("Error updating records:", err);
          }
        }
        updateRecords()
      }
    }, [gamePhase])
        

    //toggle handlers

    function toggleInfo(){
        setInfo(prev => !prev)
        setLeaderboard(false)
    }
    function toggleLeaderboard(){
        setLeaderboard(prev => !prev)
        setInfo(false)
    }

    // ships deploy functions

    function handleSelectShip(shipId){
        setSelectedShip(shipId)
    }
    function handleToggleOrientation(){
        setOrientation(o => (o === "horizontal" ? "vertical" : "horizontal"))
    }
    function handleDeploy(){
      // before starting randomly place ai fleet
      let newAiBoard = aiBoard
      fleet.forEach(ship => {
        let placed = false
        while (!placed){
          const orientationChoice = Math.random() < 0.5 ? "horizontal" : "vertical"
          const startIdx = Math.floor(Math.random() * 100)
          const indices = computeIndicesForPlacement(startIdx, ship.size, orientationChoice)
          if(isValidPlacement(newAiBoard, indices)){
            newAiBoard = placeShip(newAiBoard, ship.id, indices)
            placed = true
          }
        }
      })
      setAiBoard(newAiBoard)
      // transition to "playing" phase
      setGamePhase("playing")
    }

    // cell click handler fro deployement and playing

    function handleCellClick(idx){
      // deploy phase
      if(gamePhase === "deploy" || selectedShip){
        const shipConfig = fleet.find(s => s.id === selectedShip)
        const indices = computeIndicesForPlacement(idx, shipConfig.size, orientation)
        if(isValidPlacement(userBoard, indices)){
          setUserBoard(b => placeShip(b, selectedShip, indices))
          setShipToPlace(list => list.filter(s => s.id !== selectedShip))
          setSelectedShip(null)
        }
        return;
      }

      // play phase
      if(gamePhase === "playing" && userTurn){
        // user fires at ai board
        const {board : newAiBoard, hit} = fireAtCell(aiBoard, idx)
        if(hit){
          playHit()
        }else{
          playMiss()
        }
        setAiBoard(newAiBoard)
        if(areAllShipSunk(newAiBoard, allShipsId)){
          setGamePhase("gameOver")
          setGameWon(true)
          const remainingCell = newAiBoard.filter((c) => c.status === "empty").length
          const hits = userBoard.filter(c => c.status === "hit").length
          setGameStats(prev => ({...prev, count : remainingCell - hits }))
          return
        }
        // if hit allow another shot immediately
        if(hit){
          setMessage(() => getRandomMessage("pos"))
          return
        }
        // if miss, show miss marker before swithcing
        setTimeout(() => {
          setMessage(() => getRandomMessage("neg"))
          setTurn(false)
          setTimeout(() => aiMove(userBoard), 500)
        }, 300)
        return
      }
    }

    function aiMove(boardSnapshot) {
      // 1) Build the list from the snapshot argument, not `userBoard`
      const untargeted = boardSnapshot
        .map((cell, i) => (cell.status === 'empty' || cell.status === 'ship' ? i : null))
        .filter(i => i != null);
    
      // 2) Fire on the snapshot, producing a brand-new board
      const idx = untargeted[Math.floor(Math.random() * untargeted.length)];
      const { board: updatedBoard, hit } = fireAtCell(boardSnapshot, idx);
      if(hit){
        playHit()
      }else{
        playMiss()
      }
    
      // 3) Push that into state
      setUserBoard(updatedBoard);
    
      // 4) Check for defeat
      if (areAllShipSunk(updatedBoard, allShipsId)) {
        setGamePhase('gameOver');
        return;
      }
    
      // 5) Continue or yield turn
      setTimeout(() => {
        if (hit) {
          aiMove(updatedBoard);  // pass the fresh board again
        } else {
          setTurn(true);
        }
      }, 300);
    }
    
    function resetGame(){
      setGamePhase("idle")
      setGameWon(false)
      setShipToPlace([...fleet])
      setGameStats({time : 0, count : 0})
      setUserBoard(generateBoard)
      setAiBoard(generateBoard)
      setTurn(true)
      setRecord(false)
    }


    return(
        <div className="p-3">
            <div className={styleMainContainer}>
                <Header toggleInfo={toggleInfo} toggleLeaderboard={toggleLeaderboard} />
                {info ? <InfosectionBattleship toggleInfo={toggleInfo} /> :
                 leaderboard ? <LeaderboardBattleship /> :
                  <>
                    {/* gamestatus and ship deployement rendering */}

                    {gamePhase !== "deploy" &&
                     <GameStatus 
                       user={user} 
                       onStart={() => setGamePhase("deploy")} 
                       stats={gameStats} 
                       gamePhase={gamePhase}
                       message={message}
                       record={record}
                       gameWon={gameWon}
                    />}
                    {gamePhase === "deploy" && (
                        <DeployementPanel
                          ships={shipToPlace}
                          selectedShip={selectedShip}
                          orientation={orientation}
                          onSelectShip={handleSelectShip}
                          onToggleOrientation={handleToggleOrientation}
                        />
                    )}

                    {/* Board rendering */}

                    <Board
                        variant={gamePhase === "deploy" ? "user" : userTurn ? "user" : "ai"}
                        array={gamePhase === "deploy" ? userBoard : userTurn ? aiBoard : userBoard}
                        onCellClick={handleCellClick}
                        disabled={(gamePhase === "idle" || gamePhase === "gameOver") ||
                                  (gamePhase === "playing" && !userTurn)}
                        gamePhase={gamePhase}
                        isFlipped={userTurn}
                    />

                    {/* button rendering */}

                    {gamePhase === "idle" && <Button onClick={() => setGamePhase("deploy")}>Start Game</Button>}
                    {gamePhase === "playing" && <Button onClick={resetGame}>Reset game</Button>}
                    {gamePhase === "gameOver" && <Button onClick={resetGame}>New Game</Button>}
                    {gamePhase === "deploy" && <Button onClick={handleDeploy} disabled={shipToPlace.length > 0 }>Deploy ships</Button>}
                  </>
                }
            </div>
        </div>
    )
}



