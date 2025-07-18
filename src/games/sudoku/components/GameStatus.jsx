import { FaCheck, FaTimes } from 'react-icons/fa';


export default function GameStatus({ phase, time, mistakes, maxMistakes, name, record }) {
  const divStyle = `py-4 px-3 rounded-lg shadow-lg mx-auto mb-6 mt-8
                    flex items-center justify-center h-16
                    bg-gradient-to-br from-lime-200 via-yellow-100 to-lime-200 
                    border border-lime-300 text-lime-800 font-semibold w-full`

  const livesSection = Array.from({length : maxMistakes}, (_, i) => {
        const lifeLost = i < mistakes

        return(
            <span
             key={i}
             className={`
                          p-2 rounded-xl shadow-md border mr-1
                        border-lime-300 bg-gradient-to-br
                          hover:curor-pointer hover:transform hover:scale-105
                          ${lifeLost ? "from-yellow-300 via-amber-200 to-yellow-300 text-yellow-800" :
                                        "from-lime-300 via-yellow-100 to-lime-300 text-lime-500"
                           }
                
                `}
             > {lifeLost ? <FaTimes /> : <FaCheck />}
            </span>
        )
    })

  
  
  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  if (phase === 'idle') {
    return (
      <div className={divStyle}>
        <h1 className="text-lg">Hey <span className='permanent-marker-regular mr-2'>{name ? name : "friend"}</span>ready to play ?</h1>
      </div>
    );
  }

  if (phase === 'playing') {
    return (
      <div className={divStyle}>
        <span className="text-lg flex-1">Time: {formatTime(time)}</span>
        <span className="text-lg flex-1 flex items-center"><span className='mr-2'>Lives:</span> {livesSection}</span>
      </div>
    );
  }

  if (phase === 'won') {
    return (
      <div className={divStyle}>
        {record ?
          <span className='mr-auto permanent-marker-regular text-lg text-fuchsia-400 '>New record !!!</span> :
          <span className='mr-auto permanent-marker-regular text-lg '>Game completed :</span>
        }
        <span className='flex items-center py-2 px-3 rounded-xl shadow-all mr-3
                         bg-gradient-to-br from-lime-100 via-yellow-100 to-lime-100'
        >
          <span className="mr-2"><span className='mr-1'>Time:</span><span className='permanent-marker-regular'>{formatTime(time)}</span></span>
          <span className=""><span className='mr-1'>Mistakes:</span><span className='permanent-marker-regular'>{mistakes}</span></span>
        </span>
      </div>
    );
  }

  // gameover
  return (
    <div className={divStyle}>
      <span className="text-lg font-bold">Game Over!</span>
    </div>
  );
}

