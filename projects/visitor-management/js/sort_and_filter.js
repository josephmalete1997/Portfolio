import { visitorsObject, visitorList, domElements } from "./dom_elements.js";
import { getVisitors } from "./functions.js";

const { tableBody } = domElements;

const ageFilterValue = document.querySelector("#age-filter-value");
const ageFilter = document.querySelector("#age-filter");
const sortBy = document.querySelector("#sort-by");
const minAge = document.querySelector("#min-age");

ageFilter.value = localStorage.getItem("age-filter-value") || 50;
ageFilterValue.innerHTML = ageFilter.value;
minAge.value = localStorage.getItem("min-age") || 0;
ageFilter.min = minAge.value;
ageFilter.max = 100;
sortBy.value = localStorage.getItem("sort-by") || "name";

function filterByAgeRange() {
  const visitorArray = [];
  const minValue = minAge.value;
  visitorsObject.forEach((element) => {
    if (parseInt(element.age) <= ageFilter.value && parseInt(element.age) >= minValue)
      visitorArray.push(element);
  });
  visitorList.value = visitorArray;
  getVisitors();
}

filterByAgeRange();

console.log(tableBody.childNodes);

function filtering() {
  ageFilter.addEventListener("input", () => {
    ageFilterValue.innerHTML = ageFilter.value;
    localStorage.setItem("age-filter-value", ageFilter.value);
  });

  minAge.addEventListener("change", () => {
    localStorage.setItem("min-age", minAge.value);
  });

  sortBy.addEventListener("change", () => {
    localStorage.setItem("sort-by", sortBy.value);
  });
}

export { filtering, filterByAgeRange };
