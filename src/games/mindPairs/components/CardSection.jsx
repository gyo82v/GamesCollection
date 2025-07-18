import { motion } from "framer-motion";


export default function CardSection({onCardClick, selectedCards, matchedCards, gameStarted, gameOver, deck}){
    const style = ` p-2 rounded-lg shadow-lg border border-lime-100
                    bg-gradient-to-br from-green-200 via-lime-200 to-green-200
                    flex items-center justify-center `

    const iconStyle = `h-10 w-8 text-green-800`
    const iconsArray = deck.map((card, i) => {
        const isFlipped = selectedCards.some(c => c.uniqueId === card.uniqueId) ||
                          matchedCards.some(c => c.id === card.id)
        return(
            <button 
              key={card.uniqueId} 
             // className={style} 
              onClick={() => onCardClick(card)}
              disabled={!gameStarted || gameOver || matchedCards.some(matched => matched.id === card.id)}
            >
                <motion.div
                    className={style}
                    animate={{ rotateY: isFlipped ? 0 : 180 }}
                    transition={{ duration: 0.6 }}
                    style={{ perspective: 1000 }}
                 >
                    {isFlipped ? (
                       <card.icon className={iconStyle} />
                     ) : (
                       <card.icon className="invisible h-10 w-8" />
                    )}
               </motion.div>
            </button>
        )
    })
    return(
        <section className="grid grid-cols-5 gap-1 mb-6">
            {iconsArray}
        </section>
    )
}
