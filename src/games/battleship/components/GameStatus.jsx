export default function GameStatus({user, stats, gamePhase, message, record, gameWon}){

    const styleMain = `p-3 shadow-lg bg-gradient-to-br text-center rounded-lg h-28 text-indigo-500
                      from-indigo-200 to-rose-100 my-6 w-full permanent-marker-regular
                       flex flex-col gap-2 justify-center items-center`
    const styleTitleGameOver = `font-semibold text-xl underline mb-3`
    const styleTitle = `font-semibold text-xl mb-1`
    const styleTimer = `font-bold text-indigo-700 `
    const styleSpanP = `font-semibold text-indigo-500 `
    const styleUsernameSpan = `bg-clip-text text-transparent bg-gradient-to-br
                               from-indigo-500 via-rose-400 to-indigo-500`
    const styleResults = `border border-indigo-500 shadow-lg rounded-xl py-1 px-2 mx-1
                           bg-gradient-to-br from-indigo-300 to-rose-200`
    
    return(
        <section className={styleMain}>
            {gamePhase === "gameOver" && gameWon ?
             <> 
               {record ?
                 <span className='mb-3 permanent-marker-regular text-xl underline text-fuchsia-400 font-semibold '>
                    New record !!!
                 </span> :
                 <span className={styleTitleGameOver}>Game Over!!!</span>
               } 
               <p>
                <span className={styleResults}>
                  <span>Time: </span><span>{stats.time}</span>
                </span>
                <span className={styleResults}>
                  <span >Score: </span><span>{stats.count}</span>
                </span>
               </p>
             </> :
             gamePhase === "gameOver" ? 
             <>
               <h1 className={styleTitleGameOver}>Game over !!!</h1> 
               <p>You lost</p>                                     
             </> :
             <>
               <h1 className={styleTitle}>
                  {gamePhase === "idle" ? 
                    (<>
                       Hey{" "}
                       {
                        user ? <span className={styleUsernameSpan}>{user.name}</span> :
                        "friend"
                       }
                    </>) :
                   message ? message : "Game Started"}
               </h1>
               <p>{gamePhase === "idle" ? "Click start to play the game" : 
                   gamePhase === "playing" ? <span className={styleTimer}><span className={styleSpanP}>Time: </span> {stats.time}</span> : ""}</p>
             </>
            }
        </section>
    )
}

// from-indigo-300 via-rose-200 to-indigo-300