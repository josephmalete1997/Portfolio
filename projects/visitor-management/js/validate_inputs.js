import { formElements, domElements } from "./dom_elements.js";
import { hideShowElements, addVisitor } from "./functions.js";
import { updateVisitor } from "./visitors.js";
const { fullNames, age, date, assisted, submit, update } = formElements;
const { form, error } = domElements;

const nameRegex = /^[A-Za-z]{3,}(?:\s[A-Za-z]{3,})+$/;
const dateRegex = /^(?:\d{4}-\d{2}-\d{2}|\d{4}\/\d{2}\/\d{2})$/;

const display = {
  block: "block",
  none: "none",
  flex: "flex",
};

const strings = {
  click: "click",
  input: "input",
  empty: "",
  highlight: "highlight",
  noComment: "No comment",
  button: "button",
  td: "td",
};

document.addEventListener("DOMContentLoaded", () => {
  const removeNumbers = (input) => {
    return input.replace(/[0-9]/g, strings.empty);
  };

  fullNames.addEventListener(strings.input, () => {
    fullNames.value = removeNumbers(fullNames.value);
  });

  assisted.addEventListener(strings.input, () => {
    assisted.value = removeNumbers(assisted.value);
  });

  assisted.addEventListener(strings.input, () => {
    assisted.value = removeNumbers(assisted.value);
  });

  function validateInput() {
    if (!fullNames.value.trim().match(nameRegex)) {
      error.innerHTML = "Please enter valid visitor's full names!";
      hideShowElements([error, display.flex]);
    } else if (isNaN(parseInt(age.value)) || parseInt(age.value) <= 0) {
      error.innerHTML = "Please enter valid age (Positive integer)!";
      hideShowElements([error, display.flex]);
    } else if (!assisted.value.trim().match(nameRegex)) {
      error.innerHTML = "Please enter your valid full names!";
      hideShowElements([error, display.flex]);
    } else if (date.value !== strings.empty) {
      if (!date.value.trim().match(dateRegex)) {
        error.innerHTML = "Please enter valid date(YYYY/MM/DD)!";
        hideShowElements([error, display.flex]);
      }
    } else {
      hideShowElements([error, display.none]);
    }
  }

  submit.addEventListener(strings.click, () => {
    validateInput();
  });

  update.addEventListener("click", (event) => {
    validateInput();
    let isValid = true;

    if (!fullNames.value.trim().match(nameRegex)) isValid = false;
    if (isNaN(parseInt(age.value)) || parseInt(age.value) <= 0) isValid = false;
    if (!date.value.trim().match(dateRegex)) isValid = false;
    if (!assisted.value.trim().match(nameRegex)) isValid = false;
    isValid ? updateVisitor() : event.preventDefault();
  });

  form.addEventListener("submit", (event) => {
    let isValid = true;

    if (!fullNames.value.trim().match(nameRegex)) isValid = false;
    if (isNaN(parseInt(age.value)) || parseInt(age.value) <= 0) isValid = false;
    if (!date.value.trim().match(dateRegex)) isValid = false;
    if (!assisted.value.trim().match(nameRegex)) isValid = false;
    isValid ? addVisitor() : event.preventDefault();
  });
});
