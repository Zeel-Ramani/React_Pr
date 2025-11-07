import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDETd0MeQOJ3J5V3Vzy4faHwnJSbeGPbW8",
  authDomain: "flipcart-clone-cc07d.firebaseapp.com",
  projectId: "flipcart-clone-cc07d",
  storageBucket: "flipcart-clone-cc07d.firebasestorage.app",
  messagingSenderId: "1020643975758",
  appId: "1:1020643975758:web:56c5086c2c0cff9b54d91f",
  measurementId: "G-JL2R317765"
};

let app = initializeApp(firebaseConfig);
export const db = getFirestore(app);