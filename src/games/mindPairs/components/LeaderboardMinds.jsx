import Leaderboard from "../../../components/leaderboards/Leaderboard";
import UserScore from "../../../components/userScores/UserScore";
import { useGamesData } from "../../../context/GamesDataContext";
import { useUser} from "../../../context/UserContext"

export default function LeaderBoardMinds(){
    const {gamesData, dataLoading} = useGamesData()
    const {user, userLoading} = useUser()

    const mindPairs = gamesData.mindsPairs
    const mindsUser = user.minds

    if(dataLoading || userLoading){
        return <h3>loading...</h3>
    }
    return(
        <>
          <UserScore
            variant="minds"
            scoreType="flips"
            game={mindsUser}
            user={user}
            margin="mt-2 mb-4"
          />
          <Leaderboard
            variant="minds"
            scoreType="flips"
            array={mindPairs.topScores}
            margin="mt-2 mb-3"
          />
        </>
    )

}