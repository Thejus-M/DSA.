# Prompt for Creating a New DSA Problem Page

Create a new DSA problem page with the following specifications:

### **Design Language & Aesthetic**

- **Style**: Cyberpunk/tech-inspired minimalist design with monospace typography
- **Color Scheme**: Uses CSS variables from `variables.css` - steel blue accents (`--accent`), clean backgrounds, subtle borders.
  - **Light Mode Aesthetics**: Strict adherence to a "Paper-Like" feel. **NEVER use pure white (`#FFF`, `#FFFFFF`, `white`) anywhere — not in CSS, not in JavaScript canvas fills, not in inline styles.** Use `--bg-body` (#E2DFD6) for large surfaces and `--bg-card-elevated` (#EBE8DF) for interactive elements like buttons, inputs, player trays, and canvas cell backgrounds.
- **Typography**:
  - Headers: 'Share Tech Mono' (monospace, uppercase, tech-style)
  - Body: 'EB Garamond' (serif, highly readable)
  - Code: 'JetBrains Mono' (monospace)
  - Pixel art logo: 'Press Start 2P'

### **Mobile Responsiveness**

- **Automatic Handling**: Include `responsive.css` - handles sidebar toggle, layout stacking, and canvas scrolling
- **Header Alignment**: Brand/Logo is absolutely centered on mobile; Hamburger (L) and Theme (R) are spaced
- **Sidebar UX**: Slide-in overlay with themed close button (no red/alert colors)
- **Tablet Smoothing**: Layout adapts gracefully between 900px-1100px (reduced padding, smaller sidebar)
- **Canvas Animations**: On small screens (< 700px), canvases should adapt their size and font scaling. Use `aspect-ratio` to maintain a taller, more readable grid on mobile.
- **Adaptive Typography**: Increase font sizes for phase titles, descriptions, and canvas labels on mobile to ensure readability.

---

## **File Structure & Organization**

### CSS/JS Guidelines

- **Common/Shared** CSS and JS → Store in `assets/css/` and `assets/js/`
- **Problem-Specific** CSS and JS → Inline in the HTML `<style>` and `<script>` tags
- **Rule**: Only centralize code that is truly reusable across multiple problem pages

### Required Headers

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="../../assets/js/theme-init.js"></script>
    <link rel="stylesheet" href="../../assets/css/variables.css" />
    <link rel="stylesheet" href="../../assets/css/problems.css" />
    <link rel="stylesheet" href="../../assets/css/responsive.css" />
    <link rel="stylesheet" href="../../assets/css/visualization.css" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[Problem Name] | DSA</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Share+Tech+Mono&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
      rel="stylesheet"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>

    <!-- Problem-specific CSS inline (REQUIRED — include comparison-grid & viz-card styles) -->
    <style>
      .article-container {
        padding-top: 60px;
      }

      /* Comparator Tool Styles — MUST be inline, not in shared CSS */
      .comparison-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-top: 30px;
      }
      @media (max-width: 900px) {
        .comparison-grid {
          grid-template-columns: 1fr;
        }
      }
      .viz-card {
        background: rgba(42, 93, 156, 0.05);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        transition: border-color 0.3s;
      }
      .viz-card:hover {
        border-color: var(--accent);
      }
      .viz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        border-bottom: 1px solid var(--border);
        padding-bottom: 8px;
      }
      .viz-title {
        font-family: var(--font-mono-sys);
        font-size: 11px;
        color: var(--accent);
        font-weight: bold;
        letter-spacing: 0.5px;
      }
      .canvas-container {
        width: 100%;
        aspect-ratio: 1/1;
        background: var(--bg-body);
        border: 1px solid var(--border-sub);
        border-radius: 4px;
        margin-bottom: 12px;
        overflow: hidden;
        position: relative;
      }
      .canvas-container canvas {
        width: 100%;
        height: 100%;
        display: block;
      }

      /* Mobile Improvements: Enlarged Text & Robust Scaling */
      @media (max-width: 600px) {
        .phase-title {
          font-size: 20px !important;
          margin-bottom: 12px;
        }
        .phase-description {
          font-size: 18px !important;
          line-height: 1.4;
        }
        .phase-canvas {
          height: auto !important;
          min-height: 350px !important;
          aspect-ratio: 1 / 1.1;
        }
        .canvas-container {
          height: auto !important;
          min-height: 350px !important;
          aspect-ratio: 1 / 1.1;
        }
        .viz-title {
          font-size: 16px !important;
        }
        .viz-desc {
          font-size: 16px !important;
        }
      }
    </style>
  </head>
  <body>
    <!-- Content here -->
    <script src="../../assets/js/copy-code.js"></script>
    <script src="../../assets/js/problems.js"></script>
    <script src="../../assets/js/data.js"></script>
    <script src="../../assets/js/layout.js"></script>

    <!-- Problem-specific JavaScript inline -->
    <script>
      // Add problem-specific JavaScript here
    </script>
  </body>
