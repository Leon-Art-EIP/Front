import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDF2sMUJJcw9N7gYXOlXZUloQTKetW41NI",
  authDomain: "leon-art-d8942.firebaseapp.com",
  projectId: "leon-art-d8942",
  storageBucket: "leon-art-d8942.appspot.com",
  messagingSenderId: "954861130276",
  appId: "1:954861130276:web:b0fd36e2f55877c3303eb1",
  measurementId: "G-3EP76GJ247",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default firebaseConfig;
