// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCnxg6AQ6K3VQjUHMij1Qq_x4VYgu4Rp2A",
  authDomain: "packatrack-c64ad.firebaseapp.com",
  projectId: "packatrack-c64ad",
  storageBucket: "packatrack-c64ad.firebasestorage.app",
  messagingSenderId: "778496899642",
  appId: "1:778496899642:web:124b5c7fea45d1128e9303",
  measurementId: "G-32NV2CCLEW"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);