import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN7zl8feC7B28fHFQCr5TQK4ZxDcfqbYc",
  authDomain: "trabalhoprogweb-213bc.firebaseapp.com",
  projectId: "trabalhoprogweb-213bc",
  storageBucket: "trabalhoprogweb-213bc.appspot.com",
  messagingSenderId: "873094517566",
  appId: "1:873094517566:web:64116c993658e651a9d26f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  logout,
};