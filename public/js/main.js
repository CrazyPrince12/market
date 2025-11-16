// ES Modules 2025 best: Import/export pour maintenance
import { toggleTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    
    // Lazy load imgs pour perf
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading]').forEach(img => img.loading = 'lazy');
    }
    
    console.log('GeekMarket loaded – Ready for drops! 🔥');
});