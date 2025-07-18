export default function StatusSection({gameOver, gameStarted, gameStats, record, name}){

    const style = `p-6 border  shadow-lg bg-gradient-to-br rounded-lg 
                   w-full h-18 my-4 font-bold text-lg
                   flex flex-col justify-center items-center
                   from-green-300 via-lime-200 to-green-300 border-lime-400 text-green-800`
    const sectionStyle = `flex justify-center items-center gap-6`
    const pStyle = `font-medium`
    const valueStyle =  `text-teal-400 permanent-marker-regular 
                         p-1 shadow-all rounded-xl w-14 text-center`
    const spanStyle =  `text-teal-400 permanent-marker-regular `

    const statusRender = () => {
        if(!gameStarted){ 
            return (
                <h1 className="text-lg font-medium">Hey 
                  <span className='permanent-marker-regular mr-2'> {name},</span>
                  ready to play ?
                </h1>
            ) 
        }
        if(!gameOver){
            return ( 
                <section className={sectionStyle}>
                    <p className={pStyle}>Timer: </p><p className={valueStyle}>{gameStats.time}</p> 
                    <p className={pStyle}>Flips: </p><p className={valueStyle}>{gameStats.count}</p>
                </section> 
            )
        }else{
            return(
               <>
                 {record ?
                  <span className=' permanent-marker-regular text-lg text-fuchsia-400 '>New record !!!</span> :
                  <span className=' permanent-marker-regular text-lg '>Game Over !!!</span>
                 }
                 <section className={sectionStyle}>
                    <p className={pStyle}>Time: <span className={spanStyle}>{gameStats.time}</span></p>
                    <p className={pStyle}>Flips: <span className={spanStyle}>{gameStats.count}</span></p>
                 </section>
               </>   
            )
        }
    }
    return(
        <section className={style}>
            {statusRender()}
        </section>
    )
}