function timeLine() {
  for (let i = 0; i < 24; i++) {
    const hours = document.createElement("div");
    const text = document.createElement("p");
    let p;
    i > 12 ? (p = "P.M") : (p = "A.M");
    text.classList.add("text");
    text.innerHTML = `${i}:00 ${p}`;
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
    const time = taskObject[i].from.slice(0, 2);
    const timeFromHalf = parseInt(taskObject[i].from.slice(3, 5)) / 60;
    const timeToHalf = parseInt(taskObject[i].to.slice(3, 5)) / 60;
    const heightFrom = parseInt(taskObject[i].from) + timeFromHalf;
    const heightTo = parseInt(taskObject[i].to) + timeToHalf;
    const height = heightTo - heightFrom;

    newTask.style.top = `${heightFrom * 30 + 50}px`;
    newTask.style.height = `${height * 30}px`;
    newTask.style.background = taskObject[i].color;
    newTask.innerHTML = taskObject[i].name;

    for (let color in colorObject) {
      if (color === taskObject[i].importance) newTask.style.background = `${colorObject[color]}`;
    }
    timeline.append(newTask);
  }
}

addToTimeline(taskObject);

function addNewTask() {
  for (let i = 0; i < taskObject.length; i++) {
    const newTask = document.createElement("div");
    newTask.classList.add("task");

    const timeNow = new Date().getHours();
    const from = parseInt(taskObject[i].from.slice(0, 2));
    const to = parseInt(taskObject[i].to.slice(0, 2));
    newTask.innerHTML = `
      <p>${
        taskObject[i].name.length > 25
          ? taskObject[i].name.slice(0, 25) + `...`
          : taskObject[i].name
      }</p>
      <div><i class='fa-solid fa-edit'></i><i class='fa-solid fa-trash'></i></div>
    <p>
  ${
    timeNow > to
      ? `<span style="text-decoration: line-through;">${taskObject[i].from}-${taskObject[i].to}</span>`
      : `${taskObject[i].from}-${taskObject[i].to}`
  }
    </p>

    <span>${
      timeNow > to
        ? "<font color='red'><i>Task Expired</i></font>"
        : timeNow >= from && timeNow <= to
        ? "<font color='green'><i>Active</i></font>"
        : Math.abs(timeNow - from) + "hours and 28 minutes to go"
    } </span>
      `;
    for (let color in colorObject) {
      if (color === taskObject[i].importance)
        newTask.style.borderLeft = `5px solid ${colorObject[color]}`;
    }
    rightItem.append(newTask);
  }
}

addNewTask();

function createTask() {
  const task = {
    name: formElements.name.value,
    date: formElements.date.value,
    from: formElements.start.value,
    to: formElements.end.value,
    importance: formElements.importance.value,
  };

  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.innerHTML = `
    
      <p>${
        formElements.name.value.length > 25
          ? formElements.name.value.slice(0, 25) + `...`
          : formElements.name.value
      }</p>
      <p>${formElements.start.value} - ${formElements.end.value}</p>
      <span>${
        new Date().getHours - formElements.start.value.slice(0, 2)
      } hours and 28 minutes to go</span>
      `;
  for (let color in colorObject) {
    if (color === formElements.importance.value)
      newTask.style.borderLeft = `5px solid ${colorObject[color]}`;
  }
  rightItem.append(newTask);
  taskObject.push(task);
  localStorage.setItem("task", JSON.stringify(taskObject));
  setTimeout(() => {
    addToTimeline(taskObject);
  }, 100);
}

formElements.submit.addEventListener("click", () => {
  const task = {
    name: formElements.name.value,
    date: formElements.date.value,
    from: formElements.start.value,
    to: formElements.end.value,
    importance: formElements.importance.value,
  };
  if (task.name == "" && task.date == "" && task.from == "" && task.to == "") {
    alert("fields cannot be empty!");
  } else {
    createTask();
    makeInvisible(form, overLayer);
  }
});

function makeVisible(...item) {
  for (let i = 0; i < item.length; i++) item[i].style.display = "flex";
}

function makeInvisible(...item) {
  for (let i = 0; i < item.length; i++) item[i].style.display = "none";
}

addNewItem.addEventListener("click", () => {
  makeVisible(form, overLayer);
});

cancel.addEventListener("click", () => {
  makeInvisible(form, overLayer);
});

const tasks = document.querySelectorAll(".task");
const deleteIcon = document.querySelectorAll(".task div:nth-child(2) .fa-trash");

deleteIcon.forEach((item, index) => {
  item.addEventListener("click", () => {
    rightItem.removeChild(tasks[index]);
    taskObject.splice(index, 1);
    localStorage.setItem("task", JSON.stringify(taskObject));
    timeline.removeChild(document.querySelectorAll(".task-on-timeline")[index]);
  });
});
