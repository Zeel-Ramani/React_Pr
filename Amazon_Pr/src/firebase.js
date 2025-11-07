import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCwxCamOC7NwS3r6psSmAWVvt-4D84v3vM",
  authDomain: "fir-pr-ea4a4.firebaseapp.com",
  projectId: "fir-pr-ea4a4",
  storageBucket: "fir-pr-ea4a4.firebasestorage.app",
  messagingSenderId: "325082780507",
  appId: "1:325082780507:web:50c70f52206b481472407e",
  measurementId: "G-M6XB3T33QZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);