/**
 * Enhanced Copy Code Function with Icon Animation
 * Includes fallback for mobile/insecure contexts
 */
function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('code');
    const code = codeBlock.innerText;

    // UI Update Helper
    const showSuccess = () => {
        button.classList.add('copied');
        const originalText = button.textContent.trim().replace('[ ]', '').trim(); // Handle if icon text was read
        
        // Preserve width to prevent jumping if possible, or just update text
        button.textContent = 'COPIED!';
        
        setTimeout(() => {
            button.classList.remove('copied');
            button.textContent = 'COPY'; // Hardcode specific revert text to be safe
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
