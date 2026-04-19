import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_2x0EKqjvOa38amZpCNP8iDDUgTIaTng",
  authDomain: "mindpulse-f19f7.firebaseapp.com",
  projectId: "mindpulse-f19f7",
  storageBucket: "mindpulse-f19f7.firebasestorage.app",
  messagingSenderId: "174146222604",
  appId: "1:174146222604:web:f955afcdf115fb42020c29",
  measurementId: "G-PJCP62H7WV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services so you can use them in Login/Signup pages
export const auth = getAuth(app);
export const db = getFirestore(app);
