import InfoSection from "../../gamesComponents/InfoSection"

export default function InfosectionBattleship({toggleInfo}){
    return(
        <InfoSection
          title="How to play Battleship"
          variant="battleship"
          toggle={toggleInfo}
          btnMargin="mx-auto mb-4"
          ulMargin="mb-10"
          titleMargin="mb-10"
          secMargin="mt-5"
          spaceY="space-y-7"
        >
            <li>Click start to begin deploying your ships.</li>
            <li>When it’s your turn, tap any tile on the enemy grid</li>
            <li>If you splash into water, your turn’s up and the AI takes over—brace for return fire.</li>
            <li>If you score a direct hit, you get to keep shooting until you miss.</li>
            <li>The objective? Sink every last one of the enemy’s ships before they obliterate yours.</li>

        </InfoSection>
    )
}