import { ImSmile } from "react-icons/im";

export default function Die({value, isHeld, disabled, ...rest}){
    const variant = isHeld ? 
                             "bg-gradient-to-tl from-fuchsia-300 via-violet-100 to-fuchsia-300 text-fuchsia-800" :
                             "bg-gradient-to-br from-orange-300 via-lime-200 to-orange-300 text-orange-800"
    return(
        <button 
          {...rest}
          aria-pressed={isHeld}
          aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"}`}
          disabled={disabled}
          className={`
                      py-4 px-6 rounded-md font-bold text-2xl
                      flex flex-col items-center justify-center
                      ${variant}
                      shadow-lg
                      hover:cursor-pointer hover:transform hover:scale-105
                    `}
          >{disabled ? <ImSmile className="w-8 h-8" /> : value}
        </button>
    )
}