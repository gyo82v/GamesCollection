import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function GameRecordsEl({children, title, open, toggle, variant = "default"}){
    const variantsContainer = {
        default : `from-orange-200 via-yellow-100 to-orange-200`,
        phantom : `from-purple-300 via-fuchsia-100 to-purple-300`,
        minds : `from-green-200 via-lime-100 to-green-200`
    }
    const variantsLeaderboards = {
        default : `from-orange-100 via-yellow-100 to-orange-100 text-orange-800`,
        phantom : `from-purple-100 via-fuchsia-100 to-purple-100 text-purple-800`,
        minds : `from-green-100 via-lime-100 to-green-100 text-green-800`
    }
    const variantsHeader = {
        default : `text-orange-800`,
        phantom : `text-purple-800`,
        minds : `text-green-800`
    }
    const variantsButton = {
        default : `from-orange-300 via-yellow-200 to-orange-300`,
        phantom : `from-purple-300 via-fuchsia-200 to-purple-300`,
        minds : `from-green-300 via-lime-200 to-green-300`
    }
    const styleSec1 = `${variantsContainer[variant] || ""} bg-gradient-to-br flex flex-col w-full p-4 rounded-lg shadow-lg mb-3`
    const styleSec2 = `${variantsHeader[variant] || ""} flex items-center justify-between w-full`
    const styleSec3 = `${variantsLeaderboards[variant] || ""} bg-gradient-to-br rounded-lg shadow-lg p-4 mt-2 flex flex-col items-center gap-2 w-full`
    const styleTitle = `text-lg font-bold`
    const styleButton = `${variantsButton[variant] || ""} bg-gradient-to-br p-2 rounded-xl shadow-lg`
    const styleIcon = ``
    return(
        <section className={styleSec1}>
            <section className={styleSec2}>
              <h1 className={styleTitle}>{title}</h1>
              <button className={styleButton} onClick={toggle}>
                {open ? <FaChevronUp className={styleIcon} /> : <FaChevronDown className={styleIcon} />}
              </button>
            </section>
            {open && 
               <section className={styleSec3}>
                   {children}
               </section>     
            }
        </section>
    )
}