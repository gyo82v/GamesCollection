import Leaderboard from "../../../components/leaderboards/Leaderboard";
import UserScore from "../../../components/userScores/UserScore";
import { useGamesData } from "../../../context/GamesDataContext";
import { useUser} from "../../../context/UserContext"

export default function LeaderboardSudoku(){
    const {user, userLoading} = useUser()
    const {gamesData, dataLoading} = useGamesData()

    const sudoku = gamesData.sudoku
    const sudokuUser = user.sudoku

    if(dataLoading || userLoading){
        return <h3>loading...</h3>
    }

    return(
        <>
          <UserScore
            variant="sudoku"
            scoreType="lives"
            margin="mt-8 mb-4"
            user={user}
            game={sudokuUser}
          />
          <Leaderboard
            variant="sudoku"
            scoreType="mistakes"
            margin="mt-2 mb-3"
            array={sudoku.topScores}
          />
        </>
    )
}