import { useActionData, redirect } from "react-router-dom"
import { createUser } from "../firebase"
import FormSection from "../components/FormSection"
import Input from "../components/Input"
import ButtonStandard from "../components/ButtonStandard"

export async function action({request}) {
    const formData = await request.formData()
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const data = await createUser({email, password, name}) 
        return redirect("/games")
    }catch(err){
        return err.message
    }  
}

export default function CreateAccount(){
    const errorMessage = useActionData()
    
    const titleStyle = `font-bold text-2xl text-orange-600`
    return(
        <section className="flex flex-col items-center mt-20 gap-10 w-full">
            <h1 className={titleStyle}>Create new account</h1>
            {errorMessage && <p className="font-semibold text-rose-500 italic text-lg">{errorMessage}</p>}
            <FormSection width="w-11/12" replace>
                <Input width="w-11/12" type="text" name="name" placeholder="username" required />
                <Input width="w-11/12" type="email" name="email" placeholder="email address" required />
                <Input width="w-11/12" type="password" name="password" placeholder="password" required />
                <ButtonStandard margin="mt-10">Create</ButtonStandard>
            </FormSection>
        </section>

    )
}