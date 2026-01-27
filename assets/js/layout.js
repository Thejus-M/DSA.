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
              <a href="${homeLink}" class="brand-pixel" style="text-decoration:none; color:inherit;">DSA.</a>
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
          <a href="${homeLink}" class="brand-pixel" style="text-decoration:none; color:var(--accent); font-size: 20px; font-family: var(--font-pixel);">DSA.</a>
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
        // New Modern Footer - Minimalist
        mount.innerHTML = `
             <footer class="site-footer">

                <div class="section-divider" aria-hidden="true"></div>
                
                <div class="footer-tagline">| DSA LEARNING |</div>
                
                <div class="footer-description">
                    UNDERSTAND DATA STRUCTURES,<br>ONE PROBLEM AT A TIME.
                </div>
                
                <div class="footer-copyright">
                    &copy; 2025 DSA
                </div>

                <div class="footer-brand-minimal">T.</div>
             </footer>
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

        // Initialize with Context Header (Unified)
        // Get title from the H1 if available (Problem Name), otherwise fallback
        const h1 = document.querySelector('.article-title');
        // Use textContent to ensure we get text even if hidden, and trim whitespace
        const pageTitle = h1 ? h1.textContent.trim().replace(/\.$/, '') : 'HOME'; 

        let html = `
            <div class="sidebar-context-header">
                <div class="sidebar-context-sup">// NOW_READING</div>
                <div class="sidebar-context-title">${pageTitle}</div>
            </div>
            <div class="sidebar-divider"></div>
            <div class="sidebar-section-title" style="letter-spacing: 2px; margin-bottom: 24px; color: var(--text-sub); opacity: 0.8;">DSA. ARCHIVE</div>
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
        let isDragging = false; // Added for the new logic
        let touchCurrentY = 0; // Added for the new logic
        
        sidebar.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            isDragging = true; // Set dragging state
        }, { passive: true });

        sidebar._swipeMoveHandler = (e) => {
            if (!isDragging) return;
            touchCurrentY = e.touches[0].clientY;
            
            // LOGIC TO PREVENT PULL-TO-REFRESH IN FIREFOX
            const deltaY = touchCurrentY - touchStartY;
            const scrollTop = sidebar.scrollTop;
            
            // If dragging DOWN (positive delta) and at the very top
            if (deltaY > 0 && scrollTop <= 0) {
                 // Prevent default browser action (reload)
                 if (e.cancelable) e.preventDefault();
            }
        };
        sidebar.addEventListener('touchmove', sidebar._swipeMoveHandler, { passive: false }); // passive: false is crucial for preventDefault

        sidebar.addEventListener('touchend', (e) => {
            isDragging = false; // Reset dragging state
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchEndY - touchStartY;
            const scrollTop = sidebar.scrollTop;
            
            // Swipe UP (Expand) -> Delta is NEGATIVE (> 50px drag)
            if (deltaY < -50) {
               sidebar.classList.add('sidebar-expanded');
            }
            
            // Swipe DOWN -> Either collapse or close
            if (deltaY > 50) {
                if (sidebar.classList.contains('sidebar-expanded') && scrollTop <= 5) {
                    // Step 1: Collapse from 90% to 50%
                    sidebar.classList.remove('sidebar-expanded');
                    // Add a small shake or visual cue could be nice here
                } else if (!sidebar.classList.contains('sidebar-expanded') && scrollTop <= 5) {
                    // Step 2: Close completely if already at 50%
                    this.closeSidebar();
                }
            }
        }, { passive: true });
    }

    initPageNavigation() {
        if (!this.isProblemPage) return;

        // Configuration for sections to detect
        const sections = [
            { id: 'section-problem', label: 'Problem', selector: '.terminal-card' },
            { id: 'section-intuition', label: 'Intuition', selector: 'h2', text: 'Intuition' },
            { id: 'section-solution', label: 'Solution', selector: 'h2', text: 'Solution' },
            { id: 'section-complexity', label: 'Complexity', selector: '.complexity-card' },
            { id: 'section-demo', label: 'Interactive Visualization', selector: 'h2', text: 'Interactive' }
        ];

        let navItems = [];
        
        sections.forEach(sec => {
            let el;
            if (sec.text) {
                // Fuzzy match by text content for H2s
                const headers = document.querySelectorAll(sec.selector);
                for (let h of headers) {
                    if (h.textContent.includes(sec.text)) {
                        el = h.closest('section') || h; 
                        break;
                    }
                }
            } else {
                el = document.querySelector(sec.selector);
            }

            if (el) {
                // Assign ID if missing
                if (!el.id) el.id = sec.id;
                navItems.push({ id: el.id, label: sec.label });
            }
        });

        if (navItems.length === 0) return;

        // Render Sub-Navbar
        const nav = document.createElement('div');
        nav.className = 'page-nav-scroll visible'; 
        
        let html = '';
        navItems.forEach((item, index) => {
            // First item active by default
            const activeClass = index === 0 ? 'active' : '';
            html += `<a href="#${item.id}" class="page-nav-item ${activeClass}" onclick="window.layoutManager.scrollToSection(event, '${item.id}')">${item.label}</a>`;
        });
        nav.innerHTML = html;
        
        document.body.appendChild(nav);

        // Render TOC into Sidebar (Unified Desktop/Mobile location)
        const sidebar = document.getElementById('sidebar-mount');
        let sidebarTocItems = []; // Store refs for scroll spy
        let desktopTocItems = [];

        // Identify or create Desktop TOC Container
        let desktopToc = document.querySelector('.desktop-page-nav');
        if (!desktopToc) {
            desktopToc = document.createElement('div');
            desktopToc.className = 'desktop-page-nav';
            document.body.appendChild(desktopToc);
        }

        const renderTocHtml = (items, isDesktop = false) => {
            if (isDesktop) {
                let html = '<div class="desktop-nav-title">ON THIS PAGE</div><ul>';
                items.forEach(item => {
                    html += `<li><a href="#${item.id}" class="desktop-nav-item" data-target="${item.id}" onclick="window.layoutManager.scrollToSection(event, '${item.id}')">${item.label}</a></li>`;
                });
                html += '</ul>';
                return html;
            } else {
                let html = '<div class="sidebar-section-title" style="letter-spacing: 2px;">ON THIS PAGE</div><ul class="sidebar-list sidebar-toc-list">';
                items.forEach((item, index) => {
                    const activeClass = index === 0 ? 'active' : '';
                    html += `<li class="${activeClass}" data-target="${item.id}"><a href="#${item.id}" onclick="window.layoutManager.scrollToSection(event, '${item.id}')">${item.label}</a></li>`;
                });
                html += '</ul><div style="height: 1px; background: var(--border-sub); margin: 20px 0 30px 0;"></div>';
                return html;
            }
        };

        if (sidebar) {
            const tocDiv = document.createElement('div');
            tocDiv.className = 'sidebar-section sidebar-toc'; 
            tocDiv.innerHTML = renderTocHtml(navItems, false);

            const headerDivider = sidebar.querySelector('.sidebar-divider');
            if (headerDivider) {
                headerDivider.after(tocDiv);
            } else {
                const mobileHeader = sidebar.querySelector('.sidebar-mobile-header');
                if (mobileHeader) {
                    mobileHeader.after(tocDiv);
                } else {
                    sidebar.prepend(tocDiv);
                }
            }
            sidebarTocItems = Array.from(tocDiv.querySelectorAll('li'));
        }

        if (desktopToc) {
            desktopToc.innerHTML = renderTocHtml(navItems, true);
            desktopTocItems = Array.from(desktopToc.querySelectorAll('.desktop-nav-item'));
        }

        document.body.classList.add('has-page-nav');

        // Scroll Spy Logic
        window.addEventListener('scroll', () => {
             const mid = window.innerHeight / 3;
             let current = navItems[0].id; // Default to first

             for (let item of navItems) {
                 const el = document.getElementById(item.id);
                 if (el) {
                     const rect = el.getBoundingClientRect();
                     if (rect.top <= mid + 100) { 
                         current = item.id;
                     }
                 }
             }
             
             // Update Active Class (Mobile Strip)
             const links = nav.querySelectorAll('.page-nav-item');
             links.forEach(link => {
                 link.classList.remove('active');
                 if (link.getAttribute('href') === '#' + current) {
                     link.classList.add('active');
                     link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                 }
             });

             // Update Active Class (Sidebar TOC)
             if (sidebarTocItems.length > 0) {
                 sidebarTocItems.forEach(li => {
                     li.classList.toggle('active', li.getAttribute('data-target') === current);
                 });
             }

             // Update Active Class (Desktop Right TOC)
             if (desktopTocItems.length > 0) {
                 desktopTocItems.forEach(a => {
                     a.classList.toggle('active', a.getAttribute('data-target') === current);
                 });
             }
        }, { passive: true });
    }

    scrollToSection(e, id) {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
             // Offset for Fixed Header (60) + Subnav (44) + Margin (20) = ~124
             const y = el.getBoundingClientRect().top + window.pageYOffset - 124; 
             window.scrollTo({top: y, behavior: 'smooth'});
        }
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
        this.initPageNavigation(); // Init On-Page Nav
        this.initDesktopPageNavAutoHide(); // Auto-hide desktop nav
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

    initDesktopPageNavAutoHide() {
        const desktopNav = document.querySelector('.desktop-page-nav');
        if (!desktopNav) return;

        let inactivityTimer;
        const INACTIVITY_DELAY = 3000; // 3 seconds

        const showNav = () => {
            desktopNav.classList.remove('inactive');
            resetTimer();
        };

        const hideNav = () => {
            desktopNav.classList.add('inactive');
        };

        const resetTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(hideNav, INACTIVITY_DELAY);
        };

        // Show on mouse move
        document.addEventListener('mousemove', showNav);

        // Show on scroll
        window.addEventListener('scroll', showNav);

        // Show on hover over nav itself
        desktopNav.addEventListener('mouseenter', () => {
            desktopNav.classList.remove('inactive');
            clearTimeout(inactivityTimer);
        });

        // Resume timer when mouse leaves nav
        desktopNav.addEventListener('mouseleave', resetTimer);

        // Start the initial timer
        resetTimer();
    }

}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.layoutManager = new LayoutManager();
    window.layoutManager.init();
});
