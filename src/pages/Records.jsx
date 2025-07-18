import { useGamesData } from "../context/GamesDataContext"
import { useState } from "react"

import GameRecordsEl from "../components/gamesRecordsComponents/GameRecordsEl"
import OlElement from "../components/gamesRecordsComponents/OlElement"

export default function Records(){
    const [open, setOpen] = useState({
        tenzies : false,
        phantom : false,
        minds : false
    })

  
    const {gamesData, loading} = useGamesData()

    if(loading){
        return <h3>loading</h3>
    }

    const tenzies = gamesData.tenzies
    const phantom = gamesData.phantom
    const minds = gamesData.mindsPairs



    const toggleLeaderboards = (gamekey) => {
        setOpen(prev => ({
            ...prev,
            [gamekey] : !prev[gamekey]
        }))
    }

  
    return(
        <section className="flex flex-col items-center mt-10 p-3">
            <GameRecordsEl title={tenzies.gameName} open={open.tenzies} toggle={() => toggleLeaderboards("tenzies")}>
                <OlElement array={tenzies.topScores} type="rolls" />
            </GameRecordsEl>
            <GameRecordsEl title={phantom.gameName} open={open.phantom} toggle={() => toggleLeaderboards("phantom")} variant="phantom">
                <OlElement array={phantom.topScores} type="Lives left" variant="phantom" />
            </GameRecordsEl>
            <GameRecordsEl title={minds.gameName} open={open.minds} toggle={() => toggleLeaderboards("minds")} variant="minds">
                <OlElement array={minds.topScores} type="flips" variant="minds" />
            </GameRecordsEl>
          
        </section>
    )
}