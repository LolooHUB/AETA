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
const rankingTable = document.querySelector("#ranking tbody");

async function cargarRanking() {
  rankingTable.innerHTML = "";
  const snapshot = await getDocs(collection(db, "jugadores"));
  let jugadores = [];
  snapshot.forEach(doc => jugadores.push(doc.data()));
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

cargarRanking();
