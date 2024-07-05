import { initializeApp } from "firebase/app";
import "firebase/auth";
import {
  FacebookAuthProvider,
  connectAuthEmulator,
  getAuth,
} from "firebase/auth";
import "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// TODO: Use a configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAwm0-rD9NyYk8ukAzp73GHu9kzp58gAzg",
  authDomain: "books-app-v2.firebaseapp.com",
  projectId: "books-app-v2",
  storageBucket: "books-app-v2.appspot.com",
  messagingSenderId: "851158701509",
  appId: "1:851158701509:web:e7cd4b4039b8590bf627ac",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

if (location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectStorageEmulator(storage, "localhost", 9199);
}

export { db, auth, storage, googleProvider, facebookProvider };
