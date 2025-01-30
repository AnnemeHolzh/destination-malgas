// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_OucXlcn7rt4aAoQn0am8J8d7u-CBf-g",
  authDomain: "destinationmalgasdb.firebaseapp.com",
  projectId: "destinationmalgasdb",
  storageBucket: "destinationmalgasdb.firebasestorage.app",
  messagingSenderId: "1061814823120",
  appId: "1:1061814823120:web:03da53a8da5a3e165616d5",
  databaseURL: "https://destinationmalgasdb-default-rtdb.firebaseio.com/"
};

// Initialize Firebase only if it hasn't been initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);

export { app, database };