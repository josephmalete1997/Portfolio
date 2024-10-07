import { taskObject, importanceElements, domElements } from "./elements_and_objects.js";
import { makeVisible, makeInvisible } from "./functions.js";

const listItem = document.querySelectorAll(".list-item");

listItem[0].classList.add("active-selection");

importanceElements.importanceStatus.innerHTML = `${localStorage.getItem("importance")}`;

function clearSelection() {
  listItem.forEach((item) => {
    item.classList.remove("active-selection");
  });
}

importanceElements.all.forEach((item) => {
  item.addEventListener("click", () => {
    localStorage.setItem("list-task", item.innerHTML);
    localStorage.setItem("importance", ` (${item.innerHTML})`);
    window.location.reload();
  });
});

listItem.forEach((item, index) => {
  if (item.innerHTML === localStorage.getItem("list-task")) {
    clearSelection();
    item.classList.add("active-selection");
  }

  item.addEventListener("click", () => {
    clearSelection();
    item.classList.add("active-selection");
    if (index !== 2) {
      localStorage.setItem("list-task", item.innerHTML);
      localStorage.setItem("importance", "");
      window.location.reload();
    }
  });
});

function todayTask() {
  const taskArray = [];
  taskObject.filter((item) => {
    if (
      item.date.slice(0, 4) == new Date().getFullYear() &&
      item.date.slice(5, 7) == new Date().getMonth() + 1 &&
      item.date.slice(8, 10) == new Date().getDate()
    ) {
      taskArray.push(item);
    }
  });
  return taskArray;
}

function taskByImportance(status) {
  const taskArray = [];
  const item = taskObject.filter((item) => {
    if (item.importance === status) {
      taskArray.push(item);
    }
  });
  taskArray.length !== 0
    ? (domElements.noTasks.style.display = "none")
    : (domElements.noTasks.style.display = "block");
  return taskArray;
}

const filterVar = localStorage.getItem("list-task") || "All";
console.log(filterVar);
const filterObject = {
  value: null,
};

if (filterVar === "Today") {
  filterObject.value = todayTask();
  todayTask().length === 0
    ? (domElements.noTasks.style.display = "block")
    : (domElements.noTasks.style.display = "none");
} else if (filterVar === "All") {
  filterObject.value = taskObject.sort((a, b) => {
    return a.date - b.date;
  });
} else if (filterVar == "Low") {
  activateImportance();
  filterObject.value = taskByImportance("low");
} else if (filterVar == "Medium") {
  activateImportance();
  filterObject.value = taskByImportance("medium");
} else if (filterVar == "High") {
  activateImportance();
  filterObject.value = taskByImportance("high");
} else if (filterVar != "Low" || filterVar != "Medium" || filterVar != "High") {
}

function activateImportance() {
  clearSelection();
  listItem[2].classList.add("active-selection");
}

importanceElements.listByImportance.addEventListener("click", () => {
  importanceElements.by.classList.toggle("display");
});

export { filterObject };
