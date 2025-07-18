// utils.js

import { nanoid } from "nanoid";


export function generateBoard() {
  return Array.from({ length: 100 }, () => ({
    id: nanoid(),
    status: 'empty',
    shipId: undefined,
  }));
}

export function placeShip(board, shipId, indices) {
  return board.map((cell, idx) => {
    if (indices.includes(idx)) {
      return { ...cell, status: 'ship', shipId };
    }
    return cell;
  });
}

export function computeIndicesForPlacement(startIdx, size, orientation) {
  const indices = [];
  const row = Math.floor(startIdx / 10);
  const col = startIdx % 10;
  for (let offset = 0; offset < size; offset++) {
    let r = row;
    let c = col;
    if (orientation === 'horizontal') {
      c = col + offset;
    } else {
      r = row + offset;
    }
    // out of bounds?
    if (r > 9 || c > 9) return [];
    indices.push(r * 10 + c);
  }
  return indices;
}


export function isValidPlacement(board, indices) {
  if (indices.length === 0) return false;
  // ensure none of these cells already has a ship
  return indices.every(idx => {
    const cell = board[idx];
    return cell && cell.status === 'empty';
  });
}

export function fireAtCell(board, index) {
  const newBoard = board.map((cell, idx) => {
    if (idx !== index) return cell;
    if (cell.status === 'ship') {
      return { ...cell, status: 'hit' };
    }
    if (cell.status === 'empty') {
      return { ...cell, status: 'miss' };
    }
    return cell;
  });
  const hit = board[index].status === 'ship';
  return { board: newBoard, hit };
}

export function isShipSunk(board, shipId) {
  const shipCells = board.filter(cell => cell.shipId === shipId);
  if (shipCells.length === 0) return false;
  return shipCells.every(cell => cell.status === 'hit');
}

export function areAllShipSunk(board, shipIds){
  return shipIds.every(id => {
    const shipCells = board.filter(cell => cell.shipId === id)
    return shipCells.length > 0 && shipCells.every(cell => cell.status === "hit")
  })
}

export function getRandomMessage(array){
  const positive = [
  "Hit confirmed", "Target destroyed", "Fire mission success",
  "Vessel compromised", "Impact achieved", "Enemy neutralized",
  "Strike complete", "Damage assessed", "Objective met",
  "Bravo Zulu"
  ]
  const negative = [
  "Shot deviated", "No contact", "Coordinates clear",
  "Missile failed", "Target absent", "Negative impact",
  "Zone empty", "Contact lost", "Missile voided",
  "Mission aborted"
  ]

  if(array === "pos"){
    return positive[Math.floor(Math.random() * positive.length)]
  }else if(array === "neg"){
    return negative[Math.floor(Math.random() * negative.length)]
  }
}