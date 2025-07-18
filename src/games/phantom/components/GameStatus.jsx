export default function GameStatus({gameWon, gameLost, gameOver, gameStarted, time, record, name}){
    const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
    };

    const colors = gameWon ?  "from-lime-200 via-purple-200 to-lime-200 text-lime-700":
                   gameLost ? "from-rose-200 via-purple-200 to-rose-200 text-rose-800" :
                              "from-indigo-200 via-purple-200 to-indigo-200 text-purple-700"
    
    let statusMessage = "";
    if (!gameStarted) {
         statusMessage = `Hey ${name ? name : "friend"}, ready to play?`;
    } else if (!gameOver) {
        statusMessage = `time: ${formatTime(time)}`
    } else if (gameWon) {
        statusMessage = record ? "New record!!!" : "Game won";
    } else if (gameLost) {
        statusMessage = "Game over!";
    }

    return(
        <section className={`
                              mt-8 h-20 text-center w-full rounded-md shadow-lg p-2 text-xl font-bold
                              hover:cursor-ponter hover:transform hover:scale-105
                              bg-gradient-to-br border border-orange-100 
                              flex flex-col items-center justify-center
                              ${colors}
            `}
        >
            <p>{statusMessage}</p>
        </section>
    )
}