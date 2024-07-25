const currentDay = document.querySelector(".title-day");
const calendar = document.querySelector(".calendar");
calendar.classList.add("show");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
currentDay.innerHTML = `${days[new Date().getDay()]} | <b class="current-date"> ${[
  new Date().getDate(),
]} ${months[new Date().getMonth()]}</b>`;

function getDayOfWeek(year, month, day) {
  const date = new Date(year, month - 1, day);
  const dayOfTheWeek = date.getDay();
  return days[dayOfTheWeek];
}

function generateArrows() {
  const table = document.querySelector(".table");

  let count = 1;
  const arrowPanel = document.createElement("div");
  arrowPanel.classList.add("arrow-panel");
  const leftArrow = document.createElement("div");
  leftArrow.innerHTML = `<i class="fa-solid fa-arrow-left">`;
  leftArrow.classList.add("left-arrow");
  const rightArrow = document.createElement("div");
  rightArrow.innerHTML = `<i class="fa-solid fa-arrow-right">`;
  rightArrow.classList.add("right-arrow");

  leftArrow.addEventListener("click", () => {
    count--;
    currentDay.innerHTML = `${getDayOfWeek(
      now.getFullYear(),
      now.getMonth() + count,
      now.getDate()
    )} | <b class="current-date"> ${now.getDate()} ${months[now.getMonth() - 1 + count]}</b>`;
    table.removeChild(table.children[table.children.length - 1]);
    generateCalendar(now.getMonth() - 1 + count, now.getFullYear());
  });

  rightArrow.addEventListener("click", () => {
    count++;
    const month = months[now.getMonth() - 1 + count];

    if (months[now.getMonth() - 1 + count] === months[months.length - 1]) {
      (count = 0), months[count];
    } else {
      months[now.getMonth() - 1 + count];
    }

    currentDay.innerHTML = `${getDayOfWeek(
      now.getFullYear(),
      now.getMonth() + count,
      now.getDate()
    )} | <b class="current-date"> ${now.getDate()} ${month}</b>`;
    table.replaceChild(
      table.children[0],
      generateCalendar(now.getMonth() - 1 + count, now.getFullYear())
    );
  });

  arrowPanel.append(leftArrow, rightArrow);
  calendar.append(arrowPanel);
}

generateArrows();

function generateCalendar(month, year) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month + 1, 1).getDay();

  const table = document.createElement("table");
  table.classList.add("table");
  const tr = document.createElement("tr");
  const tbody = document.createElement("tbody");
  for (let i = 0; i < days.length; i++) {
    const th = document.createElement("th");
    th.classList.add("days-of-the-week");
    th.textContent = days[i].slice(0, 3);
    tr.append(th);
  }
  calendar.append(table);
  table.append(tr, tbody);
  tbody.innerHTML = "";
  let date = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    // day.classList.add("day");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        const cell = document.createElement("td");
        if (cell.textContent == new Date().getDate()) cell.classList.add("today");
        row.append(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        const cell = document.createElement("td");
        cell.textContent = date;
        if (cell.textContent == new Date().getDate()) cell.classList.add("today");
        cell.classList.add("day");
        row.append(cell);
        date++;
      }
      tbody.append(row);
      if (date > daysInMonth) break;
    }
  }
}

const now = new Date();

generateCalendar(now.getMonth() - 1, now.getFullYear());

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
        now.getFullYear(),
        now.getMonth() + 1,
        day.innerHTML
      )} | <b class="current-date"> ${day.innerHTML} ${months[new Date().getMonth()]}</b>`;
    });
  });
}

selectDays();

currentDay.addEventListener("click", () => {
  calendar.classList.toggle("show");
});
