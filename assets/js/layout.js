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

        // UNIFIED HEADER: Use the Index Page style for ALL pages
        // Apply responsive padding class if we are on a problem page
        const wrapperClass = this.isProblemPage ? "index-header-wrapper header-wrapper-unified" : "index-header-wrapper";
        const wrapperStyle = "display:flex;justify-content:space-between;align-items:center;";

        // Clear any previous classes (like 'header')
        mount.className = '';

        // If on a problem page, ensure the header is FIXED, HIGH Z-INDEX, and OPAQUE
        // so it sits above the sidebar and content.
        if (this.isProblemPage) {
            mount.style.position = 'fixed';
            mount.style.top = '0';
            mount.style.left = '0';
            mount.style.right = '0';
            mount.style.zIndex = '1000'; // Above sidebar (z-index: 100)
            mount.style.backgroundColor = 'var(--bg-body)'; // Ensure text doesn't show through
            mount.style.borderBottom = '1px solid var(--border)'; // Subtle separator
        }

        mount.innerHTML = `
         <div class="${wrapperClass}" style="${wrapperStyle}">
          <a href="${homeLink}" class="brand-pixel" style="text-decoration:none; color:var(--accent); font-size: 20px; font-family: var(--font-pixel);">${this.data.metadata.title}</a>
          <div style="display:flex; align-items:center; gap: 20px;">
              <div class="index-tagline"
                style="font-family:var(--font-mono-sys); font-size:10px; color:var(--text-sub); text-align:right; line-height:1.4; letter-spacing:1px; text-transform: uppercase;">
                ${this.data.metadata.tagline}
              </div>
              <button id="theme-toggle" class="btn-theme" style="${btnStyle} width: 36px; height: 36px; border-color: var(--accent);" aria-label="Toggle Theme">${icon}</button>
          </div>
        </div>
        <div id="header-progress" style="position: absolute; bottom: 0; left: 0; height: 2px; background: var(--accent); width: 0%; transition: width 0.1s;"></div>
         `;

        // Attach listeners after DOM update
        setTimeout(() => {
            // Theme toggle
            const themeBtn = document.getElementById('theme-toggle');
            if (themeBtn) {
                themeBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleTheme();
                };
            }

            // Scroll Progress Listener
            window.addEventListener('scroll', () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                const bar = document.getElementById('header-progress');
                if (bar) {
                    bar.style.width = scrolled + "%";
                }
            });
        }, 0);
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar-mount');
        if (!sidebar) return;

        const isOpen = sidebar.classList.contains('sidebar-open');

        if (isOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    openSidebar() {
        const sidebar = document.getElementById('sidebar-mount');
        if (!sidebar) return;

        // Create backdrop if it doesn't exist
        let backdrop = document.getElementById('sidebar-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'sidebar-backdrop';
            backdrop.className = 'sidebar-backdrop';
            backdrop.onclick = () => this.closeSidebar();
            document.body.appendChild(backdrop);
        }

        // Add close button to sidebar if not present
        if (!sidebar.querySelector('.sidebar-close')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'sidebar-close';
            closeBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
            closeBtn.setAttribute('aria-label', 'Close Navigation');
            closeBtn.onclick = () => this.closeSidebar();
            sidebar.insertBefore(closeBtn, sidebar.firstChild);
        }

        // Open
        sidebar.classList.add('sidebar-open');
        sidebar.classList.remove('sidebar-expanded'); // Start in half-state
        backdrop.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent scroll

        // Hide FAB
        const fab = document.getElementById('mobile-fab');
        if (fab) fab.classList.add('hidden-by-sheet');
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar-mount');
        const backdrop = document.getElementById('sidebar-backdrop');

        if (sidebar) {
            sidebar.classList.remove('sidebar-open');
            sidebar.classList.remove('sidebar-expanded');
        }
        if (backdrop) backdrop.classList.remove('visible');
        document.body.style.overflow = ''; // Restore scroll

        // Show FAB
        const fab = document.getElementById('mobile-fab');
        if (fab) fab.classList.remove('hidden-by-sheet');
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

        // Initialize with Mobile Header (Hidden on Desktop)
        let html = `
            <div class="sidebar-mobile-header">
                <div class="sidebar-mobile-subtitle">// SYSTEM_NAVIGATION</div>
                <div class="sidebar-mobile-title brand-pixel" style="font-family: var(--font-pixel);">DSA.</div>
            </div>
        `;
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
        this.attachSwipeListeners(mount);
    }

    attachSwipeListeners(sidebar) {
        let touchStartY = 0;
        
        sidebar.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        sidebar.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchEndY - touchStartY;
            const scrollTop = sidebar.scrollTop;
            
            // Swipe UP (Expand) -> Delta is NEGATIVE (> 50px drag)
            if (deltaY < -50) {
               sidebar.classList.add('sidebar-expanded');
            }
            
            // Swipe DOWN (Close) -> Delta is POSITIVE (> 50px drag)
            // Only close if at the very top of the scrollable area
            if (deltaY > 50 && scrollTop <= 0) {
                this.closeSidebar();
            }
        }, { passive: true });
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

    renderMobileFAB() {
        // Inject FAB button (Icon: Hamburger)
        const fab = document.createElement('button');
        fab.id = 'mobile-fab';
        fab.className = 'mobile-fab';
        fab.setAttribute('aria-label', 'Open Menu');
        // Hamburger SVG Icon (centered, stroke-width 2)
        fab.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        document.body.appendChild(fab);

        // Click Handler -> Open Bottom Sheet
        fab.onclick = (e) => {
            e.stopPropagation();
            this.toggleSidebar();
        };

        // Scroll Logic: Hide on scroll, Show on stop
        let scrollTimer = null;
        window.addEventListener('scroll', () => {
             // 1. Hide immediately upon ANY scroll event
             fab.classList.add('fab-hidden');

             // 2. Clear previous timer
             if (scrollTimer) clearTimeout(scrollTimer);

             // 3. Show after user stops scrolling for exactly 300ms
             scrollTimer = setTimeout(() => {
                 fab.classList.remove('fab-hidden');
             }, 300);
        }, { passive: true });
    }

    init() {
        this.injectThemeCSS();
        this.injectResponsiveCSS();
        this.initTheme(); // Initialize theme
        this.renderCommonHeader();
        this.renderTableOfContents();
        this.renderFooter();
        this.renderSidebar();
        this.renderMobileFAB(); // Init Mobile FAB
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
