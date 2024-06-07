const domElements = {
  numPanel: document.querySelector(".select-nums"),
  options: document.querySelector("#select-options"),
  count: document.querySelector("#count"),
  viewSlip: document.querySelector(".view-slip"),
  emptySlip: document.querySelector(".empty"),
  deleted: document.querySelector(".deleted"),
  added: document.querySelector(".added"),
  // cancel: document.querySelector(".cancel"),
  randomPick: document.querySelector("#shuffle"),
  selectedOption: document.querySelector("#select-options").value,
  results: document.querySelector(".results"),
  resultsNumbers: document.querySelectorAll(".pop"),
  add: document.querySelector("#add"),
  playButton: document.querySelector("#play"),
  slip: document.querySelector(".slip"),
  history: document.querySelector(".history"),
  timeLeft: document.querySelector("#seconds"),
};

const colors = ["purple", "red", "orange", "blue", "green", "lightblue", "darkblue"];

const userObject = {
  balance: 50,
  balancePanel: document.querySelector("#balance"),
};

userObject.balancePanel.innerHTML = `${userObject.balance.toFixed(2)}`;

const globals = {
  numArray: [],
  textArray: [],
  currentNumbers: [],
  min: 0,
  interval: null,
  numBalls: -1,
  numberCounter: 0,
  historyArray: [],
  randomPicked: [],
  randomPickedFinal: [],
};

const stringsObject = {
  selected: "selected",
};

let finalArray = [];
let history;

domElements.add.disabled = true;
domElements.playButton.disabled = true;

domElements.viewSlip.addEventListener("click", () => {
  domElements.slip.classList.toggle("display");
});

// domElements.cancel.addEventListener("click", () => {
//   domElements.slip.classList.toggle("display");
// });

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
    userObject.balance--;
    userObject.balancePanel.innerHTML = `${userObject.balance.toFixed(2)}`;

    domElements.added.classList.toggle("display");
    setTimeout(() => {
      domElements.added.classList.toggle("display");
    }, 700);
  });

  const addToSlip = () => {
    const row = document.createElement("div");
    const winOrLose = document.createElement("div");
    winOrLose.classList.add("win-or-lose");
    row.classList.add("row");

    const newArray = globals.currentNumbers.sort((a, b) => {
      return a - b;
    });

    const newRandomPicked = globals.randomPickedFinal.sort((a, b) => {
      return a - b;
    });

    if (newRandomPicked.length > 0) {
      for (let i = 0; i < newRandomPicked.length; i++) {
        const rowContent = document.createElement("div");
        rowContent.innerHTML = parseInt(newRandomPicked[i]) + 1;
        rowContent.classList.add("row-content");
        row.appendChild(rowContent);
      }
    } else {
      for (let i = 0; i < globals.currentNumbers.length; i++) {
        const rowContent = document.createElement("div");
        rowContent.innerHTML = newArray[i];
        rowContent.classList.add("row-content");
        row.appendChild(rowContent);
      }
    }

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash");
    row.appendChild(deleteItem);

    row.appendChild(winOrLose);
    domElements.slip.appendChild(row);

    deleteItem.addEventListener("click", () => {
      domElements.slip.removeChild(row);
      globals.numberCounter--;
      domElements.count.innerHTML = globals.numberCounter;

      userObject.balance++;
      userObject.balancePanel.innerHTML = `${userObject.balance.toFixed(2)}`;

      domElements.deleted.classList.toggle("display");
      setTimeout(() => {
        domElements.deleted.classList.toggle("display");
      }, 700);
    });

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

  for (let i = 1; i <= 49; i++) {
    if (i % 7 === 1) {
      if (textArray[globals.numBalls] == i) ball.style.background = colors[0];
    }
    if (i % 7 === 2) {
      if (textArray[globals.numBalls] == i) ball.style.background = colors[1];
    }
    if (i % 7 === 3) {
      if (textArray[globals.numBalls] == i) ball.style.background = colors[2];
    }
    if (i % 7 === 4) {
      if (textArray[globals.numBalls] == i) ball.style.background = colors[3];
    }
    if (i % 7 === 5) {
      if (textArray[globals.numBalls] == i) ball.style.background = colors[4];
    }
    if (i % 7 === 6) {
      if (textArray[globals.numBalls] == i) ball.style.background = colors[5];
    }
    if (i % 7 === 7) {
      if (textArray[globals.numBalls] == i) ball.style.background = colors[6];
    }
  }

  const ballInner = document.createElement("div");
  ballInner.classList.add("ball-inner");
  ballInner.innerHTML = textArray[globals.numBalls];

  ball.appendChild(ballInner);

  if (ball) {
    document.querySelector(".row-content").appendChild(ball);
    setTimeout(() => {
      document.querySelectorAll(".row-content").forEach((content) => {
        if (content.innerHTML === ballInner.innerHTML) {
          content.style.background = "green";
          content.style.color = "white";
        }
      });
    }, 2000);
  }

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
  globals.randomPicked = [];
  globals.randomPickedFinal = [];
  let randomCount = 0;

  numbers.forEach((number) => {
    number.classList.remove(stringsObject.selected);
  });

  while (randomCount < 6) {
    const text = globals.numArray[Math.floor(Math.random() * globals.numArray.length)];
    if (!globals.randomPicked.includes(text)) {
      globals.randomPicked.push(text);
      randomCount++;
    }
  }

  for (let i = 0; i < domElements.selectedOption; i++) {
    const numbersPicked = globals.randomPicked[i];
    globals.randomPickedFinal.push(numbersPicked);
    numbers[numbersPicked].classList.add(stringsObject.selected);
  }
  console.log(globals.randomPickedFinal);

  globals.min = parseInt(domElements.selectedOption);

  globals.min === parseInt(domElements.selectedOption)
    ? (domElements.add.disabled = false)
    : (domElements.add.disabled = true);
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

// Play after every 2 minutes
// Real time

setInterval(() => {
  let time = ` ${new Date().getMinutes() % 2}:${new Date().getSeconds()}`;
  domElements.timeLeft.innerHTML = time;
  if (time.trim() === "0:18") randomizeNumbers();
  if (time.trim() === "1:0") {
    domElements.results.innerHTML = "";
    globals.textArray = [];
    globals.numBalls = -1;
    let newArray = [];

    domElements.resultsNumbers.forEach((item) => {
      item.style.transform = "scale(0)";
      newArray.push(item.innerHTML);
    });

    const historicResults = document.createElement("div");
    historicResults.classList.add("historic-results");

    newArray.forEach((item) => {
      const ball = document.createElement("div");
      ball.classList.add("ball-history");
      ball.innerHTML = item;
      for (let i = 1; i <= 49; i++) {
        if (i % 7 === 1) {
          if (item == i) ball.style.background = colors[0];
        }
        if (i % 7 === 2) {
          if (item == i) ball.style.background = colors[1];
        }
        if (i % 7 === 3) {
          if (item == i) ball.style.background = colors[2];
        }
        if (i % 7 === 4) {
          if (item == i) ball.style.background = colors[3];
        }
        if (i % 7 === 5) {
          if (item == i) ball.style.background = colors[4];
        }
        if (i % 7 === 6) {
          if (item == i) ball.style.background = colors[5];
        }
        if (i % 7 === 7) {
          if (item == i) ball.style.background = colors[6];
        }
      }
      historicResults.append(ball);
    });
    newArray = [];
    domElements.history.append(historicResults);
  }
}, 1000);
