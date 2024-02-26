import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDt9y9WQH5xvGcqTYAdf9xkP8LTgK4MmRI",
  authDomain: "slot-145a8.firebaseapp.com",
  databaseURL: "https://slot-145a8-default-rtdb.firebaseio.com",
  projectId: "slot-145a8",
  storageBucket: "slot-145a8.appspot.com",
  messagingSenderId: "614409719740",
  appId: "1:614409719740:web:1cfa2e859b977407e365b9",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const projectFunctions = firebase.functions();

// timestamp
const timestamp = firebase.firestore.Timestamp;
const nowTimeStamp = firebase.firestore.Timestamp.now();
export {
  projectFirestore,
  projectAuth,
  projectStorage,
  projectFunctions,
  timestamp,
  nowTimeStamp,
};
