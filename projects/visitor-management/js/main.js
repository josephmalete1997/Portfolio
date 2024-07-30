import { addVisitor } from "./functions.js";
import { formElements, visitorsObject, domElements, visitorId } from "./dom_elements.js";
import { getVisitors, hideShowElements, rowColoring, readMore, readLess } from "./functions.js";
const { fullNames, age, date, time, comments, assisted, h1, submit, update } = formElements;
const { tableBody, addNewButton, viewAllButton, form, table, emptyTable } = domElements;

getVisitors();
rowColoring();

addNewButton.addEventListener("click", () => {
  hideShowElements(
    [table, "none"],
    [form, "flex"],
    [submit, "block"],
    [update, "none"],
    [emptyTable, "none"]
  );
  form.reset();
  h1.innerHTML = "Add new visitor";
});

viewAllButton.addEventListener("click", () => {
  hideShowElements([form, "none"], [table, "block"]);
  visitorsObject.length === 0
    ? hideShowElements([table, "none"], [emptyTable, "block"])
    : hideShowElements([table, "flex"], [emptyTable, "none"]);
});

submit.addEventListener("click", () => {
  addVisitor();
});

visitorsObject.length === 0
  ? hideShowElements([table, "none"], [emptyTable, "block"])
  : hideShowElements([table, "flex"], [emptyTable, "none"]);

const deleteVisitor = () => {
  document.querySelectorAll(".delete").forEach((del, index) => {
    del.addEventListener("click", () => {
      const visitorsObj = visitorsObject;
      tableBody.removeChild(document.getElementById(visitorsObj[index].id));
      visitorsObj.splice(index, 1);
      localStorage.setItem("visitors", JSON.stringify(visitorsObj));
      window.location.reload();
      rowColoring();
    });
  });
};

const editVisitor = () => {
  document.querySelectorAll(".edit").forEach((edit, index) => {
    edit.addEventListener("click", () => {
      const visitorsObj = visitorsObject;
      fullNames.value = visitorsObj[index].fullNames;
      age.value = visitorsObj[index].age;
      date.value = visitorsObj[index].date;
      time.value = visitorsObj[index].time;
      comments.value = visitorsObj[index].comments;
      assisted.value = visitorsObj[index].assisted;
      h1.innerHTML = `Update info for visitor, id: <font color='red'>${visitorsObj[index].id}</font>`;
      hideShowElements([update, "block"], [submit, "none"], [form, "flex"], [table, "none"]);
      visitorId.value = document.querySelectorAll(".table-row")[index].id;
    });
  });
};

const updateVisitor = () => {
  for (let i = 0; i < visitorsObject.length; i++) {
    if (visitorsObject[i].id == visitorId.value) {
      visitorsObject[i].fullNames = fullNames.value;
      visitorsObject[i].age = age.value;
      visitorsObject[i].date = date.value;
      visitorsObject[i].time = time.value;
      visitorsObject[i].comments = comments.value === "" ? "No comment" : comments.value;
      visitorsObject[i].assisted = assisted.value;
    }
  }

  localStorage.setItem("visitors", JSON.stringify(visitorsObject));
  console.log("visitor updated successfully!");
  rowColoring();
  visitorId.value = null;
  window.location.reload();
};

deleteVisitor();
editVisitor();

setInterval(() => {
  readMore();
  readLess(), 1000;
});

update.addEventListener("click", updateVisitor);
