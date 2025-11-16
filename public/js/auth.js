document.addEventListener('DOMContentLoaded', async () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            try {
                const res = await fetch('/auth/login', { method: 'POST', body: formData });
                if (res.ok) window.location = '/espace-client.html'; // Ou redirect server
                else alert('Erreur login – Vérifie tes creds, reuf! 😏');
            } catch (err) { console.error('Auth fail:', err); }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const pwd = document.getElementById('password').value;
            const confirm = document.getElementById('confirm').value;
            if (pwd !== confirm) return alert('MDP mismatch – Focus, boss! 🔒');
            if (pwd.length < 6) return alert('MDP faible, renforce comme un Camer warrior!');
            
            const formData = new FormData(registerForm);
            try {
                const res = await fetch('/auth/register', { method: 'POST', body: formData });
                if (res.ok) window.location = '/login.html';
                else alert('Email déjà pris – Change, génie!');
            } catch (err) { console.error('Reg fail:', err); }
        });
    }
});