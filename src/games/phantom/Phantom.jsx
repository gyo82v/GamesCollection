import { useState, useEffect, useRef } from "react"
import { getRandomWord } from "./utils"
import { updateGameLeaderboard, updateUserRecord } from "../../firebase";
import { useUser } from "../../context/UserContext";
import { useGamesData } from "../../context/GamesDataContext";
import Confetti from "react-confetti";

import Header from "./components/Header"
import GameStatus from "./components/GameStatus"
import LivesSection from "./components/LivesSection"
import WordSection from "./components/WordSection"
import KeyboardSection from "./components/KeyboardSection"
import GamesButton from "../gamesComponents/GamesButton";
import InfoSectionPhantom from "./components/InfoSectionPhantom";
import LeaderboardPhantom from "./components/Leaderboardphantom";
import OptionsSectionPhantom from "./components/OptionsSectionPhantom";
import UserNotLoggedIn from "../gamesComponents/UserNotLoggedIn";


export default function Phantom() {
  // 📊 Game state hooks (always run)
  const [language, setLanguage] = useState('eng');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [lives, setLives] = useState(8);
  const [word, setWord] = useState('react');
  const [gameStarted, setGameStarted] = useState(false);
  const [info, setInfo] = useState(false);
  const [leaderboard, setLeaderboard] = useState(false);
  const [options, setOptions] = useState(false);
  const [record, setRecord] = useState(false)

  // ⏱ Timer state hooks
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // 🔥 Ref and context hook
  const hasUpdatedRef = useRef(false);
  const { user, loading } = useUser();

  // 🔄 Timer effect: ticks every second while playing
  useEffect(() => {
    if (!gameStarted || (word === null)) return; // ensures effect dependencies are stable
    if (gameStarted && !word) return;
    if (gameStarted && elapsedTime !== null) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, startTime]);

  // 💾 Firebase update effect: runs once on win
  useEffect(() => {
    const wrongCount = guessedLetters.filter(l => !word.includes(l)).length;
    const isGameWon = word.split('').every(l => guessedLetters.includes(l));
    if (!isGameWon || !user?.uid || hasUpdatedRef.current) return;
    hasUpdatedRef.current = true;

    const gameName = 'phantom';
    const gameStat = { time: elapsedTime, count: wrongCount };
    const { uid, name: username } = user;

    async function updateRecords() {
      try {
        const isUser = await updateUserRecord(gameName, gameStat, uid);
        const isBoard = await updateGameLeaderboard(gameName, gameStat, username);
        console.log('Hangman records:', isUser, isBoard);
        setRecord(isUser || isBoard)
      } catch (e) {
        console.error('Error updating Hangman:', e);
      }
    }
    updateRecords();
  }, [guessedLetters, elapsedTime, user]);

  // 📋 Now it's safe to return on loading, after all hooks
  if (loading) return <h2>loading...</h2>;

  // 📈 Derived state
  const wrongCount = guessedLetters.filter(l => !word.includes(l)).length;
  const isGameWon = word.split('').every(l => guessedLetters.includes(l));
  const isGameLost = wrongCount >= lives;
  const isGameOver = isGameWon || isGameLost;
 
  // 🕹 Handlers
  function addToArray(letter) {
    setGuessedLetters(prev => prev.includes(letter) ? prev : [...prev, letter]);
  }

  function startGame() {
    // ⏲ Reset and start timer
    setStartTime(Date.now());
    setElapsedTime(0);
    setWord(language === 'eng' ? getRandomWord('eng') : getRandomWord('ita'));
    setLives(8);
    setGameStarted(true);
    setGuessedLetters([]);
    setRecord(false)
    hasUpdatedRef.current = false;
  }

  // 🛠 Toggles
  const toggleInfo = () => { setInfo(!info); setLeaderboard(false); setOptions(false); };
  const toggleLeaderboard = () => { setLeaderboard(!leaderboard); setInfo(false); setOptions(false); };
  const toggleOptions = () => { setOptions(!options); setInfo(false); setLeaderboard(false); };
  const toggleLanguage = () => setLanguage(prev => prev === 'eng' ? 'ita' : 'eng');

  return (
    <div className="p-3">
      {isGameWon && <Confetti />}
      <div className="bg-indigo-50 p-3 rounded-lg shadow-lg flex flex-col">
        <Header lang={language} toggle={toggleLanguage} info={toggleInfo} leaderboard={toggleLeaderboard} options={toggleOptions} />
        {info ? (
          <InfoSectionPhantom toggle={toggleInfo} />
        ) : leaderboard ? (
          user?.uid ? <LeaderboardPhantom toggle={toggleLeaderboard} /> : <UserNotLoggedIn variant="phantom" />
        ) : options ? (
          <OptionsSectionPhantom toggle={toggleOptions} toggleLang={toggleLanguage} lang={language} />
        ) : (
          <>
            {/* 🕒 Pass elapsedTime to GameStatus */}
            <GameStatus
              gameWon={isGameWon}
              gameLost={isGameLost}
              gameOver={isGameOver}
              gameStarted={gameStarted}
              time={elapsedTime}
              record={record}
              name={user?.name}
            />
            <LivesSection lives={lives} livesLost={wrongCount} />
            <WordSection word={word} guessedLetters={guessedLetters} gameLost={isGameLost} />
            <KeyboardSection
              guessedLetters={guessedLetters}
              word={word}
              gameStarted={gameStarted}
              gameOver={isGameOver}
              addToArray={addToArray}
            />
            <GamesButton variant="phantom" margin="mx-auto mb-6" onClick={startGame}>
              {!gameStarted ? 'Start Game' : isGameOver ? 'New Game' : 'Restart Game'}
            </GamesButton>
          </>
        )}
      </div>
    </div>
  );
}





