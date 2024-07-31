import {
  formElements,
  visitorsObject,
  domElements,
  visitorId,
  visitorList,
} from "./dom_elements.js";
import { hideShowElements, rowColoring } from "./functions.js";
const { fullNames, age, date, time, comments, assisted, h1, submit, update } = formElements;
const { tableBody, form, table, tableSection } = domElements;

const deleteVisitor = () => {
  document.querySelectorAll(".delete").forEach((del, index) => {
    del.addEventListener("click", () => {
      const visitorsObj = visitorList.value;
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
      const visitorsObj = visitorList.value;
      fullNames.value = visitorsObj[index].fullNames;
      age.value = visitorsObj[index].age;
      date.value = visitorsObj[index].date;
      time.value = visitorsObj[index].time;
      comments.value = visitorsObj[index].comments;
      assisted.value = visitorsObj[index].assisted;
      h1.innerHTML = `Update info for visitor, id: <span class="visitor-id">${visitorsObj[index].id}</span>`;
      hideShowElements([update, "block"], [submit, "none"], [form, "flex"], [tableSection, "none"]);
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

export { updateVisitor, deleteVisitor, editVisitor };
