// firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAPfQF9fgMIaqFMxm6623RXngu7DF-h98Q",
  authDomain: "fishapp-fc55c.firebaseapp.com",
  databaseURL: "https://fishapp-fc55c-default-rtdb.firebaseio.com",
  projectId: "fishapp-fc55c",
  storageBucket: "fishapp-fc55c.firebasestorage.app",
  messagingSenderId: "333179091302",
  appId: "1:333179091302:web:ab5d16041f63ade710b0a7",
  measurementId: "G-2FFH20QER4",
};

// ✅ Initialize app (hanya sekali)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Initialize Auth dengan AsyncStorage (WAJIB, tidak boleh pakai getAuth)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// ✅ Database
const db = getDatabase(app);

export { auth, db, ref, onValue, push, set, remove };

// import { initializeApp } from "firebase/app";
// // import { getAuth } from "firebase/auth";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   getDatabase,
//   ref,
//   onValue,
//   push,
//   set,
//   remove,
// } from "firebase/database";
// import "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyAPfQF9fgMIaqFMxm6623RXngu7DF-h98Q",
//   authDomain: "fishapp-fc55c.firebaseapp.com",
//   databaseURL: "https://fishapp-fc55c-default-rtdb.firebaseio.com",
//   projectId: "fishapp-fc55c",
//   storageBucket: "fishapp-fc55c.firebasestorage.app",
//   messagingSenderId: "333179091302",
//   appId: "1:333179091302:web:ab5d16041f63ade710b0a7",
//   measurementId: "G-2FFH20QER4"
// };

// const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);
// const db = getDatabase();
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

// export { auth, db, ref, onValue, push, set, remove };