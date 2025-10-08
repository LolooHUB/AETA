import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBVOrWY4LbM4OdFSfqjLyzIFGZlP33Ot5g",
  authDomain: "aeta-c483d.firebaseapp.com",
  projectId: "aeta-c483d",
  storageBucket: "aeta-c483d.firebasestorage.app",
  messagingSenderId: "738357607533",
  appId: "1:738357607533:web:a6b57ee4c2c1a675a31364",
  measurementId: "G-2N79RRZTSN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PASSWORD = "AETA2025";
const statusEl = document.getElementById("status");

document.getElementById("submitBtn").addEventListener("click", async () => {
  const pass = document.getElementById("password").value;
  if(pass !== PASSWORD){
    statusEl.textContent = "❌ Contraseña incorrecta";
    return;
  }

  const nombre = document.getElementById("nombre").value.trim();
  if(!nombre){
    statusEl.textContent = "❌ Ingresá un nombre";
    return;
  }

  const ligas = Number(document.getElementById("ligas").value) || 0;
  const individuales = Number(document.getElementById("individuales").value) || 0;
  const segundosInd = Number(document.getElementById("segundosInd").value) || 0;
  const parejas = Number(document.getElementById("parejas").value) || 0;
  const segundosParejas = Number(document.getElementById("segundosParejas").value) || 0;
  const premios = Number(document.getElementById("premios").value) || 0;
  const partidos = Number(document.getElementById("partidos").value) || 0;

  try{
    await addDoc(collection(db,"jugadores"),{
      nombre, ligas, individuales, segundosInd, parejas, segundosParejas, premios, partidos
    });
    statusEl.textContent = "✅ Registrado correctamente";

    document.getElementById("nombre").value="";
    document.getElementById("ligas").value="";
    document.getElementById("individuales").value="";
    document.getElementById("segundosInd").value="";
    document.getElementById("parejas").value="";
    document.getElementById("segundosParejas").value="";
    document.getElementById("premios").value="";
    document.getElementById("partidos").value="";
  }catch(e){
    statusEl.textContent = "❌ Error al registrar";
    console.error(e);
  }
});
