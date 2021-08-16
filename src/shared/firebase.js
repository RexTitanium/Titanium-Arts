import firebase from "firebase";
import 'firebase/firebase-firestore';
import "firebase/firebase-storage";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCnYChQwDtNgoT-2XS0laLdRmFUebtBhCw",
  authDomain: "titaniumarts.firebaseapp.com",
  projectId: "titaniumarts",
  storageBucket: "titaniumarts.appspot.com",
  messagingSenderId: "837838215898",
  appId: "1:837838215898:web:96d2f311ef0c559c53e3e3",
});

export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();

export default firebase;
