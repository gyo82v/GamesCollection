import { Link } from "react-router-dom"

export default function LinkGames({children, link, variant = "default"}){
    const variants = {
        default : "text-orange-800 from-yellow-500 via-purple-300 to-yellow-500 border-purple-800 ",
        secondary: "text-gray-800 from-green-300 via-blue-300 to-purple-300 border-green-400",
        success: "text-white from-green-500 via-teal-500 to-lime-500 border-green-600",
        danger: "text-white from-red-300 via-pink-400 to-orange-300 border-red-600",
        warning: "text-yellow-800 from-yellow-400 via-fuchsia-300 to-yellow-400 border-yellow-600",
        info: "text-white from-purple-400 via-blue-300 to-purple-500 border-cyan-600",
        purple: "text-white from-purple-500 via-pink-500 to-purple-500 border-purple-700",
        teal: "text-teal-800 from-teal-500 via-green-200 to-teal-500 border-teal-600",
        magenta: "text-red-800 from-pink-400 via-red-200 to-pink-400 border-pink-600",
        olive: "text-white from-green-500 via-yellow-600 to-green-500 border-green-800",
        aqua: "text-teal-800 from-teal-400 via-cyan-200 to-teal-400 border-blue-500",
    }
    return(
        <Link 
          className={`
                      p-4 font-bold text-center shadow-lg border rounded-lg bg-gradient-to-br w-full
                      hover:cursor-pointer hover:transform hover:scale-105 active:scale-95
                      transition transform duration-200 ease-in-out focus:outline-none 
                      focus:ring-2 focus:ring-offset-2
                      ${variants[variant] || ""}

            `} 
          to={link}
          >{children}
        </Link>
    )
}