const currentDay = document.querySelector(".title-day");
const calendar = document.querySelector(".calendar");
calendar.classList.add("show");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Display current day and date
const now = new Date();
updateCurrentDay(now);

function updateCurrentDay(date) {
  currentDay.innerHTML = `${days[date.getDay()]} | <b class="current-date">${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}</b>`;
}

function getDayOfWeek(year, month, day) {
  const date = new Date(year, month - 1, day);
  const dayOfTheWeek = date.getDay();
  return days[dayOfTheWeek];
}

function generateArrows() {
  let count = 0;
  let yearCount = 0;
  const arrowPanel = document.createElement("div");
  arrowPanel.classList.add("arrow-panel");

  const leftArrow = document.createElement("div");
  leftArrow.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
  leftArrow.classList.add("left-arrow");

  const rightArrow = document.createElement("div");
  rightArrow.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
  rightArrow.classList.add("right-arrow");

  leftArrow.addEventListener("click", () => {
    count--;
    if (count < -now.getMonth()) {
      count = 11 - now.getMonth();
      yearCount--;
    }
    const monthIndex = (now.getMonth() + count + 12) % 12;
    const year = now.getFullYear() + yearCount;
    updateCalendar(monthIndex, year);
  });

  rightArrow.addEventListener("click", () => {
    count++;
    if (count > 11) {
      count = count % 12;
      yearCount++;
    }
    const monthIndex = (now.getMonth() + count) % 12;
    const year = now.getFullYear() + yearCount;
    updateCalendar(monthIndex, year);
  });

  arrowPanel.append(leftArrow, rightArrow);
  calendar.append(arrowPanel);

  // Initial calendar generation
  generateCalendar(now.getMonth(), now.getFullYear());
}

function generateCalendar(month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const table = document.createElement("table");
  table.classList.add("table");

  const tr = document.createElement("tr");
  for (let i = 0; i < days.length; i++) {
    const th = document.createElement("th");
    th.classList.add("days-of-the-week");
    th.textContent = days[i].slice(0, 3);
    tr.append(th);
  }

  const tbody = document.createElement("tbody");
  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        const cell = document.createElement("td");
        row.append(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        const cell = document.createElement("td");
        cell.textContent = date;
        if (date === now.getDate() && month === now.getMonth() && year === now.getFullYear()) {
          cell.classList.add("today");
        }
        cell.classList.add("day");
        row.append(cell);
        date++;
      }
    }
    tbody.append(row);
    if (date > daysInMonth) break;
  }

  // Clear previous table and append new one
  const existingTable = document.querySelector(".table");
  if (existingTable) {
    existingTable.remove();
  }
  table.append(tr, tbody);
  calendar.append(table);

  // Re-select days after generating new calendar
  selectDays();
}

function updateCalendar(monthIndex, year) {
  generateCalendar(monthIndex, year);
  const newDate = new Date(year, monthIndex, 1);
  updateCurrentDay(newDate);
}

function selectDays() {
  const days = document.querySelectorAll(".day");

  function clear() {
    days.forEach((day) => {
      day.classList.remove("selected-day");
    });
  }

  days.forEach((day) => {
    day.addEventListener("click", () => {
      clear();
      day.classList.add("selected-day");
      const selectedDate = parseInt(day.textContent);
      currentDay.innerHTML = `${getDayOfWeek(
        now.getFullYear(),
        now.getMonth() + 1,
        selectedDate
      )} | <b class="current-date">${selectedDate} ${
        months[now.getMonth()]
      } ${now.getFullYear()}</b>`;
    });
  });
}

selectDays();

currentDay.addEventListener("click", () => {
  calendar.classList.toggle("show");
});

// Initialize arrows and calendar
generateArrows();
