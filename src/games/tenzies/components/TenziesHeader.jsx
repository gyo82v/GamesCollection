import ToggleSectionBtn from "../../gamesComponents/ToggleSectionBtn"

export default function TenziesHeader({toggleInfo, toggleLeaderboards}){
    const style = `text-3xl font-bold mb-4 mt-2 mr-auto
                   bg-clip-text text-transparent bg-gradient-to-br 
                   from-orange-600 via-orange-400 to-orange-600`
    const headerStyle = `flex items-center w-full `
    return(
        <header className={headerStyle}>
            <h1 className={style}>Tenzies</h1>
            <ToggleSectionBtn onClick={toggleLeaderboards} variant="tenzies" icon="leaderboards"/>
            <ToggleSectionBtn onClick={toggleInfo} variant="tenzies" icon="info" />
        </header>
    )

}