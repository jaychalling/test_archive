document.addEventListener('DOMContentLoaded', () => {
    // State
    let currentQIndex = 0;
    let scores = [];
    const totalQuestions = NOTES.length;
    let isTransitioning = false; // Prevent double clicks

    // DOM Elements
    const qText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    function renderQuestion(index) {
        if (index >= totalQuestions) {
            finishTest();
            return;
        }

        isTransitioning = false;
        const q = NOTES[index];

        // Update Text
        qText.innerText = q.q;

        // Update Progress UI
        const currentNum = index + 1;
        if (progressText) progressText.innerText = `Question ${currentNum} / ${totalQuestions}`;
        if (progressFill) {
            const percent = ((index) / totalQuestions) * 100;
            progressFill.style.width = percent + '%';
        }

        // Build Options
        optionsContainer.innerHTML = '';
        q.options.forEach((optText, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = optText;

            // Interaction
            btn.onclick = () => handleAnswer(btn, index, i);

            optionsContainer.appendChild(btn);
        });
    }

    function handleAnswer(btnElement, qIndex, optIndex) {
        if (isTransitioning) return;
        isTransitioning = true;

        // Visual Feedback (Immediate)
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach(b => b.classList.remove('selected'));
        btnElement.classList.add('selected');

        // Logic
        const q = NOTES[qIndex];
        const score = q.scores[optIndex];
        scores.push(score);

        // Auto Advance Delay
        setTimeout(() => {
            currentQIndex++;
            renderQuestion(currentQIndex);
        }, 300); // 300ms Delay
    }

    function finishTest() {
        // Fill bar to 100% just before redirect
        if (progressFill) progressFill.style.width = '100%';

        const totalScore = scores.reduce((a, b) => a + b, 0);

        // Brief delay to show 100% bar
        setTimeout(() => {
            window.location.href = `/result/${TEST_ID}?score=${totalScore}`;
        }, 200);
    }

    // Init
    renderQuestion(currentQIndex);
});
