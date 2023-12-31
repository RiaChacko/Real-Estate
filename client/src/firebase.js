// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-stack-9c411.firebaseapp.com",
  projectId: "mern-stack-9c411",
  storageBucket: "mern-stack-9c411.appspot.com",
  messagingSenderId: "874484995322",
  appId: "1:874484995322:web:48f478c20a727cd516a543"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);