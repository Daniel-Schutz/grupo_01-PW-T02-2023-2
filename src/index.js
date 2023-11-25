import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app'; // Modificado para 'compat/app'


const firebaseConfig = {
  apiKey: "AIzaSyDN7zl8feC7B28fHFQCr5TQK4ZxDcfqbYc",
  authDomain: "trabalhoprogweb-213bc.firebaseapp.com",
  projectId: "trabalhoprogweb-213bc",
  storageBucket: "trabalhoprogweb-213bc.appspot.com",
  messagingSenderId: "873094517566",
  appId: "1:873094517566:web:64116c993658e651a9d26f"
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
