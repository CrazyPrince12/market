export function toggleTheme() {
    const current = localStorage.getItem('theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    
    const link = document.getElementById('theme-link');
    link.href = `css/${next}.css`;
    
    const icon = document.querySelector('#theme-toggle i');
    icon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    document.body.classList.toggle('light-theme', next === 'light');
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme') || 'dark';
    document.getElementById('theme-link').href = `css/${theme}.css`;
});