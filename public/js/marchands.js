document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addProduit');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        try {
            const res = await fetch('/produits', { method: 'POST', body: formData });
            if (res.ok) {
                const newP = await res.json();
                // Append to list
                const list = document.getElementById('mes-list');
                list.insertAdjacentHTML('beforeend', `<div class="produit-card">...${newP.titre}...</div>`);
                form.reset();
                // Emit socket pour clients
                socket.emit('newProduit', newP);
            }
        } catch (err) { alert('Upload fail – Check photo, reuf! 📸'); }
    });
});