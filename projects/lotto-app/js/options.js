const elements = {
  overLayer: document.querySelector(".over-layer"),
  optionsList: document.querySelectorAll(".options .option-value"),
  betOptions: document.querySelector(".bet-options"),
  main: document.querySelector("main"),
  pickNumbers: document.querySelector(".pick-numbers"),
};

elements.optionsList.forEach((option, index) => {
  option.addEventListener("click", () => {
    const value = parseInt(option.getAttribute("value"));
    elements.pickNumbers.innerHTML = value;
    domElements.selectedOption = value;
  });
});

elements.optionsList[0].addEventListener("click", () => {
  elements.optionsList[0].style.background = "white";
  elements.optionsList[0].style.color = "black";
  changeColor(1, 2, 3, 4, 5);
});

elements.optionsList[1].addEventListener("click", () => {
  elements.optionsList[1].style.background = "white";
  elements.optionsList[1].style.color = "black";
  changeColor(0, 2, 3, 4, 5);
});

elements.optionsList[2].addEventListener("click", () => {
  elements.optionsList[2].style.background = "white";
  elements.optionsList[2].style.color = "black";
  changeColor(0, 1, 3, 4, 5);
});

elements.optionsList[3].addEventListener("click", () => {
  elements.optionsList[3].style.background = "white";
  elements.optionsList[3].style.color = "black";
  changeColor(0, 1, 2, 4, 5);
});

elements.optionsList[4].addEventListener("click", () => {
  elements.optionsList[4].style.background = "white";
  elements.optionsList[4].style.color = "black";
  changeColor(0, 1, 2, 3, 5);
});

elements.optionsList[5].addEventListener("click", () => {
  elements.optionsList[5].style.background = "white";
  elements.optionsList[5].style.color = "black";
  changeColor(0, 1, 2, 3, 4);
});

const changeColor = (...index) => {
  const arr = [...index];
  for (let i = 0; i < arr.length; i++) {
    elements.optionsList[arr[i]].style.background = "black";
    elements.optionsList[arr[i]].style.color = "white";
  }
};
