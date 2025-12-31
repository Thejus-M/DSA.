/**
 * Layout.js
 * Handles dynamic rendering of Header, Footer, and Table of Contents.
 */

class LayoutManager {
    constructor() {
        this.data = DSA_DATA;
        this.isHome = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
        // Simple check: if we are deeper than root, we assume we are in /problems/
        // A better check might be analyzing the path depth.
        // For this site structure: root is via index.html, subpages are in problems/

        // If the script is loaded in a file inside 'problems/', the root is '../'
        // If loaded in 'index.html', the root is './'
        // We can detect this by checking if 'problems' is in the URL, or simply checking if we are on index.
        const path = window.location.pathname;
        this.isProblemPage = path.includes('/problems/');
        this.rootPath = this.isProblemPage ? '../' : './';
    }

    renderHeader() {
        // Find the mount point
        // We can either look for a specific ID or inject into body if we want to replace existing header
        // But the plan was to use <div id="header-mount"></div>
        const mount = document.getElementById('header-mount');
        if (!mount) return;

        // "DSA." link logic
        const homeLink = this.rootPath + 'index.html';

        mount.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <a href="${homeLink}" class="brand-pixel" style="text-decoration:none; color:inherit;">${this.data.metadata.title}</a>
              <div
                style="text-align:right;font-family:var(--tech);font-size:12px;color:#666;border-top:1px solid #ddd;padding-top:10px;">
                ${this.data.metadata.tagline}
              </div>
            </div>
        `;
    }

    // Version for Problem Pages which have a specific header style (Unified Header)
    // The index.html header and problem page header differ slightly in structure in the current HTML.
    // Index has "TOP BAR" style. Problem pages have "Unified Header" style.
    // We should probably standardize, but for now let's support the mount point replacement.

    // Actually, looking at the approved plan, we wanted to standardize. 
    // Let's create a standard header that adapts.

    // Wait, the user reverted index.html to the "TOP BAR" version.
    // And problem pages have "Unified Header" class="header".
    // Let's try to detect which one to render or standardise on one.
    // The user seems to like the "TOP BAR" style for Index (brand-pixel) and "Unified" for problems.

    getThemeIcon(theme) {
        // Simple geometric icons matching the tech aesthetic
        // Moon for Light Mode (to switch to Dark), Sun for Dark Mode (to switch to Light)
        const sunIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        const moonIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

        return theme === 'dark' ? sunIcon : moonIcon;
    }

    renderCommonHeader() {
        const mount = document.getElementById('header-mount');
        if (!mount) return;

        const homeLink = this.rootPath + 'index.html';
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const icon = this.getThemeIcon(currentTheme);

        // Square-ish button styling to match design language
        const btnStyle = "background:transparent; border:1px solid var(--border); color:var(--text-sub); cursor:pointer; padding:6px; line-height:0; display:flex; align-items:center; justify-content:center; position: relative; z-index: 2147483647; pointer-events: auto;";

        if (this.isProblemPage) {
            mount.className = 'header';
            mount.innerHTML = `
                <a href="${homeLink}" class="header-brand" style="text-decoration: none;">${this.data.metadata.title}</a>
                <div class="header-tagline">
                    <span>UNDERSTAND DATA STRUCTURES,</span>
                    <span>ONE PROBLEM AT A TIME.</span>
                </div>
                <button id="theme-toggle" class="btn-theme" style="${btnStyle} margin-left: 10px;" aria-label="Toggle Theme">${icon}</button>
             `;
        } else {
            // Index Page Style
            mount.innerHTML = `
             <div class="index-header-wrapper" style="display:flex;justify-content:space-between;align-items:flex-start;">
              <a href="${homeLink}" class="brand-pixel" style="text-decoration:none; color:var(--accent);">${this.data.metadata.title}</a>
              <div style="text-align:right; display:flex; flex-direction:column; align-items:flex-end;">
                  <div
                    style="font-family:var(--tech);font-size:12px;color:#666;border-top:1px solid #ddd;padding-top:10px; margin-bottom: 8px;">
                    ${this.data.metadata.tagline}
                  </div>
                  <button id="theme-toggle" class="btn-theme" style="${btnStyle}" aria-label="Toggle Theme">${icon}</button>
              </div>
            </div>
             `;
        }

        // Programmatically attach listener to ensure it works
        // Using setTimeout to ensure DOM is updated (though innerHTML is sync, the browser might need a tick or just to be safe)
        setTimeout(() => {
            const btn = document.getElementById('theme-toggle');
            if (btn) {
                btn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Theme Toggle Clicked');
                    this.toggleTheme();
                };
                console.log('Theme Toggle Listener Attached');
            } else {
                console.error('Theme Toggle Button Not Found');
            }
        }, 0);
    }


    renderFooter() {
        const mount = document.getElementById('footer-mount');
        if (!mount) return;

        // Current style in index.html
        mount.innerHTML = `
             <div style="margin-top:80px;padding:40px 0;border-top:1px solid #ddd;text-align:center;font-family:var(--tech);font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#666;">
                ${this.data.metadata.footerText}
             </div>
        `;

        // Note: Problem pages use a slightly different class-based footer (.nav-footer + .page-footer).
        // If we want to replace that too, we need to handle it.
        // For problem pages, the footer is usually:
        // 1. Nav Footer (Prev/Next) - THIS IS CONTENT SPECIFIC, KEEP IN HTML?
        // 2. Page Footer (Copyright) - THIS IS SHARED.

        // I will only inject the COPYRIGHT footer for now, letting pages handle their nav.
    }

    renderTableOfContents() {
        const mount = document.getElementById('toc-mount');
        if (!mount) return;

        // Calculate counts
        const sectionCount = this.data.categories.length;
        const entryCount = this.data.categories.reduce((acc, cat) => acc + cat.problems.length, 0);

        let html = `
        <div class="section-header">
          <span>TABLE OF CONTENTS [v1.0]</span>
          <span>Sections: ${sectionCount} • Entries: ${entryCount}</span>
        </div>
        <div class="grid-2 gap-lg">
        `;

        this.data.categories.forEach(cat => {
            html += `
            <div>
                <div class="category-title">${cat.title}</div>
                <ul class="problem-list">
            `;

            cat.problems.forEach(prob => {
                // Determine CSS for difficulty (if we want to use it)
                html += `
                <li>
                    <a href="${this.rootPath}${prob.url}">${prob.title}</a>
                    <span class="entry-leader"></span>
                    <span class="entry-value">${prob.difficulty}</span>
                </li>
                `;
            });

            html += `
                </ul>
            </div>
            `;
        });

        html += `</div>`;
        mount.innerHTML = html;
    }

    renderSidebar() {
        // The sidebar mount point should be the <aside> element itself or a div inside it.
        // Strategy: Look for specific ID 'sidebar-mount'.
        // If the HTML has <aside id="sidebar-mount" class="sidebar">, we inject content into it.
        const mount = document.getElementById('sidebar-mount');
        if (!mount) return;

        let html = '';
        const currentPath = window.location.pathname;

        this.data.categories.forEach(cat => {
            html += `
            <div class="sidebar-section">
                <div class="sidebar-section-title">${cat.title}</div>
                <ul class="sidebar-list">
            `;

            cat.problems.forEach(prob => {
                // Determine Active State
                // We check if the current path ends with the problem URL filename
                // prob.url is like "problems/balanced-binary-tree.html"
                // we want to match "balanced-binary-tree.html"
                const probFilename = prob.url.split('/').pop();
                const isActive = currentPath.endsWith(probFilename);
                const activeClass = isActive ? 'active' : '';

                // Link logic:
                // If we are in problems/ folder (which we likely are if sidebar is showing), 
                // we link to sibling files (e.g. "search.html").
                // prob.url is "problems/search.html".
                // So we need to strip "problems/" prefix if we are already in problems/.
                // layout.js rootPath logic:
                // If isProblemPage is true (we are in /problems/), rootPath is "../".
                // So standard link: "../problems/file.html" -> works but goes up and down.
                // Or simplified: "file.html".

                // Let's use the robust rootPath:
                const linkUrl = this.rootPath + prob.url;

                html += `
                    <li class="${activeClass}">
                        <a href="${linkUrl}">${prob.title}</a>
                    </li>
                `;
            });

            html += `
                </ul>
            </div>
            `;
        });

        mount.innerHTML = html;
    }

    injectResponsiveCSS() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = this.rootPath + 'assets/css/responsive.css';
        document.head.appendChild(link);
    }

    injectThemeCSS() {
        // Inject variables.css if not already present
        if (!document.querySelector(`link[href*="variables.css"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = this.rootPath + 'assets/css/variables.css';
            document.head.appendChild(link);
        }
    }

    init() {
        this.injectThemeCSS();
        this.injectResponsiveCSS();
        this.initTheme(); // Initialize theme
        this.renderCommonHeader();
        this.renderTableOfContents();
        this.renderFooter();
        this.renderSidebar();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const target = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', target);
        localStorage.setItem('theme', target);

        const btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.innerHTML = this.getThemeIcon(target);
        }
    }

    // ... existing methods ...

}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.layoutManager = new LayoutManager();
    window.layoutManager.init();
});
