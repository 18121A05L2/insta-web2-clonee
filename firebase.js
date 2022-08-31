// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU8zVGP61XlGnUGR5fU_c7oBndtvMcsco",
  authDomain: "insta-web2-clone.firebaseapp.com",
  projectId: "insta-web2-clone",
  storageBucket: "insta-web2-clone.appspot.com",
  messagingSenderId: "336926127535",
  appId: "1:336926127535:web:d189d59c437979ffd3ab5a",
  measurementId: "G-5N16QWZ2PM",
};

// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {app,db,storage}

