// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXl-4W4iNMU8AFIeJxAUyKoaoEqT-nTZs",
  authDomain: "leon-art.firebaseapp.com",
  projectId: "leon-art",
  storageBucket: "leon-art.appspot.com",
  messagingSenderId: "30560177674",
  appId: "1:30560177674:web:35496df6e8c90714e919f3",
  measurementId: "G-ZHZZFGZ31C"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;