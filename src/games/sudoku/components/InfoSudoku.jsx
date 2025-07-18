import InfoSection from "../../gamesComponents/InfoSection";

export default function InfoSudoku({toggle}){
    return(
        <InfoSection
          title="How to Play Chroma Sudoku"
          variant="sudoku"
          toggle={toggle}
          btnMargin="mx-auto mb-4"
          spaceY="space-y-7"
          titleMargin="mb-10"
        >
         <li>Select a color from the palette to set it as your active color.</li>
         <li>Fill each row so it contains all nine colors exactly once.</li>
         <li>Fill each column so it contains all nine colors exactly once</li>
         <li>Ensure each 3×3 block also includes all nine colors without any repeats.</li>
         <li>Three mistakes and the game is lost.</li>
         <li>Good luck, and have fun!</li>
        </InfoSection>
    )

}