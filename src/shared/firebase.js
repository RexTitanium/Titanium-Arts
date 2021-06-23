import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCnYChQwDtNgoT-2XS0laLdRmFUebtBhCw",
  authDomain: "titaniumarts.firebaseapp.com",
  projectId: "titaniumarts",
  storageBucket: "titaniumarts.appspot.com",
  messagingSenderId: "837838215898",
  appId: "1:837838215898:web:96d2f311ef0c559c53e3e3",
});

var db = firebase.firestore();

export { db };
