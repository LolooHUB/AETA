// ===============================
// 🚀 Firebase Inicialización Fachera
// ===============================

// Importa los módulos que necesites desde el SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// 🧩 Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBVOrWY4LbM4OdFSfqjLyzIFGZlP33Ot5g",
  authDomain: "aeta-c483d.firebaseapp.com",
  projectId: "aeta-c483d",
  storageBucket: "aeta-c483d.firebasestorage.app",
  messagingSenderId: "738357607533",
  appId: "1:738357607533:web:a6b57ee4c2c1a675a31364",
  measurementId: "G-2N79RRZTSN"
};

// 🔥 Inicializa Firebase
const app = initializeApp(firebaseConfig);

// 📦 Servicios principales (Firestore, Auth, Storage)
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// 📊 Inicializa Analytics solo si el navegador lo soporta
let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
    console.log("📈 Analytics activado");
  } else {
    console.log("⚠️ Analytics no soportado en este navegador");
  }
});

// ===============================
// 🌐 Exporta los módulos
// ===============================
export { app, db, auth, storage, analytics };
