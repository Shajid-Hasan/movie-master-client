// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtg8KloP2ApzwpYkKckza6SjizLFTc2RE",
  authDomain: "movie-master-pro-87e46.firebaseapp.com",
  projectId: "movie-master-pro-87e46",
  storageBucket: "movie-master-pro-87e46.firebasestorage.app",
  messagingSenderId: "792685195773",
  appId: "1:792685195773:web:7d38bf5b2ef7da1c18a994"
};

// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

// INITIALIZE FIREBASE AUTHENTICATION
export const auth = getAuth(app);