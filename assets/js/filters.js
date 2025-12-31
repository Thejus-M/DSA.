const problemGrid = document.getElementById('problem-grid');
const difficultyFilters = document.getElementById('difficulty-filters');
const topicFilters = document.getElementById('topic-filters');

let currentDifficulty = 'all';
let currentTopic = 'all';

function renderProblems() {
    problemGrid.innerHTML = '';

    const filteredProblems = problems.filter(problem => {
        const difficultyMatch = currentDifficulty === 'all' || problem.difficulty === currentDifficulty;
        const topicMatch = currentTopic === 'all' || problem.tags.includes(currentTopic);
        return difficultyMatch && topicMatch;
    });

    if (filteredProblems.length === 0) {
        problemGrid.innerHTML = '<p class="text-muted text-center" style="grid-column: 1/-1;">No problems found matching your filters.</p>';
        return;
    }

    filteredProblems.forEach(problem => {
        const card = document.createElement('a');
        card.href = `problems/${problem.slug}.html`;
        card.className = 'card card--problem';
        card.style.display = 'block'; // Anchor tag needs block to behave like a card container

        // Create tags HTML
        const tagsHtml = problem.tags.map(tag =>
            `<span class="badge" style="background: var(--bg); color: var(--text-muted); border: 1px solid var(--border-subtle); margin-right: 4px;">${tag.replace('-', ' ')}</span>`
        ).join('');

        card.innerHTML = `
      <div class="flex justify-between items-start mb-md">
        <h3 class="card__title" style="margin: 0;">${problem.id}. ${problem.title}</h3>
        <span class="badge badge--${problem.difficulty}">${problem.difficulty}</span>
      </div>
      <p class="card__summary">${problem.summary}</p>
      <div class="mt-md">
        ${tagsHtml}
      </div>
    `;

        problemGrid.appendChild(card);
    });
}

// Event Listeners for Filters
if (difficultyFilters) {
    difficultyFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('chip')) {
            // Remove active class from siblings
            Array.from(difficultyFilters.children).forEach(child => child.classList.remove('active'));
            e.target.classList.add('active');
            currentDifficulty = e.target.dataset.filter;
            renderProblems();
        }
    });
}

if (topicFilters) {
    topicFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('chip')) {
            Array.from(topicFilters.children).forEach(child => child.classList.remove('active'));
            e.target.classList.add('active');
            currentTopic = e.target.dataset.filter;
            renderProblems();
        }
    });
}

// Initial Render
document.addEventListener('DOMContentLoaded', renderProblems);
