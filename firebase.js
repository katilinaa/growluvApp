import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, set } from 'firebase/database';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvkAGjufjbUwx_EfzPoY-Fv6v1hYmDh9E",
  authDomain: "realtime-database-875c7.firebaseapp.com",
  databaseURL: "https://realtime-database-875c7-default-rtdb.firebaseio.com",
  projectId: "realtime-database-875c7",
  storageBucket: "realtime-database-875c7.firebasestorage.app",
  messagingSenderId: "21499704428",
  appId: "1:21499704428:web:33b35554008ab4b96b1449"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const database = getDatabase(app);
const growLuvInDB = ref(database, "growLuvData");

// Database functions
export const addData = (data) => {
  return push(growLuvInDB, data);
}

export const readData = (callback) => {
  return onValue(growLuvInDB, callback);
}

export { database, growLuvInDB, auth };