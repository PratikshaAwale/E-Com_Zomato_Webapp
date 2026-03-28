import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2WxafH2qKpUln91sTtEC85WvKGCRPgN8",
  authDomain: "zomato-clone-backend.firebaseapp.com",
  projectId: "zomato-clone-backend",
  storageBucket: "zomato-clone-backend.firebasestorage.app",
  messagingSenderId: "158628582076",
  appId: "1:158628582076:web:7a97b45faa2c60ec6df6b9",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app);