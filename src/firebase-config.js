// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd9l7p9YEpTyQyXio-p1kIwr00Z2xQSrc",
  authDomain: "the-human-b3ceb.firebaseapp.com",
  projectId: "the-human-b3ceb",
  storageBucket: "the-human-b3ceb.appspot.com",
  messagingSenderId: "883874062024",
  appId: "1:883874062024:web:58cfe0700dbb81c5544ffd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);