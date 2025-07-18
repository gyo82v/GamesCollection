// Battleship.jsx
import { useUser } from "../../context/UserContext";
import { useGamesData } from "../../context/GamesDataContext";
import { updateGameLeaderboard, updateUserRecord } from "../../firebase";
import { useState } from "react";
import { generateBoard, placeShip, computeIndicesForPlacement, isValidPlacement } from "./utils";
import { FLEET } from "./config";

import Header from "./components/Header";
import LeaderboardBattleship from "./components/LeaderboardBattleship";
import InfosectionBattleship from "./components/InfoSectionBattleship";
import DeploymentPanel from "./components/DeploymentPanel";
import Board from "./components/Board";
import GameStatus from "./components/GameStatus";
import Button from "./components/Button";

export default function Battleship() {
  const [info, setInfo] = useState(false);
  const [leaderboard, setLeaderboard] = useState(false);
  const [gamePhase, setGamePhase] = useState('idle');
  const [shipsToPlace, setShipsToPlace] = useState([...FLEET]);
  const [selectedShip, setSelectedShip] = useState(null);
  const [orientation, setOrientation] = useState('horizontal');
  const [userBoard, setUserBoard] = useState(() => generateBoard());
  const [aiBoard, setAiBoard] = useState(() => generateBoard());
  const [userTurn, setTurn] = useState(true);
  const [gameStats, setGameStats] = useState({ time: 0, score: 0 });
  const { user, userLoading } = useUser();
  const { gamesData, dataLoading } = useGamesData();
  if (userLoading || dataLoading) return <h3>loading...</h3>;

  function toggleInfo() {
    setInfo(prev => !prev);
    setLeaderboard(false);
  }
  function toggleLeaderboard() {
    setLeaderboard(prev => !prev);
    setInfo(false);
  }

  function handleSelectShip(shipId) {
    setSelectedShip(shipId);
  }
  function handleToggleOrientation() {
    setOrientation(o => (o === 'horizontal' ? 'vertical' : 'horizontal'));
  }
  function handleDeploy() {
    setGamePhase('playing');
  }

  function handleCellClick(idx) {
    if (gamePhase !== 'deploy' || !selectedShip) return;
    const shipConfig = FLEET.find(s => s.id === selectedShip);
    const indices = computeIndicesForPlacement(idx, shipConfig.size, orientation);
    if (isValidPlacement(userBoard, indices)) {
      setUserBoard(b => placeShip(b, selectedShip, indices));
      setShipsToPlace(list => list.filter(s => s.id !== selectedShip));
      setSelectedShip(null);
    }
  }

  return (
    <div className="p-3">
      <div className="bg-gradient-to-br from-sky-100 via-sky-50 to-sky-100 p-3 rounded-lg shadow-lg flex flex-col items-center">
        <Header toggleInfo={toggleInfo} toggleLeaderboard={toggleLeaderboard} />
        {info ? (
          <InfosectionBattleship toggleInfo={toggleInfo} />
        ) : leaderboard ? (
          <LeaderboardBattleship />
        ) : (
          <>
            {gamePhase === 'idle' && <GameStatus user={user} onStart={() => setGamePhase('deploy')} />}
            {gamePhase === 'deploy' && (
              <DeploymentPanel
                ships={shipsToPlace}
                selectedShip={selectedShip}
                orientation={orientation}
                onSelectShip={handleSelectShip}
                onToggleOrientation={handleToggleOrientation}
                onDeploy={handleDeploy}
              />
            )}
            <Board
              array={
                gamePhase === 'deploy'
                  ? userBoard
                  : userTurn
                  ? userBoard
                  : aiBoard
              }
              variant={gamePhase === 'deploy' ? 'user' : userTurn ? 'user' : 'ai'}
              onCellClick={handleCellClick}
              disabled={
                (gamePhase === 'idle' || gamePhase === 'gameOver') ||
                (gamePhase === 'playing' && !userTurn)
              }
            />
            {gamePhase === 'idle' && <Button onClick={() => setGamePhase('deploy')}>Start Game</Button>}
            {gamePhase === 'playing' && <Button onClick={() => window.location.reload()}>Reset Game</Button>}
            {gamePhase === 'gameOver' && <Button onClick={() => window.location.reload()}>New Game</Button>}
          </>
        )}
      </div>
    </div>
  );
}


