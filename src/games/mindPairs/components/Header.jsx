import ToggleSectionBtn from "../../gamesComponents/ToggleSectionBtn"


export default function Header({toggleInfo, toggleLeaderboard}){
    const titleStyle = `bg-clip-text text-transparent mr-auto
                        bg-gradient-to-br from-green-500 via-lime-400 to-emerald-500
                        text-2xl font-bold `
    return(
        <header className="flex">
            <h1 className={titleStyle}>Mind Pairs </h1>
            <ToggleSectionBtn variant="mindPairs" onClick={toggleLeaderboard} icon="leaderboards" />
            <ToggleSectionBtn variant="mindPairs" onClick={toggleInfo} icon="info" />
        </header>
    )
}
