// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librariesww

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4u78V8yEvwdQUCif2DY6GidSMshzytjM",
  authDomain: "tasktrackr-e009c.firebaseapp.com",
  projectId: "tasktrackr-e009c",
  storageBucket: "tasktrackr-e009c.firebasestorage.app",
  messagingSenderId: "531846499347",
  appId: "1:531846499347:web:4eb0ee9bafe9663c6d83e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);