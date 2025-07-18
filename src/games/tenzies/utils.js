import { nanoid } from "nanoid"

export const generateAllDice = () => {
    return new Array(25).fill(0).map(item => ({
        value : Math.ceil(Math.random() * 6),
        isHeld : false,
        id : nanoid()
    }))
}

export const hold = (setDice, id) => {
  setDice(prev => prev.map(prev => prev.id === id ? {...prev, isHeld : !prev.isHeld} : prev))
}

export const rollDice = (setDice, setGameStat) => {
    setDice(prev => prev.map(prev => !prev.isHeld ? {...prev, value: Math.ceil(Math.random() * 6)} : prev))
    setGameStat(prev => ({...prev, count : prev.count + 1}))
}