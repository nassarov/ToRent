// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMcAnXd4WmcpQ4Q8xgkqdVrCI22uWEWto",
  authDomain: "test-b60fa.firebaseapp.com",
  projectId: "test-b60fa",
  storageBucket: "test-b60fa.appspot.com",
  messagingSenderId: "782403175569",
  appId: "1:782403175569:web:361d0653ce90faf1896b30",
  measurementId: "G-09S3YYWG32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth, app };