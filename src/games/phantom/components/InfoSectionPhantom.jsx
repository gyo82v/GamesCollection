import InfoSection from "../../gamesComponents/InfoSection";

export default function InfoSectionPhantom({toggle}){
    return(
        <InfoSection
          title="How to Play phantom Phrase"
          variant="phantom"
          toggle={toggle}
          btnMargin="mx-auto mb-4"
        >
         <li>Click the flag button on the top right corner to change the category of the word to guess.</li>
         <li>You have 7 possible wrong guesses. On the 8th, the game is lost.</li>
         <li>Try to guess the hidden word by selecting one letter at a time.</li>
         <li>Each correct guess reveals part of the word.</li>
         <li>Each wrong guess brings you closer to being hanged.</li>
         <li>Use your guesses wisely and have fun!</li>
        </InfoSection>
    )

}