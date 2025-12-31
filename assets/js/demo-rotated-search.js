// Demo for Search in Rotated Sorted Array
class RotatedSearchDemo {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.nums = [4, 5, 6, 7, 0, 1, 2];
        this.target = 0;
        this.steps = [];
        this.currentStep = 0;
        this.isPlaying = false;
        this.playInterval = null;

        this.init();
    }

    init() {
        this.render();
        this.generateSteps();
    }

    generateSteps() {
        this.steps = [];
        let left = 0;
        let right = this.nums.length - 1;

        this.steps.push({
            left,
            right,
            mid: null,
            message: `Starting binary search. Target: ${this.target}`,
            found: false
        });

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            this.steps.push({
                left,
                right,
                mid,
                message: `Checking mid=${mid}, nums[${mid}]=${this.nums[mid]}`,
                found: false
            });

            if (this.nums[mid] === this.target) {
                this.steps.push({
                    left,
                    right,
                    mid,
                    message: `Found target at index ${mid}!`,
                    found: true,
                    foundIndex: mid
                });
                break;
            }

            if (this.nums[left] <= this.nums[mid]) {
                this.steps.push({
                    left,
                    right,
                    mid,
                    message: `Left half [${left}...${mid}] is sorted (${this.nums[left]} <= ${this.nums[mid]})`,
                    found: false
                });

                if (this.nums[left] <= this.target && this.target < this.nums[mid]) {
                    this.steps.push({
                        left,
                        right,
                        mid,
                        message: `Target ${this.target} is in range [${this.nums[left]}...${this.nums[mid]}). Searching left half.`,
                        found: false
                    });
                    right = mid - 1;
                } else {
                    this.steps.push({
                        left,
                        right,
                        mid,
                        message: `Target ${this.target} is NOT in range [${this.nums[left]}...${this.nums[mid]}). Searching right half.`,
                        found: false
                    });
                    left = mid + 1;
                }
            } else {
                this.steps.push({
                    left,
                    right,
                    mid,
                    message: `Right half [${mid}...${right}] is sorted (${this.nums[mid]} <= ${this.nums[right]})`,
                    found: false
                });

                if (this.nums[mid] < this.target && this.target <= this.nums[right]) {
                    this.steps.push({
                        left,
                        right,
                        mid,
                        message: `Target ${this.target} is in range (${this.nums[mid]}...${this.nums[right]}]. Searching right half.`,
                        found: false
                    });
                    left = mid + 1;
                } else {
                    this.steps.push({
                        left,
                        right,
                        mid,
                        message: `Target ${this.target} is NOT in range (${this.nums[mid]}...${this.nums[right]}]. Searching left half.`,
                        found: false
                    });
                    right = mid - 1;
                }
            }
        }

        if (!this.steps[this.steps.length - 1].found) {
            this.steps.push({
                left,
                right,
                mid: null,
                message: `Target ${this.target} not found. Returning -1.`,
                found: false
            });
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="demo-header">
                <div class="demo-title">🎯 Interactive Demo</div>
            </div>
            
            <div class="demo-input">
                <label>Array:</label>
                <input type="text" id="demo-array-input" value="${this.nums.join(',')}" />
                <label>Target:</label>
                <input type="number" id="demo-target-input" value="${this.target}" />
                <button class="demo-btn" id="demo-update-btn">Update</button>
            </div>

            <div class="array-container" id="array-viz"></div>

            <div class="demo-info">
                <div class="demo-step" id="demo-message"></div>
                <div class="demo-stats">
                    <div class="demo-stat">
                        <div class="demo-stat-label">Step</div>
                        <div class="demo-stat-value" id="demo-step-count">0</div>
                    </div>
                    <div class="demo-stat">
                        <div class="demo-stat-label">Comparisons</div>
                        <div class="demo-stat-value" id="demo-comparisons">0</div>
                    </div>
                </div>
            </div>

            <div class="demo-controls">
                <button class="demo-btn" id="demo-reset-btn">⟲ Reset</button>
                <button class="demo-btn" id="demo-prev-btn">← Previous</button>
                <button class="demo-btn primary" id="demo-play-btn">▶ Play</button>
                <button class="demo-btn" id="demo-next-btn">Next →</button>
            </div>
        `;

        this.attachEventListeners();
        this.updateVisualization();
    }

    attachEventListeners() {
        document.getElementById('demo-update-btn').addEventListener('click', () => {
            const arrayInput = document.getElementById('demo-array-input').value;
            const targetInput = parseInt(document.getElementById('demo-target-input').value);

            try {
                this.nums = arrayInput.split(',').map(n => parseInt(n.trim()));
                this.target = targetInput;
                this.currentStep = 0;
                this.generateSteps();
                this.updateVisualization();
            } catch (e) {
                alert('Invalid input. Please enter comma-separated numbers.');
            }
        });

        document.getElementById('demo-reset-btn').addEventListener('click', () => {
            this.currentStep = 0;
            this.stop();
            this.updateVisualization();
        });

        document.getElementById('demo-prev-btn').addEventListener('click', () => {
            if (this.currentStep > 0) {
                this.currentStep--;
                this.updateVisualization();
            }
        });

        document.getElementById('demo-next-btn').addEventListener('click', () => {
            if (this.currentStep < this.steps.length - 1) {
                this.currentStep++;
                this.updateVisualization();
            }
        });

        document.getElementById('demo-play-btn').addEventListener('click', () => {
            this.togglePlay();
        });
    }

    togglePlay() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.play();
        }
    }

    play() {
        this.isPlaying = true;
        document.getElementById('demo-play-btn').innerHTML = '⏸ Pause';

        this.playInterval = setInterval(() => {
            if (this.currentStep < this.steps.length - 1) {
                this.currentStep++;
                this.updateVisualization();
            } else {
                this.stop();
            }
        }, 1500);
    }

    stop() {
        this.isPlaying = false;
        document.getElementById('demo-play-btn').innerHTML = '▶ Play';
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
    }

    updateVisualization() {
        const step = this.steps[this.currentStep];
        const arrayViz = document.getElementById('array-viz');

        arrayViz.innerHTML = this.nums.map((num, idx) => {
            let classes = 'array-cell';
            let labels = '';

            if (step.left !== null && idx === step.left) {
                classes += ' left';
                labels = '<div class="pointer-label left">L</div>';
            }
            if (step.right !== null && idx === step.right) {
                classes += ' right';
                labels += '<div class="pointer-label right">R</div>';
            }
            if (step.mid !== null && idx === step.mid) {
                classes += ' mid';
                labels += '<div class="pointer-label mid">M</div>';
            }
            if (step.found && idx === step.foundIndex) {
                classes += ' found';
            }

            return `
                <div class="${classes}">
                    ${labels}
                    ${num}
                    <div class="array-index">${idx}</div>
                </div>
            `;
        }).join('');

        document.getElementById('demo-message').textContent = step.message || '';
        document.getElementById('demo-step-count').textContent = `${this.currentStep}/${this.steps.length - 1}`;
        document.getElementById('demo-comparisons').textContent = this.currentStep;

        // Update button states
        document.getElementById('demo-prev-btn').disabled = this.currentStep === 0;
        document.getElementById('demo-next-btn').disabled = this.currentStep === this.steps.length - 1;
    }
}

// Initialize demo when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('rotated-search-demo')) {
        new RotatedSearchDemo('rotated-search-demo');
    }
});
