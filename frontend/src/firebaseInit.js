// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlOm3SEDfTFL9P-hG0wHWntEHJ5yYdOs0",
  authDomain: "sleeper-f50f9.firebaseapp.com",
  projectId: "sleeper-f50f9",
  storageBucket: "sleeper-f50f9.appspot.com",
  messagingSenderId: "818941072144",
  appId: "1:818941072144:web:cd236710006356cbffcb95",
  measurementId: "G-YYVZW0EPSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;