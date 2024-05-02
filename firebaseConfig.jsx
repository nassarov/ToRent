// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0kcog_iskHSIUTyYk3rVJg9kPFXKV0Fo",
  authDomain: "testing-e0a22.firebaseapp.com",
  projectId: "testing-e0a22",
  storageBucket: "testing-e0a22.appspot.com",
  messagingSenderId: "420006029975",
  appId: "1:420006029975:web:8b98ee075ede94e4d017d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth, app };