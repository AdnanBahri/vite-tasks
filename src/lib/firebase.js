import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  deleteField,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBttkopLCtozN57ruAmUXuH_F4OhCk8sEw",
  authDomain: "recyclerview-cdfa2.firebaseapp.com",
  databaseURL: "https://recyclerview-cdfa2.firebaseio.com",
  projectId: "recyclerview-cdfa2",
  storageBucket: "recyclerview-cdfa2.appspot.com",
  messagingSenderId: "22237108991",
  appId: "1:22237108991:web:049a8919b8323e1a624aca",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {
  app,
  db,
  auth,
  getAuth,
  onAuthStateChanged,
  collection,
  setDoc,
  doc,
  getDoc,
  arrayRemove,
  arrayUnion,
  getDocs,
  addDoc,
  deleteDoc,
  Timestamp,
  deleteField,
  updateDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
};
