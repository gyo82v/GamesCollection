export default function Input({type, name, placeholder,width, flex, ...rest}){
 
    const style = `${width || ""} ${flex || ""}
                   shadow-lg p-2 rounded-lg border border-orange-200
                   bg-white text-gray-800 placeholder-gray-500
                   focus:outline-none  focus:ring-2 focus:ring-orange-300 focus:bg-orange-100
                   transition-colors duration-200 resize-none `
    return(
        <input 
          {...rest}
          className={style}
          type={type}
          name={name}
          placeholder={placeholder}  
        />
    )
}