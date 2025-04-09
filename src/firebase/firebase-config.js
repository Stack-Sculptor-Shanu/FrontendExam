// src/firebase/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDEvgbwFFG-Se9i_rlC659v53XCD8alwX4",
  authDomain: "myauthapp-836ff.firebaseapp.com",
  projectId: "myauthapp-836ff",
  storageBucket: "myauthapp-836ff.appspot.com",
  messagingSenderId: "380989917291",
  appId: "1:380989917291:web:e21abd59038a2c5d16492e",
  measurementId: "G-776ZGLXW9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage }; 
