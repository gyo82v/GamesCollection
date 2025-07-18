export default function UserScore({variant, user, game, scoreType, margin}){
    const variantsContainer = {
        tenzies : `from-orange-100 via-yellow-100 to-orange-100 text-orange-800`,
        phantom : `from-purple-100 via-fuchsia-100 to-purple-100 text-purple-800`,
        minds :    `from-green-100 via-lime-100 to-green-100 text-green-800`,
        battleship : `from-indigo-200 via-rose-100 to-indigo-200 text-indigo-800`,
        sudoku : "from-lime-200 via-yellow-100 to-lime-200 text-lime-800"
    }

    const variantsSpan = {
        tenzies : `from-orange-100 via-yellow-50 to-orange-100`,
        phantom : `from-purple-200 via-fuchsia-50 to-purple-200`,
        minds : `from-green-100 via-lime-50 to-green-100`,
        battleship : `from-indigo-200 via-rose-50 to-indigo-200`,
        sudoku : `from-lime-200 via-yellow-50 to-lime-200`
    }
    const styleContainer = ` ${variantsContainer[variant] || ""}
                             ${margin || "my-2 "}
                             bg-gradient-to-br rounded-lg shadow-lg p-4 flex flex-col items-center gap-2 w-full`
    const styleTitle = `text-center font-semibold text-md mb-2 text-xl kablammo-special`
    const styleP = `w-full flex items-center`
    const styleSpan1 = `flex-1 permanent-marker-regular text-lg text-center font-bold`
    const styleSpan2 = `flex-1 font-semibold shadow-lg p-1 rounded-lg ml-1 text-center bg-gradient-to-br ${variantsSpan[variant] || ""}`
    const styleSpan3 = `flex-1 permanent-marker-regular text-lg font-bold text-center`
    const styleSpan4 = `flex-1 shadow-lg p-1 font-semibold rounded-lg ml-1 text-center bg-gradient-to-br ${variantsSpan[variant] || ""}`

    
    return(
        <section className={styleContainer}>
            <h3 className={styleTitle}><span className="underline">{user.name}</span> best scores</h3>
            <p className={styleP}>
                <span className={styleSpan1}>Time: </span>
                <span className={styleSpan2}>{game.time} <span className="italic font-normal"> secs</span></span>
                <span className={styleSpan3}>{scoreType}: </span>
                <span className={styleSpan4}>{game.score}</span>
            </p>
        </section>
    )
}