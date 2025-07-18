import ToggleSectionBtn from "../../gamesComponents/ToggleSectionBtn";

export default function Header({info, leaderboard, options}){
    const styleTitle = `font-bold text-2xl ml-2 mr-auto
                        text-transparent bg-clip-text bg-gradient-to-br
                        from-lime-500 via-lime-300 to-lime-500`
    return(
        <header className="flex ">
            <h1 className={styleTitle}>Chroma Sudoku</h1>
            <section className="flex gap-2 items-center">
                <ToggleSectionBtn variant="sudoku" onClick={options} icon="options" />
                <ToggleSectionBtn variant="sudoku" onClick={leaderboard} icon="leaderboards"/>
                <ToggleSectionBtn variant="sudoku" onClick={info} icon="info" />
            </section>
        </header>
    )
}