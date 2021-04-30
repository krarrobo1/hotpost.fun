import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAm8WphHaVoygOoJvmamY1ZUqnx4ad-Dzs",
    authDomain: "hotspots-39852.firebaseapp.com",
    projectId: "hotspots-39852",
    storageBucket: "hotspots-39852.appspot.com",
    messagingSenderId: "547034916169",
    appId: "1:547034916169:web:01bc674913888265a2a698",
    measurementId: "G-XEXMZHLRPP"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}