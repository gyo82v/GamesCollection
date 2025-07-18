import {useNavigate} from "react-router-dom"
import {useUser} from "../context/UserContext"

import ButtonStandard from "../components/ButtonStandard"

export default function Home(){
    const navigate = useNavigate()
    const {user, loading} = useUser()

    if(loading){
        return <h3>loading...</h3>
    }

    const styleContainerMain = ` bg-gradient-to-br from-rose-100 via-orange-200 to-rose-100
                                 h-full w-full flex-1 flex flex-col  items-center bg-cover bg-center p-4 gap-16 `
    const stylesection1 = `mt-8 shadow-all rounded-lg p-4 w-full`
    const styleSectionLink = `shadow-all rounded-lg p-4 w-full`
    const styleTitle = `font-bold text-2xl text-center mb-4 text-fuchsia-800 permanent-marker-regular`
    const styledescription = `text-fuchsia-800 lacquer-regular text-center `
    const styleTitleLink = `permanent-marker-regular text-fuchsia-800 text-lg`
    const styleName = "underline"

    const name = user ? <span className={styleName}>{user.name}</span> :
                        <span className={styleName}>friend</span>
    
    return(
        <section  className={styleContainerMain} >
            <section className={stylesection1}>
                <h2 className={styleTitle}>Hey {name}, welcome to Arcadium!</h2>
                <p className={styledescription}>
                   Ready for quick, fun games that fit into your coffee break? Pick from puzzles,
                   brain teasers, or speed challenges—no download, no fuss. Let’s get gaming!
                </p>
            </section>
            <section className={styleSectionLink}>
                <h3 className={styleTitleLink}>try our newest game:</h3>
                <ButtonStandard 
                  variant="homePage" 
                  onClick={() => navigate("/games/mind-pairs")}
                  padding="py-2"
                  margin="mt-4"
                  >Minds Pairs
                </ButtonStandard>
            </section>
            <section className={styleSectionLink}>
                <h4 className={styleTitleLink}>Not a member ? <span className="underline">Join us:</span> </h4>
                <ButtonStandard
                   variant="homePage" 
                   onClick={() => navigate("/createAccount")}
                   padding="py-2"
                   margin="mt-4"
                   >Create a new account
                 </ButtonStandard>
            </section>
        </section>
    )
}