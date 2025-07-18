import GamesButton from "./GamesButton"

export default function InfoSection({title, toggle, variant, btnMargin, children , ulMargin, titleMargin, secMargin, spaceY}){
    const secVariants = {
        phantom : `from-indigo-200 via-purple-100 to-indigo-200 border-orange-100`,
        minds : `from-green-200 via-lime-100 to-green-200 border-lime-100`,
        tenzies : `from-orange-200 via-yellow-100 to-orange-200 border-orange-100`,
        battleship : `from-indigo-200 via-rose-100 to-indigo-200 border-indigo-100`,
        sudoku : "from-lime-200 via-yellow-100 to-lime-200 border-lime-100"
    }
    const titleVariants = {
        phantom : "text-purple-700",
        minds : `text-lime-700`,
        tenzies : `text-orange-700`,
        battleship : `text-indigo-700`,
        sudoku : "text-lime-700"
    }
    const ulVariants = {
        phantom : "text-indigo-800",
        minds : `text-green-800`,
        tenzies : `text-orange-800`,
        battleship : `text-indigo-800`,
        sudoku : "text-lime-800"
    }
    const sectionStyle = `flex flex-col items-center p-4 border shadow-lg rounded-lg
                          bg-gradient-to-br
                          ${secMargin || "mt-8"}
                          ${secVariants[variant] || ""}`
    const titleStyle= `text-2xl font-bold mb-8 ${titleVariants[variant] || ""} ${titleMargin || "mb-8"}`
    const ulStyle = `list-disc ml-6 mb-8 ${spaceY || "space-y-4"} text-lg ${ulVariants[variant] || ""} ${ulMargin || "mb-8"}`
    
    return(
        <section className={sectionStyle}>
            <h2 className={titleStyle}>{title}</h2>
            <ul className={ulStyle}>
                {children}
            </ul>
            <GamesButton margin={btnMargin} onClick={toggle} variant={variant}>Close</GamesButton>
        </section>
    )
}