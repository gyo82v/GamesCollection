import OptionsSection from "../../gamesComponents/OptionsSection"
import Flag from "react-world-flags"

export default function OptionsSectionPhantom({toggle,toggleLang, lang}){
    const styleLi = `w-full flex items-center gap-2`
    const styleBtn = ` p-2 border border-indigo-200 shadow-md rounded-md
                       bg-gradient-to-br from-indigo-200 to-purple-200
                       hover:cursor-pointer hover:transform hover:scale-105
                       active:scale-95 active:bg-gradient-to-br active:from-indigo-300 active:to-purple-300`
    const styleIcon = `h-5 w-6`
    const flagType = lang === "eng" ? <Flag code="GB" className={styleIcon} /> :
                     lang === "ita" ? <Flag code="IT" className={styleIcon} /> : ""
    const styleSpan = `text-lg text-semibold text-indigo-800`
    return(
        <OptionsSection variant="phantom" toggle={toggle}>
            <li className={styleLi}>
                <span className={styleSpan}>Toggle language of the word to guess</span>
                <button onClick={toggleLang} className={styleBtn}>
                    {flagType}
                </button>
            </li>
        </OptionsSection>
    )
}