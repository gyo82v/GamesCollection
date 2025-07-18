import {Howl} from "howler"
import { useRef, useEffect } from "react"

export default function useSounds(){
    const hitSoundsRef = useRef(null)
    const missSoundRef = useRef(null)

    useEffect(() => {
        //initialize once on mount
        hitSoundsRef.current = new Howl({src : ["/sounds/hit.wav"], volume : 0.5})
        missSoundRef.current = new Howl({src : ["/sounds/miss.wav"], volume : 0.5})
        //no clean up required for Howl
    }, [])

    // functions to play sounds

    const playHit = () => {
        hitSoundsRef.current?.play()
    }
    const playMiss = () => {
        missSoundRef.current?.play()
    }

    return {playHit, playMiss}
}