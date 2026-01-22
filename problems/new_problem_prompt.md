# Prompt for Creating a New DSA Problem Page

Create a new DSA problem page with the following specifications:

### **Design Language & Aesthetic**

- **Style**: Cyberpunk/tech-inspired minimalist design with monospace typography
- **Color Scheme**: Uses CSS variables from `variables.css` - steel blue accents (`--accent`), clean backgrounds, subtle borders
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
<aside class="sidebar" id="sidebar-mount"></aside>
```

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
      <ul style="list-style: disc; padding-left: 20px;">
        <li>[Constraint 1]</li>
        <li>[Constraint 2]</li>
      </ul>
    </div>
  </div>
  <div class="terminal-row">
    <span class="terminal-label">EG:</span>
    <div class="terminal-content mono">
      <div style="margin-bottom: 24px;">
        <div style="margin-bottom: 4px; color: var(--text-sub);">INPUT</div>
        <div style="margin-bottom: 8px;">[input]</div>
        <div style="margin-bottom: 4px; color: var(--text-sub);">OUTPUT</div>
        <div style="margin-bottom: 8px;">[output]</div>
        <div style="color: var(--text-sub); font-size: 0.85rem;">
          Explanation: [explanation]
        </div>
      </div>
    </div>
  </div>
</div>

### 5. Intuition Section with Animated Walkthrough **[CRITICAL]** >### Animated
Intuition Section Structure > **The intuition section MUST include 4 animated,
auto-looping phases that teach the concept step-by-step.** #### Design
Requirements: - **4 Separate Phases**: Break intuition into Phase 1 (Brute
Force), Phase 2 (Identify Problem), Phase 3 (Optimization), Phase 4
(Pattern/Insight) - **Auto-looping GIFs**: Each phase loops independently with
slow, digestible timing (4-8 seconds per loop) - **YouTube-style controls**:
Play/Pause and ↻ Restart buttons overlay at bottom, appear on hover - **Tech
color scheme**: - **Dark Mode**: `#1a1a2e` bg, `#2A5D9C` borders, `#4fc1ff`
text, `#51cf66` accents - **Light Mode**: `#ffffff` bg, `#2A5D9C` borders,
`#133e6e` text, `#51cf66` accents - **Implementation**: Use `getThemeColors()`
helper in JS to switch dynamically - **Monospace fonts**: Share Tech Mono for
labels, JetBrains Mono for numbers - **Smooth animations**: 60+ frames per phase
for fluid motion - **Descriptive text**: Each phase has a title and explanation
paragraph #### Interactive Demo Requirements: - **Dynamic sizing**: Canvas
adjusts to fit any valid input (1-20) - **Strict validation**: Auto-correct
out-of-range inputs, never break or show errors - **Large number support**:
Format large Fibonacci values (e.g., "1.6k" for 1597) - **Tech styling**:
Adaptive themes (White/Navy for Light, Dark/Cyan for Dark) - **Responsive
layout**: Always fits within canvas bounds regardless of input - **Real-time
feedback**: Updates immediately on button click - **Reactivity**: Must update
colors on every frame to support instant theme switching ### HTML Structure:
```html
<!-- Intuition with 4 Auto-Looping Phases -->
<section class="content-section">
  <h2>Intuition</h2>
  <p>Let's break down the solution into four key phases...</p>

  <!-- Phase 1: Brute Force -->
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
      <div class="phase-controls">
        <button id="play-btn-1" onclick="togglePhase(1)">❚❚</button>
        <button onclick="restartPhase(1)">↻</button>
        <button onclick="setSpeed(1, 0.5)">0.5x</button>
        <button class="active" onclick="setSpeed(1, 1)">1x</button>
        <button onclick="setSpeed(1, 2)">2x</button>
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
      <div class="phase-controls">
        <button onclick="togglePhase(2)">▶ Play/Pause</button>
        <button onclick="restartPhase(2)">↻ Restart</button>
      </div>
    </div>
  </div>

  <!-- Phase 3 & 4: Similar structure -->

  <p>Final insight paragraph...</p>
</section>

<!-- Interactive Demo -->
<section class="content-section">
  <h2>Interactive Demo</h2>
  <p>Try it yourself! Enter a number (1-20) and see how the solution grows.</p>

  <div class="demo-container">
    <div class="demo-input-group">
      <label for="demo-input" class="demo-label">Input (n):</label>
      <input
        type="number"
        id="demo-input"
        class="demo-input"
        min="1"
        max="20"
        value="5"
      />
      <button class="demo-btn" onclick="runDemo()">Run</button>
    </div>

    <div class="demo-output">
      <div class="demo-result">
        <span class="result-label">RESULT:</span>
        <span class="result-value" id="result-value">8</span>
      </div>
      <canvas id="demo-canvas" width="900" height="450"></canvas>
    </div>
  </div>
</section>
````

#### Animation Requirements:

1. **Auto-loop**: Animation should continuously loop through all steps
2. **Pausable**: User can pause at any frame
3. **Steppable**: Can move forward/backward through steps
4. **Self-explanatory**: Combined with short text, user should understand without reading long paragraphs

#### Animation Teaching Flow (Example for Climbing Stairs):

- **Step 1**: Show brute force approach (all possible paths)
- **Step 2**: Highlight repeated work/subproblems
- **Step 3**: Show the pattern/recurrence relation visually
- **Step 4**: Connect to known pattern (e.g., Fibonacci)
- **Step 5**: Show optimal approach building up from base cases

#### Inline CSS for Animation:

```css
<style>
    /* Canvas Wrapper */
    .phase-canvas-wrapper {
        position: relative;
        width: 100%;
        margin: 20px 0;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--border);
        background: var(--bg-card);
    }

    .phase-canvas {
        display: block;
        width: 100%;
        height: auto;
    }

    /* Floating Glassmorphic Controls */
    .phase-controls {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(10px);
        display: flex;
        gap: 10px;
        background: rgba(26, 26, 46, 0.85); /* Dark Glass */
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        padding: 8px 16px;
        border-radius: 50px;
        border: 1px solid rgba(42, 93, 156, 0.3);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        z-index: 10;
    }

    /* Reveal on Hover */
    .phase-canvas-wrapper:hover .phase-controls {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
        pointer-events: auto;
    }

    /* Mobile: Always Visible */
    @media (hover: none) {
        .phase-controls {
            opacity: 1 !important;
            transform: translateX(-50%) translateY(0) !important;
            pointer-events: auto !important;
        }
    }

    /* Button Styling */
    .phase-controls button {
        background: transparent;
        border: 1px solid transparent;
        color: #4fc1ff;
        font-family: 'Share Tech Mono', monospace;
        font-size: 14px;
        cursor: pointer;
        padding: 4px 10px;
        border-radius: 12px;
        transition: all 0.2s ease;
    }

    .phase-controls button:hover {
        background: rgba(79, 193, 255, 0.1);
        transform: scale(1.05);
        color: #fff;
    }

    .phase-controls button.active {
        background: rgba(79, 193, 255, 0.2);
        border-color: rgba(79, 193, 255, 0.4);
        color: #fff;
        font-weight: bold;
    }

    /* Light Theme Overrides */
    html[data-theme="light"] .phase-controls {
        background: rgba(255, 255, 255, 0.85);
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    html[data-theme="light"] .phase-controls button {
        color: #2A5D9C;
        border-color: transparent;
    }

    html[data-theme="light"] .phase-controls button:hover {
        background: #2A5D9C;
        color: #fff;
    }

    html[data-theme="light"] .phase-controls button.active {
        background: rgba(42, 93, 156, 0.1);
        border-color: rgba(42, 93, 156, 0.3);
        color: #2A5D9C;
    }

    /* --- Interactive Demo Styling --- */

    /* Demo Input Styling - Adaptive */
    .demo-input {
        background: #1a1a2e;
        color: #4fc1ff;
        border: 2px solid #2A5D9C;
        padding: 8px 12px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
    }

    /* Light Theme Input Override */
    html[data-theme="light"] .demo-input {
        background: #ffffff;
        color: #1e3a5f;
        border: 2px solid #cbd5e1;
    }

    .demo-input:focus {
        outline: none;
        border-color: #51cf66;
        box-shadow: 0 0 8px rgba(81, 207, 102, 0.3);
    }

    html[data-theme="light"] .demo-input:focus {
        border-color: #2A5D9C;
        box-shadow: 0 0 8px rgba(42, 93, 156, 0.2);
    }

    /* Demo Button */
    .demo-btn {
        background: transparent;
        border: 2px solid #2A5D9C;
        color: #2A5D9C;
        padding: 8px 24px;
        font-family: 'Share Tech Mono', monospace;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-left: 12px;
    }

    .demo-btn:hover {
        background: #2A5D9C;
        color: #fff;
    }

    html[data-theme="light"] .demo-btn {
        border-color: #1e3a5f;
        color: #1e3a5f;
    }

    html[data-theme="light"] .demo-btn:hover {
        background: #1e3a5f;
        color: #fff;
    }

    /* Result Bar */
    .demo-result {
        background: #1a1a2e;
        border: 2px solid #2A5D9C;
        padding: 12px 20px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    /* Light Theme Result Override */
    html[data-theme="light"] .demo-result {
        background: #f8fafc;
        border: 2px solid #cbd5e1;
    }

    .result-label {
        font-family: 'Share Tech Mono', monospace;
        font-size: 11px;
        color: #666;
        letter-spacing: 1px;
    }

    .result-value {
        font-family: 'JetBrains Mono', monospace;
        font-size: 24px;
        color: #51cf66;
        font-weight: bold;
    }

    html[data-theme="light"] .result-value {
            color: #1e40af; /* Dark blue for result value in light mode */
    }

    #demo-canvas {
        background: #1a1a2e;
        display: block;
        width: 100%;
    }

    html[data-theme="light"] #demo-canvas {
        background: #f8fafc;
    }
