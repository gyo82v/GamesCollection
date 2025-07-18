import { FaCheck, FaTimes } from 'react-icons/fa';

export default function LivesSection({lives, livesLost}){

    const livesSection = Array.from({length : lives}, (_, i) => {
        const lifeLost = i < livesLost

        return(
            <span
             key={i}
             className={`
                          p-3 mt-10 mb-6 rounded-sm shadow-md border
                        border-orange-100 bg-gradient-to-br
                          hover:curor-pointer hover:transform hover:scale-105
                          ${lifeLost ? "from-rose-300 via-purple-200 to-rose-300 text-rose-500" :
                                        "from-indigo-200 via-purple-100 to-indigo-200 text-indigo-500"
                           }
                
                `}
             > {lifeLost ? <FaTimes /> : <FaCheck />}
            </span>
        )
    })

    return(
        <section className='flex gap-1 justify-center'>
            {livesSection}
        </section>
    )
}