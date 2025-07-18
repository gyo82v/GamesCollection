import LiElement from "./LiElement";

export default function Leaderboard({array, variant, scoreType, margin}){

    const sortedArray = [...array].sort((a, b) => {
        if(a.time === b.time){
            return a.score - b.score
        }
        return a.time - b.time
    })

    const variantsSpan = {
        tenzies : `from-orange-100 via-yellow-50 to-orange-100`,
        phantom : `from-purple-200 via-fuchsia-50 to-purple-200`,
        minds : `from-green-100 via-lime-50 to-green-100`,
        battleship : `from-indigo-200 via-rose-50 to-indigo-200`,
        sudoku : "from-lime-200 via-yellow-50 to-lime-200"
    }
    
    const variantsContainer = {
        tenzies : `from-orange-100 via-yellow-100 to-orange-100 text-orange-800`,
        phantom : `from-purple-100 via-fuchsia-100 to-purple-100 text-purple-800`,
        minds :    `from-green-100 via-lime-100 to-green-100 text-green-800`,
        battleship : `from-indigo-200 via-rose-100 to-indigo-200 text-indigo-800`,
        sudoku : "from-lime-200 via-yellow-100 to-lime-200 text-lime-800"
    }

    const styleContainer = ` ${variantsContainer[variant] || ""} ${margin || "mt-2"}
                            bg-gradient-to-br rounded-lg shadow-lg p-4 flex flex-col items-center gap-2 w-full`
    const styleTitle = `text-center font-semibold text-md mb-2 text-xl kablammo-special`
    const styleContainerLst =`roman-list list-inside w-full flex flex-col`
    const styleUsername = `permanent-marker-regular text-lg font-bold mr-4 flex-1`
    const styleContainerSpan = ` ${variantsSpan[variant] || ""}
                                 flex-1 shadow-lg p-1 rounded-lg ml-1 text-center bg-gradient-to-br`


    return(
        <section className={styleContainer}>
            <h3 className={styleTitle}>Top scores</h3>
            <ol className={styleContainerLst}>
                { sortedArray.map((item, i) => {
                    return(
                        <LiElement key={i}>
                            <span className={styleUsername}>{item.username}</span>
                            <span className={styleContainerSpan}>
                                <span className="font-semibold"> {item.time}</span>
                                <span className="italic ml-1">secs</span>
                            </span>
                             <span className={styleContainerSpan}>
                                <span className="font-semibold">{item.score}</span>
                                <span className="italic ml-1">{scoreType || ""}</span>
                            </span>
                        </LiElement>
                    )
                  })
                }
            </ol>
        </section>
    )
}