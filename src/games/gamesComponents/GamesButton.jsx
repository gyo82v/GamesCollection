export default function GamesButton({children, variant, width, margin, padding, ...rest}){
    const variants = {
        phantom : `text-purple-700 from-indigo-300 via-purple-100 to-indigo-300 border-orange-100 `,
        minds : `text-green-700 from-green-300 via-lime-200 to-green-300 border-lime-100 `,
        tenzies : `text-orange-700 from-orange-300 via-yellow-100 to-orange-300 border-orange-100`,
        battleship : `text-indigo-700 from-indigo-300 via-rose-100 to-indigo-300 border-indigo-100`,
        sudoku : "text-lime-700 from-lime-300 via-yellow-100 to-lime-300 border-indigo-100"
    }

    const style = ` shadow-lg rounded-md font-bold mb-2
                    bg-gradient-to-br border
                    hover:cursor-pointer hover:transform hover:scale-105 
                    active:scale-95 active:opacity-80
                    ${width || "w-11/12"} ${variants[variant] || ""}
                    ${margin || "mx-auto"} ${padding || "py-2 px-4"}`

    return(
        <button 
          {...rest}
          className={style}
          >{children}
        </button>
    )
}