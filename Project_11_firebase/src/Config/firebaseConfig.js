import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYd2ngf5vc4sEzANVLNEovlJR5r0kEjtE",
  authDomain: "clone-e003c.firebaseapp.com",
  projectId: "clone-e003c",
  storageBucket: "clone-e003c.firebasestorage.app",
  messagingSenderId: "797150989751",
  appId: "1:797150989751:web:53b5b059f3168169716c32",
  measurementId: "G-HQB1V2GMBG"
};

let app = initializeApp(firebaseConfig);
export const db = getFirestore(app);