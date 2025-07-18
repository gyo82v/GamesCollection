import { useActionData, Link , redirect } from "react-router-dom"
import { logIn } from "../firebase"
import FormSection from "../components/FormSection"
import Input from "../components/Input"
import ButtonStandard from "../components/ButtonStandard"

export async function action({request}) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const data = await logIn({email, password})
        return redirect("/games")
    }catch(err){
        return err.message
    }
    
}
export default function Login(){
    const errorMessage = useActionData()

    const titleStyle = `font-bold text-2xl text-orange-600`
    const pStyle = `text-neutral-500 font-medium`
    const linkStyle = `text-orange-400 font-bold`

    return(
        <section className="flex flex-col items-center mt-30 gap-10 w-full">
            <h1 className={titleStyle}>Log in to your account</h1>
            {errorMessage && <p className="font-semibold text-rose-600 text-lg italic">{errorMessage}</p>}
            <FormSection width="w-11/12" replace>
                <Input width="w-11/12" type="email" name="email" placeholder="Email address" required />
                <Input width="w-11/12" type="password" name="password" placeholder="password" required />
                <ButtonStandard margin="mt-10">Log in</ButtonStandard>
            </FormSection>
            <p className={pStyle}>Dont have an account ? 
                <Link to="/createAccount" className={linkStyle}>
                  Create one now.
                </Link>
            </p>
        </section>
    )
}