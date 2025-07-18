import { FaInfoCircle } from 'react-icons/fa';
import { FaTrophy } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';


export default function ToggleSectionBtn({variant, icon, ...rest}){
    const variants = {
        phantom : "from-indigo-200 to-purple-200 active:from-indigo-300 active:to-purple-300 border-indigo-200",
        mindPairs: "from-green-200 to-lime-100 active:from-green-300 active:to-lime-300 border-green-200",
        tenzies : "from-orange-200 to-yellow-100 active:from-orange-300 active:to-yellow-300 border-orange-200",
        battleship : "from-indigo-200 to-rose-100 active:from-sky-300 active:to-lime-300 border-lime-200",
        sudoku : "from-lime-200 to-yellow-100 active:from-lime-400 active:to-lime-300 border-lime-200"
    }
    const variantsIcons = {
        phantom : "text-indigo-500",
        mindPairs : "text-green-500",
        tenzies : "text-orange-500",
        battleship : "text-indigo-400",
        sudoku : "text-lime-500"
    }
    const styleIcon = `h-5 w-5 ${variantsIcons[variant]}`
    const style = ` p-2 ml-2 border shadow-md rounded-md bg-gradient-to-br
                    hover:cursor-pointer hover:transform hover:scale-105
                    active:scale-95 active:bg-gradient-to-br
                    ${variants[variant] || ""}`
    const iconEl = icon === "info" ? <FaInfoCircle className={styleIcon} /> :
                   icon === "leaderboards" ? <FaTrophy className={styleIcon} /> : 
                   icon === "options" ? <FaCog className={styleIcon} /> : ""

    return(
        <button
          title={`toggle ${icon}`}
          {...rest}
          className={style}
        >
         {iconEl}
        </button>
    )
}