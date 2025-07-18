import ButtonStandard from "./ButtonStandard"

export default function ConfirmationPage({title, btn1, btn2, btn1Click, btn2Click}){
    const secStyle = `flex flex-col justify-center items-center shadow-lg mt-30
                      bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-100
                      px-6 py-20 w-11/12 mx-auto rounded-xl`
    const titleStyle = `text-2xl font-bold text-orange-500 mb-12 mt-4`
    const btnSecStyle = `flex gap-3 w-full`
    return(
        <section className={secStyle}>
            <h1 className={titleStyle}>{title}</h1>
            <section className={btnSecStyle}>
                <ButtonStandard flex="flex-1" onClick={btn1Click}>{btn1}</ButtonStandard>
                <ButtonStandard flex="flex-1" onClick={btn2Click}>{btn2}</ButtonStandard>
            </section>
        </section>
    )
}