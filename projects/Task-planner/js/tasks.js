import { domElements, formElements, colorObject, taskObject } from "./elements_and_objects.js";
import { makeVisible, makeInvisible } from "./functions.js";
import { filterObject } from "./task_ordering.js";

const {
  timeline,
  rightItem,
  addNewItem,
  form,
  overLayer,
  cancel,
  notes,
  addNote,
  numberOfCharacters,
} = domElements;

const { submit, name, date, start, end, importance, note } = formElements;

function timeLine() {
  for (let i = 0; i < 24; i++) {
    const hours = document.createElement("div");
    const text = document.createElement("p");
    let p;
    i >= 12 ? (p = "PM") : (p = "AM");
    text.classList.add("text");
    text.innerHTML = `${i} ${p}`;
    hours.classList.add("hours");
    hours.append(text);
    timeline.append(hours);
  }
}

timeLine();

function progressLine() {
  const line = document.createElement("div");
  line.classList.add("line");
  setInterval(() => {
    line.style.top = `${new Date().getHours() * 30 + new Date().getMinutes() / 2 + 50}px`;
  }, 1000);
  timeline.append(line);
}

progressLine();

function addToTimeline(taskObject) {
  for (let i = 0; i < taskObject.length; i++) {
    const newTask = document.createElement("div");
    newTask.classList.add("task-on-timeline");
    newTask.setAttribute("draggable", true);
    newTask.style.transition = "1s";
    const time = taskObject[i].from.slice(0, 2);
    const timeFromHalf = parseInt(taskObject[i].from.slice(3, 5)) / 60;
    const timeToHalf = parseInt(taskObject[i].to.slice(3, 5)) / 60;
    const heightFrom = parseInt(taskObject[i].from) + timeFromHalf;
    const heightTo = parseInt(taskObject[i].to) + timeToHalf;
    const height = heightTo - heightFrom;

    newTask.style.top = `${heightFrom * 30 + 50}px`;
    newTask.style.height = `${height * 30}px`;
    newTask.style.background = taskObject[i].color;
    newTask.innerHTML = `${taskObject[i].name} <i class='text-time'><span class="space"></span>(${taskObject[i].from}-${taskObject[i].to})</i>`;

    for (let color in colorObject) {
      if (color === taskObject[i].importance) newTask.style.background = `${colorObject[color]}`;
    }

    timeline.append(newTask);
  }
}

addToTimeline(filterObject.value);

function addNewTask(taskList) {
  taskList.forEach((task) => {
    const newTask = document.createElement("div");
    newTask.id = task.id;
    newTask.classList.add("task");

    const timeNow = new Date();
    const currentHour = timeNow.getHours();
    const currentMinute = timeNow.getMinutes();
    const fromHour = parseInt(task.from.slice(0, 2));
    const fromMinute = parseInt(task.from.slice(3, 5));
    const toHour = parseInt(task.to.slice(0, 2));
    const toMinute = parseInt(task.to.slice(3, 5));
    const fromTotalMinutes = fromHour * 60 + fromMinute;
    const toTotalMinutes = toHour * 60 + toMinute;
    const currentTotalMinutes = currentHour * 60 + currentMinute;
    const taskStatus =
      currentTotalMinutes > toTotalMinutes
        ? "<font color='red'><i>Expired</i></font>"
        : currentTotalMinutes >= fromTotalMinutes &&
          currentTotalMinutes <= toTotalMinutes &&
          task.date.slice(5, 7) == new Date().getMonth() + 1 &&
          task.date.slice(0, 4) == new Date().getFullYear() &&
          task.date.slice(8, 10) == new Date().getDate()
        ? "<font color='green'><i>Active</i></font>"
        : calculateTimeToGo(fromTotalMinutes, currentTotalMinutes);

    newTask.innerHTML = `
      <p>
        ${task.name.length > 25 ? task.name.slice(0, 25) + "..." : task.name}
      </p>
      <div>
        <i class='fa-solid fa-edit'></i>
        <i class='fa-solid fa-trash'></i>
      </div>
      <p>
        ${
          currentTotalMinutes > toTotalMinutes
            ? `<span style="text-decoration: line-through;">${task.from}-${task.to}</span>`
            : `${task.from}-${task.to}`
        }
      </p>
      <span>${taskStatus}</span>
    `;

    // Set border color based on task importance
    if (colorObject[task.importance]) {
      newTask.style.borderLeft = `5px solid ${colorObject[task.importance]}`;
    }

    rightItem.append(newTask);
  });
}

