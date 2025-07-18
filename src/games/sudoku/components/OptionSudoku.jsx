import OptionsSection from "../../gamesComponents/OptionsSection"

export default function OptionsSudoku({toggle, setDifficulty, difficulty}){
    const styleLi = `w-full flex items-center gap-2 my-6`
    const styleBtnEasy = ` py-2 px-3 mr-1 border border-lime-200 shadow-md rounded-xl font-semibold
                       bg-gradient-to-br from-lime-200 to-yellow-200 text-lime-800
                       hover:cursor-pointer hover:transform hover:scale-105
                       active:scale-95 active:bg-gradient-to-br active:from-lime-300 active:to-yellow-300
                       ${difficulty === "easy" && "border-lime-600 border-3"}`
    const styleBtnHard = ` py-2 px-3 mr-1 border border-lime-200 shadow-md rounded-xl font-semibold
                       bg-gradient-to-br from-lime-200 to-yellow-200 text-lime-800
                       hover:cursor-pointer hover:transform hover:scale-105
                       active:scale-95 active:bg-gradient-to-br active:from-lime-300 active:to-yellow-300
                       ${difficulty === "hard" && "border-lime-600 border-3"}`
    const styleSpan = `text-lg text-semibold text-lime-800 mr-auto`

    return(
        <OptionsSection variant="sudoku" toggle={toggle}>
            <li className={styleLi}>
                <span className={styleSpan}>Difficulty level: </span>
                <button className={styleBtnEasy} onClick={() => setDifficulty("easy")}>Easy</button>
                <button className={styleBtnHard} onClick={() => setDifficulty("hard")}>Hard</button>
            </li>
        </OptionsSection>
    )
}