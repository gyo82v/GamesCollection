import ToggleSectionBtn from "../../gamesComponents/ToggleSectionBtn";

export default function Header({toggleInfo, toggleLeaderboard}){
    const styleTitle = ` bg-clip-text text-transparent bg-gradient-to-br
                         from-indigo-600 via-indigo-500 to-indigo-600
                         mr-auto text-2xl text-sky-800 font-bold`

    return(
        <header className="flex w-full">
            <h1 className={styleTitle}>Battleship</h1>
            <ToggleSectionBtn onClick={toggleLeaderboard} variant="battleship" icon="leaderboards" />
            <ToggleSectionBtn onClick={toggleInfo} variant="battleship" icon="info" />
        </header>
    )
}