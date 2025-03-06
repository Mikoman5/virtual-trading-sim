import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBHPbzBZgwYLyq7nUL4cpfmqy9ePbfO35Q",
    authDomain: "virtualtradingsim.firebaseapp.com",
    projectId: "virtualtradingsim",
    storageBucket: "virtualtradingsim.firebasestorage.app",
    messagingSenderId: "295217217277",
    appId: "1:295217217277:web:a9f09f17047b4d72380894"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);