// components/DeploymentPanel.jsx
import React from 'react';
export default function DeploymentPanel({ ships, selectedShip, orientation, onSelectShip, onToggleOrientation, onDeploy }) {
  return (
    <section className="w-full p-4 bg-indigo-100 rounded-lg shadow-md mb-4">
      <p className="mb-2 font-medium text-center">Deploy your ships:</p>
      <ul className="flex justify-around mb-4">
        {ships.map(ship => (
          <li key={ship.id}>
            <button
              onClick={() => onSelectShip(ship.id)}
              className={
                `px-2 py-1 rounded border-2 ${
                  selectedShip === ship.id
                    ? 'border-indigo-600 bg-indigo-200'
                    : 'border-gray-400 bg-white'
                }`
              }
            >
              {ship.name} ({ship.size})
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mb-4">
        <button onClick={onToggleOrientation} className="px-3 py-1 bg-indigo-300 rounded hover:bg-indigo-400">
          Orientation: {orientation}
        </button>
      </div>
      <button
        onClick={onDeploy}
        disabled={ships.length > 0}
        className={
          `w-full px-4 py-2 rounded font-semibold text-white
           ${ships.length === 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`
        }
      >
        Deploy Ships
      </button>
    </section>
  );
}


// components/Board.jsx
import Tile from "./Tile";
export default function Board({ array, variant, onCellClick, disabled }) {
  return (
    <section className="grid grid-cols-10 grid-rows-10 gap-px w-full aspect-square border-2 border-indigo-700 bg-gradient-to-br from-indigo-300 via-indigo-400 to-indigo-300 rounded-lg shadow-xl">
      {array.map((cell, idx) => (
        <Tile key={cell.id} status={cell.status} variant={variant} onClick={() => onCellClick(idx)} disabled={disabled} />
      ))}
    </section>
  );
}


// components/Tile.jsx
export default function Tile({ status, variant, onClick, disabled }) {
  let bgClass = 'bg-blue-200';
  let content = '';
  if (status === 'ship' && variant === 'user') bgClass = 'bg-gray-500';
  if (status === 'hit') { bgClass = 'bg-red-600'; content = '⚓'; }
  if (status === 'miss') { bgClass = 'bg-blue-100'; content = '💧'; }
  const baseClass = `w-full h-full border border-indigo-700 ${bgClass}`;
  return <button onClick={onClick} disabled={disabled || status === 'hit' || status === 'miss'} className={baseClass}><span className="text-xl">{content}</span></button>;
}


// utils.js
import { nanoid } from "nanoid";
export function generateBoard() {
  return Array.from({ length: 100 }, () => ({ id: nanoid(), status: 'empty', shipId: undefined }));
}
export function placeShip(board, shipId, indices) {
  return board.map((cell, idx) => indices.includes(idx) ? { ...cell, status: 'ship', shipId } : cell);
}
export function computeIndicesForPlacement(startIdx, size, orientation) {
  const indices = [];
  const row = Math.floor(startIdx / 10);
  const col = startIdx % 10;
  for (let offset = 0; offset < size; offset++) {
    const r = orientation === 'vertical' ? row + offset : row;
    const c = orientation === 'horizontal' ? col + offset : col;
    if (r > 9 || c > 9) return [];
    indices.push(r * 10 + c);
  }
  return indices;
}
export function isValidPlacement(board, indices) {
  return indices.length > 0 && indices.every(idx => board[idx].status === 'empty');
}
export function fireAtCell(board, index) {
  const newBoard = board.map((cell, idx) => {
    if (idx !== index) return cell;
    if (cell.status === 'ship') return { ...cell, status: 'hit' };
    if (cell.status === 'empty') return { ...cell, status: 'miss' };
    return cell;
  });
  return { board: newBoard, hit: board[index].status === 'ship' };
}
export function isShipSunk(board, shipId) {
  const shipCells = board.filter(cell => cell.shipId === shipId);
  return shipCells.length > 0 && shipCells.every(cell => cell.status === 'hit');
}