</style>
```

#### Inline JavaScript for Animation:

```javascript
<script>
    const canvas = document.getElementById('intuition-canvas');
    const ctx = canvas.getContext('2d');
    const stepCounter = document.getElementById('step-counter');

    let currentFrame = 0;
    let isPlaying = false;
    let animationInterval = null;

    const FRAMES_PER_STEP = 30; // Short, clip-like animations (was 60)

    const ANIMATION_STEPS = [
        {
            label: "Brute Force Approach",  // Used for step counter only
            draw: (frame) => drawStep1(frame)
        },
        {
            label: "Notice Repeated Work",
            draw: (frame) => drawStep2(frame)
        },
        // ... more steps (3-5 total recommended)
    ];

    // Helper function to draw caption at top-left of canvas
    function drawCaption(text) {
        ctx.fillStyle = '#2A5D9C';
        ctx.font = '13px "Share Tech Mono"';
        ctx.textAlign = 'left';
        ctx.fillText(text.toUpperCase(), 20, 30);
    }

    function drawStep1(frame) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw caption inside canvas (top-left)
        drawCaption("Brute Force - All Possible Ways");

        // Draw your visualization content below
        // All text should be UPPERCASE, monospace style
        // Use frame (0-29) for smooth animations within each clip
    }

    function render() {
        const stepIndex = Math.floor(currentFrame / FRAMES_PER_STEP);
        const step = ANIMATION_STEPS[stepIndex];
        if (step) {
            step.draw(currentFrame % FRAMES_PER_STEP);
            stepCounter.textContent = `STEP ${stepIndex + 1}/${ANIMATION_STEPS.length}`;
        }
    }

    function nextFrame() {
        currentFrame++;
        if (currentFrame >= ANIMATION_STEPS.length * 60) {
            currentFrame = 0; // Loop
        }
        render();
    }

    function nextStep() {
        const currentStepIndex = Math.floor(currentFrame / 60);
        currentFrame = Math.min((currentStepIndex + 1) * 60, (ANIMATION_STEPS.length - 1) * 60);
        render();
    }

    function prevStep() {
        const currentStepIndex = Math.floor(currentFrame / 60);
        currentFrame = Math.max(0, (currentStepIndex - 1) * 60);
        render();
    }

    function play() {
        if (isPlaying) return;
        isPlaying = true;
        animationInterval = setInterval(nextFrame, 50);
    }

    function pause() {
        isPlaying = false;
        if (animationInterval) {
            clearInterval(animationInterval);
        }
    }

    function restart() {
        pause();
        currentFrame = 0;
        render();
    }

    // Event listeners
    document.getElementById('play-btn').addEventListener('click', play);
    document.getElementById('pause-btn').addEventListener('click', pause);
    document.getElementById('prev-btn').addEventListener('click', nextStep);
    document.getElementById('next-btn').addEventListener('click', prevStep);
    document.getElementById('restart-btn').addEventListener('click', restart);

    // Auto-start
    render();
    setTimeout(play, 500);
</script>
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

### 9. Interactive Demo (Optional)

```html
<section class="content-section" style="margin-top: 60px;">
  <h2>Interactive Demo</h2>
  <p style="margin-bottom: 30px;">[Description]</p>
  <!-- Canvas or interactive controls -->
</section>
```

### 10. Navigation Footer

```html
<div class="nav-footer">
  <a href="[previous-problem].html">← Previous Problem</a>
  <a href="[next-problem].html">Next Problem →</a>
</div>
```

### 11. Footer Mount

```html
<div id="footer-mount"></div>
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
✅ **Animated intuition walkthrough (REQUIRED)**  
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
