document.addEventListener("DOMContentLoaded", () => {
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

    document.querySelectorAll('.copyable').forEach(el => {
        el.addEventListener('click', handleCopyClick);
    });

});

window.addEventListener('load', () => {
    document.documentElement.classList.add('transitionsEnabled');
});


async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return;
        } catch (e) {
            console.warn('Clipboard API failed, fallback used', e);
        }
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
    } finally {
        document.body.removeChild(textarea);
    }
}

function handleCopyClick(event) {
    const el = event.currentTarget;
    const text = el.dataset.copy ?? el.textContent.trim();
    copyToClipboard(text);
}
