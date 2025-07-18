import { useState, useEffect } from "react";
import {NavLink, useNavigate} from "react-router-dom"
import { FaSignOutAlt } from 'react-icons/fa';
import { checkUserLogInStatus } from "../../firebase";

export default function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = checkUserLogInStatus(user => {
              setIsLoggedIn(!!user)
            })
        return unsubscribe //cleanup
    }, [])


    const TitleStyle = `mr-auto text-2xl font-bold p-2
                        border border-orange-300 rounded-lg shadow-lg
                        bg-clip-text text-transparent bg-gradient-to-br
                        from-orange-500 via-yellow-500 to-rose-500`

    const linkStyle = ` text-orange-500 font-semibold`
    const iconBtnStyle = `text-orange-500 h-6 w-6 ml-3`
    return(
        <header className="flex p-4 bg-orange-100 items-center justify-center">
            <NavLink to="/" className={TitleStyle}
              >Arcadium
            </NavLink>
            <nav className="flex gap-2">
                <NavLink className={linkStyle} to="/games">Games</NavLink>
                <NavLink className={linkStyle} to="/records">Leaderboards</NavLink>
                {
                    isLoggedIn ? 
                    <button onClick={() => navigate("/logOut")}><FaSignOutAlt className={iconBtnStyle} /></button> :  
                    <NavLink className={linkStyle} to="/login">LogIn</NavLink>
                }
            </nav>
        </header>
    )
}