// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS0ieGSrFTMUoph5AdywKOwLBcNj6izMQ",
  authDomain: "laundryapp-6ac9d.firebaseapp.com",
  projectId: "laundryapp-6ac9d",
  storageBucket: "laundryapp-6ac9d.appspot.com",
  messagingSenderId: "742110390519",
  appId: "1:742110390519:web:122719ea27be7e207c0bf2",
  measurementId: "G-WCPNKD0TYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};