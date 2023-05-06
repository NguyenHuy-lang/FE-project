// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrhXy6MadW640N6mB-e3cGmL5u3s8aL6s",
  authDomain: "hdvnhom8.firebaseapp.com",
  databaseURL: "https://hdvnhom8-default-rtdb.firebaseio.com",
  projectId: "hdvnhom8",
  storageBucket: "hdvnhom8.appspot.com",
  messagingSenderId: "321095979248",
  appId: "1:321095979248:web:ad6e9a968eb628eb9af235",
  measurementId: "G-Z5XRFK3DYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);