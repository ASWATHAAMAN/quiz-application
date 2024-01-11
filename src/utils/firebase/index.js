import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need
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

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ4X8NAxp_1KDF-XbZfVAVFXywBRhN0Bo",
  authDomain: "quiz-b242a.firebaseapp.com",
  projectId: "quiz-b242a",
  storageBucket: "quiz-b242a.appspot.com",
  messagingSenderId: "728934160718",
  appId: "1:728934160718:web:fd37abfd3cb33a6e71661f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
