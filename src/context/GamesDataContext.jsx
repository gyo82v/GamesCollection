import { createContext, useContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";  
import { db } from "../firebase"; 
import { getItemById } from "../firebase";

const GamesDataContext = createContext();

export function GamesDataProvider({ children }) {
  const [gamesData, setGamesData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, "gamesData");
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const allData = {};
        snapshot.forEach((doc) => {
          allData[doc.id] = doc.data();
        });
        setGamesData(allData);
        setLoading(false);
      },
      (err) => {
        console.error("Realtime gamesData error:", err);
        setLoading(false);
      }
    );


    return () => unsubscribe();
  }, []);

  return (
    <GamesDataContext.Provider value={{ gamesData, loading }}>
      {children}
    </GamesDataContext.Provider>
  );
}

export function useGamesData() {
  return useContext(GamesDataContext);
}


/*




import { createContext, useContext, useState, useEffect } from "react";
import { getItemById } from "../firebase";

const GamesDataContext = createContext()

export function GamesDataProvider({children}){
    const [gamesData, setGamesData] = useState({})
    const [loading, setloading] = useState(true)

    useEffect(() => {
        async function fetchGamesData() {
            try {
                const tenziesData = await getItemById("tenzies")
                const phantomData = await getItemById("phantom")
                const mindsPairsData = await getItemById("mindsPairs")
                const battleshipData = await getItemById("battleship")
                const sudokuData = await getItemById("sudoku")
                setGamesData({
                    tenzies : tenziesData,
                    phantom : phantomData,
                    mindsPairs : mindsPairsData,
                    battleship : battleshipData,
                    sudoku : sudokuData
                })
                setloading(false)
            }catch(err){
                console.err("error loading games data", err.message)
                setloading(false)
            }  
        }
        fetchGamesData()
    }, [])

    return(
        <GamesDataContext.Provider value={{gamesData, loading}}>
            {children}
        </GamesDataContext.Provider>
    )

}

export function useGamesData(){
    return useContext(GamesDataContext)
}








*/