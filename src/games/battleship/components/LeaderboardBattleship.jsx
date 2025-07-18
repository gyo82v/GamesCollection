import Leaderboard from "../../../components/leaderboards/Leaderboard"
import UserScore from "../../../components/userScores/UserScore"
import { useUser } from "../../../context/UserContext"
import { useGamesData } from "../../../context/GamesDataContext"

export default function LeaderboardBattleship(){
    const {user, userLoading} = useUser()
    const {gamesData, dataLoading} = useGamesData()
    
    const battleship = gamesData.battleship
    const battleshipUser = user.battleship

    if(userLoading || dataLoading){
        return <h2>loading...</h2>
    }

    return(
        <>
         <UserScore 
           scoreType="points" 
           variant="battleship" 
           game={battleshipUser} 
           user={user} 
           margin="mt-2 mb-4"
         />
         <Leaderboard 
           scoreType="points" 
           variant="battleship" 
           array={battleship.topScores} 
           margin="mt-2 mb-3"
         /> 
        </>
    )
}