</html>
```

---

## **Page Structure & Sections**

### 1. Header Mount

```html
<div id="header-mount"></div>
```

### 2. Ruler Scale & Sidebar

```html
<div class="ruler-scale" id="ruler-scale"></div>
<div class="page-wrapper">
  <aside class="sidebar" id="sidebar-mount"></aside>
  <main class="main-content">
    <div class="article-container"></div>
  </main>
</div>
```

_Note: Close divs at end of file._

### 3. Article Header

```html
<header class="article-header">
  <div class="article-meta">DSA LEARNING</div>
  <h1 class="article-title">[Problem Name]</h1>
  <div class="tags">
    <span class="tag">[Difficulty: Easy/Medium/Hard]</span>
    <span class="tag">[Category 1]</span>
    <span class="tag">[Category 2]</span>
  </div>
</header>
```

### 4. Problem Statement (Terminal Card) **[REQUIRED FIRST]**

````html
<div class="terminal-card">
  <div class="terminal-row">
    <span class="terminal-label">PROB:</span>
    <div class="terminal-content serif">
      <p style="margin-top: 0;">[Problem description]</p>
    </div>
  </div>
  <div class="terminal-row">
    <span class="terminal-label">CONST:</span>
    <div class="terminal-content mono">
      <ul class="terminal-constraints-list">
        <li>[Constraint 1]</li>
        <li>[Constraint 2]</li>
      </ul>
    </div>
  </div>
  <div class="terminal-row">
    <span class="terminal-label">EXAMPLE:</span>
    <div class="terminal-content mono">
      <ul class="terminal-examples-list">
        <li class="terminal-example-item">
          <span class="terminal-example-bullet">•</span>
          <div class="terminal-example-label">INPUT</div>
          <div class="terminal-example-value">[Input Value]</div>
          <div class="terminal-example-label">OUTPUT</div>
          <div class="terminal-example-value">[Output Value]</div>
          <div class="terminal-example-explanation">Explanation: [Text]</div>
        </li>
      </ul>
    </div>
  </div>
</div>

### 5. The Question Header & Examples ```html
<section class="content-section">
  <h2>The Question</h2>
  <p style="margin-bottom: 40px;">[Top-level summary of the problem goal]</p>

  <div class="phase-section">
    <h3 class="phase-title">Example 1: Basic Matching</h3>
    <p class="phase-description">[Description of Case 1]</p>
    <div class="phase-canvas-wrapper">
      <canvas
        id="phase0a-canvas"
        class="phase-canvas"
        width="800"
        height="400"
      ></canvas>
      <div class="phase-controls playing">...</div>
    </div>
  </div>
