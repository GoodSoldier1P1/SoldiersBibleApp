// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTWBwv5_AXg6Vl7onCZVKPMxDgsMQUBKc",
  authDomain: "bible-app-3d327.firebaseapp.com",
  projectId: "bible-app-3d327",
  storageBucket: "bible-app-3d327.appspot.com",
  messagingSenderId: "1040173526844",
  appId: "1:1040173526844:web:873c92523a7087ed733839",
  measurementId: "G-NPYCGZ61X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()