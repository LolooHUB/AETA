import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// 🔹 Configuración de Firebase
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

const rankingTable = document.querySelector("#ranking tbody");
const headers = document.querySelectorAll("#ranking thead th");

let jugadores = [];
let ordenActual = { campo: "ligas", ascendente: false };

// 🔹 Cargar datos del ranking desde Firestore
async function cargarRanking() {
  rankingTable.innerHTML = "<tr><td colspan='8'>Cargando...</td></tr>";
  const snapshot = await getDocs(collection(db, "jugadores"));
  jugadores = [];
  snapshot.forEach(doc => jugadores.push(doc.data()));

  ordenarYMostrar();
}

// 🔹 Ordenar según el campo elegido
function ordenarYMostrar() {
  const { campo, ascendente } = ordenActual;

  jugadores.sort((a, b) => {
    const valorA = a[campo] ?? 0;
    const valorB = b[campo] ?? 0;
    if (typeof valorA === "string") return ascendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
    return ascendente ? valorA - valorB : valorB - valorA;
  });

  mostrarRanking();
  actualizarIndicadores();
}

// 🔹 Mostrar datos en la tabla
function mostrarRanking() {
  rankingTable.innerHTML = "";
  jugadores.forEach(j => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${j.nombre || "-"}</td>
      <td>${j.ligas ?? 0}</td>
      <td>${j.individuales ?? 0}</td>
      <td>${j.segundosInd ?? 0}</td>
      <td>${j.parejas ?? 0}</td>
      <td>${j.segundosParejas ?? 0}</td>
      <td>${j.premios ?? 0}</td>
      <td>${j.partidos ?? 0}</td>
    `;
    rankingTable.appendChild(tr);
  });
}

// 🔹 Actualizar flechitas visuales de orden
function actualizarIndicadores() {
  headers.forEach(th => {
    th.textContent = th.dataset.campoLabel; // restaurar nombre base
    if (th.dataset.campo === ordenActual.campo) {
      th.textContent += ordenActual.ascendente ? " ⬆️" : " ⬇️";
    }
  });
}

// 🔹 Manejar clics en encabezados
headers.forEach(th => {
  th.dataset.campoLabel = th.textContent.trim();
  th.addEventListener("click", () => {
    const campo = th.dataset.campo;
    if (ordenActual.campo === campo) {
      ordenActual.ascendente = !ordenActual.ascendente;
    } else {
      ordenActual.campo = campo;
      ordenActual.ascendente = false; // por defecto: de mayor a menor
    }
    ordenarYMostrar();
  });
});

// Inicialización
cargarRanking();
