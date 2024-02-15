// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// DM: todoMM: did the tutorial recommend putting all of these in the .env file, or just the apiKey? usually you put only secrets in the .env file, but these don't all look like senstitve data, but I'm not sure
const firebaseConfig = {
  // DM: todoMM: document what each of there are for
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
// DM: todoMM: since this is exported and used in other contexts, give it a better, more detailed name so that one doesnt wonder, "provider of what?"
export const provider = new GoogleAuthProvider()

export const db = getFirestore(app)
