// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmS7uLbgGK2eRdarsNJ4pnSwdzju5lClo",
  authDomain: "news-app-ea74c.firebaseapp.com",
  projectId: "news-app-ea74c",
  storageBucket: "news-app-ea74c.appspot.com",
  messagingSenderId: "487171504535",
  appId: "1:487171504535:web:94c2c756739bf2bb73ecd2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, getFirestore, collection, addDoc, getDocs, Timestamp };
