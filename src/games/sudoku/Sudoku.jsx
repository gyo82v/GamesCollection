import { useEffect, useState, useMemo, useRef } from "react"
import {generatePuzzle } from "./utils.js"
import { useUser } from "../../context/UserContext";
import { updateGameLeaderboard, updateUserRecord } from "../../firebase.js";
 
import Header from "./components/Header.jsx"
import LeaderboardSudoku from "./components/LeaderboardSudoku.jsx"
import InfoSudoku from "./components/InfoSudoku.jsx"
import OptionsSudoku from "./components/OptionSudoku.jsx"
import UserNotLoggedIn from "../gamesComponents/UserNotLoggedIn";

import GameStatus from "./components/GameStatus"
import Board from "./components/Board"
import ColorSelector from "./components/ColorSelector"
import GamesButton from "../gamesComponents/GamesButton.jsx";

const MAX_MISTAKES = 3;

export default function Sudoku() {
  const { user, loading } = useUser();
  if (loading) return <h2>loading...</h2>;
  return <Home user={user} />;
}

function Home({ user }) {
  // Track game state
  const [puzzle, setPuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [board, setBoard] = useState([]);
  const [phase, setPhase] = useState('idle');
  const [selectedColor, setSelectedColor] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [wrongTiles, setWrongTiles] = useState([]);
  const [info, setInfo] = useState(false);
  const [leaderboard, setLeaderboard] = useState(false);
  const [options, setOptions] = useState(false);
  const [record, setRecord] = useState(false);
  const hasUpdatedRef = useRef(false);


  // Timer effect
  useEffect(() => {
    let timerId;
    if (phase === 'playing') {
      timerId = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(timerId);
  }, [phase]);

  // Initial demo board
  useEffect(() => {
    const { puzzle: puz, solution: sol } = generatePuzzle(0);
    setPuzzle(puz);
    setSolution(sol);
    setBoard(puz);
  }, []);

  // Firestore updates only on win
 useEffect(() => {
    if (phase !== 'won' || !user?.uid || hasUpdatedRef.current) return;

    hasUpdatedRef.current = true;
    const gameName = 'sudoku';
    const gameStat = { time, count: mistakes };
    const { uid, name: username } = user;

    async function updateRecords() {
      try {
        const isUserRecord = await updateUserRecord(gameName, gameStat, uid);
        const isLeaderboardRecord = await updateGameLeaderboard(gameName, gameStat, username);
        setRecord(isUserRecord || isLeaderboardRecord);
        console.log('Sudoku records updated successfully');
      } catch (err) {
        console.error('Error updating Sudoku records:', err);
      }
    }

    updateRecords();
  }, [phase]);

  // Start or restart game
  const handleStart = () => {
    const emptyCount = difficulty === 'easy' ? 40 : 50;
    const { puzzle: puz, solution: sol } = generatePuzzle(emptyCount);
    setPuzzle(puz);
    setSolution(sol);
    setBoard(puz);
    setPhase('playing');
    setSelectedColor(null);
    setMistakes(0);
    setTime(0);
    setWrongTiles([]);
    setRecord(false);
    hasUpdatedRef.current = false;
  };

  // Color selection
  const handleColorSelect = (colorNum) => setSelectedColor(colorNum);

  // Tile click handling
  const handleTileClick = (r, c) => {
    if (phase !== 'playing' || selectedColor == null) return;

    const nextBoard = board.map(row => [...row]);
    nextBoard[r][c] = selectedColor;

    if (selectedColor === solution[r][c]) {
      setBoard(nextBoard);
      const isWin = nextBoard.every((row, rr) =>
        row.every((val, cc) => (puzzle[rr][cc] !== 0) || (val === solution[rr][cc]))
      );
      if (isWin) {
        setPhase('won');
      }
    } else {
      // increment mistake and check loss
      setMistakes(prev => {
        const newCount = prev + 1;
        if (newCount >= MAX_MISTAKES) {
          setPhase('lost');
        }
        return newCount;
      });
      setWrongTiles(prev => [...prev, { r, c }]);
      setTimeout(() => {
        setWrongTiles(prev => prev.filter(tile => tile.r !== r || tile.c !== c));
      }, 1000);
    }
  };

  // Remaining color counts
  const remainingCounts = useMemo(() => {
    const counts = Array(10).fill(0);
    if (!puzzle.length) return counts;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (puzzle[r][c] === 0 && board[r][c] === 0) {
          counts[solution[r][c]]++;
        }
      }
    }
    return counts;
  }, [puzzle, board, solution]);

  // Toggle sections
  const toggleInfo = () => { setInfo(i => !i); setLeaderboard(false); setOptions(false); };
  const toggleLeaderboard = () => { setLeaderboard(l => !l); setInfo(false); setOptions(false); };
  const toggleOptions = () => { setOptions(o => !o); setInfo(false); setLeaderboard(false); };

  return (
    <div className="p-3">
      <div className="p-3 flex flex-col bg-lime-50 rounded-lg shadow-lg">
        <Header info={toggleInfo} leaderboard={toggleLeaderboard} options={toggleOptions} />

        {info ? (
          <InfoSudoku toggle={toggleInfo} />
        ) : leaderboard ? (
          user?.uid ? <LeaderboardSudoku toggle={toggleLeaderboard} /> : <UserNotLoggedIn variant="phantom" />
        ) : options ? (
          <OptionsSudoku toggle={toggleOptions} setDifficulty={setDifficulty} difficulty={difficulty} />
        ) : (
          <>  
            <GameStatus 
              phase={phase} 
              time={time} 
              mistakes={mistakes} 
              maxMistakes={MAX_MISTAKES} 
              name={user?.name} 
              record={record} 
           />

            <Board
              board={board}
              puzzle={puzzle}
              solution={solution}
              onTileClick={handleTileClick}
              phase={phase}
              wrongTiles={wrongTiles}
            />

            <ColorSelector
              phase={phase}
              selectedColor={selectedColor}
              onColorSelect={handleColorSelect}
              remainingCounts={remainingCounts}
            />

            <GamesButton onClick={handleStart} variant="sudoku" margin="mx-auto mb-2">
              {phase === "playing" ? "Restart Game" : (phase === "won" || phase === "lost") ? "New Game" : "Start Game"}
            </GamesButton>
          </>
        )}
      </div>
    </div>
  );
}


