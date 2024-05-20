const domElements = {
  numPanel: document.querySelector(".select-nums"),
  options: document.querySelector("#select-options"),
  count: document.querySelector("#count"),
  viewSlip: document.querySelector(".view-slip"),
  emptySlip: document.querySelector(".empty"),
  cancel: document.querySelector(".cancel"),
  randomPick: document.querySelector("#shuffle"),
  selectedOption: document.querySelector("#select-options").value,
  results: document.querySelector(".results"),
  resultsNumbers: document.querySelectorAll(".pop"),
  add: document.querySelector("#add"),
  playButton: document.querySelector("#play"),
  slip: document.querySelector(".slip"),
  history: document.querySelector(".history"),
};

const globals = {
  numArray: [],
  textArray: [],
  currentNumbers: [],
  min: 0,
  interval: null,
  numBalls: -1,
  numberCounter: 0,
  historyArray: [],
};

const stringsObject = {
  selected: "selected",
};

let finalArray = [];
let history;

domElements.add.disabled = true;
domElements.playButton.disabled = true;

domElements.viewSlip.addEventListener("click", () => {
  domElements.slip.style.display = "block";
});

domElements.cancel.addEventListener("click", () => {
  domElements.slip.style.display = "none";
});

const addNumbers = () => {
  for (let i = 1; i <= 49; i++) {
    const num = document.createElement("div");
    num.classList.add("nums");
    num.innerHTML = i;
    domElements.numPanel.append(num);
    globals.numArray.push(i.toString());
  }

  domElements.add.addEventListener("click", () => {
    addToSlip();
    globals.numberCounter++;
    domElements.count.innerHTML = globals.numberCounter;
  });

  const addToSlip = () => {
    const row = document.createElement("div");
    const winOrLose = document.createElement("div");
    winOrLose.classList.add("win-or-lose");
    row.classList.add("row");

    for (let i = 0; i < globals.currentNumbers.length; i++) {
      const rowContent = document.createElement("div");
      rowContent.innerHTML = globals.currentNumbers[i];
      rowContent.classList.add("row-content");
      row.appendChild(rowContent);
    }

    row.appendChild(winOrLose);
    domElements.slip.appendChild(row);
    globals.currentNumbers = [];
    const numbers = document.querySelectorAll(".nums");
    numbers.forEach((num) => {
      num.classList.remove(stringsObject.selected);
      globals.min = 0;
    });
    domElements.add.disabled = true;
    domElements.playButton.disabled = false;
  };
};

addNumbers();

domElements.options.addEventListener("change", () => {
  domElements.add.disabled = true;
  globals.currentNumbers = [];
  document.querySelectorAll(".nums").forEach((num) => {
    num.classList.remove(stringsObject.selected);
  });
  globals.min = 0;
  domElements.selectedOption = domElements.options.value;
});

const colorGenerator = (column) => {
  switch (column) {
    case 1:
      return "red";
    case 2:
      return "purple";
    case 3:
      return "blue";
    case 4:
      return "green";
    case 5:
      return "yellow";
    case 6:
      return "orange";
    case 7:
      return "pink";
    default:
      // Default random color generator (if needed)
      const r = Math.floor(Math.random() * 250);
      const g = Math.floor(Math.random() * 250);
      const b = Math.floor(Math.random() * 200);
      return `rgb(${r},${g},${b})`;
  }
};

const randomizeNumbers = () => {
  let count = 0;

  while (count < 6) {
    const text = globals.numArray[Math.floor(Math.random() * globals.numArray.length)];
    if (!globals.textArray.includes(text)) {
      globals.textArray.push(text);
      count++;
    }
  }
  setTimeout(() => {
    createBall(globals.textArray);
  }, 100);
  const history = localStorage.setItem("results", [].push(globals.textArray));
  return globals.textArray;
};

