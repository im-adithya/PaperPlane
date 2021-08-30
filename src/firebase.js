import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBl9QpLNHfK2rkXBnufnC-ng0Jb2pVkGXY",
  authDomain: "paper-planeee.firebaseapp.com",
  projectId: "paper-planeee",
  storageBucket: "paper-planeee.appspot.com",
  messagingSenderId: "378147374181",
  appId: "1:378147374181:web:9e4cc5702195f6f8fab28c",
  measurementId: "G-H75894BB19",
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

initFirebase();
firebase.analytics();

export default firebase;
