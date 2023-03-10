const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;
startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function setRandomColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}

function onStartBtnClick() {
  if (!intervalId) {
    intervalId = setInterval(setRandomColor, 1000);
    startBtn.disabled = true;
  }
}

function onStopBtnClick() {
  clearInterval(intervalId);
  intervalId = null;
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
