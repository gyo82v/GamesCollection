// components/Tile.jsx
import { motion, AnimatePresence } from 'framer-motion';

// Motion variants for idle, hit, and miss
const tileVariants = {
  idle: { scale: 1 },
  hit: {
    scale: [1, 1.3, 1],
    transition: { duration: 0.4 }
  },
  miss: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.3 }
  }
};

export default function Tile({ status, variant, onClick, disabled, gamePhase }) {
  // Determine if ship should be visible (only during deployment on user board)
  const isShipVisible = status === 'ship' && gamePhase === 'deploy' && variant === 'user';

  // Choose background and content based on status
  let bgClass = '';
  let content = '';
  if (isShipVisible) {
    bgClass = 'bg-gradient-to-br from-gray-500 to-gray-300 rounded-lg';
  } else if (status === 'hit') {
    bgClass = 'bg-gradient-to-br from-rose-600 to-rose-200 rounded-lg';
    content = '⚓';
  } else if (status === 'miss') {
    bgClass = 'bg-gradient-to-br from-indigo-400 to-indigo-200 rounded-lg';
    content = '💧';
  } else {
    bgClass = '';
  }

  const baseClass = `w-full h-full border border-indigo-700 ${bgClass}`;

  // Determine which variant to use
  const anim = status === 'hit' ? 'hit' : status === 'miss' ? 'miss' : 'idle';

  return (
    <motion.button
        onClick={onClick}
        disabled={disabled || status === 'hit' || status === 'miss'}
        className={baseClass}
        variants={tileVariants}
        initial={anim}      
        animate={anim}                
      >
        <span className="text-xl">{content}</span>
      </motion.button>
  );
}








  /*


  import { motion, AnimatePresence } from "framer-motion";

export default function Tile({ status, variant, onClick, disabled, gamePhase }) {
    // Show ships only during deployment phase on the user board
    const isShipVisible = status === 'ship' && gamePhase === "deploy";
  
    // Default background for unrevealed water
    let bgClass = '';
    let content = '';
  
    if (isShipVisible) {
      // Gray squares for user ships
      bgClass = 'bg-gradient-to-br from-gray-500 to-gray-300 rounded-lg';
    } else if (status === 'hit') {
      // Red hit marker
      bgClass = 'bg-gradient-to-br from-rose-600 to-rose-200 rounded-lg';
      content = '⚓';
    } else if (status === 'miss') {
      // Light blue miss marker
      bgClass = 'bg-gradient-to-br from-indigo-400 to-indigo-200 rounded-lg ';
      content = '💧';
    } 
  
    const baseClass = `w-full h-full border border-indigo-700 ${bgClass}`;
    return (
      <button
        onClick={onClick}
        disabled={disabled || status === 'hit' || status === 'miss'}
        className={baseClass}
      >
        <span className="text-xl">{content}</span>
      </button>
    );
  }
  
  
  
  
  
  
  
  */