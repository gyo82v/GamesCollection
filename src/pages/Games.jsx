import LinkGames from "../components/LinkGames"

export default function Games(){
    return(
        <div className="p-2 flex flex-col items-center w-full h-full bg-orange-50">
            <h1 className="text-xl font-bold text-orange-400 mt-4">Pick a game:</h1>
            <nav className="flex flex-col gap-3 items-center mt-4 w-full text-lg">
                <LinkGames variant="warning"  link="/games/tenzies">Tenzies</LinkGames>
                <LinkGames variant="info" link="/games/phantom-phrase">Phantom Phrase</LinkGames>
                <LinkGames variant="magenta" link="/games/mind-pairs">Mind Pairs</LinkGames>
                <LinkGames variant="teal" link="/games/battleship">Battleship</LinkGames>
                <LinkGames variant="secondary" link="/games/sudoku">Chroma Sudoku</LinkGames>
            </nav>
        </div>
    )
}