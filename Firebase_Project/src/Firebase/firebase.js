import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAT_o5XTyjdWaQHT6r7fiODhK6qFu0YcnQ",
  authDomain: "my-test-app-123-54961.firebaseapp.com",
  projectId: "my-test-app-123-54961",
  storageBucket: "my-test-app-123-54961.firebasestorage.app",
  messagingSenderId: "712956886015",
  appId: "1:712956886015:web:553b5e7aa6d0b9870c85ca",
  measurementId: "G-6YCH3P6E4W"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);