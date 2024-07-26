import { domElements, formElements, colorObject, taskObject } from "./elements_and_objects.js";

const { timeline, rightItem, addNewItem, form, overLayer, cancel, notes, addNote } = domElements;
const { submit, name, date, start, end, importance, note } = formElements;

function createElement(tag, classList = [], innerHTML = "", styles = {}) {
  const element = document.createElement(tag);
  classList.forEach((cls) => element.classList.add(cls));
  element.innerHTML = innerHTML;
  Object.assign(element.style, styles);
  return element;
}

function formatTime(hour, minute) {
  const period = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12} ${period}`;
}

function timeLine() {
  for (let i = 0; i < 24; i++) {
    const hours = createElement("div", ["hours"]);
    const text = createElement("p", ["text"], `${i} ${formatTime(i, 0)}`);
    hours.append(text);
    timeline.append(hours);
  }
}

function progressLine() {
  const line = createElement("div", ["line"]);
  setInterval(() => {
    line.style.top = `${new Date().getHours() * 30 + new Date().getMinutes() / 2 + 50}px`;
  }, 1000);
  timeline.append(line);
}

function calculateTaskHeight(task) {
  const timeFromHalf = parseInt(task.from.slice(3, 5)) / 60;
  const timeToHalf = parseInt(task.to.slice(3, 5)) / 60;
  const heightFrom = parseInt(task.from.slice(0, 2)) + timeFromHalf;
  const heightTo = parseInt(task.to.slice(0, 2)) + timeToHalf;
  const height = heightTo - heightFrom;
  return { heightFrom, height, heightTo };
}

function applyTaskStyles(taskElement, task) {
  taskElement.style.background = colorObject[task.importance] || task.color;
  taskElement.style.borderLeft = colorObject[task.importance]
    ? `5px solid ${colorObject[task.importance]}`
    : "";
}

function renderTask(task) {
  const { heightFrom, height } = calculateTaskHeight(task);
  const taskElement = createElement(
    "div",
    ["task-on-timeline"],
    `${task.name} <i class='text-time'> ( ${task.from}-${task.to} )</i>`,
    {
      top: `${heightFrom * 30 + 50}px`,
      height: `${height * 30}px`,
    }
  );

  applyTaskStyles(taskElement, task);
  timeline.append(taskElement);
}

function addToTimeline(tasks) {
  tasks.forEach(renderTask);
}

function createTaskElement(task) {
  const timeNow = new Date();
  const currentHour = timeNow.getHours();
  const currentMinute = timeNow.getMinutes();

  const fromTotalMinutes = parseInt(task.from.slice(0, 2)) * 60 + parseInt(task.from.slice(3, 5));
  const toTotalMinutes = parseInt(task.to.slice(0, 2)) * 60 + parseInt(task.to.slice(3, 5));
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  const taskStatus =
    currentTotalMinutes > toTotalMinutes
      ? "<font color='red'><i>Task Expired</i></font>"
      : currentTotalMinutes >= fromTotalMinutes && currentTotalMinutes <= toTotalMinutes
      ? "<font color='green'><i>Active</i></font>"
      : calculateTimeToGo(fromTotalMinutes, currentTotalMinutes);

  const taskElement = createElement(
    "div",
    ["task"],
    `
    <p>${task.name.length > 25 ? task.name.slice(0, 25) + "..." : task.name}</p>
    <div><i class='fa-solid fa-edit'></i><i class='fa-solid fa-trash'></i></div>
    <p>${
      currentTotalMinutes > toTotalMinutes
        ? `<span style="text-decoration: line-through;">${task.from}-${task.to}</span>`
        : `${task.from}-${task.to}`
    }</p>
    <span>${taskStatus}</span>
  `,
    { borderLeft: colorObject[task.importance] ? `5px solid ${colorObject[task.importance]}` : "" }
  );

  return taskElement;
}

function addNewTask() {
  rightItem.innerHTML = "";
  taskObject.forEach((task) => rightItem.append(createTaskElement(task)));
}

function createTask() {
  const task = {
    id: Math.floor(Math.random() * 100000),
    name: name.value,
    date: date.value,
    from: start.value,
    to: end.value,
    importance: importance.value,
    note: note.value,
  };

  const taskElement = createTaskElement(task);
  rightItem.append(taskElement);
  taskObject.push(task);
  localStorage.setItem("task", JSON.stringify(taskObject));

  addToTimeline(taskObject);
}

function validateForm() {
  return name.value && date.value && start.value && end.value;
}

submit.addEventListener("click", () => {
  if (!validateForm()) {
    alert("Fields cannot be empty!");
  } else {
    createTask();
    makeInvisible(form, overLayer);
  }
});

function makeVisible(...elements) {
  elements.forEach((el) => (el.style.display = "flex"));
}

function makeInvisible(...elements) {
  elements.forEach((el) => (el.style.display = "none"));
}

addNewItem.addEventListener("click", () => {
  makeVisible(form, overLayer);
  form.children[form.children.length - 2].style.display = "block";
  form.children[form.children.length - 1].style.display = "none";
  addNote.innerHTML = `<i class="fa-solid fa-file-lines"></i> Add Note`;
});

cancel.addEventListener("click", () => {
  makeInvisible(form, overLayer, notes);
  form.reset();
  note.value = "";
});

function deleteTask(index) {
  rightItem.removeChild(rightItem.children[index]);
  taskObject.splice(index, 1);
  localStorage.setItem("task", JSON.stringify(taskObject));
  timeline.removeChild(timeline.querySelectorAll(".task-on-timeline")[index]);
  setTimeout(() => window.location.reload(), 1000);
}

function setupDeleteIcons() {
  const deleteIcons = document.querySelectorAll(".task div .fa-trash");
  deleteIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => deleteTask(index));
  });
}

setupDeleteIcons();
timeLine();
progressLine();
addToTimeline(taskObject);
addNewTask();
