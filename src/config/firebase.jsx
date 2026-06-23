import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA-ExuUV3BMZ_0equoHOgsF0GK9rVIkmfk",
  authDomain: "crud-firebase-api-f3920.firebaseapp.com",
  projectId: "crud-firebase-api-f3920",
  storageBucket: "crud-firebase-api-f3920.firebasestorage.app",
  messagingSenderId: "716858863489",
  appId: "1:716858863489:web:f8e10cdd56fad9cf2b8280",
  measurementId: "G-RZM5JP7J2E"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);