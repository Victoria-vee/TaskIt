document.addEventListener('DOMContentLoaded', () => {
    const modes = {
        focus: { time: 25 * 60, label: 'Focus' },
        shortBreak: { time: 5 * 60, label: 'Short Break' },
        longBreak: { time: 15 * 60, label: 'Long Break' }
    };

    let currentMode = 'focus';
    let timeLeft = modes[currentMode].time;
    let timerInterval = null;
    let isRunning = false;

    const btnModes = document.querySelectorAll('.mode-btn');
    const displayTime = document.getElementById('time-left');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const circle = document.querySelector('.progress-ring__circle');
    const timerDisplay = document.querySelector('.timer-display');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    function updateDisplay() {
        displayTime.textContent = formatTime(timeLeft);
        const totalDuration = modes[currentMode].time;
        const percent = ((totalDuration - timeLeft) / totalDuration) * 100;
        setProgress(100 - percent);
    }

    function switchMode(mode) {
        if (isRunning) {
            if (!confirm('Timer is running! Are you sure you want to switch modes?')) {
                return;
            }
            pauseTimer();
        }

        currentMode = mode;
        timeLeft = modes[currentMode].time;

        // Update active class on buttons
        btnModes.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.mode-btn[data-mode="${mode}"]`).classList.add('active');

        // Allow CSS to style colors by toggling classes
        timerDisplay.className = `timer-display ${mode}`;

        updateDisplay();
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        startBtn.textContent = 'Pause';

        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                pauseTimer();
                alert(`${modes[currentMode].label} session is over!`);
            }
        }, 1000);
    }

    function pauseTimer() {
        isRunning = false;
        clearInterval(timerInterval);
        startBtn.textContent = 'Start';
    }

    function toggleTimer() {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }

    function resetTimer() {
        pauseTimer();
        timeLeft = modes[currentMode].time;
        updateDisplay();
    }

    // Event Listeners
    btnModes.forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchMode(e.target.dataset.mode);
        });
    });

    startBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);

    // Initial Display update
    updateDisplay();
});
