const formElements = {
  h1: document.querySelector("form h1"),
  fullNames: document.querySelector(".full-names"),
  age: document.querySelector(".age"),
  date: document.querySelector(".date"),
  time: document.querySelector(".time"),
  comments: document.querySelector(".comments"),
  assisted: document.querySelector(".assisted-by"),
  submit: document.querySelector(".submit"),
  update: document.querySelector(".update"),
};

const domElements = {
  form: document.querySelector("form"),
  table: document.querySelector("table"),
  tableSection: document.querySelector(".table-section"),
  tableBody: document.querySelector("table tbody"),
  addNewButton: document.querySelector(".add-new"),
  viewAllButton: document.querySelector(".view-all"),
  emptyTable: document.querySelector(".empty-table"),
  closeError: document.querySelector(".close-error"),
  error: document.querySelector(".error"),
};

const visitorsObject = JSON.parse(localStorage.getItem("visitors")) || [];

const visitorId = {
  value: null,
};

const visitorList = {
  value: visitorsObject,
};

export { formElements, visitorsObject, domElements, visitorId, visitorList };
