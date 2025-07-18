import Leaderboard from "../../../components/leaderboards/Leaderboard";
import UserScore from "../../../components/userScores/UserScore";
import { useGamesData } from "../../../context/GamesDataContext";
import { useUser} from "../../../context/UserContext"

export default function LeaderboardPhantom(){
    const {user, userLoading} = useUser()
    const {gamesData, dataLoading} = useGamesData()

    const phantom = gamesData.phantom
    const phantomUser = user.phantom

    if(dataLoading || userLoading){
        return <h3>loading...</h3>
    }

    return(
        <>
          <UserScore
            variant="phantom"
            scoreType="mistakes"
            margin="mt-8 mb-4"
            user={user}
            game={phantomUser}
          />
          <Leaderboard
            variant="phantom"
            scoreType="mistakes"
            margin="mt-2 mb-3"
            array={phantom.topScores}
          />
        </>
    )
}