// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/database'; // Add the specific Firebase services you need
import { getDatabase, ref, push } from "firebase/database"; // Add these imports

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA06W6wje8KGSU2L_F1-0o4mn-uL4jXtbQ",
  authDomain: "bookingapp-f8633.firebaseapp.com",
  databaseURL: "https://bookingapp-f8633-default-rtdb.firebaseio.com",
  projectId: "bookingapp-f8633",
  storageBucket: "bookingapp-f8633.appspot.com",
  messagingSenderId: "852907166442",
  appId: "1:852907166442:web:8cd1960b7719c8f886a593"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the necessary functions
const database = getDatabase(app);
export { database, ref, push };