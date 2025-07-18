export default function Button({children, ...rest}){
    const style = `px-4 py-2 rounded-lg shadow-lg bg-gradient-to-br w-11/12 mx-auto mt-4 mb-6
                   from-indigo-200 to-rose-100
                   font-bold text-indigo-500
                   hover:transform hover:scale-105
                   active:scale-95`
    return(
        <button {...rest} className={style}>{children}</button>
    )
}