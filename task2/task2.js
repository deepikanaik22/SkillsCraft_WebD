const display = document.querySelector('.display');
const startStopBtn = document.getElementById('startStopBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

let timerInterval;
let elapsedTime = 0;
let isRunning = false;
let startTime;
let pausedTime = 0;

function updateDisplay() {
    const time = new Date(elapsedTime);
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startStopTimer() {
    if (!isRunning) {
        startStopBtn.textContent = 'Stop';
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.textContent = 'Start';
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        pausedTime = elapsedTime;
        startStopBtn.disabled = true;
        pauseBtn.textContent = 'Resume';
        isRunning = false;
    } else {
        startTime = Date.now() - pausedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startStopBtn.disabled = false;
        pauseBtn.textContent = 'Pause';
        isRunning = true;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    pausedTime = 0;
    isRunning = false;
    updateDisplay();
    lapsList.innerHTML = '';
    startStopBtn.textContent = 'Start';
    startStopBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
}

function recordLap() {
    const lapTime = display.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
}

startStopBtn.addEventListener('click', startStopTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
