// Demo for Find Minimum in Rotated Sorted Array
class FindMinimumDemo {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.nums = [4, 5, 6, 7, 0, 1, 2];
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
            message: `Finding minimum in rotated sorted array`,
            found: false
        });

        while (left < right) {
            // Check if already sorted
            if (this.nums[left] < this.nums[right]) {
                this.steps.push({
                    left,
                    right,
                    mid: null,
                    message: `Array [${left}...${right}] is sorted (${this.nums[left]} < ${this.nums[right]}). Minimum is at index ${left}.`,
                    found: true,
                    foundIndex: left
                });
                break;
            }

            const mid = Math.floor((left + right) / 2);

            this.steps.push({
                left,
                right,
                mid,
                message: `Checking mid=${mid}, nums[${mid}]=${this.nums[mid]}`,
                found: false
            });

            if (this.nums[right] < this.nums[mid]) {
                this.steps.push({
                    left,
                    right,
                    mid,
                    message: `nums[${right}]=${this.nums[right]} < nums[${mid}]=${this.nums[mid]}. Minimum is in right half.`,
                    found: false
                });
                left = mid + 1;
            } else {
                this.steps.push({
                    left,
                    right,
                    mid,
                    message: `nums[${mid}]=${this.nums[mid]} <= nums[${right}]=${this.nums[right]}. Minimum is in left half (including mid).`,
                    found: false
                });
                right = mid;
            }
        }

        if (!this.steps[this.steps.length - 1].found) {
            this.steps.push({
                left,
                right,
                mid: null,
                message: `Found minimum: ${this.nums[left]} at index ${left}`,
                found: true,
                foundIndex: left
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
                <input type="text" id="demo-array-input-min" value="${this.nums.join(',')}" />
                <button class="demo-btn" id="demo-update-btn-min">Update</button>
            </div>

            <div class="array-container" id="array-viz-min"></div>

            <div class="demo-info">
                <div class="demo-step" id="demo-message-min"></div>
                <div class="demo-stats">
                    <div class="demo-stat">
                        <div class="demo-stat-label">Step</div>
                        <div class="demo-stat-value" id="demo-step-count-min">0</div>
                    </div>
                    <div class="demo-stat">
                        <div class="demo-stat-label">Comparisons</div>
                        <div class="demo-stat-value" id="demo-comparisons-min">0</div>
                    </div>
                </div>
            </div>

            <div class="demo-controls">
                <button class="demo-btn" id="demo-reset-btn-min">⟲ Reset</button>
                <button class="demo-btn" id="demo-prev-btn-min">← Previous</button>
                <button class="demo-btn primary" id="demo-play-btn-min">▶ Play</button>
                <button class="demo-btn" id="demo-next-btn-min">Next →</button>
            </div>
        `;

        this.attachEventListeners();
        this.updateVisualization();
    }

    attachEventListeners() {
        document.getElementById('demo-update-btn-min').addEventListener('click', () => {
            const arrayInput = document.getElementById('demo-array-input-min').value;

            try {
                this.nums = arrayInput.split(',').map(n => parseInt(n.trim()));
                this.currentStep = 0;
                this.generateSteps();
                this.updateVisualization();
            } catch (e) {
                alert('Invalid input. Please enter comma-separated numbers.');
            }
        });

        document.getElementById('demo-reset-btn-min').addEventListener('click', () => {
            this.currentStep = 0;
            this.stop();
            this.updateVisualization();
        });

        document.getElementById('demo-prev-btn-min').addEventListener('click', () => {
            if (this.currentStep > 0) {
                this.currentStep--;
                this.updateVisualization();
            }
        });

        document.getElementById('demo-next-btn-min').addEventListener('click', () => {
            if (this.currentStep < this.steps.length - 1) {
                this.currentStep++;
                this.updateVisualization();
            }
        });

        document.getElementById('demo-play-btn-min').addEventListener('click', () => {
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
        document.getElementById('demo-play-btn-min').innerHTML = '⏸ Pause';

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
        document.getElementById('demo-play-btn-min').innerHTML = '▶ Play';
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
    }

    updateVisualization() {
        const step = this.steps[this.currentStep];
        const arrayViz = document.getElementById('array-viz-min');

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

        document.getElementById('demo-message-min').textContent = step.message || '';
        document.getElementById('demo-step-count-min').textContent = `${this.currentStep}/${this.steps.length - 1}`;
        document.getElementById('demo-comparisons-min').textContent = this.currentStep;

        // Update button states
        document.getElementById('demo-prev-btn-min').disabled = this.currentStep === 0;
        document.getElementById('demo-next-btn-min').disabled = this.currentStep === this.steps.length - 1;
    }
}

// Initialize demo when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('find-minimum-demo')) {
        new FindMinimumDemo('find-minimum-demo');
    }
});
