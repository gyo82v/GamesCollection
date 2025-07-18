import { createContext, useContext, useState, useEffect } from "react";
import { getUserData } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";   
import { doc, onSnapshot } from "firebase/firestore";                               

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // no one logged in
        setUser(null);
        setLoading(false);
        return;
      }

      // ⬅️ once we know the user is authenticated, subscribe to their Firestore doc
      const userDocRef = doc(db, "users", currentUser.uid);
      const unsubscribeUserDoc = onSnapshot(
        userDocRef,
        (snap) => {
          if (snap.exists()) {
            setUser({ uid: currentUser.uid, ...snap.data() });
          } else {
            // if the document doesn’t exist, still set loading false
            setUser({ uid: currentUser.uid });
          }
          setLoading(false);
        },
        (err) => {
          console.error("Realtime user data error:", err);
          setLoading(false);
        }
      );

      // clean up both listeners when auth state changes again/unmounts
      return () => {
        unsubscribeUserDoc();
      };
    });

    // clean up auth listener on unmount
    return () => unsubscribeAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(){
    return useContext(UserContext)
}



/*


const UserContext = createContext()

export function UserProvider({children}){
    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if(currentUser){
                const userData = await getUserData(currentUser.uid)
                setUser({...userData, uid : currentUser.uid})
            }else{
                setUser(null)
            }
            setloading(false)
        })
        return () => unsubscribe
    }, [])

    return(
        <UserContext.Provider value={{user, loading}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext)
}







*/