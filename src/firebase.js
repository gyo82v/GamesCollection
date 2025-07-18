import { initializeApp } from "firebase/app";
import {getFirestore, collection, doc, getDoc, setDoc, serverTimestamp, updateDoc} from "firebase/firestore"
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC1CufyxIikqm3ijBg4KLMhBmw7znMsKts",
  authDomain: "game-collection-dea0b.firebaseapp.com",
  projectId: "game-collection-dea0b",
  storageBucket: "game-collection-dea0b.firebasestorage.app",
  messagingSenderId: "585827284976",
  appId: "1:585827284976:web:f54e8c577702f5415d0f35"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}

const gamesDataCollection = collection(db, "gamesData")


/* get data from firestore/gamesdata*/

export async function getItemById(id) {
    const docRef = doc(db, "gamesData", id)
    const gamesDataSnapshot = await getDoc(docRef)
    return{
        ...gamesDataSnapshot.data(),
        id : gamesDataSnapshot.id
    }
}

/* get data from firestore/users*/

export async function getUserData(uid) {
  const userRef = doc(db, "users", uid)
  const userDoc = await getDoc(userRef)
  return userDoc.exists() ? userDoc.data() : null
}

/* authentication */

export async function logIn(creds){
  return signInWithEmailAndPassword(auth, creds.email, creds.password)
  .then((userCredential) => {
    return userCredential
  })
  .catch((error) => {
    const errorMessage = error.message 
    throw new Error(errorMessage)
  })
}

export async function createUser(creds) {
  return createUserWithEmailAndPassword(auth, creds.email, creds.password)
  .then(async (userCredential) => {
    const user = userCredential.user
    //create firestore document:
    const userRef = doc(db, "users", user.uid)//use the uid as the document id.
    await setDoc(userRef,{
      email : creds.email,
      name : creds.name,
      tenzies : {score : 1000, time : 1000},
      phantom : {score : 1000, time : 1000},
      minds : {score : 1000, time : 1000},
      battleship : {score : 1, time : 1000},
      sudoku : {score : 3, time : 1200},
      createdAt : serverTimestamp(),
    })
    return user
  })
  .catch((err) => {
    const errorMessage = err.message
    throw new Error(errorMessage)
  })
}

export async function logOutUser() {
  try {
    await signOut(auth)
  } catch (err) {
    console.err("users couldnt sign out")
  }
}

/* get realtime data authentication */ 

export function checkUserLogInStatus(callback){
  return onAuthStateChanged(auth, callback)
}

/*update users collections */

export async function updateUserRecord(gameName, gameStat, uid) {
  const userRef = doc(db, "users", uid)
  const userDoc = await getDoc(userRef)

  if(!userDoc.exists()) return

  const userData = userDoc.data()
  const currentRecord = userData[gameName]

  const isNewRecordBetter =  !currentRecord || 
                             (gameStat.time < currentRecord.time) || 
                             (gameStat.time === currentRecord.time && gameStat.count < currentRecord.score)
                
  if(isNewRecordBetter){
    try {
      await updateDoc(userRef, {
        [gameName] : {
          time : gameStat.time,
          score : gameStat.count,
          updatedAt : serverTimestamp()
        }
      })
      console.log("user record updated")
      return true;           // <-- return true if record was updated
    }catch(err){
      console.error("there was an error :", err.message)
      throw err
    }
  }else{
    console.log("no best record")
    return false;            // <-- return false if not a new record
  }
}

/*update gamesData collection */

export async function updateGameLeaderboard(gameName, gameResult, username) {
  const gameDocRef = doc(db, "gamesData", gameName);
  const gameDocSnap = await getDoc(gameDocRef);

  let leaderboard = [];
  if (gameDocSnap.exists()) {
    const data = gameDocSnap.data();
    leaderboard = data.topScores || [];
  }


  if (leaderboard.length < 10) {
    leaderboard.push({ username, time: gameResult.time, score: gameResult.count });
    leaderboard.sort((a, b) => {
      if (a.time !== b.time) return a.time - b.time;
      return a.score - b.score;
    });

  } else {
    const lastEntry = leaderboard[leaderboard.length - 1];

    const isBetterResult = (newResult, existing) => {
      if (newResult.time < existing.time) return true;
      if (newResult.time === existing.time && newResult.count < existing.score) return true;
      return false;
    };

    if (!isBetterResult(gameResult, lastEntry)) {
      console.log("New game result does not qualify for the leaderboard (it's not better than the last entry).");
      return false
    }

    leaderboard.push({ username, time: gameResult.time, score: gameResult.count });

    // Sort the leaderboard with the same criteria:
    leaderboard.sort((a, b) => {
      if (a.time !== b.time) return a.time - b.time;
      return a.score - b.score;
    });

   
    const tenthEntry = leaderboard[9];
    if (tenthEntry.time === gameResult.time && tenthEntry.score === gameResult.count) {
      console.log("New game result is equal to the last leaderboard entry. Discarding the result.");
      return false
    }

    // Truncate the leaderboard to top 10 entries.
    leaderboard = leaderboard.slice(0, 10);
  }

  // Update the Firestore document with the new leaderboard.
  try {
    await updateDoc(gameDocRef, {
      topScores: leaderboard
    });
    console.log(`Leaderboard for ${gameName} updated successfully.`);
    return true
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    throw error;
  }
}

