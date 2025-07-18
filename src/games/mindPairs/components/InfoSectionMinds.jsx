import InfoSection from "../../gamesComponents/InfoSection";

export default function InfoSectionMinds({toggle}){
    return(
        <InfoSection 
         title="How to Play Mind Pairs"
         variant="minds"
         titleMargin=""
         ulMargin=""
         secMargin="mt-6"
         toggle={toggle}>
           <li>Click "Start" to jump into the game!</li>
           <li>Flip the first card, then the second.</li>
           <li>If they match, they stick around – no more flipping!</li>
           <li>No match? They flip back and hide again.</li>
           <li>The game is won when all cards are face-up.</li>
           <li>The timer starts when you hit "Start" and each wrong pair bumps up the flip count.</li>
           <li>Your challenge: Win with the fewest flips and the fastest time.</li>
         </InfoSection>
    )
  }