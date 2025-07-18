import {useNavigate} from "react-router-dom"

export default function UserNotLoggedIn({variant}){
    const navigate = useNavigate()

    const variants = {
        phantom : ``,
        tenzies : `from-orange-100 via-yellow-100 to-orange-100`,
        minds : ``
    }
    const variantsText = {
        phantom : ``,
        tenzies : `text-orange-800`,
        minds : ``
    }

    const styleMainContainer = ` ${variants[variant] || ""}
                                 flex flex-col flex-1 items-center w-full p-4 bg-gradient-to-br`
    const styleTitle = `${variantsText[variant] || ""}`
    const styleSection = ``
    const styleP1 = ``
    const styleP2 = ``
    const btn1 = ``
    const btn2 = ``

    return(
        <section className={styleMainContainer}>
            <h3 className={styleTitle}>You are playing as a guest</h3>
            <section className={styleSection}>
                <p className={styleP1}>to see the leaderbord:</p>
                <p className={styleP2}>
                  <button onClick={() => navigate("/")} className={btn1}>Log in</button>
                   or 
                  <button onClick={() => navigate("/")} className={btn2}>Create new account</button>
                </p>
            </section>
        </section>
    )
}