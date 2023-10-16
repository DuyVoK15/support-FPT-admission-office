// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAVNIh-RA2rgMZh3zGvQsO2DIepWfVIGJ8",
  authDomain: "supfamof-c8c84.firebaseapp.com",
  databaseURL: "https://supfamof-c8c84-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "supfamof-c8c84",
  storageBucket: "supfamof-c8c84.appspot.com",
  messagingSenderId: "799879175588",
  appId: "1:799879175588:web:26e0facc264f8bd6caf531",
  measurementId: "G-LLT7X3RFYH"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
