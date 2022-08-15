import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/compat/auth'




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6WHUMnlPihil8lpYCNL7XaCGah-9lOqs",
  authDomain: "chat-react-53722.firebaseapp.com",
  projectId: "chat-react-53722",
  storageBucket: "chat-react-53722.appspot.com",
  messagingSenderId: "381164860764",
  appId: "1:381164860764:web:60ff370f27d61883cdfd99",
  measurementId: "G-7LLVFD8210"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Context = createContext(null)

const auth = getAuth(app)
const firestore = getFirestore(app)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        app,
        auth,
        firestore
    }}>
        <App /> 
    </Context.Provider>
);

