// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFKqyMgwQydnsYEAnCI46sspgJtD28lmw",
  authDomain: "soldiersbibleapp.firebaseapp.com",
  projectId: "soldiersbibleapp",
  storageBucket: "soldiersbibleapp.appspot.com",
  messagingSenderId: "670390147784",
  appId: "1:670390147784:web:453aa8c33758c52621e3fd",
  measurementId: "G-SFPG3JP7KZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()