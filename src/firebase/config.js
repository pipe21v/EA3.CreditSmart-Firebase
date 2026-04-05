// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJZBnVEHFx3WGfY849zDOLdpEjR5aUGWo",
  authDomain: "creditsmart-22216.firebaseapp.com",
  projectId: "creditsmart-22216",
  storageBucket: "creditsmart-22216.firebasestorage.app",
  messagingSenderId: "491251190015",
  appId: "1:491251190015:web:35853e5e30f024676b64ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);