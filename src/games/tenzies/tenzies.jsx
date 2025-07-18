import Die from "./components/Die"
import TenziesButton from "./components/TenziesButton"
import InfoSection from "./components/InfoSection"
import TenziesHeader from "./components/TenziesHeader"
import InfoSectionTenzies from "./components/InfoSectiontenzies"
import LeaderboardTenzies from "./components/LeaderboardTenzies"
import UserNotLoggedIn from "../gamesComponents/UserNotLoggedIn"

import {useState, useEffect} from "react"
import { generateAllDice, hold, rollDice } from "./utils"
import Confetti from "react-confetti";
import { useUser } from "../../context/UserContext"
import { useGamesData } from "../../context/GamesDataContext"
import { updateGameLeaderboard, updateUserRecord } from "../../firebase"


export default function Tenzies(){
    const [dice, setDice] = useState(() => generateAllDice())
    const [gamestarted, setGameStarted] = useState(false)
    const [gameStat, setGameStat] = useState({time : 0, count : 0})
    const [intervalId, setIntervalId] = useState(null)
    const [timerActive, setTimerActive] = useState(false)
    const [info, setInfo] = useState(false)
    const [leaderboards, setLeaderboards] = useState(false)
    const [record, setRecord] = useState(false)
    const {user, userLoading} = useUser()
    const {gamesData, gamesDataloading} = useGamesData()
    
    const containerStyle = `bg-gradient-to-br from-orange-100 via-orange-50 to-orange-100
                            rounded-lg w-full h-full p-4 flex flex-col items-center`

    if(userLoading || gamesDataloading ){
        return <h3>loading...</h3>
    }
  
    const gameWon = dice.every(die => die.isHeld && die.value === dice[0].value)

    useEffect(() => {
        if(!gameWon || !user?.uid) return

        async function updateRecords() {
          const gameName = "tenzies";
          const { uid, name: username } = user; 
          try {
            const isUserRecord = await updateUserRecord(gameName, gameStat, uid);
            const isLeaderboardRecord = await updateGameLeaderboard(gameName, gameStat, username);
            console.log("Records updated successfully.");
            setRecord(isUserRecord || isLeaderboardRecord)
          } catch (err) {
            console.error("Error updating records:", err);
          }
        }
      
        if (gameWon) {
          updateRecords();
        }
      }, [gameWon, gameStat, user]);
      

    useEffect(() => {
        if(gameWon && intervalId){
            clearInterval(intervalId)
            setTimerActive(false)
        }
    }, [gameWon])

    useEffect(() => {
        return () => {if(intervalId) clearInterval(intervalId)}
    }, [intervalId])

    const diceArray = dice.map(die => (
            <Die
             key={die.id}
             value={die.value}
             disabled={!timerActive}
             isHeld={die.isHeld}
             onClick={() => hold(setDice, die.id)}
            />
    ))
   
    function startGame(){
        setGameStarted(true)
        setDice(generateAllDice())
        setGameStat({time: 0, count : 0})
        setRecord(false)
        if(intervalId) clearInterval(intervalId)
        setTimerActive(true)
        const id = setInterval(() => {
        setGameStat(prev => ({...prev, time : prev.time + 1}))
        }, 1000)
        setIntervalId(id)
    }

    // toggle functions
    function toggleInfo(){ setInfo(prev => !prev); setLeaderboards(false)}
    function toggleLeaderboards(){ setLeaderboards(prev => !prev); setInfo(false)}

    return(
        <div className="p-3 h-full w-full ">
          {gameWon && <Confetti />}
          <div className={containerStyle}>
            <div aria-live="polite" className="sr-only">
              {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <TenziesHeader toggleInfo={toggleInfo} toggleLeaderboards={toggleLeaderboards} />
            { info ?  <InfoSectionTenzies toggle={toggleInfo} /> : 
              leaderboards ? 
                 ( user?.uid ? <LeaderboardTenzies /> : <UserNotLoggedIn variant="tenzies" />)  :
              <>
               <InfoSection 
                 gameWon={gameWon} 
                 timer={timerActive} 
                 time={gameStat.time} 
                 rolls={gameStat.count} 
                 record={record}
                 user={user}
               />
                <section className="grid grid-cols-5 grid-rows-2 gap-4 my-8">
                {diceArray}
                </section>
                 {
                    !gamestarted ? <TenziesButton onClick={startGame} gameWon={gameWon}>Start game</TenziesButton> :
                     gameWon ?     <TenziesButton onClick={startGame} gameWon={gameWon}>New game</TenziesButton> :
                                   <TenziesButton onClick={() => rollDice(setDice, setGameStat)} gameWon={gameWon}>Roll dice</TenziesButton>
                  }  
              </>
            }
          </div>
        </div>
    )
}


