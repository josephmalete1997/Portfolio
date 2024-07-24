const currentDay = document.querySelector(".title-day");
const calendar = document.querySelector(".calendar");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
currentDay.innerHTML = `${days[new Date().getDay()]} | <b class="current-date"> ${[
  new Date().getDate(),
]} ${months[new Date().getMonth()]}</b>`;

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function getDayOfWeek(year, month, day) {
  return days[new Date(month, year, day).getDay() + 1];
}

// alert(getDayOfWeek(2024, 7, 24));

function addDays() {
  for (let i = 0; i < days.length; i++) {
    const day = document.createElement("div");
    day.classList.add("days-of-the-week");
    day.textContent = days[i].slice(0, 3);
    calendar.append(day);
  }

  for (let i = 1; i <= getDaysInMonth(new Date().getMonth() + 1, new Date().getFullYear()); i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = i;
    if (i === new Date().getDate()) day.classList.add("today");
    calendar.append(day);
  }
  // for (let i = 1; i <= 35; i++) {
  //   const day = document.createElement("div");
  //   day.classList.add("day");
  //   day.textContent = i;
  //   if (i === new Date().getDate()) day.classList.add("today");
  //   calendar.append(day);
  // }
}

addDays();

function selectDays() {
  const days = document.querySelectorAll(".day");

  function clear() {
    for (let i = 0; i < days.length; i++) days[i].classList.remove("selected-day");
  }

  days.forEach((day) => {
    day.addEventListener("click", () => {
      clear();
      day.classList.add("selected-day");

      currentDay.innerHTML = `${getDayOfWeek(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        day.innerHTML
      )} | <b class="current-date"> ${day.innerHTML} ${months[new Date().getMonth()]}</b>`;
    });
  });
}

selectDays();

currentDay.addEventListener("click", () => {
  calendar.classList.toggle("show");
});
