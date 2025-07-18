import { logOutUser } from "../firebase"
import { useNavigate } from "react-router-dom"
import ConfirmationPage from "../components/ConfirmationPage"

export default function LogOut(){
    const navigate = useNavigate()
    
    const handleLogOut = async () => {
        try {
            await logOutUser()
            navigate("/login")
        }catch(err) {
            console.err("couldnt log out")
        }
    }
    return(
        <ConfirmationPage
            title="Log out ?"
            btn1="Yes"
            btn1Click={handleLogOut}
            btn2="Cancel"
            btn2Click={() => navigate(-1)}
         />
    )
}