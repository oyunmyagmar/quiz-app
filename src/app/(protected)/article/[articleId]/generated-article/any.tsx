const body = document.querySelector("body");
const stopWatchContainer = document.createElement("div");
const timeCounter = document.createElement("div");
const minutesSpan = document.createElement("span");
const secondsSpan = document.createElement("span");
const millisecondsSpan = document.createElement("span");
const btnContainer = document.createElement("div");
const startBtn = document.createElement("button");
const stopBtn = document.createElement("button");
const resetBtn = document.createElement("button");
const currentTimePTag = document.createElement("p");

stopWatchContainer.classList.add("stopWatchContainer");
timeCounter.classList.add("timeCounter");
millisecondsSpan.classList.add("millisecondsSpan");
btnContainer.classList.add("btnContainer");
startBtn.classList.add("btn");
stopBtn.classList.add("btn");
resetBtn.classList.add("btn");
currentTimePTag.classList.add("currentTimePTag");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;

millisecondsSpan.innerText = ".00" + milliseconds;
secondsSpan.innerText = ":0" + seconds;
minutesSpan.innerText = "0" + minutes;
startBtn.innerText = "Start";
stopBtn.innerText = "Stop";
resetBtn.innerText = "Reset";

const addMilliseconds = () => {
  let dateToday = new Date();
  let milliseconds = dateToday.getMilliseconds();

  if (milliseconds > 994) {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
  }
  function formatTimer() {
    if (milliseconds < 10) {
      millisecondsSpan.innerText = ".00" + milliseconds;
    } else if (milliseconds < 100) {
      millisecondsSpan.innerText = ".0" + milliseconds;
    } else if (milliseconds < 1000) {
      millisecondsSpan.innerText = "." + milliseconds;
    }
    if (seconds < 10) {
      secondsSpan.innerText = ":0" + seconds;
    } else {
      secondsSpan.innerText = ":" + seconds;
    }
    if (minutes < 10) {
      minutesSpan.innerText = "0" + minutes;
    } else {
      minutesSpan.innerText = "" + minutes;
    }
  }
  formatTimer();
};
let interval;
// = setInterval(addMlliseconds, 1);

startBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = setInterval(addMilliseconds, 1);
});
stopBtn.addEventListener("click", () => {
  clearInterval(interval);
});
resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  millisecondsSpan.innerText = ".00" + milliseconds;
  secondsSpan.innerText = ":0" + seconds;
  minutesSpan.innerText = "0" + minutes;
});

function printRealTime() {
  let dateToday = new Date();
  const currentTime = dateToday.toString().split(" ")[4];
  currentTimePTag.innerText = `Current time: ${currentTime}`;
}
setInterval(printRealTime, 1000);

timeCounter.appendChild(minutesSpan);
timeCounter.appendChild(secondsSpan);
timeCounter.appendChild(millisecondsSpan);
btnContainer.appendChild(startBtn);
btnContainer.appendChild(stopBtn);
btnContainer.appendChild(resetBtn);
stopWatchContainer.appendChild(timeCounter);
stopWatchContainer.appendChild(currentTimePTag);
stopWatchContainer.appendChild(btnContainer);
body.append(stopWatchContainer);
