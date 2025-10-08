// ==============================
// 🔥 Conexión a Firebase + Ranking
// ==============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

// Simulación del ranking actual
const jugadores = [
  { nombre: "Nahuel T", total: 118, datos: "8 individuales/80 P - 1 segundo puesto/5 P - 1 parejas/5 P - 3 segundos puestos/7,5 P - 3 premios/19,5 P - 21 partidos/1 P" },
  { nombre: "Tiziano", total: 101, datos: "4 individuales/40 P - 2 segundos puestos/10 P - 7 parejas/35 P - 3 premios/15 P - 22 partidos/1 P" },
  { nombre: "Taiel", total: 57.5, datos: "3 individuales/30 P - 2 segundos puestos/10 P - 1 parejas/5 P - 3 premios/16,5 P - 19 partidos/1 P" },
  { nombre: "Pedro", total: 28.5, datos: "2 segundos puestos/10 P - 3 parejas/15 P - 1 segundo puesto/2,5 P - 16 partidos/1 P" },
  { nombre: "Nahuel V", total: 23.5, datos: "2 individuales/20 P - 1 segundo puesto/2,5 P - 15 partidos/1 P" },
  { nombre: "Bautista", total: 22.5, datos: "1 individual/10 P - 1 segundo puesto/5 P - 1 pareja/5 P - 2 segundos puestos/5 P - 14 partidos" },
  { nombre: "Avril", total: 7.5, datos: "1 segundo puesto/5 P - 1 segundo puesto/2,5 P - 9 partidos" },
  { nombre: "Marlene", total: 5, datos: "1 pareja/5 P - 11 partidos" },
  { nombre: "Martina", total: 2, datos: "1 premio/2 P - 11 partidos" },
  { nombre: "Thiago", total: 2.5, datos: "1 segundo puesto/2,5 P - 7 partidos" }
];

const contenedor = document.getElementById("ranking");
contenedor.innerHTML = "";

// Ordenar y mostrar jugadores
jugadores.sort((a, b) => b.total - a.total).forEach((j, i) => {
  contenedor.innerHTML += `
    <div class="jugador">
      <div class="nombre">${i + 1}) ${j.nombre}</div>
      <div class="datos">${j.datos}</div>
      <div class="total">Total: ${j.total} P</div>
    </div>
  `;
});

// 🔹 Si después querés leer desde Firestore:
// const querySnapshot = await getDocs(collection(db, "jugadores"));
// querySnapshot.forEach((doc) => console.log(doc.id, "=>", doc.data()));
