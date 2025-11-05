import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase, ref, onValue, push, set, remove} from "firebase/database"
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAPfQF9fgMIaqFMxm6623RXngu7DF-h98Q",
  authDomain: "fishapp-fc55c.firebaseapp.com",
  databaseURL: "https://fishapp-fc55c-default-rtdb.firebaseio.com",
  projectId: "fishapp-fc55c",
  storageBucket: "fishapp-fc55c.firebasestorage.app",
  messagingSenderId: "333179091302",
  appId: "1:333179091302:web:ab5d16041f63ade710b0a7",
  measurementId: "G-2FFH20QER4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

export {auth, db, ref, onValue, push, set, remove};