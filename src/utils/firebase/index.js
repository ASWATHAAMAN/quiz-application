// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhA0S3I60_pWKHu-TJGr85E7fBB3MBVpk",
  authDomain: "e-commerce-b5e35.firebaseapp.com",
  projectId: "e-commerce-b5e35",
  storageBucket: "e-commerce-b5e35.appspot.com",
  messagingSenderId: "865040212465",
  appId: "1:865040212465:web:76cfa75d47687e8b952450",
};

// Initialize Firebase
const eCommerceApp = initializeApp(firebaseConfig);
const commerceAuth = getAuth(eCommerceApp);
const googleProvider = new GoogleAuthProvider();
const googleSignInPopUp = () => {
  return signInWithPopup(commerceAuth, googleProvider);
};

const eCommercedb = getFirestore(eCommerceApp);
const createEcommerceDb = async (userFun, extraInformation = {}) => {
  if (!userFun) return;

  const userRef = doc(eCommercedb, `users`, userFun.uid);
  const userSnapShot = await getDoc(userRef);
  console.log(userSnapShot);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userFun;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...extraInformation,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }
};
const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  console.log(email);
  console.log(password);
  return await createUserWithEmailAndPassword(commerceAuth, email, password);
};
const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(commerceAuth, email, password);
};

const onAuthStateChangedFunction = (callback) => {
  return onAuthStateChanged(commerceAuth, callback);
};

const userSignOut = () => {
  return signOut(commerceAuth);
};

export {
  googleSignInPopUp,
  createEcommerceDb,
  createAuthUserWithEmailAndPassword,
  signInUserWithEmailAndPassword,
  onAuthStateChangedFunction,
  userSignOut,
};