</section>
```

<div class="section-divider" aria-hidden="true"></div>

### 6. Intuition Section with Animated Walkthrough **[CRITICAL]** > **The
intuition section MUST include 4-5 animated, auto-looping phases that teach the
concept step-by-step.** #### Animation Architecture Animations are **NOT**
pre-rendered GIFs or videos. They are **frame-by-frame canvas renders** driven
by a `requestAnimationFrame` loop. Each phase has: - A `frame` counter that
increments each tick - A `maxFrames` value after which it loops back to 0 - A
dedicated `drawPhaseN(phase)` function that reads `phase.frame` and renders the
current state This approach allows: - Instant theme reactivity (calls
`getColors()` every frame) - Pause/Resume without loading any assets -
Frame-precise stepping (❮/❯ buttons advance by ~10 frames) - Speed control
(0.5x, 1x, 2x multiplier on frame increment) #### Player Tray UI — Control State
Toggling The control bar below each canvas has **two mutually exclusive control
groups**: - **Speed controls** (0.5x, 1x, 2x) — shown while **playing** - **Nav
controls** (❮, ❯ step buttons) — shown while **paused** This is toggled via the
CSS class `is-paused` on the `.phase-controls` container: ```css
.phase-controls.is-paused .speed-controls { display: none; }
.phase-controls:not(.is-paused) .nav-controls { display: none; } ``` The
`togglePhase()` function MUST toggle this class: ```javascript function
togglePhase(phaseNum) { const phase = phases[phaseNum]; phase.playing =
!phase.playing; document.getElementById(`play-btn-${phaseNum}`).textContent =
phase.playing ? '❚❚' : '▶'; const canvasEl =
document.getElementById(`phase${phaseNum}-canvas`); if (canvasEl) { const
controls = canvasEl.nextElementSibling; if (controls &&
controls.classList.contains('phase-controls')) { if (phase.playing) {
controls.classList.remove('is-paused'); } else {
controls.classList.add('is-paused'); } } } if (phase.playing)
animatePhase(phaseNum); } ``` #### Design Requirements - **Phase 1-4+**:
Progress from Brute Force → Optimization → Final Insight. - **Auto-looping**:
Each phase loops independently via `requestAnimationFrame`. - **Player Tray
UI**: Controls are shown in a dedicated bar *below* the canvas (Player Tray),
not as an overlay. - **Dynamic Themes**: Must use `getColors()` helper in JS for
live theme updates. **NEVER use `#ffffff`** — use `#EBE8DF` for light-mode cell
backgrounds. - **Buttons**: Include Pause/Play (❚❚/▶), Restart (↻), Speed
controls (0.5x/1x/2x), and Step controls (❮/❯). - **Responsive Scaling**:
Implement `syncCanvasSize(canvas)` to match logical pixels to CSS pixels. Always
calculate `cellSize` and `font` based on the canvas width (e.g., `Math.min(50,
canvas.width / cols)`). - **Mobile Readability**: Ensure canvas labels (top/left
pointers) and completion messages are enlarged and centered on small screens. -
**Input `color-scheme`**: All `<input />` elements in dark mode MUST have
`color-scheme: dark` to prevent white browser chrome on spinners/dropdowns.
```html
<section class="content-section">
  <h2>Intuition</h2>
  <p>Let's break down the solution into key phases...</p>

  <!-- Phase 1 -->
  <div class="phase-section">
    <h3 class="phase-title">Phase 1: Brute Force Approach</h3>
    <p class="phase-description">Explanation of brute force...</p>
    <div class="phase-canvas-wrapper">
      <canvas
        id="phase1-canvas"
        class="phase-canvas"
        width="800"
        height="400"
      ></canvas>
      <div class="phase-controls playing">
        <button id="play-btn-1" onclick="togglePhase(1)">❚❚</button>
        <button onclick="restartPhase(1)">↻</button>
        <div class="control-group speed-controls">
          <button onclick="setSpeed(1, 0.5)">0.5x</button>
          <button class="active" onclick="setSpeed(1, 1)">1x</button>
          <button onclick="setSpeed(1, 2)">2x</button>
        </div>
        <div class="control-group nav-controls">
          <button onclick="stepPhase(1, -1)">❮</button>
          <button onclick="stepPhase(1, 1)">❯</button>
        </div>
      </div>
    </div>
  </div>

  <p>Final insight paragraph...</p>
</section>
```

<div class="section-divider" aria-hidden="true"></div>

