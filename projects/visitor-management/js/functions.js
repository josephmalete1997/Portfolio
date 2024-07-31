import { formElements, visitorsObject, domElements, visitorList } from "./dom_elements.js";

const { fullNames, age, date, time, comments, assisted } = formElements;
const { tableBody } = domElements;

const addVisitor = () => {
  const visitor = {
    id: Math.floor(Math.random() * 1000000000),
    fullNames: fullNames.value,
    age: age.value,
    date: date.value,
    time: time.value,
    comments: comments.value === "" ? "No comment" : comments.value,
    assisted: assisted.value,
  };

  visitorsObject.push(visitor);
  localStorage.setItem("visitors", JSON.stringify(visitorsObject));
  console.log("visitor added successfully!");
};

const getVisitors = () => {
  visitorList.value.forEach((visitor) => {
    const tr = document.createElement("tr");
    tr.classList.add("table-row");
    tr.id = visitor.id;
    for (let item in visitor) {
      if (item !== "id") {
        const td = document.createElement("td");
        if (item == "comments") {
          if (visitor[item].length > 50) {
            td.innerHTML = `${visitor[item].slice(0, 50)}... <span data-id="${
              visitor.id
            }" class='view-more'>Read more</span>"`;
          } else {
            td.innerHTML = visitor[item];
          }

          tr.append(td);
        } else {
          td.innerHTML = visitor[item];
          tr.append(td);
        }
      }
    }

    const edit = document.createElement("td");
    const del = document.createElement("td");
    edit.classList.add("edit");
    del.classList.add("delete");
    edit.innerHTML = `<img src="assets/pen.svg" alt="pen icon" />`;
    del.innerHTML = `<img src="assets/trash-can.svg" alt="trash-can icon" />`;
    tr.append(edit, del);

    tableBody.append(tr);
  });
};

const hideShowElements = (...[...element]) => {
  element.forEach((elem) => {
    elem[0].style.display = elem[1];
  });
};

const rowColoring = () => {
  document.querySelectorAll(".table-row").forEach((tr, index) => {
    tr.style.background = "";
    if (index % 2 !== 0) tr.classList.add("even-row");
  });
};

rowColoring();

const readMore = () => {
  const read = document.querySelectorAll(".view-more");
  for (let i = 0; i < visitorsObject.length; i++) {
    read.forEach((item) => {
      if (visitorsObject[i].id == item.getAttribute("data-id")) {
        item.addEventListener("click", () => {
          document.getElementById(
            item.getAttribute("data-id")
          ).children[4].innerHTML = `${visitorsObject[i].comments} 
          <span class='view-less' new-data-id=${visitorsObject[i].id}>Show less</span>`;
        });
      }
    });
  }
};

const readLess = () => {
  const read = document.querySelectorAll(".view-less");
  for (let i = 0; i < visitorsObject.length; i++) {
    read.forEach((item) => {
      if (visitorsObject[i].id == item.getAttribute("new-data-id")) {
        item.addEventListener("click", () => {
          document.getElementById(
            item.getAttribute("new-data-id")
          ).children[4].innerHTML = `${visitorsObject[i].comments.slice(0, 50)}...
          <span class='view-more' data-id=${visitorsObject[i].id}>Read more</span>`;
        });
      }
    });
  }
};

export { addVisitor, getVisitors, hideShowElements, rowColoring, readMore, readLess };
