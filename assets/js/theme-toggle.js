const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved user preference, if any, on load of the website
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    htmlElement.classList.add(currentTheme);
    if (currentTheme === 'theme-dark') {
        themeToggleBtn.innerText = 'Light Mode';
    }
} else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.classList.add('theme-dark');
        themeToggleBtn.innerText = 'Light Mode';
    }
}

themeToggleBtn.addEventListener('click', () => {
    if (htmlElement.classList.contains('theme-dark')) {
        htmlElement.classList.remove('theme-dark');
        localStorage.setItem('theme', 'theme-light');
        themeToggleBtn.innerText = 'Dark Mode';
    } else {
        htmlElement.classList.add('theme-dark');
        localStorage.setItem('theme', 'theme-dark');
        themeToggleBtn.innerText = 'Light Mode';
    }
});