### 7. Interactive Visualization **[OPTIONAL]** ```html
<section class="content-section" style="margin-top: 60px;">
  <h2>Interactive Visualization</h2>
  <p style="margin-bottom: 30px;">[Description]</p>

  <div class="demo-container">
    <div class="interactive-controls-bar">
      <!-- Input Group (Left on desktop, compact horizontal row on mobile) -->
      <div
        class="demo-input-group"
        style="display: flex; flex-wrap: wrap; gap: 15px; align-items: center;"
      >
        <div style="display: flex; align-items: center; gap: 10px;">
          <label for="input1" class="demo-label">IN:</label>
          <input
            type="text"
            id="input1"
            class="demo-input"
            value="..."
            style="width: 100px;"
          />
        </div>
        <button class="demo-btn" onclick="initDemo()">RE-INITIALIZE</button>
      </div>

      <!-- Step Controls (Right on desktop, Left on Mobile, always strict single line) -->
      <div class="demo-controls demo-step-controls">
        <button class="demo-btn" onclick="stepDemo(-1)" id="prev-step-btn">
          ❮
        </button>
        <div class="step-info" id="step-counter">STEP: 0</div>
        <button class="demo-btn" onclick="stepDemo(1)" id="next-step-btn">
          ❯
        </button>
      </div>
    </div>

    <!-- Input Constraints: Mandatory min/max on all number inputs and JS clamping -->
    <script>
      // Example of mandatory clamping in initDemo
      function initDemo() {
        const inputEl = document.getElementById("input1");
        let val = parseInt(inputEl.value);
        const min = parseInt(inputEl.min);
        const max = parseInt(inputEl.max);

        // Clamp value
        val = Math.max(min, Math.min(max, val));
        inputEl.value = val;

        // Continue with initialization...
      }
    </script>

    <!-- The 3 Cards grid for comparison (eg: Recursive, Memoization, Tabulation) -->
    <div class="comparison-grid">
      <!-- Recursive Card -->
      <div class="viz-card">
        <div class="viz-header">
          <span class="viz-title">1. RECURSIVE (NAIVE)</span>
          <span class="viz-stat" id="stat-recursive">Calls: 0</span>
        </div>
        <div class="canvas-container">
          <canvas id="canvas-recursive" width="400" height="400"></canvas>
        </div>
        <p class="viz-desc">Explores every path without memory.</p>
      </div>

      <!-- Memoization Card -->
      <div class="viz-card">
        <div class="viz-header">
          <span class="viz-title">2. MEMOIZATION</span>
          <span class="viz-stat" id="stat-memo">Hits: 0</span>
        </div>
        <div class="canvas-container">
          <canvas id="canvas-memo" width="400" height="400"></canvas>
        </div>
        <p class="viz-desc">Top-down with a cache.</p>
      </div>

      <!-- Tabulation Card -->
      <div class="viz-card">
        <div class="viz-header">
          <span class="viz-title">3. TABULATION</span>
          <span class="viz-stat" id="stat-tab">Idx: (0,0)</span>
        </div>
        <div class="canvas-container">
          <canvas id="canvas-tab" width="400" height="400"></canvas>
        </div>
        <p class="viz-desc">Bottom-up matrix filling.</p>
      </div>
    </div>
  </div>
</section>
```

<div class="section-divider" aria-hidden="true"></div>

### 8. Solution Code ```html
<section class="content-section">
  <h2>Solution: [Approach Name]</h2>
  <div class="code-block-wrapper">
    <span class="code-label">Python Solution</span>
    <button class="copy-btn" onclick="copyCode(this)">COPY</button>
    <pre><code class="language-python">[Python code]</code></pre>
  </div>
</section>
``` ### 9. Complexity Analysis ```html
<div class="complexity-card">
  <h3>Complexity Analysis</h3>
  <div class="complexity-grid">
    <div class="complexity-item">
      <div class="complexity-label">Time Complexity</div>
      <div class="complexity-value">O(...)</div>
      <div class="complexity-note">[Explanation]</div>
    </div>
    <div class="complexity-item">
      <div class="complexity-label">Space Complexity</div>
      <div class="complexity-value">O(...)</div>
      <div class="complexity-note">[Explanation]</div>
    </div>
  </div>
