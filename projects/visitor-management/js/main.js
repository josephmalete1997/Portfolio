import { formElements, visitorsObject, domElements } from "./dom_elements.js";
import { hideShowElements, rowColoring, readMore, readLess } from "./functions.js";
import { editVisitor, deleteVisitor } from "./visitors.js";
import { filtering, filterByAgeRange } from "./sort_and_filter.js";
const { h1, submit, update } = formElements;
const {
  addNewButton,
  viewAllButton,
  form,
  emptyTable,
  error,
  closeError,
  tableSection,
  tableBody,
} = domElements;

filtering();
document.querySelector("#age-filter").addEventListener("change", () => {
  document.querySelectorAll(".table-row").forEach((element, index) => {
    tableBody.removeChild(element);
  });
  filterByAgeRange();
  rowColoring();
  setTimeout(() => {
    window.location.reload();
  }, 500);
});

rowColoring();

addNewButton.addEventListener("click", () => {
  hideShowElements(
    [tableSection, "none"],
    [form, "flex"],
    [submit, "block"],
    [update, "none"],
    [emptyTable, "none"]
  );
  form.reset();
  h1.innerHTML = "Add new visitor";
});

viewAllButton.addEventListener("click", () => {
  hideShowElements([form, "none"], [tableSection, "flex"]);
  visitorsObject.length === 0
    ? hideShowElements([tableSection, "none"], [emptyTable, "block"])
    : hideShowElements([tableSection, "flex"], [emptyTable, "none"]);
});

visitorsObject.length === 0
  ? hideShowElements([tableSection, "none"], [emptyTable, "block"])
  : hideShowElements([tableSection, "flex"], [emptyTable, "none"]);

deleteVisitor();
editVisitor();

setInterval(() => {
  readMore();
  readLess(), 1000;
});

closeError.addEventListener("click", () => {
  hideShowElements([error, "none"]);
});
