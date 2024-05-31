import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXl-4W4iNMU8AFIeJxAUyKoaoEqT-nTZs",
  authDomain: "leon-art.firebaseapp.com",
  projectId: "leon-art",
  storageBucket: "leon-art.appspot.com",
  messagingSenderId: "30560177674",
  appId: "1:30560177674:web:35496df6e8c90714e919f3",
  measurementId: "G-ZHZZFGZ31C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default firebaseConfig;
