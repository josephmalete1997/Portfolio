import { domElements, taskId, formElements, taskObject } from "./elements_and_objects.js";

const { update, name, date, start, end, importance, note } = formElements;
const { form, overLayer, addNote } = domElements;

const edit = document.querySelectorAll(".fa-edit");

edit.forEach((edit, index) => {
  edit.addEventListener("click", () => {
    const task = document.querySelectorAll(".task");

    addNote.innerHTML = `<i class="fa-solid fa-file-lines"></i> Edit Note`;

    if (task[index].id == taskObject[index].id) {
      taskId.value = taskObject[index].id;
      form.style.display = "flex";
      overLayer.style.display = "flex";

      form.children[3].value = taskObject[index].name;
      form.children[5].value = taskObject[index].date;
      form.children[7].value = taskObject[index].from;
      form.children[9].value = taskObject[index].to;
      form.children[11].value = taskObject[index].importance;
      note.value = taskObject[index].note;

      form.children[form.children.length - 2].style.display = "none";
      form.children[form.children.length - 1].style.display = "block";
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
