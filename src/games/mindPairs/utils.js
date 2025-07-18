import {
        GiAcorn, GiBarbute, GiBarbedStar, GiBookCover,
        GiBubblingFlask, GiCastle, GiCutLemon, GiDiplodocus, GiDrippingSword,
        GiElephant,GiFlame, GiMeshBall
        } from 'react-icons/gi';
import { FaHeart, FaStar, FaMoon, FaSun, FaAppleAlt, FaBeer, FaCoffee, FaCat } from 'react-icons/fa';

const iconsData = [
    { id: 1, name: "heart", icon: FaHeart },
    { id: 2, name: "star", icon: FaStar },
    { id: 3, name: "moon", icon: FaMoon },
    { id: 4, name: "sun", icon: FaSun },
    { id: 5, name: "apple", icon: FaAppleAlt },
    { id: 6, name: "beer", icon: FaBeer },
    { id: 7, name: "coffee", icon: FaCoffee },
    { id: 8, name: "cat", icon: FaCat },
    { id: 9, name: "acorn", icon: GiAcorn },
    { id: 10, name: "barbute", icon: GiBarbute },
    { id: 11, name: "barbedStar", icon: GiBarbedStar },
    { id: 12, name: "bookCover", icon: GiBookCover },
    { id: 13, name: "bubblingFlask", icon: GiBubblingFlask },
    { id: 14, name: "castle", icon: GiCastle },
    { id: 15, name: "cutLemon", icon: GiCutLemon },
    { id: 16, name: "diplodocus", icon: GiDiplodocus },
    { id: 17, name: "drippingSword", icon: GiDrippingSword },
    { id: 18, name: "elephant", icon: GiElephant },
    { id: 19, name: "flame", icon: GiFlame },
    { id: 20, name: "meshBall", icon: GiMeshBall }
  ];

export const getIcons = () => {
    return iconsData
}

export const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const getRandomPhrase = array => {
  const positiveArray = [
    "Correct! The cards match!", "Nailed it!", "Match made in heaven!",
    "Nice memory, genius!" , "Jackpot!", "You got it right!", "Double trouble success!",
    "Psychic much?", "Smooth move, brainiac!", "Luck or skill? Nailed it!",
    "Banger match!", "Perfect pair, well done!", "Boom! Match success!",
    "Nice! Cards in sync!", "You must be cheating! 😄"
  ]
  
  const negativeArray = [
    "Oof, not quite!", "Unlucky guess, try again!", "No match, just vibes.",
    "Close, but nope!", "Sooo close… not.", "Missed it by that much!",
    "Your memory's on vacation.", "Wrong pair, try harder!", "Nope, that ain’t it.",
    "That’s a mismatch!", "Come on, focus!", "Who shuffled these?!", "Not twins, sorry!",
    "Error 404: Match not found!"
  ]

  const arrayOfChoice = array === "pos" ? positiveArray : negativeArray
  const randomPhrase = arrayOfChoice[Math.floor(Math.random() * arrayOfChoice.length)]
  return randomPhrase
}