function calculateTimeToGo(fromTotalMinutes, currentTotalMinutes) {
  const minutesToGo = fromTotalMinutes - currentTotalMinutes;
  const hoursToGo = Math.floor(minutesToGo / 60);
  const minutesRemainder = minutesToGo % 60;

  return hoursToGo === 0
    ? `${minutesRemainder} minutes to go`
    : hoursToGo === 1
    ? `${hoursToGo} hour and ${minutesRemainder} minutes to go`
    : `${hoursToGo} hours and ${minutesRemainder} minutes to go`;
}

addNewTask(filterObject.value);

function createTask(taskObject) {
  const task = {
    id: Math.floor(Math.random() * 100000),
    name: name.value,
    date: date.value,
    from: start.value,
    to: end.value,
    importance: importance.value,
    note: note.value,
  };

  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.id = task.id;

  const timeNow = new Date();
  const currentHour = timeNow.getHours();
  const currentMinute = timeNow.getMinutes();

  const fromHour = parseInt(task.from.slice(0, 2));
  const fromMinute = parseInt(task.from.slice(3, 5));
  const toHour = parseInt(task.to.slice(0, 2));
  const toMinute = parseInt(task.to.slice(3, 5));

  const fromTotalMinutes = fromHour * 60 + fromMinute;
  const toTotalMinutes = toHour * 60 + toMinute;
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  const taskStatus =
    currentTotalMinutes > toTotalMinutes
      ? "<font color='red'><i>Task Expired</i></font>"
      : currentTotalMinutes >= fromTotalMinutes && currentTotalMinutes <= toTotalMinutes
      ? "<font color='green'><i>Active</i></font>"
      : calculateTimeToGo(fromTotalMinutes, currentTotalMinutes);

  newTask.innerHTML = `
  <p>
    ${task.name.length > 25 ? task.name.slice(0, 25) + "..." : task.name}
  </p>
  <div>
    <i class='fa-solid fa-edit'></i>
    <i class='fa-solid fa-trash'></i>
  </div>
  <p>
    ${
      currentTotalMinutes > toTotalMinutes
        ? `<span style="text-decoration: line-through;">${task.from}-${task.to}</span>`
        : `${task.from}-${task.to}`
    }
  </p>
  <span>${taskStatus}</span>
`;
  for (let color in colorObject) {
    if (color === importance.value) newTask.style.borderLeft = `5px solid ${colorObject[color]}`;
  }
  rightItem.append(newTask);
  taskObject.push(task);

  localStorage.setItem("task", JSON.stringify(taskObject));

  setTimeout(() => {
    addToTimeline(taskObject);
  }, 100);
}

submit.addEventListener("click", () => {
  const task = {
    name: name.value,
    date: date.value,
    from: start.value,
    to: end.value,
    importance: importance.value,
    note: note.value,
  };
  if (task.name == "" && task.date == "" && task.from == "" && task.to == "") {
    alert("fields cannot be empty!");
  } else {
    createTask(taskObject);
    makeInvisible(form, overLayer);
  }
});

addNewItem.addEventListener("click", () => {
  makeVisible(form, overLayer, form.children[form.children.length - 2]);
  makeInvisible(form.children[form.children.length - 1]);
  addNote.innerHTML = `<i class="fa-solid fa-file-lines"></i> Add Note`;
});

cancel.addEventListener("click", () => {
  makeInvisible(form, overLayer, notes);
  form.reset();
  note.value = "";
  numberOfCharacters.innerHTML = `${note.value.length} char`;
});

numberOfCharacters.innerHTML = `${note.value.length} char`;

note.addEventListener("input", () => {
  numberOfCharacters.innerHTML = `${
    note.value.length > 1 ? note.value.length + "\nchars" : note.value.length + "\nchar"
  }`;
});

const tasks = document.querySelectorAll(".task");
const deleteIcon = document.querySelectorAll(".task div:nth-child(2) .fa-trash");

deleteIcon.forEach((item, index) => {
  item.addEventListener("click", () => {
    rightItem.removeChild(tasks[index]);
    taskObject.splice(index, 1);
    localStorage.setItem("task", JSON.stringify(taskObject));
    timeline.removeChild(document.querySelectorAll(".task-on-timeline")[index]);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });
});
