document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const clearLapsBtn = document.getElementById('clearLapsBtn');
    const lapsContainer = document.getElementById('laps');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;

    // Format time as HH:MM:SS.mmm
    function formatTime(time) {
        let hours = Math.floor(time / 3600000);
        let minutes = Math.floor((time % 3600000) / 60000);
        let seconds = Math.floor((time % 60000) / 1000);
        let milliseconds = time % 1000;

        return (
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0') + '.' +
            String(milliseconds).padStart(3, '0')
        );
    }

    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }

    function startTimer() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(function() {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            isRunning = true;
        }
    }

    function pauseTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        updateDisplay();
        isRunning = false;
        lapsContainer.innerHTML = '';
    }

    function recordLap() {
        if (isRunning || elapsedTime > 0) {
            const lapTime = document.createElement('div');
            lapTime.className = 'lap-item';
            lapTime.textContent = `Lap ${lapsContainer.children.length + 1}: ${formatTime(elapsedTime)}`;
            lapsContainer.prepend(lapTime);
        }
    }
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', recordLap);
    clearLapsBtn.addEventListener('click', function() {
        lapsContainer.innerHTML = '';
    });
    updateDisplay();
});