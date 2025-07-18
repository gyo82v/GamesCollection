export default function LiElement({children}){
    const style = `w-full flex my-1`
    return(
        <li className={style}>{children}</li>
    )
}