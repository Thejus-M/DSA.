/**
 * DSA PROBLEM PAGES - CENTRALIZED JAVASCRIPT
 * Shared functionality across all problem pages
 */

// Enhanced Copy Code Function with Icon Animation
function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('code');
    const code = codeBlock.innerText;

    // UI Update Helper
    const showSuccess = () => {
        button.classList.add('copied');
        // Handle if icon text was read, remove existing [ ]
        const currentText = button.textContent;
        // If it starts with [ ], clean it for the "COPIED" state or just keep it simple
        // The CSS ::before handles the icon, so we just manage the text.
        
        button.textContent = 'COPIED!';
        
        setTimeout(() => {
            button.classList.remove('copied');
            button.textContent = 'COPY'; 
        }, 2000);
    };

    const showError = (err) => {
        console.error('Copy failed:', err);
        button.classList.add('copied'); // Use same anim for attention
        button.textContent = 'FAILED';
        button.style.borderColor = 'red';
        setTimeout(() => {
            button.classList.remove('copied');
            button.textContent = 'COPY';
            button.style.borderColor = '';
        }, 2000);
    };

    // 1. Try Modern Async API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code)
            .then(showSuccess)
            .catch((err) => {
                // If async fails, try fallback
                fallbackCopy(code, showSuccess, showError);
            });
    } else {
        // 2. Fallback for Mobile/Insecure Contexts
        fallbackCopy(code, showSuccess, showError);
    }
}

/**
 * Fallback using textarea hack and execCommand
 */
function fallbackCopy(text, onSuccess, onError) {
    try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Ensure not visible but part of DOM
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            onSuccess();
        } else {
            onError('execCommand returned false');
        }
    } catch (err) {
        onError(err);
    }
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
