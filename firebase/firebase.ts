// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu-ZsKH3R8YYwc9G9BcaJMzpjKEP15LEo",
  authDomain: "jointventureassets-d9c8a.firebaseapp.com",
  projectId: "jointventureassets-d9c8a",
  storageBucket: "jointventureassets-d9c8a.firebasestorage.app",
  messagingSenderId: "686726763904",
  appId: "1:686726763904:web:061240fbb198bcdbbe5d65",
  measurementId: "G-R6PGY6C1SZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider()
const analytics = getAnalytics(app);