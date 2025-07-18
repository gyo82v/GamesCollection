import { colorsData } from '../colorsData';

export default function ColorSelector({ selectedColor, onColorSelect, phase, remainingCounts }) {
  const canSelect = phase === 'playing';
  const divStyle = `grid grid-cols-9 gap-2 my-10 w-full max-w-md shadow-all rounded-xl p-3
                    bg-gradient-to-br from-lime-100 via-lime-50 to-lime-100`
  const spanStyle = `absolute bottom-0 right-0 mb-1 mr-1 text-xs font-bold text-lime-800
                     bg-white bg-opacity-75 rounded-full w-5 h-5
                     flex items-center justify-center`

  return (
    <div className={divStyle}>
      {colorsData.map(col => {
        const isSelected = selectedColor === col.number;
        const base = `${col.color} w-8 h-8 sm:w-10 sm:h-10 aspect-square rounded-md shadow-md relative 
                      hover:cursor-pointer hover:transform hover:scale-115 active:scale-95`;
        const highlight = isSelected ? 'ring-4 ring-lime-400' : 'ring-1 ring-gray-300';
        const count = remainingCounts[col.number] || 0;
        return (
          <button
            key={col.number}
            className={`${base} ${highlight}`}
            disabled={!canSelect}
            onClick={() => canSelect && onColorSelect(col.number)}
          >
            <span className={spanStyle}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}