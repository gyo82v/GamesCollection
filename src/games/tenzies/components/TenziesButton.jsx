export default function TenziesButton({children, gameWon, ...rest}){
    const variant = gameWon ? 
                              `bg-gradient-to-tl from-fuchsia-300 via-violet-100 to-fuchsia-300 text-fuchsia-800` :
                              `bg-gradient-to-br from-orange-300 via-yellow-100 to-orange-300 text-orange-800`
    return(
        <button 
          {...rest}
          className={`
                       hover:cursor-pointer hover:transform hover:scale-105 active:scale-95
                       py-4 px-8 mt-6 mb-4 rounded-lg shadow-lg font-bold text-lg 
                       ${variant || ""}
            `}
          >{children}
        </button>
    )

}