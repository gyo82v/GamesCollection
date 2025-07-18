import { FaArrowsAltH, FaArrowsAltV } from 'react-icons/fa';

export default function DeployementPanel({ships, selectedShip, orientation, onSelectShip, onToggleOrientation}){
    return(
        <section className={`w-full p-2 my-6 rounded-lg shadow-md  h-28
                             bg-gradient-to-br from-indigo-200 to-rose-100
                             flex items-center justify-center`}>
            <ul className="flex flex-5 mr-auto flex-wrap items-center justify-center gap-1 my-4">
                {ships.map(ship => (
                    <li key={ship.id}>
                        <button 
                          onClick={() => onSelectShip(ship.id)}
                          className={`
                                      px-2 py-1 rounded-xl border shadow-lg bg-gradient-to-br border-indigo-500
                                      text-indigo-500 font-semibold text-lg
                                      ${selectedShip === ship.id ? 
                                        `from-indigo-300 to-rose-200` :
                                        `from-indigo-100 to-rose-100` }
                                      `
                                    }  
                        >
                         {ship.name}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex flex-1 justify-center mb-4 h-full my-auto">
                <button 
                  onClick={onToggleOrientation} 
                  className={`px-3 py-1 rounded-xl hover:bg-indigo-400 shadow-lg text-lg
                              font-semibold text-indigo-600
                               bg-gradient-to-br from-rose-200 via-indigo-200 to-rose-200`}
                >{orientation === "horizontal" ? <FaArrowsAltH /> : <FaArrowsAltV />}
                </button>
            </div>
        </section>
    )
}