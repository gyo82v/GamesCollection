import GamesButton from "./GamesButton"

export default function OptionsSection({children, variant, toggle, margin}){
    const variants = {
        tenzies : `from-orange-200 via-yellow-100 to-orange-200 border-orange-100`,
        phantom : `from-indigo-200 via-purple-100 to-indigo-200 border-orange-100`,
        minds : `from-green-200 via-lime-100 to-green-200 border-lime-100`,
        sudoku : `from-lime-200 via-yellow-100 to-lime-200 border-lime-100`
    }
    const titleVariants = {
        tenzies : `text-orange-800`,
        phantom : `text-indigo-700`,
        minds : `text-green-800`,
        sudoku : `text-lime-800`

    }
    const styleContainer = `${margin || "mt-6"} ${variants[variant] || ""} bg-gradient-to-br
                            flex flex-col items-center w-full shadow-lg rounded-lg p-4`
    const styleTitle = `${titleVariants[variant] || ""} text-xl font-bold`
    const styleUl = `flex-1 w-full list-disc items-center list-inside my-4`
    return(
        <section className={styleContainer}>
            <h1 className={styleTitle}>Options menu</h1>
            <ul className={styleUl}>
                {children}
            </ul>
            <GamesButton variant={variant} onClick={toggle}>Close</GamesButton>
        </section>
    )
}