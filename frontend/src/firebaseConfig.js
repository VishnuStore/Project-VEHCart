// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoErlvs4VOFl3E3Vbz8_TasE6PU3u9ZY4",
  authDomain: "veh-cart.firebaseapp.com",
  projectId: "veh-cart",
  storageBucket: "veh-cart.firebasestorage.app",
  messagingSenderId: "700813194314",
  appId: "1:700813194314:web:e1685bb2f5378562d2a2b3",
  measurementId: "G-3L6GJ14ER1"
};

// Initialize Firebase
export const vehApp = initializeApp(firebaseConfig);
export const vehDB = getFirestore(vehApp);
export const auth = getAuth(vehApp);