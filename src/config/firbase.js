import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBa0LgI0cddQ00tuGZndfW4pKt_UXw1Dz8",
  authDomain: "my-instagram-574ed.firebaseapp.com",
  databaseURL: "https://my-instagram-574ed.firebaseio.com",
  projectId: "my-instagram-574ed",
  storageBucket: "my-instagram-574ed.appspot.com",
  messagingSenderId: "151002097373",
  appId: "1:151002097373:web:854eb47a7c998dccec9d34",
  measurementId: "G-SY7HY2MWEF",
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
