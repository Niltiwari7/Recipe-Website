// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "recipe-app-4adfa.firebaseapp.com",
  projectId: "recipe-app-4adfa",
  storageBucket: "recipe-app-4adfa.appspot.com",
  messagingSenderId: "650141701336",
  appId: "1:650141701336:web:dba71052e5e6e6646b73ad"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);