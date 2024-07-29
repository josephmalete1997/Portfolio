import { domElements, taskId, formElements, taskObject } from "./elements_and_objects.js";
import { makeInvisible, makeVisible } from "./functions.js";
import { filterObject } from "./task_ordering.js";

const { update, name, date, start, end, importance, note } = formElements;
const { form, overLayer, addNote, numberOfCharacters } = domElements;

const edit = document.querySelectorAll(".fa-edit");

edit.forEach((edit, index) => {
  edit.addEventListener("click", () => {
    const task = document.querySelectorAll(".task");

    addNote.innerHTML = `<i class="fa-solid fa-file-lines"></i> Edit Note`;

    if (task[index].id == filterObject.value[index].id) {
      taskId.value = filterObject.value[index].id;
      makeVisible(form, overLayer, form.children[form.children.length - 1]);

      form.children[3].value = filterObject.value[index].name;
      form.children[5].value = filterObject.value[index].date;
      form.children[7].value = filterObject.value[index].from;
      form.children[9].value = filterObject.value[index].to;
      form.children[11].value = filterObject.value[index].importance;
      note.value = filterObject.value[index].note;

      numberOfCharacters.innerHTML = `${
        note.value.length > 1 ? note.value.length + "\nchars" : note.value.length + "\nchar"
      }`;

      makeInvisible(form.children[form.children.length - 2]);
    }
  });
});

function updateTask() {
  for (let i = 0; i < taskObject.length; i++) {
    if (taskObject[i].id == taskId.value) {
      taskObject[i].name = name.value;
      taskObject[i].date = date.value;
      taskObject[i].from = start.value;
      taskObject[i].to = end.value;
      taskObject[i].importance = importance.value;
      taskObject[i].note = note.value;
    }
  }
  localStorage.setItem("task", JSON.stringify(taskObject));
  taskId.value = null;
}

update.addEventListener("click", updateTask);
