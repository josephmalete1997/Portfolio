const timeline = document.querySelector(".time-line");
const rightItem = document.querySelector(".task-panel");
const taskNumber = document.querySelector("#tasks-number");
const addNewItem = document.querySelector(".addNew");
const form = document.querySelector("form");
const overLayer = document.querySelector(".over-layer");
const cancel = document.querySelector("#cancel");
const backToForm = document.querySelector(".back-to-form");
const notes = document.querySelector(".notes");
const addNote = document.querySelector(".add-note");

backToForm.addEventListener("click", () => {
  notes.style.display = "none";
  form.style.display = "flex";
});

addNote.addEventListener("click", () => {
  notes.style.display = "flex";
  form.style.display = "none";
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

const taskObject = JSON.parse(localStorage.getItem("task")) || [];

taskNumber.textContent = taskObject.length;

const colorObject = {
  low: "grey",
  medium: "orange",
  high: "red",
};

const taskId = {
  value: null,
};
