'use strict';

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const timer = document.getElementById('timer');
const audio = document.getElementById('audio');
let selectedMinutes = document.getElementById('selectedMinutes');
let selectedSeconds;
let setTime;
let remainMilliSeconds;
let timerId;
let minutes;
let setMinutes;
let setSeconds;

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 1; i <= 60; i++) {
    let option = document.createElement('option');
    option.text = `${i}分`;
    option.value = i;
    selectedMinutes.appendChild(option);
  }
});

selectedMinutes.addEventListener('input', () => {
  selectedSeconds = selectedMinutes.value * 60;
  setMinutes = String(Math.floor(selectedSeconds / 60)).padStart(2, '0');
  setSeconds = String(selectedSeconds % 60).padStart(2, '0');
  timer.textContent = `${setMinutes}:${setSeconds}`;
});

startButton.addEventListener('click', () => {
  setTime = new Date().getTime() + selectedSeconds * 1000;
  timerId = setInterval(getRemainTime, 100);
  startButton.disabled = true;
  startButton.classList.add('invalid');
});

resetButton.addEventListener('click', () => {
  clearInterval(timerId);
  timer.textContent = `${setMinutes}:${setSeconds}`;
  startButton.disabled = false;
  startButton.classList.remove('invalid');
});

function getRemainTime() {
  remainMilliSeconds = setTime - new Date().getTime();
  if (remainMilliSeconds < 0) {
    clearInterval(timerId);
    audio.play();
    remainMilliSeconds = selectedSeconds * 1000;
    startButton.disabled = false;
    startButton.classList.remove('invalid');
  }

  const remainSeconds = Math.floor(remainMilliSeconds / 1000);
  const minutes = String(Math.floor(remainSeconds / 60)).padStart(2, '0');
  const seconds = String(Math.floor(remainSeconds % 60)).padStart(2, '0');
  timer.textContent = `${minutes}:${seconds}`;
}



