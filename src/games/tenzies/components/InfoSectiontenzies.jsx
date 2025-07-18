import InfoSection from "../../gamesComponents/InfoSection";

export default function InfoSectionTenzies({toggle}){
    return(
        <InfoSection
           title="How to play Tenzies"
           variant="tenzies"
           toggle={toggle}
           btnMargin="mx-auto mb-4"
           ulMargin="mb-10"
           titleMargin="mb-10"
           secMargin="mt-0"
           spaceY="space-y-7"
        >
            <li>Hit the start button and let the timer fly!</li>
            <li>Freeze your favorite numbers by clicking on them—each button shows a number between 1 and 6.</li>
            <li>Roll the dice by clicking the roll button to try and match all your frozen numbers.</li>
            <li>Lock in your win when all dice are frozen and share the same number.</li>
            <li>Have fun and be fast!</li>


        </InfoSection>
    )
}