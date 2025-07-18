export default function KeyboardSection({word, addToArray, gameStarted, gameOver, guessedLetters}){
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const keyboard = alphabet.split("").map((letter, i) => {
        const wrongLetter = guessedLetters.includes(letter) && !word.includes(letter)
        const rightLetter = guessedLetters.includes(letter) && word.includes(letter)

        const letterStyle = rightLetter ? "bg-gradient-to-br from-lime-400 via-purple-200 to-lime-400 " :
                            wrongLetter ? "bg-gradient-to-br from-rose-300 via-purple-200 to-rose-300 " :
                                          "bg-gradient-to-br from-indigo-300 via-purple-200 to-indigo-300"

        return(
            <button 
              aria-disabled={guessedLetters.includes(letter)}
              aria-label={`letter ${letter}`}
              disabled={guessedLetters.includes(letter) || gameOver || !gameStarted}
              className={`
                           py-2 px-4 shadow-lg text-lg font-semibold rounded-lg text-purple-800
                           hover:cursor-pointer hover:transform hover:scale-105 active:scale-95 
                           border border-orange-100
                           ${letterStyle}        
                `}
              key={i}
              onClick={() => addToArray(letter)}
              >{letter}
            </button>
        )
    })
    return(
        <section className="flex flex-wrap gap-2 justify-center my-10">
            {keyboard}
        </section>
    )
}