/*


export default function Phantom(){
    const [language, setLanguage] = useState("eng")
    const [guessedLetters, setGuessedLetters] = useState([])
    const [lives, setLives] = useState(8)
    const [word, setWord] = useState("react")
    const [gameStarted, setGameStarted] = useState(false)
    const [record, setRecord] = useState(false)
    const [info, setInfo] = useState(false)
    const [leaderboard, setLeaderboard] = useState(false)
    const [options, setOptions] = useState(false)
    const hasUpdatedRef = useRef(false);
    const {user, loading} = useUser()

    if(loading){
      return <h2>loading...</h2>
    }

    const wrongCount = guessedLetters.filter(letter => !word.includes(letter)).length
    const isGameWon = word.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongCount >= lives
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const lastGuessCorrect = lastGuessedLetter && word.includes(lastGuessedLetter)
    const lastGuessWrong =  lastGuessedLetter && !word.includes(lastGuessedLetter)

    function addToArray(letter){
        setGuessedLetters(prev => !guessedLetters.includes(letter) ? [...prev, letter] : prev )
    }

    function startGame(){
        setWord(language === "eng" ? getRandomWord("eng") : getRandomWord("ita"))
        setLives(8)
        setGameStarted(true)
        setGuessedLetters([])
        hasUpdatedRef.current = false
    }


    // toggle sections functions
    function toggleInfo(){setInfo(prev => !prev); setLeaderboard(false); setOptions(false)}
    function toggleLeaderboard(){setLeaderboard(prev => !prev); setInfo(false); setOptions(false)}
    function toggleOptions(){setOptions(prev => !prev); setInfo(false); setLeaderboard(false)}

    //toggle language 
    function toggleLanguage(){setLanguage(prev => prev === "eng" ? "ita" : "eng")}

    return(
        <div className="p-3">
            {isGameWon && <Confetti />}
            <div className="bg-indigo-50 p-3 rounded-lg shadow-lg flex flex-col">
            <Header lang={language} toggle={toggleLanguage} info={toggleInfo} leaderboard={toggleLeaderboard} options={toggleOptions} />
            { info ? <InfoSectionPhantom toggle={toggleInfo}/> :
              leaderboard ? 
               (user?.uid ? <LeaderboardPhantom toggle={toggleLeaderboard}/> : <UserNotLoggedIn variant="phantom" />) :
              options ? <OptionsSectionPhantom toggle={toggleOptions} toggleLang={toggleLanguage} lang={language} /> :
            <>
              <GameStatus 
                right={lastGuessCorrect}
                wrong={lastGuessWrong}
                gameWon={isGameWon}
                gameLost={isGameLost}
                gameOver={isGameOver}
                gameStarted={gameStarted}
              />
              <LivesSection lives={lives} livesLost={wrongCount} />
              <WordSection word={word} guessedLetters={guessedLetters} gameLost={isGameLost} />
              <KeyboardSection 
                guessedLetters={guessedLetters} 
                word={word}
                gameStarted={gameStarted}
                gameOver={false}
                addToArray={addToArray}
              />
              <GamesButton variant="phantom" margin="mx-auto mb-6" onClick={startGame}>
                {!gameStarted ? "Start Game" : isGameOver ? "New Game" : "Restart Game"}
              </GamesButton>
            </> }
            </div>
        </div>
    )
}








*/