import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore"
import "firebase/compat/storage"
import { getAuth } from "firebase/auth"

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASEMESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASEMESSAGING_APP_ID,
}

firebase.initializeApp(clientCredentials)

const storage = firebase.storage();

export { storage, firebase as default }
export const app = firebase.initializeApp(clientCredentials)
export const auth = getAuth(app)