let countDown;
const timerDisplay = document.querySelector(".display-time-left");
const endTime = document.querySelector(".display-time-end");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  clearInterval(countDown);

  const now = Date.now();
  const then = now + seconds * 1000;

  // Save the end time to localStorage
  localStorage.setItem("timerEnd", then);

  displayTimeLeft(seconds);
  displayEndTime(then);

  countDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft <= 0) {
      clearInterval(countDown);
      localStorage.removeItem("timerEnd"); // Clear the storage when the timer ends
      // Update text content when time is up
      timerDisplay.textContent = "Time's Up!";
      document.title = "Time's Up!";
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timeStamp) {
  const end = new Date(timeStamp);
  const hour = end.getHours();
  const adjustedHours = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});

// Check localStorage for existing timer on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedEndTime = localStorage.getItem("timerEnd");
  if (storedEndTime) {
    const secondsLeft = Math.round((storedEndTime - Date.now()) / 1000);
    if (secondsLeft > 0) {
      timer(secondsLeft); // Resume timer if time is left
    } else {
      localStorage.removeItem("timerEnd"); // Clear expired timer
    }
  }
});
