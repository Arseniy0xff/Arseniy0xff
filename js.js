document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById('copyrightYear').innerText = new Date().getFullYear();
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const getStoredTheme = () => localStorage.getItem('theme');
    const applyTheme = (theme) => {
        document.documentElement.classList.toggle('dark-theme', theme === 'dark');
        themeToggle.innerText = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    };

    const setTheme = (theme) => {
        applyTheme(theme);
        localStorage.setItem('theme', theme);
    };

    const initTheme = () => {
        const stored = getStoredTheme();
        if (stored === 'light' || stored === 'dark') {
            applyTheme(stored);
            return;
        }
        applyTheme(prefersDark.matches ? 'dark' : 'light');
    };

    initTheme();

    themeToggle.addEventListener('click', () => {
        const nextTheme = document.documentElement.classList.contains('dark-theme') ? 'light' : 'dark';
        setTheme(nextTheme);
    });

    prefersDark.addEventListener('change', (event) => {
        if (!getStoredTheme()) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });
});

window.addEventListener('load', () => {
    document.documentElement.classList.add('transitionsEnabled');
});