</div>
``` ``` ### 10. Footer Mount ```html
<footer id="footer-mount"></footer>
``` --- ## **Required JavaScript Boilerplate** Every problem page MUST include
the following JavaScript patterns inline at the bottom. This ensures animations,
theme support, phase controls, and the interactive demo all work consistently.
```javascript // 1. Theme detection function getTheme() { return
document.documentElement.getAttribute("data-theme") || "dark"; } // 2. Color
palette (MUST match CSS variables for both themes) function getColors() { const
isDark = getTheme() === "dark"; return { bg: isDark ? "#1a1a2e" :
"var(--bg-body)", text: isDark ? "#b2ccd6" : "#1e3a5f", accent: isDark ?
"#f0932b" : "var(--accent)", border: isDark ? "#2A5D9C" : "var(--border)",
highlight: isDark ? "#eb4d4b" : "#ef4444", match: isDark ? "#6ab04c" :
"#10b981", gridLine: isDark ? "rgba(42,93,156,0.2)" : "var(--grid-line)",
cellBg: isDark ? "#1e1e36" : "var(--bg-card-elevated)", }; } // 3. Responsive
Scaling Helper (REQUIRED for crisp graphics on all screens) function
syncCanvasSize(canvas) { if (!canvas) return; const rect =
canvas.getBoundingClientRect(); if (canvas.width !== Math.floor(rect.width) ||
canvas.height !== Math.floor(rect.height)) { canvas.width =
Math.floor(rect.width); canvas.height = Math.floor(rect.height); return true; }
return false; } // 4. Phase state management (one entry per phase canvas) const
phases = { 0: { canvas: null, ctx: null, frame: 0, playing: true, speed: 1,
maxFrames: 300, }, 1: { canvas: null, ctx: null, frame: 0, playing: true, speed:
1, maxFrames: 300, }, // ... add more phases as needed }; // 5. Initialize
canvas references function initPhases() { Object.keys(phases).forEach((key) => {
phases[key].canvas = document.getElementById(`phase${key}-canvas`); if
(phases[key].canvas) { phases[key].ctx = phases[key].canvas.getContext("2d"); }
}); } // 5. Control functions (EXACT signatures — do not rename) function
togglePhase(n) { const phase = phases[n]; phase.playing = !phase.playing;
document.getElementById(`play-btn-${n}`).textContent = phase.playing ? "❚❚" :
"▶"; // CRITICAL: Toggle is-paused class to swap speed ↔ nav controls const
canvasEl = document.getElementById(`phase${n}-canvas`); if (canvasEl) { const
controls = canvasEl.nextElementSibling; if (controls &&
controls.classList.contains("phase-controls")) {
controls.classList.toggle("is-paused", !phase.playing); } } updateNavState(n);
if (phase.playing) animatePhase(n); } function restartPhase(n) { phases[n].frame
= 0; updateNavState(n); } function setSpeed(n, speed) { phases[n].speed = speed;
const canvasEl = document.getElementById(`phase${n}-canvas`); if (!canvasEl)
return; const controls = canvasEl.nextElementSibling; if (controls &&
controls.classList.contains("phase-controls")) { const btns =
controls.querySelectorAll("button"); btns.forEach((b) => { if
(b.textContent.includes("x")) { b.classList.remove("active"); if
(b.textContent.trim() === `${speed}x`) { b.classList.add("active"); } } }); } }
function stepPhase(n, dir) { phases[n].playing = false;
document.getElementById(`play-btn-${n}`).textContent = "▶"; phases[n].frame =
Math.max( 0, Math.min(phases[n].maxFrames, phases[n].frame + dir * 20), ); //
Ensure is-paused is set when stepping const canvasEl =
document.getElementById(`phase${n}-canvas`); if (canvasEl) { const controls =
canvasEl.nextElementSibling; if (controls &&
controls.classList.contains("phase-controls")) {
controls.classList.add("is-paused"); } } updateNavState(n); } function
updateNavState(n) { const phase = phases[n]; const canvasEl =
document.getElementById(`phase${n}-canvas`); if (!canvasEl) return; // Manage
wrapper state for visual feedback (START/FINISHED badges + blur) const wrapper =
canvasEl.parentElement; if (wrapper &&
wrapper.classList.contains("phase-canvas-wrapper")) { if (phase.frame <= 0)
wrapper.classList.add("at-start"); else wrapper.classList.remove("at-start"); if
(phase.frame >= phase.maxFrames) wrapper.classList.add("at-end"); else
wrapper.classList.remove("at-end"); } const controls =
canvasEl.nextElementSibling; if (controls) { const prevBtn =
controls.querySelector('button[onclick*="-1"]'); const nextBtn =
controls.querySelector('button[onclick*=" 1)"]'); if (prevBtn) prevBtn.disabled
= phase.frame <= 0; if (nextBtn) nextBtn.disabled = phase.frame >=
phase.maxFrames; } } // 6. Main render loop function drawAll() {
Object.keys(phases).forEach((n) => { const phase = phases[n]; if (!phase.ctx)
return; if (phase.playing) { phase.frame = (phase.frame + phase.speed) %
phase.maxFrames; } // CUSTOM_DRAW_FUNCTION(phase); updateNavState(n); });
requestAnimationFrame(drawAll); } // 7. Bootstrap initPhases();
requestAnimationFrame(drawAll); ``` --- ## **Data File Updates** ### Update
`assets/js/data.js`: ```javascript { title: "[CATEGORY NAME]", problems: [ {
title: "[Problem Title]", url: "problems/[problem-slug].html", difficulty:
"EASY/MEDIUM/HARD", difficultyClass: "easy/medium/hard" } ] } ``` ### Update
`assets/js/data-problems.js`: ```javascript { id: [LeetCode Problem Number],
title: "[Problem Title]", slug: "[problem-slug]", difficulty:
"easy/medium/hard", tags: ["tag1", "tag2", "tag3"], summary: "[Brief one-line
description]" } ``` --- ## **Key Features** ✅ Automatic header, sidebar, and
footer injection via `layout.js` ✅ Scroll progress tracking (ruler ticks +
percentage) ✅ Code copy buttons with feedback ✅ Syntax highlighting with
Prism.js (rich colors for dark mode) ✅ Responsive design (collapses sidebar on
mobile) ✅ Section dividers with decorative pattern (`:⋮:⋮ ...`) ✅
Terminal-style problem statement cards ✅ Clean complexity analysis grid ✅
**The Question Section**: Example cases and foundational concepts (REQUIRED) ✅
**Animated intuition walkthrough**: Step-by-step logic (REQUIRED) ✅
**Sidebar/Sub-Navbar TOC**: Automatically picks up H2 sections (Question,
Intuition, Solution, Complexity, Interactive Visualization) ✅ Dark mode support
with CSS variables --- ## **Available Styling Classes** - `.article-container` -
Main content wrapper (max-width: 1000px) - `.terminal-card` - Problem statement
boxes - `.complexity-card` - Complexity analysis boxes - `.code-block-wrapper` -
Code blocks with copy button - `.section-divider` - Decorative section
separators - `.tags` / `.tag` - Difficulty and category tags - `.demo-btn` -
Interactive demo buttons - `.phase-section` / `.phase-canvas-wrapper` - Phase
animation container - `.phase-controls` - Player tray (Pause/Play, Restart,
Speed, Step) - `.interactive-controls-bar` - Sticky controls bar for the
interactive visualization - `.comparison-grid` / `.viz-card` - Side-by-side
comparison cards - `.canvas-container` - Responsive canvas wrapper with 1:1
aspect ratio - `.demo-result` - Conclusion/result bar --- ## **Example
Reference** See `longest-common-subsequence.html` and `rotate-image.html` for
complete examples with: - Inline CSS and JavaScript (problem-specific styles +
comparison-grid) - Multi-phase animated intuition walkthroughs (4+ phases) -
Looping, pausable, steppable animations with speed controls - Interactive
visualization section with side-by-side comparison grid - Dynamic N sizing and
physics-based flying cell animations - Red/Green heat-map highlighting
(Displacement vs. Correct Position) - Full theme support for paper-like light
mode and high-contrast dark mode --- ## **Critical Reminders** > [!IMPORTANT] >
> - **Problem statement MUST come first** (terminal card style) > - **Animated
intuition is REQUIRED** - not optional > - **Only centralize common CSS/JS** -
keep problem-specific code inline > - **Animation should teach, not just
illustrate** - progressive understanding > - **Update both data.js and
data-problems.js** when adding a new problem > - **Body tag must be `
<body>
  ` — do NOT add a custom class like `problem-page`** > - **Sidebar MUST use
  `id="sidebar-mount"` — NOT a custom sidebar structure** > - **Include
  `theme-init.js` as the FIRST script in `<head>
    `** > - **Include `copy-code.js` BEFORE `problems.js` in the footer
    scripts** > - **The `
    <html>
      ` tag must NOT have `data-theme` hardcoded — `theme-init.js` handles it**
    </html>
  </head>
</body>
````
