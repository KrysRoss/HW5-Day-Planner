// Current date string
const month = moment().month();
const day = moment().date();
const year = moment().year();
const formattedDate = `${month}-${day}-${year}`;

// Use date to get the current day of week and hour of day
const date = moment(formattedDate);
const dayIndex = date.day();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const currentDay = daysOfWeek[dayIndex];
const currentHour = 14;

// Check for localStorage object or set an empty schedule
let schedule = JSON.parse(localStorage.getItem("schedule"));
if (schedule === null) {
  schedule = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
  };
}

// Inject day of week into HTML
const currentDayElement = document.getElementById("currentDay");
currentDayElement.innerHTML = currentDay;

// Style hours of day based on current time
for (let hour = 9; hour < 18; hour++) {
  const hourInput = document.getElementById(hour);
  if (hour < currentHour) {
    hourInput.classList.add("past");
  } else if (hour === currentHour) {
    hourInput.classList.add("present");
  } else {
    hourInput.classList.add("future");
  }

  // Add saved event to hour
  hourInput.value = schedule[hour];
}

// Add event listeners for saves
// Save all current data to localStorage on "click"
const saveButtons = document.querySelectorAll(".saveBtn");
for (let button of saveButtons) {
  button.addEventListener("click", () => {
    // Update schedule
    for (let hour = 9; hour < 18; hour++) {
      const hourInput = document.getElementById(hour);
      schedule[hour] = hourInput.value;
    }

    // Save to localStorage
    const saveData = JSON.stringify(schedule);
    localStorage.setItem("schedule", saveData);
    console.log(schedule);
  });
}
