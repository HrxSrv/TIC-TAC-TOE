// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWfamnzM7KWt1zQQz3IZXkzbYuJwH2iHY",
  authDomain: "sf-tictactoe.firebaseapp.com",
  projectId: "sf-tictactoe",
  storageBucket: "sf-tictactoe.appspot.com",
  messagingSenderId: "439059314950",
  appId: "1:439059314950:web:21d982e57a304df68e0687"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
export const gameArray=collection(db,"gameArray");