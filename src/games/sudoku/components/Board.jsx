import { colorsData } from '../colorsData';

export default function Board({ board, puzzle, solution, onTileClick, phase, wrongTiles }) {
  const canPlay = phase === 'playing';

  return (
    <div className="relative overflow-hidden w-full max-w-md bg-lime-200 rounded-lg shadow-xl p-1">
      <div className="grid grid-cols-9">
        {board.map((row, r) =>
          row.map((num, c) => {
            const isFixed = puzzle[r][c] !== 0;
            const isWrong = wrongTiles.some(tile => tile.r === r && tile.c === c);

            // Outer wrapper: only handles borders and fixed sizing
            const outerClasses = [
              'border border-gray-500',
              r % 3 === 0 && 'border-t-4',
              r % 3 === 2 && 'border-b-4',
              c % 3 === 0 && 'border-l-4',
              c % 3 === 2 && 'border-r-4',
              'aspect-square',
            ]
              .filter(Boolean)
              .join(' ');

            // Inner wrapper: handles bg color, hover/active, clicks
            const innerClasses = [
              num
                ? colorsData.find(col => col.number === num).color
                : 'bg-lime-100',
              'w-full h-full',
              'flex items-center justify-center',
              isFixed || !canPlay ? 'pointer-events-none' : 'hover:cursor-pointer',
              'transition-transform duration-200 ease-in-out',
              'hover:scale-105 active:scale-95',
              'relative',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div key={`${r}-${c}`} className={outerClasses}>
                <div
                  className={innerClasses}
                  onClick={() => canPlay && !isFixed && onTileClick(r, c)}
                >
                  {isWrong && (
                    <span className="absolute inset-0 flex items-center justify-center text-lime-600 text-2xl font-bold">
                      ✖
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}





/*



export default function Board({ board, puzzle, solution, onTileClick, phase, wrongTiles }) {
  const canPlay = phase === 'playing';

  return (
    <div className="relative overflow-hidden w-full max-w-md bg-lime-200 rounded-lg shadow-xl p-1">
      <div className="grid grid-cols-9">
        {board.map((row, r) =>
          row.map((num, c) => {
            const isFixed = puzzle[r][c] !== 0;
            const isWrong = wrongTiles.some(tile => tile.r === r && tile.c === c);
            const colorClass = num
              ? colorsData.find(col => col.number === num).color
              : 'bg-lime-100';

            const baseClasses = [
              colorClass,
              'border border-gray-500',
              r % 3 === 0 && 'border-t-4',
              r % 3 === 2 && 'border-b-4',
              c % 3 === 0 && 'border-l-4',
              c % 3 === 2 && 'border-r-4',
              isFixed || !canPlay ? 'pointer-events-none' : 'hover:cursor-pointer',
              'aspect-square flex items-center justify-center relative',
              'transition-all duration-200 ease-in-out',
              'hover:scale-105',
              'active:scale-95',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={`${r}-${c}`}
                className={baseClasses}
                onClick={() => canPlay && !isFixed && onTileClick(r, c)}
              >
                {isWrong && (
                  <div className="absolute inset-0 flex items-center justify-center bg-opacity-0">
                    <span className="text-lime-600 text-2xl font-bold">✖</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}











*/



