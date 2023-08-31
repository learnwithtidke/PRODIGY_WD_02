const timeDisplay = document.querySelector('.time');
const startStopButton = document.getElementById('startStop');
const lapResetButton = document.getElementById('lapReset');
const lapTimesList = document.querySelector('.lap-times');

let isRunning = false;
let startTime;
let interval;

startStopButton.addEventListener('click', () => {
    if (!isRunning) {
        startStopButton.textContent = 'Stop';
        lapResetButton.textContent = 'Lap';
        start();
    } else {
        startStopButton.textContent = 'Start';
        lapResetButton.textContent = 'Reset';
        stop();
    }
    isRunning = !isRunning;
});

lapResetButton.addEventListener('click', () => {
    if (isRunning) {
        recordLap();
    } else {
        reset();
    }
});

function start() {
    startTime = Date.now() - (interval || 0);
    interval = setInterval(updateTime, 10);
}

function stop() {
    clearInterval(interval);
    interval = null;
}

function updateTime() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    return date.toISOString().substr(11, 8);
}

function recordLap() {
    const lapTime = timeDisplay.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapTimesList.appendChild(lapItem);
}

function reset() {
    stop();
    isRunning = false;
    timeDisplay.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    lapResetButton.textContent = 'Reset';
    lapTimesList.innerHTML = '';
}
