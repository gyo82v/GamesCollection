import Tile from "./Tile"

export default function Board({array, variant, onCellClick, disabled, gamePhase, isFlipped}){

    const scaleClass = !isFlipped ? 'scale-95' : 'scale-100'
  
    return(
        <section className={` 
                              grid grid-cols-10 grid-rows-10 gap-px w-full aspect-square border-2 border-indigo-700 my-4
                              bg-gradient-to-br from-indigo-300 via-indigo-400 to-indigo-300 rounded-lg shadow-xl
                              transform transition-transform duration-500 ${scaleClass} `}>
            {array.map((cell, idx) => (
                <Tile
                  key={cell.id}
                  status={cell.status}
                  variant={variant}
                  onClick={() => onCellClick(idx)}
                  disabled={disabled}
                  gamePhase={gamePhase}
                />
            ))}
        </section>
    )
} 