const createBall = (textArray) => {
  globals.numBalls++;

  if (globals.numBalls >= textArray.length) {
    domElements.playButton.disabled = false;
    return;
  }

  const ball = document.createElement("div");
  ball.classList.add("ball");

  // Determine the column number
  const columnNumber = (globals.numBalls % 7) + 1; // Cycle through 1 to 7 for columns

  // Apply color based on the column
  ball.style.background = colorGenerator(columnNumber);

  const ballInner = document.createElement("div");
  ballInner.classList.add("ball-inner");
  ballInner.innerHTML = textArray[globals.numBalls];

  ball.appendChild(ballInner);

  document.querySelector(".row-content").appendChild(ball); // Assuming balls are appended to a container with the class .row-content

  setTimeout(() => {
    document.querySelectorAll(".row-content").forEach((content) => {
      if (content.innerHTML === ballInner.innerHTML) {
        content.style.border = "4px solid green";
      }
    });
  });

  ball.appendChild(ballInner);
  domElements.results.appendChild(ball);

  setTimeout(() => {
    domElements.resultsNumbers[globals.numBalls].innerHTML = textArray[globals.numBalls];
    domElements.resultsNumbers[globals.numBalls].style.transform = "scale(1)";
    domElements.resultsNumbers[globals.numBalls].style.borderRadius = "0%";
  }, 1200);

  let rollCount = 0;
  let rotate = 360;

  const play = () => {
    rollCount += 10;
    rotate -= 30;
    ball.style.top = "10px";
    ball.style.right = `${rollCount}px`;
    ball.style.transform = `rotate(${rotate}deg)`;
    const thresholds = [420, 350, 280, 210, 140, 70];
    for (let i = 0; i < thresholds.length; i++) {
      if (globals.numBalls === 4) {
        if (globals.interval !== null) {
          const newArray = [];
          setTimeout(() => {
            setTimeout(() => {
              finalArray = newArray.sort((a, b) => {
                return a - b;
              });
            }, 1300);
            setTimeout(() => {
              domElements.resultsNumbers[0].style.transform = "scale(0)";
              newArray.push(domElements.resultsNumbers[0].innerHTML);
            }, 1200);
            setTimeout(() => {
              domElements.resultsNumbers[1].style.transform = "scale(0)";
              newArray.push(domElements.resultsNumbers[1].innerHTML);
            }, 1000);
            setTimeout(() => {
              domElements.resultsNumbers[2].style.transform = "scale(0)";
              newArray.push(domElements.resultsNumbers[2].innerHTML);
            }, 800);
            setTimeout(() => {
              domElements.resultsNumbers[3].style.transform = "scale(0)";
              newArray.push(domElements.resultsNumbers[3].innerHTML);
            }, 600);
            setTimeout(() => {
              domElements.resultsNumbers[4].style.transform = "scale(0)";
              newArray.push(domElements.resultsNumbers[4].innerHTML);
            }, 400);
            setTimeout(() => {
              domElements.resultsNumbers[5].style.transform = "scale(0)";
              newArray.push(domElements.resultsNumbers[5].innerHTML);
            }, 200);
          }, 4000);
          setTimeout(() => {
            setTimeout(() => {
              domElements.resultsNumbers[0].style.transform = "scale(1)";
              domElements.resultsNumbers[0].innerHTML = finalArray[0];
            }, 200);
            setTimeout(() => {
              domElements.resultsNumbers[1].style.transform = "scale(1)";
              domElements.resultsNumbers[1].innerHTML = finalArray[1];
            }, 400);
            setTimeout(() => {
              domElements.resultsNumbers[2].style.transform = "scale(1)";
              domElements.resultsNumbers[2].innerHTML = finalArray[2];
            }, 600);
            setTimeout(() => {
              domElements.resultsNumbers[3].style.transform = "scale(1)";
              domElements.resultsNumbers[3].innerHTML = finalArray[3];
            }, 800);
            setTimeout(() => {
              domElements.resultsNumbers[4].style.transform = "scale(1)";
              domElements.resultsNumbers[4].innerHTML = finalArray[4];
            }, 1000);
            setTimeout(() => {
              domElements.resultsNumbers[5].style.transform = "scale(1)";
              domElements.resultsNumbers[5].innerHTML = finalArray[5];
            }, 1200);
          }, 7000);
        }
      }
      if (rollCount === thresholds[i] && globals.numBalls === i) {
        (rollCount = 0), (rotate = 360), clearInterval(globals.interval);
        createBall(globals.textArray);
        return;
      }
    }

    if (rollCount === 70 && globals.numBalls === 5) {
      (rotate = 360), (rollCount = 0), clearInterval(globals.interval);
      domElements.playButton.disabled = true;
    }
  };

  setTimeout(() => {
    globals.interval = setInterval(play, 50);
  }, 1000);
};

domElements.playButton.addEventListener("click", () => {
  domElements.playButton.disabled = true;
  randomizeNumbers();
});

const finalResults = () => {
  const rowContent = document.querySelectorAll(".row-content");
  rowContent.forEach((content) => {
    if (content.innerHTML === textArray[count - 1]) {
      content.style.border = "4px solid";
      content.style.color = "green";
    } else {
      content.style.color = "rgb(255, 166, 166)";
      content.style.border = "4px solid";
    }
  });
};

const numbers = document.querySelectorAll(".nums");

domElements.randomPick.addEventListener("click", () => {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i].classList.toggle(stringsObject.selected);
  }
});
numbers.forEach((num) => {
  num.addEventListener("click", () => {
    if (globals.min < parseInt(domElements.selectedOption)) {
      num.classList.toggle(stringsObject.selected);
      if (num.classList.contains(stringsObject.selected)) {
        globals.min++;
        globals.currentNumbers.push(num.innerHTML);
      } else {
        globals.min--;
        num.classList.remove(stringsObject.selected);
        globals.currentNumbers.splice(globals.currentNumbers.indexOf(num.innerHTML), 1);
      }
    } else {
      if (num.classList.contains(stringsObject.selected)) {
        globals.min--;
        num.classList.remove(stringsObject.selected);
        globals.currentNumbers.splice(globals.currentNumbers.indexOf(num.innerHTML), 1);
      }
    }
    globals.min === parseInt(domElements.selectedOption)
      ? (domElements.add.disabled = false)
      : (domElements.add.disabled = true);
    console.log(globals.currentNumbers);
  });
});

setInterval(() => {
  globals.numberCounter === 0
    ? (domElements.emptySlip.style.display = "block")
    : (domElements.emptySlip.style.display = "none");
}, 200);
