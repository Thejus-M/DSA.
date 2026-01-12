/**
 * DSA PROBLEM PAGES - CENTRALIZED JAVASCRIPT
 * Shared functionality across all problem pages
 */

// Code copy functionality
function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('code');
    const code = codeBlock.innerText;

    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.innerText;
        button.innerText = 'COPIED!';

        setTimeout(() => {
            button.innerText = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Generate ruler ticks
function initializeRulerTicks() {
    const scaleContainer = document.getElementById('ruler-scale');
    if (!scaleContainer) return;

    const numTicks = 60;
    for (let i = 0; i < numTicks; i++) {
        const tick = document.createElement('div');
        tick.className = 'ruler-tick';
        if (i % 5 === 0) tick.classList.add('major');
        scaleContainer.appendChild(tick);
    }
}

// Update scroll progress
function updateProgress() {
    const numTicks = 60;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    // Update progress number
    const progressNumber = document.getElementById('progress-number');
    if (progressNumber) {
        progressNumber.textContent = progress.toFixed(2);
    }

    // Update ruler ticks
    const ticks = document.querySelectorAll('.ruler-tick');
    const activeIndex = Math.floor(progress * numTicks);
    ticks.forEach((tick, i) => {
        tick.classList.toggle('active', i <= activeIndex);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeRulerTicks();
    updateProgress();
});

// Add scroll and resize listeners
window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', updateProgress);
