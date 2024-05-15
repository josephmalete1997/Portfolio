const buttonsPanel = document.querySelector(".buttons");
const input = document.querySelector(".input");
const answer = document.querySelector(".answer");
const main = document.querySelector(".main");

let numArray = [];
let ans = [];
const signs = [`del`, `÷`, `×`, `-`, `+`, `=`, "√", "x<sup>2</sup>"];

const buttonsMap = {
  16: 1,
  21: 0,
  20: ".",
  22: "%",
  17: 2,
  18: 3,
  14: 4,
  13: 5,
  12: 6,
  8: 7,
  9: 8,
  10: 9,
  2: "CE",
  0: signs[6],
  1: signs[7],
};
const addButtons = () => {
  for (let i = 0; i < 24; i++) {
    const button = document.createElement("button");
    button.classList.add("button");
    button.innerHTML = i;
    if (buttonsMap[i] !== undefined) {
      button.innerHTML = buttonsMap[i];
    }
    if (i >= 0 && i <= 3) button.classList.add("top-buttons");
    if (i % 4 === 3) {
      button.classList.add("right-buttons");
      button.innerHTML = signs[Math.floor(i / 4)];
    }

    button.addEventListener("click", () => {
      if (button.innerHTML === signs[0]) {
        if (numArray.length === 0) {
          input.innerHTML = 0;
        }
        numArray.pop();
      } else if (!signs.includes(button.innerHTML) && button.innerHTML !== "√") {
        numArray.push(button.innerHTML);
      }
      if (button.innerHTML === signs[6]) answer.innerHTML = Math.sqrt(input.innerHTML);
      if (button.innerHTML === signs[7]) answer.innerHTML = Math.pow(input.innerHTML, 2);

      const operations = ["/", "*", "+"];
      const operationsSigns = [`${signs[1]}`, `${signs[2]}`, `${signs[4]}`];

      for (let i = 0; i < operations.length; i++)
        if (
          button.innerHTML === operationsSigns[i] &&
          numArray.length !== 0 &&
          /\d/.test(numArray[numArray.length - 1])
        ) {
          numArray.push(operations[i]);
        }

      if (button.innerHTML === signs[3] && /\d/.test(numArray[numArray.length - 1])) numArray.push("-");
      if (button.innerHTML === buttonsMap[2]) numArray = [];

      input.innerHTML = numArray.join("");

      if (numArray.length === 0) input.innerHTML = 0;

      if (button.innerHTML === signs[5]) {
        if (/\D/.test(input.innerHTML[input.innerHTML.length - 1])) {
          numArray.pop();
          input.innerHTML = numArray.join("");
          answer.innerHTML = eval(input.innerHTML);
          numArray = [];
        } else {
          answer.innerHTML = eval(input.innerHTML);
        }
      }
      button.classList.add("clicked");
      setTimeout(() => {
        button.classList.remove("clicked");
      }, 100);
    });

    buttonsPanel.append(button);
  }
};

addButtons();
