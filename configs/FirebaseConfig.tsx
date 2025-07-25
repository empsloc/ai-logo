// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-logo-1867f.firebaseapp.com",
  projectId: "ai-logo-1867f",
  storageBucket: "ai-logo-1867f.firebasestorage.app",
  messagingSenderId: "975856588196",
  appId: "1:975856588196:web:25397bd0fb6f16a83edd31",
  measurementId: "G-ZET60F69YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)