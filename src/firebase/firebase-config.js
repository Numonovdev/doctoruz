// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCeMP9cqqi3kArRHwrPSBSe8Vn44nz1_tI",
  authDomain: "duxtir-uz.firebaseapp.com",
  projectId: "duxtir-uz",
 storageBucket: "duxtir-uz.appspot.com",
  messagingSenderId: "395469831171",
  appId: "1:395469831171:web:47ea227a0c903186832236",
  measurementId: "G-6T22FKV2GP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };