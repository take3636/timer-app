'use strict';

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const startTime = 500;
let endTime;
let intervalId;


function check() {
  let countdown = endTime - new Date().getTime();

  if(countdown < 0) {
    clearInterval(intervalId);
    countdown = startTime * 1000;
  }

  const totalSeconds = Math.floor(countdown / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const minutesFormatted = String(minutes).padStart(2, '0');
  const secondsFormatted = String(seconds).padStart(2, '0');

  timer.textContent = `${minutesFormatted}:${secondsFormatted}`;
}


start.addEventListener("click", () => {
  endTime = new Date().getTime() + startTime * 1000;
  start.disabled = true;
  start.classList.add('inactive');
  intervalId = setInterval(check, 100);
});

