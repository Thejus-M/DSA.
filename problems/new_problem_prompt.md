# Prompt for Creating a New DSA Problem Page

Create a new DSA problem page with the following specifications:

### **Design Language & Aesthetic**

- **Style**: Cyberpunk/tech-inspired minimalist design with monospace typography
- **Color Scheme**: Uses CSS variables from `variables.css` - steel blue accents (`--accent`), clean backgrounds, subtle borders.
  - **Light Mode Aesthetics**: Strict adherence to a "Paper-Like" feel. Avoid pure white (`#FFF`). Use `--bg-body` (#E2DFD6) for large surfaces and `--bg-card-elevated` (#EBE8DF) for interactive elements like buttons, inputs, and player trays.
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
- **Canvas Animations**: On small screens (< 700px), canvases maintain min-width of 600px with horizontal scroll

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
    <script src="../assets/js/theme-init.js"></script>
    <link rel="stylesheet" href="../assets/css/variables.css" />
    <link rel="stylesheet" href="../assets/css/problems.css" />
    <link rel="stylesheet" href="../assets/css/responsive.css" />
    <link rel="stylesheet" href="../assets/css/visualization.css" />
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

    <!-- Problem-specific CSS inline -->
    <style>
      /* Add problem-specific styles here */
    </style>
  </head>
  <body>
    <!-- Content here -->
    <script src="../assets/js/problems.js"></script>
    <script src="../assets/js/data.js"></script>
    <script src="../assets/js/layout.js"></script>

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
<div class="header-status">
    <span class="progress-number" id="progress-number">0.00</span>
    <div class="progress-tick-top"></div>
</div>
</header>
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
concept step-by-step.** #### Design Requirements: - **Phase 1-5**: Progress from
Brute Force -> Optimization -> Final Insight. - **Auto-looping GIFs**: Each
phase loops independently (4-8s timing). - **Player Tray UI**: Controls are
shown in a dedicated bar *below* the canvas (Player Tray), not as an overlay. -
**Dynamic Themes**: Must use `getColors()` helper in JS for live theme updates.
- **Buttons**: Include Pause/Play, Restart, and Speed/Step controls. ```html
<section class="content-section">
  <h2>Intuition</h2>
  <p>Let's break down the solution into four key phases...</p>

  <!-- Phase 1: Brute Force -->>
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

  <!-- Phase 2: Identifying Problem -->
  <div class="phase-section">
    <h3 class="phase-title">Phase 2: Identifying Repetition</h3>
    <p class="phase-description">Notice the repeated work...</p>
    <div class="phase-canvas-wrapper">
      <canvas
        id="phase2-canvas"
        class="phase-canvas"
        width="800"
        height="400"
      ></canvas>
      <div class="phase-controls playing">
        <button id="play-btn-2" onclick="togglePhase(2)">❚❚</button>
        <button onclick="restartPhase(2)">↻</button>
        <div class="control-group speed-controls">
          <button onclick="setSpeed(2, 0.5)">0.5x</button>
          <button class="active" onclick="setSpeed(2, 1)">1x</button>
          <button onclick="setSpeed(2, 2)">2x</button>
        </div>
        <div class="control-group nav-controls">
          <button onclick="stepPhase(2, -1)">❮</button>
          <button onclick="stepPhase(2, 1)">❯</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Phase 3 & 4: Similar structure -->

  <p>Final insight paragraph...</p>
</section>

<!-- Interactive Visualization (Triple Comparison) -->
<section class="content-section" style="margin-top: 60px;">
  <h2>Interactive Visualization</h2>
  <p style="margin-bottom: 30px;">
    Compare <b>Recursive</b>, <b>Memoized</b>, and <b>Tabulation</b> patterns
    simultaneously.
  </p>

  <div class="demo-container">
    <div
      class="demo-input-group"
      style="display: flex; flex-wrap: wrap; gap: 15px; align-items: center; justify-content: center;"
    >
      <div style="display: flex; align-items: center; gap: 10px;">
        <label for="text1-input" class="demo-label">S1:</label>
        <input
          type="text"
          id="text1-input"
          class="demo-input"
          value="abcde"
          maxlength="10"
          style="width: 100px;"
        />
      </div>
      <button class="demo-btn" onclick="initDemo()" style="margin-left: 0;">
        RE-INITIALIZE
      </button>
    </div>

    <div class="comparison-grid">
      <!-- 1. Recursive Card -->
      <div class="viz-card">
        <div class="viz-header">
          <span class="viz-title">1. RECURSIVE</span>
          <span class="viz-stat" id="stat-recursive">Calls: 0</span>
        </div>
        <div class="canvas-container">
          <canvas id="canvas-recursive" width="400" height="400"></canvas>
        </div>
        <p class="viz-desc">
          Explores every path. Shows redundant work with red highlights.
        </p>
      </div>

      <!-- 2. Memoization Card -->
      <div class="viz-card">
        <div class="viz-header">
          <span class="viz-title">2. MEMOIZATION</span>
          <span class="viz-stat" id="stat-memo">Hits: 0</span>
        </div>
        <div class="canvas-container">
          <canvas id="canvas-memo" width="400" height="400"></canvas>
        </div>
        <p class="viz-desc">
          Top-down with cache. Highlights cache hits in green.
        </p>
      </div>

      <!-- 3. Tabulation Card -->
      <div class="viz-card">
        <div class="viz-header">
          <span class="viz-title">3. TABULATION</span>
          <span class="viz-stat" id="stat-tab">Idx: (0,0)</span>
        </div>
        <div class="canvas-container">
          <canvas id="canvas-tab" width="400" height="400"></canvas>
        </div>
        <p class="viz-desc">
          Bottom-up matrix filling. Systematically builds solution.
        </p>
      </div>
    </div>

    <div
      class="demo-controls"
      style="margin-top: 30px; display: flex; justify-content: center; align-items: center; gap: 15px;"
    >
      <button class="demo-btn" onclick="stepDemo(-1)" id="prev-step-btn">
        ❮
      </button>
      <div class="step-info" id="step-counter">STEP: 0</div>
      <button class="demo-btn" onclick="stepDemo(1)" id="next-step-btn">
        ❯
      </button>
    </div>
  </div>
</section>
````

#### Animation Teaching Flow (Example for Climbing Stairs):

- **Step 1**: Show brute force approach (all possible paths)
- **Step 2**: Highlight repeated work/subproblems
- **Step 3**: Show the pattern/recurrence relation visually
- **Step 4**: Connect to known pattern (e.g., Fibonacci)
- **Step 5**: Show optimal approach building up from base cases

#### Inline CSS for Animation:

_Use the global `visualization.css` styles. No inline CSS needed._

#### Sample JavaScript for Triple Visualization:

```javascript
// 1. Define State Object to track traces
let demoState = {
  s1: "",
  currentStep: 0,
  maxSteps: 0,
  recursive: { trace: [], calls: 0 },
  memo: { trace: [], hits: 0 },
  tab: { trace: [] },
};

// 2. initialize Traces (Run algorithms but RECORD steps instead of returning)
function initDemo() {
  // ... reset state ...
  function traceRec(n) {
    demoState.recursive.trace.push({ n, type: "call" });
    // ... standard logic ...
    demoState.recursive.trace.push({ n, type: "return", val });
  }
}

// 3. Render function (Finds state at DemoState.currentStep)
function updateDemoUI() {
  // Draw all 3 canvases based on current step
  drawRecursive();
  drawMemo();
  drawTab();
}
```

### 6. Section Divider

```html
<div class="section-divider" aria-hidden="true"></div>
```

### 7. Solution Code

```html
<section class="content-section">
  <h2>Solution: [Approach Name]</h2>
  <div class="code-block-wrapper">
    <span class="code-label">Python Solution</span>
    <button class="copy-btn" onclick="copyCode(this)">COPY</button>
    <pre><code class="language-python">[Python code]</code></pre>
  </div>
</section>
```

### 8. Complexity Analysis

```html
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
```

### 9. Interactive Visualization (Optional)

```html
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

    <!-- Result / Conclusion Bar -->
    <div
      class="demo-result"
      style="margin-top: 25px; justify-content: center; border-style: dashed; opacity: 0.9;"
    >
      <span class="result-label">FINAL RESULT:</span>
      <span class="result-value" id="result-value">0</span>
    </div>
  </div>
</section>
```

### 10. Footer Mount

```html
<footer id="footer-mount"></footer>
```

---

## **Data File Updates**

### Update `assets/js/data.js`:

```javascript
{
    title: "[CATEGORY NAME]",
    problems: [
        {
            title: "[Problem Title]",
            url: "problems/[problem-slug].html",
            difficulty: "EASY/MEDIUM/HARD",
            difficultyClass: "easy/medium/hard"
        }
    ]
}
```

### Update `assets/js/data-problems.js`:

```javascript
{
    id: [LeetCode Problem Number],
    title: "[Problem Title]",
    slug: "[problem-slug]",
    difficulty: "easy/medium/hard",
    tags: ["tag1", "tag2", "tag3"],
    summary: "[Brief one-line description]"
}
```

---

## **Key Features**

✅ Automatic header, sidebar, and footer injection via `layout.js`  
✅ Scroll progress tracking (ruler ticks + percentage)  
✅ Code copy buttons with feedback  
✅ Syntax highlighting with Prism.js (rich colors for dark mode)  
✅ Responsive design (collapses sidebar on mobile)  
✅ Section dividers with decorative pattern (`:⋮:⋮ ...`)  
✅ Terminal-style problem statement cards  
✅ Clean complexity analysis grid  
✅ **The Question Section**: Example cases and foundational concepts (REQUIRED)  
✅ **Animated intuition walkthrough**: Step-by-step logic (REQUIRED)  
✅ **Sidebar/Sub-Navbar TOC**: Automatically picks up H2 sections (Question, Intuition, Solution, Complexity, Interactive Visualization)  
✅ Dark mode support with CSS variables

---

## **Available Styling Classes**

- `.article-container` - Main content wrapper (max-width: 1000px)
- `.terminal-card` - Problem statement boxes
- `.complexity-card` - Complexity analysis boxes
- `.code-block-wrapper` - Code blocks with copy button
- `.section-divider` - Decorative section separators
- `.tags` / `.tag` - Difficulty and category tags
- `.demo-btn` - Interactive demo buttons
- `.intuition-animation` - Animation container
- `.animation-canvas` - Canvas element for animations
- `.animation-controls` - Control buttons container

---

## **Example Reference**

See `climbing-stairs.html` for a complete example with:

- Inline CSS and JavaScript
- 5-step animated intuition walkthrough
- Looping, pausable animations
- Interactive demo section

---

## **Critical Reminders**

> [!IMPORTANT]
>
> - **Problem statement MUST come first** (terminal card style)
> - **Animated intuition is REQUIRED** - not optional
> - **Only centralize common CSS/JS** - keep problem-specific code inline
> - **Animation should teach, not just illustrate** - progressive understanding
> - **Update both data.js and data-problems.js** when adding a new problem
