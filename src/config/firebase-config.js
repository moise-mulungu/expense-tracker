// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

//(done) DM: did the tutorial recommend putting all of these in the .env file, or just the apiKey? usually you put only secrets in the .env file, but these don't all look like sensitive data, but I'm not sure. MM: No, the tutorial didn't mention to put them in an .env file, it only says it's a matter of choice. I did that on my own.
// DM: todoMM: OK, the look at your descriptions below and decide which are really secrets and which are not. Those that are not are useless without knowing the secrets, so they can be public. Those that are secrets should be in the .env file.
const firebaseConfig = {
  //(done) DM: document what each of these are for
  // The API key is used to authenticate requests from your app, like a secret password for your Firebase project.
  apiKey: process.env.REACT_APP_API_KEY,

  // The Auth domain is the domain for the Firebase project. It's used for authentication.
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,

  // The Project ID is a unique, user-assigned ID that can be used by Google APIs.
  projectId: process.env.REACT_APP_PROJECT_ID,

  // The Storage Bucket is the Google Cloud Storage bucket for the Firebase project.
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,

  // The Messaging Sender ID is used for sending messages and notifications.
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

  // The App ID is a unique identifier for an app.
  appId: process.env.REACT_APP_APP_ID,

  // The Measurement ID is used for Google Analytics.
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
//(done) DM: since this is exported and used in other contexts, give it a better, more detailed name so that one doesn't wonder, "provider of what?"
export const googleAuthProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
