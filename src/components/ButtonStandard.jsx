export default function ButtonStandard({children, variant = "default", width, margin, padding, flex, ...rest}){
    const variants = {
        default : "from-orange-300 via-yellow-200 to-orange-300 text-orange-800 border-yellow-100",
        homePage : "from-pink-300 via-rose-200 to-pink-300 text-fuchsia-800 border-rose-300"
    }
    const style = `rounded-lg border shadow-lg
                   bg-gradient-to-br font-semibold text-lg
                   hover:cursor-pointer hover:transform hover:scale-105
                   active:scale-95
                   ${variants[variant] || ""} ${width || "w-full"} ${margin || ""}
                   ${flex || ""} ${padding || "py-4 px-8"}`
    return(
        <button {...rest} className={style} >{children}</button>
    )

}