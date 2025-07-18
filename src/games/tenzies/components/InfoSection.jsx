export default function InfoSection({timer, gameWon, time, rolls, user, record}){
    const backgroundColor = gameWon ? "bg-gradient-to-br from-fuchsia-200 via-violet-100 to-fuchsia-200" :
                                      "bg-gradient-to-br from-orange-200 via-orange-100 to-orange-200"
   
    const sectionStyle = `max-w-sm mx-auto w-full border border-orange-200 rounded-lg shadow-lg
                          p-2 h-20 flex flex-col justify-center items-center 
                          ${backgroundColor || ""} `
    const styleP = "border border-fuchsia-200 rounded-md py-2 px-4 shadow-lg italic"
    const styleSpan= "text-pink-600 font-extrabold"
    return(
        <section className={sectionStyle}>
            {
              timer ? 
                        <div className="flex items-center justify-center text-orange-800">
                            <p className="text-lg flex-1">Timer:</p>
                            <p className={`permanent-marker-regular shadow-all p-2 rounded-xl flex-1
                                           bg-gradient-to-br from-orange-100 to-orange-50
                                           w-16 text-center ml-3`}
                            >
                                {time}
                            </p>
                        </div>
                        : 
              gameWon ?
                        <div className="flex items-center">
                            {record ?
                               <span className='mr-4 permanent-marker-regular text-lg text-fuchsia-400 '>New record !!!</span> :
                               <span className='mr-4 text-purple-800 font-semibold text-lg '>Game Over</span>
                            }
                            <div className="flex items-center">
                                <p className={styleP}>Secs: <span className={styleSpan}>{time}</span></p>
                                <p className={styleP}>Rolls: <span className={styleSpan}>{rolls}</span></p>
                            </div>
                        </div>
                         :
                        <p className="text-center text-lg italic text-orange-800 ">
                            Hey <span className="permanent-marker-regular">
                                  {user ? user.name : "friend"}
                                </span>
                            , ready to play?
                        </p>
             }
        </section>
    )
}