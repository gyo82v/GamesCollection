import Leaderboard from "../../../components/leaderboards/Leaderboard";
import UserScore from "../../../components/userScores/UserScore";
import { useGamesData } from "../../../context/GamesDataContext";
import { useUser} from "../../../context/UserContext"

export default function LeaderboardTenzies(){
    const {gamesData, loadingData} = useGamesData()
    const {user, loadingUser} = useUser()
    const tenzies = gamesData.tenzies
    const tenziesUser = user.tenzies

    if(loadingData || loadingUser){
        return <h3>loading...</h3>
    }
    return(
        <>
        <UserScore
          scoreType="rolls"
          variant="tenzies"
          game={tenziesUser}
          user={user}
          margin="mt-2 mb-4"
        />
        <Leaderboard
          array={tenzies.topScores}
          scoreType="rolls"
          variant="tenzies"
          margin="mt-2 mb-3"
        />
        </>
    )
}