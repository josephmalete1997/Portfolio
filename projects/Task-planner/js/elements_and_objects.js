const domElements = {
  timeline: document.querySelector(".time-line"),
  rightItem: document.querySelector(".task-panel"),
  taskNumber: document.querySelector("#tasks-number"),
  addNewItem: document.querySelector(".addNew"),
  form: document.querySelector("form"),
  overLayer: document.querySelector(".over-layer"),
  cancel: document.querySelector("#cancel"),
  backToForm: document.querySelector(".back-to-form"),
  notes: document.querySelector(".notes"),
  addNote: document.querySelector(".add-note"),
  numberOfCharacters: document.querySelector(".number-of-characters"),
  noTasks: document.querySelector(".no-task"),
};

domElements.backToForm.addEventListener("click", () => {
  domElements.notes.style.display = "none";
  domElements.form.style.display = "flex";
});

domElements.addNote.addEventListener("click", () => {
  domElements.notes.style.display = "flex";
  domElements.form.style.display = "none";
});

const formElements = {
  submit: document.querySelector(".add-task"),
  update: document.querySelector(".update-task"),
  name: document.querySelector(".name"),
  date: document.querySelector(".date"),
  start: document.querySelector(".start"),
  end: document.querySelector(".end"),
  importance: document.querySelector("#importance"),
  note: document.querySelector(".note-text"),
};

const importanceElements = {
  by: document.querySelector(".by-importance"),
  all: document.querySelectorAll(".i"),
  listByImportance: document.querySelector("#list-by-importance"),
  importanceStatus: document.querySelector("#importance-status"),
};

const taskObject = JSON.parse(localStorage.getItem("task")) || [];

domElements.taskNumber.textContent = taskObject.length;
if (taskObject.length === 0) {
  domElements.noTasks.style.display = "block";
} else {
  domElements.noTasks.style.display = "none";
}

const colorObject = {
  low: "rgb(122, 189, 22)",
  medium: "orange",
  high: "red",
};

const taskId = {
  value: null,
};

export { domElements, formElements, taskId, colorObject, taskObject, importanceElements };
