import { Form } from "react-router-dom"

export default function FormSection({children, variant = "default", width, ...rest}){
    const variants = {
        default : "from-orange-100 via-yellow-100 to-orange-100 border-yellow-200"
    }
    const style = `p-4 rounded-lg border shadow-lg 
                   bg-gradient-to-br 
                   flex flex-col justify-center items-center gap-1
                   ${variants[variant] || ""} ${width || "w-full"}`
    return(
        <Form {...rest} className={style} method="post">
            {children}
        </Form>

    )
}
