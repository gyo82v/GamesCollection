import {useState, useEffect} from "react"
import { getIcons, shuffleArray } from "./utils"
import { nanoid } from "nanoid"
import { getRandomPhrase } from "./utils";
import { updateGameLeaderboard, updateUserRecord } from "../../firebase";
import { useUser } from "../../context/UserContext";
import Confetti from "react-confetti";


import Header from "./components/Header"
import CardSection from "./components/CardSection"
import GamesButton from "../gamesComponents/GamesButton"
import StatusSection from "./components/StatusSection";
import InfoSectionMinds from "./components/InfoSectionMinds";
import LeaderBoardMinds from "./components/LeaderboardMinds";
import UserNotLoggedIn from "../gamesComponents/UserNotLoggedIn";

export default function MindPairs(){
    const [info, setInfo] = useState(false)
    const [leaderboard, setLeaderboard] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [selectedCards, setSelectedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [deck, setDeck] = useState([])
    const [gameStats, setGameStats] = useState({time : 0, count : 0})
    const [intervalId, setIntervalId] = useState(null)
    const [resultMessage, setResultMessage] = useState("")
    const [record, setRecord] = useState(false)
    const {user, loading} = useUser()

    const totalCard = 20 * 2
    const gameOver = matchedCards.length === totalCard



    useEffect(() => {
        if(!user?.uid || !gameOver) return
        async function updateRecords() {
            const gameName = "minds";
            const gameNameData = "mindsPairs"
            const { uid, name: username } = user; 
            try {
              const isUserRecord = await updateUserRecord(gameName, gameStats, uid);
              const isLeaderboardRecord = await updateGameLeaderboard(gameNameData, gameStats, username);
              console.log("Records updated successfully.");
              setRecord(isUserRecord || isLeaderboardRecord)
            } catch (err) {
              console.error("Error updating records:", err);
            }
          }
        
          if (gameOver) {
            updateRecords();
          }
    }, [gameOver, gameStats, user])

    const generateDeck = () => {
        const icons = getIcons();
        const doubleIcons = [...icons, ...icons].map(card => ({
          ...card,
          uniqueId: nanoid()
        }));
        return shuffleArray(doubleIcons);
      };

      useEffect(() => {
        if (deck.length === 0) {
          setDeck(generateDeck());
        }
      }, [deck]);

      useEffect(() => {
        if(gameOver){
            clearInterval(intervalId)
        }
      },[gameOver])

      useEffect(() => {
        return () => { if (intervalId) clearInterval(intervalId) }
      }, [intervalId])
    

    const resetGame = () => {
        setDeck(generateDeck())
        setGameStarted(true)
        setSelectedCards([])
        setMatchedCards([])
        setGameStats({time : 0, count : 0})
        if(intervalId) {clearInterval(intervalId)}
        const id = setInterval(() => {
            setGameStats(prev => ({...prev, time : prev.time + 1}))
        }, 1000)
        setIntervalId(id)
        setResultMessage("")
        setRecord(false)
    }

    // toggle functions
    function toggleInfo(){ setInfo(prev => !prev); setLeaderboard(false)}
    function toggleLeaderboard(){ setLeaderboard(prev => !prev); setInfo(false)}
    
    const handleCardClick = (card) => {
        if(
            selectedCards.some(selected => selected.uniqueId === card.uniqueId) ||
            matchedCards.some(matched => matched.id === card.id)
        ){return}

        if(selectedCards.length < 2){
            setSelectedCards(prev => [...prev, card])
        }
    }

    useEffect(() => {
        if(selectedCards.length === 2){
            const [firstCard, secondCard] = selectedCards
            let timeout

            if(firstCard.name === secondCard.name){
                setMatchedCards(prev => [...prev, firstCard, secondCard])
                setResultMessage(getRandomPhrase("pos"))
                setSelectedCards([])
            }else{
                timeout = setTimeout(() => { 
                    setSelectedCards([])
                    setGameStats(prev => ({...prev, count : prev.count + 1}))
                    setResultMessage(getRandomPhrase("neg"))
                }, 600)
            }

            return () => clearTimeout(timeout)
        }
    }, [selectedCards])
 

    return(
        <div className="p-3">
             {loading ? <h2>loading</h2> : (
                        <div className="p-3 bg-green-50 flex flex-col rounded-lg shadow-lg">
                          <Header toggleInfo={toggleInfo} toggleLeaderboard={toggleLeaderboard} />
                          {info ? <InfoSectionMinds toggle={toggleInfo} /> : 
                           leaderboard ? 
                           ( user?.uid ? <LeaderBoardMinds /> : <UserNotLoggedIn variant="minds" />) :
                          <>
                                  <StatusSection
                                    gameStarted={gameStarted}
                                    gameOver={gameOver}
                                    gameStats={gameStats}
                                    record={record}
                                    name={user?.name}
                                  />
                                 <CardSection 
                                    deck={deck}
                                    onCardClick={handleCardClick} 
                                    selectedCards={selectedCards} 
                                    matchedCards={matchedCards}
                                    gameStarted={gameStarted}
                                    gameOver={gameOver}
                                  />
                                 <GamesButton onClick={resetGame} variant="minds" >
                                    {!gameStarted ? "Start Game" : !gameOver ? "Restart Game" : "New Game"}
                                 </GamesButton>
                          </> }
                       </div>
                       )}
        </div>
          )
        }

