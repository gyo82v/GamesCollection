import { UserProvider } from "./UserContext";
import { GamesDataProvider } from "./GamesDataContext";

const ProviderWrapper = ({children}) => {
    return(
        <UserProvider>
            <GamesDataProvider>
                {children}
            </GamesDataProvider>
        </UserProvider>
    )
}

export default ProviderWrapper