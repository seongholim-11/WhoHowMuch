// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRhkg-gx96sUs37TpFWL0luPkpWczchUU",
  authDomain: "whohowmuch.firebaseapp.com",
  projectId: "whohowmuch",
  storageBucket: "whohowmuch.appspot.com",
  messagingSenderId: "56083658207",
  appId: "1:56083658207:web:18fc51d2ee6d86c8c7006a",
  measurementId: "G-0TBK76Q3CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);