import { io } from 'https://cdn.socket.io/4.7.5/socket.io.esm.min.js'; // ES module Socket 2025

const socket = io();
const produitsList = document.getElementById('produits-list');

async function loadProduits() {
    try {
        const res = await fetch('/produits');
        const produits = await res.json();
        produitsList.innerHTML = produits.map(p => `
            <article class="produit-card">
                <img src="${p.imageUrl}" alt="${p.titre}" loading="lazy">
                <h3>${p.titre}</h3>
                <p>${p.desc}</p>
                <span class="prix">${p.prix}€</span>
                <a href="chat.html?id=${p.userId}" class="btn secondary"><i class="fas fa-comments"></i> Chat</a>
            </article>
        `).join('');
    } catch (err) { console.error('Load fail:', err); }
}

// Realtime: Listen new drop
socket.on('newProduit', (produit) => {
    const card = document.createElement('article');
    card.className = 'produit-card';
    card.innerHTML = `<img src="${produit.imageUrl}" alt="${produit.titre}"> <h3>${produit.titre}</h3> <p>${produit.desc}</p> <span>${produit.prix}€</span>`;
    produitsList.prepend(card);
    // Notif vibe
    alert(`Nouveau drop: ${produit.titre} ! 🔥`);
});

loadProduits(); // Init