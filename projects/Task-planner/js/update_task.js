const edit = document.querySelectorAll(".fa-edit");

edit.forEach((edit, index) => {
  edit.addEventListener("click", () => {
    const task = document.querySelectorAll(".task");

    if (task[index].id == taskObject[index].id) {
      taskId.value = taskObject[index].id;
      form.style.display = "flex";
      overLayer.style.display = "flex";

      form.children[2].value = taskObject[index].name;
      form.children[4].value = taskObject[index].date;
      form.children[6].value = taskObject[index].from;
      form.children[8].value = taskObject[index].to;
      form.children[10].value = taskObject[index].importance;

      form.children[form.children.length - 2].style.display = "none";
      form.children[form.children.length - 1].style.display = "block";
    }
  });
});

function updateTask() {
  for (let i = 0; i < taskObject.length; i++) {
    if (taskObject[i].id == taskId.value) {
      taskObject[i].name = formElements.name.value;
      taskObject[i].date = formElements.date.value;
      taskObject[i].from = formElements.start.value;
      taskObject[i].to = formElements.end.value;
      taskObject[i].importance = formElements.importance.value;
    }
  }
  localStorage.setItem("task", JSON.stringify(taskObject));
  taskId.value = null;
}

formElements.update.addEventListener("click", updateTask);
