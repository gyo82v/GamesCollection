export default function WordSection({word, gameLost, guessedLetters}){
    const wordArray = word.split("").map((letter, i) => {
        const wordGuessed = guessedLetters.includes(letter)
        return(
            <span 
              key={i}
              className={`
                           shadow-lg p-3 text-xl font-bold h-12 w-12 my-4
                           bg-gradient-to-br from-indigo-200 to-fuchsia-100
                           border border-b-orange-300 border-orange-100
                           flex items-center justify-center
                           ${gameLost && !wordGuessed ? "text-rose-700" : "text-indigo-700"}
                `}
              >{gameLost ? letter.toUpperCase() : wordGuessed ? letter.toUpperCase() : ""}
            </span>
        )

    })
    return(
        <section className="flex gap-1 justify-center w-full">
            {wordArray}
        </section>
    )
}