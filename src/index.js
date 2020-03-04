let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
//
// Implement method to display how much time is left in "timeDisplay" element
// extra points for changing page title
//
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsToDisplay = seconds % 60;
  timerDisplay.textContent = ` ${minutes}:${
    secondsToDisplay < 10 ? `0${secondsToDisplay}` : secondsToDisplay
  }`;
}
displayTimeLeft(309);
//
// Implement method to display end time in "endTime" element
//
function displayEndTime(timestamp) {
  // ------------============ Start Here ============------------
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  endTime.innerHTML = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;

  // ------------============ End Here ==============------------
}
displayEndTime(1579952220);

//
// Create timer and start counting down from current time
// use "setInterval" to run function every second
// clear interval after time is up
// remember to update clock every second
//
function timer(seconds) {
  // ------------============ Start Here ============------------
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayEndTime(then);
  countdown = setInterval(() => {
    const timeLeft = Math.round((then - Date.now()) / 1000);
    if (timeLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(timeLeft);
  }, 1000);

  // ------------============ End Here ==============------------
}

//
// Get minutes from event
// call timer with number of seconds from event
// use dataset property from DOM element
//
function startTimer(e) {
  // ------------============ Start Here ============------------
  const second = e.target.dataset.time;
  timer(second);
  // ------------============ End Here ==============------------
}

//
// Add "click" Event Listener to every single button
// use already implemented method "startTimer"
//
// ------------============ Start Here ============------------
buttons.forEach(e => {
  e.addEventListener("click", startTimer);
});
// ------------============ End Here ==============------------

//
// Add "submit" Event Listener to the "customForm" element
// extract value from input field and clear field after setting timer
//
// ------------============ Start Here ============------------
const form = document.querySelector("#custom");
form.addEventListener("submit", e => {
  e.preventDefault();
  const minutes = e.target.elements["time_input"].value;
  timer(minutes * 60);
});
// ------------============ End Here ==============------------
