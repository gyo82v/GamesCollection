import LiElement from "./LiElement"

export default function OlElement({array, type, variant = "default" }){

    const sortedArray = [...array].sort((a, b) => {
        if(a.time === b.time){
            return a.score - b.score
        }
        return a.time - b.time
    })


    const variants = {
        default : `from-orange-100 via-yellow-50 to-orange-100`,
        phantom : `from-purple-200 via-fuchsia-50 to-purple-200`,
        minds : `from-green-100 via-lime-50 to-green-100`

    }
    const styleSec = `w-full`
    const styleOl = `roman-list list-inside w-full flex flex-col`
    const styleTitle = `text-center font-semibold text-md mb-2 text-xl kablammo-special`
    const usernameStyle = `permanent-marker-regular text-lg font-bold mr-4 flex-1`
    const timeStyle = `mr-1 font-semibold`
    const secsStyle = `italic`
    const scoreStyle = `font-semibold`
    const typeStyle = `ml-1 italic`
    const spanContainer = `${variants[variant] || ""} flex-1 shadow-lg p-1 rounded-lg ml-1 text-center bg-gradient-to-br`
    return(
        <section className={styleSec}>
            <h3 className={styleTitle}>top scores</h3>
            <ol className={styleOl}>
                {
                  sortedArray.map((item, i) => {
                    return(
                        <LiElement key={i}>
                            <span className={usernameStyle}>{item.username}</span>
                            <span className={spanContainer}>
                              <span className={timeStyle}> {item.time}</span>
                              <span className={secsStyle}>secs</span>
                            </span>
                            <span className={spanContainer}>
                              <span className={scoreStyle}>{item.score}</span>
                              <span className={typeStyle}>{type || ""}</span>
                            </span>
                        </LiElement>
                    )
                  })
                }
            </ol>
        </section>
    )
}