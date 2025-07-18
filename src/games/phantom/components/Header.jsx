import ToggleSectionBtn from "../../gamesComponents/ToggleSectionBtn";

export default function Header({info, leaderboard, options,}){
    const styleTitle = `font-bold text-2xl ml-2 mr-auto
                        text-transparent bg-clip-text bg-gradient-to-br
                        from-purple-500 via-indigo-300 to-purple-500`
    return(
        <header className="flex ">
            <h1 className={styleTitle}>Phantom Phrase</h1>
            <section className="flex gap-2 items-center">
                <ToggleSectionBtn variant="phantom" onClick={options} icon="options" />
                <ToggleSectionBtn variant="phantom" onClick={leaderboard} icon="leaderboards"/>
                <ToggleSectionBtn variant="phantom" onClick={info} icon="info" />
            </section>
        </header>
    )
}