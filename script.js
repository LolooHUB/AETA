import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// 🔹 Firebase config
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
const statusEl = document.getElementById("status");

// Contraseña
const PASSWORD = "AETA2025";

// Función para cargar ranking desde Firestore
async function cargarRanking() {
  rankingTable.innerHTML = "";
  const snapshot = await getDocs(collection(db, "jugadores"));
  let jugadores = [];
  snapshot.forEach(doc => {
    jugadores.push(doc.data());
  });

  // Opcional: ordenar por nombre o por ligas
  jugadores.sort((a,b) => b.ligas - a.ligas);

  jugadores.forEach(j => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${j.nombre}</td>
      <td>${j.ligas}</td>
      <td>${j.individuales}</td>
      <td>${j.segundosInd}</td>
      <td>${j.parejas}</td>
      <td>${j.segundosParejas}</td>
      <td>${j.premios}</td>
      <td>${j.partidos}</td>
    `;
    rankingTable.appendChild(tr);
  });
}

// Inicializar tabla al cargar
cargarRanking();

// Registrar nuevo jugador
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

  // Campos numéricos
  const ligas = Number(document.getElementById("ligas").value) || 0;
  const individuales = Number(document.getElementById("individuales").value) || 0;
  const segundosInd = Number(document.getElementById("segundosInd").value) || 0;
  const parejas = Number(document.getElementById("parejas").value) || 0;
  const segundosParejas = Number(document.getElementById("segundosParejas").value) || 0;
  const premios = Number(document.getElementById("premios").value) || 0;
  const partidos = Number(document.getElementById("partidos").value) || 0;

  try{
    await addDoc(collection(db,"jugadores"),{
      nombre,
      ligas,
      individuales,
      segundosInd,
      parejas,
      segundosParejas,
      premios,
      partidos
    });
    statusEl.textContent = "✅ Registrado correctamente";
    cargarRanking();

    // Limpiar inputs
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
