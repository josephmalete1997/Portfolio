userObject.balancePanel.innerHTML = userObject.balance;
userObject.namePanel.innerHTML = userObject.name;

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
    if (domElements.stake.value === "" || parseInt(domElements.stake.value) === 0) {
      alert("Your minimum stake should be at least R1 per bet!");
    } else {
      if (userObject.balance < domElements.stake.value) {
        alert("You don't have enough money to place a bet!");
      } else {
        addToSlip();
        globals.numberCounter++;
        domElements.count.innerHTML = globals.numberCounter;
        userObject.balance -= domElements.stake.value;
        localStorage.setItem("balance", userObject.balance);
        userObject.balancePanel.innerHTML = `${userObject.balance.toFixed(2)}`;
        domElements.added.classList.toggle("display");
        setTimeout(() => {
          domElements.added.classList.toggle("display");
        }, 700);
      }
    }
  });

  const addToSlip = () => {
    domElements.emptySlip.style.display = "none";
    const row = document.createElement("div");
    row.classList.add("slip-item");
    row.classList.add("row");

    const newArray = globals.currentNumbers.sort((a, b) => {
      return a - b;
    });

    const newRandomPicked = globals.randomPickedFinal.sort((a, b) => {
      return a - b;
    });

    betObject.numbers = newRandomPicked;
    betObject.stake = parseInt(domElements.stake.value);

    if (betObject.numbers.length === 1) betObject.payout = betObject.stake * 5;
    if (betObject.numbers.length === 2) betObject.payout = betObject.stake * 55;
    if (betObject.numbers.length === 3) betObject.payout = betObject.stake * 550;
    if (betObject.numbers.length === 4) betObject.payout = betObject.stake * 5500;
    if (betObject.numbers.length === 5) betObject.payout = betObject.stake * 55000;
    if (betObject.numbers.length === 6) betObject.payout = betObject.stake * 550000;

    const deleteItem = document.createElement("i");
    const stakePayout = document.createElement("span");
    stakePayout.classList.add("stake-payout");
    stakePayout.innerHTML = `R${betObject.stake} = R${betObject.payout}`;
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash");
    deleteItem.classList.add("deleteItem");
    row.appendChild(deleteItem);

    if (betObject.numbers.length > 0) {
      for (let i = 0; i < betObject.numbers.length; i++) {
        const rowContent = document.createElement("div");
        rowContent.innerHTML = parseInt(betObject.numbers[i]) + 1;
        rowContent.classList.add("row-content");
        row.appendChild(rowContent);
      }
      row.appendChild(stakePayout);
    } else {
      for (let i = 0; i < globals.currentNumbers.length; i++) {
        const rowContent = document.createElement("div");
        rowContent.innerHTML = newArray[i];
        rowContent.classList.add("row-content");
        row.appendChild(rowContent);
      }
      row.appendChild(stakePayout);
    }

    // console.log(betObject);

    domElements.slip.insertBefore(row, domElements.slip.children[0]);

    deleteItem.addEventListener("click", () => {
      domElements.slip.removeChild(row);

      const returnedStake = parseInt(
        row.children[row.children.length - 1].innerHTML.toString().split("|")[0].replace("R", "")
      );

      globals.numberCounter--;
      domElements.count.innerHTML = globals.numberCounter;

      userObject.balance += returnedStake;
      localStorage.setItem("balance", userObject.balance);
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
    if (i % 7 === 0) {
      if (textArray[globals.numBalls] == i) ball.style.background = colors[6];
    }
  }

  const ballInner = document.createElement("div");
  ballInner.classList.add("ball-inner");
  ballInner.innerHTML = textArray[globals.numBalls];

  ball.appendChild(ballInner);

  // if (ball) {
  //   document.querySelector(".row-content").appendChild(ball);
  //   setTimeout(() => {
  //     document.querySelectorAll(".row-content").forEach((content) => {
  //       if (content.innerHTML === ballInner.innerHTML) {
  //         content.style.background = "lime";
  //         content.style.color = "green";
  //       }
  //     });
  //   }, 2000);
  // }

  ball.appendChild(ballInner);
  domElements.results.appendChild(ball);

  setTimeout(() => {
    domElements.resultsNumbers[globals.numBalls].innerHTML = textArray[globals.numBalls];
    domElements.resultsNumbers[globals.numBalls].style.transform = "scale(0)";
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

//Auto play

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
  // console.log(globals.randomPickedFinal);

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
    // console.log(globals.currentNumbers);
  });
});

// Play after every 2 minutes
// Real time

//Restore history
function restoreHistory() {
  globals.resultsArray.forEach((item) => {
    const historicResults = document.createElement("div");
    historicResults.classList.add("historic-results");

    item.numbers.forEach((item) => {
      const ball = document.createElement("div");
      ball.classList.add("ball-history");
      ball.innerHTML = item;
      historicResults.append(ball);
    });
    newArray = [];
    const timeStamp = document.createElement("span");
    timeStamp.classList.add("time-stamp");
    timeStamp.innerHTML = `${item.time}`;
    historicResults.append(timeStamp);
    domElements.history.insertBefore(historicResults, domElements.history.children[0]);
  });
}

restoreHistory();

// Local storage
const saveToHistory = (newArray, time) => {
  const drawId = Math.floor(Math.random() * 1000000);
  const saveBet = {
    id: drawId,
    numbers: newArray,
    time: time,
  };

  // console.log(globals.resultsArray);

  globals.resultsArray.push(saveBet);
  localStorage.setItem("results", JSON.stringify(globals.resultsArray));
};

setInterval(() => {
  const trash = document.querySelectorAll(".deleteItem");
  // console.log(trash.length);
  let time = `${new Date().getSeconds()}`;
  domElements.timeLeft.innerHTML = time;
  let newArray = [];
  if (time.trim() === "20") {
    randomizeNumbers();
    domElements.trash.forEach((item) => {
      item.style.display = "none";
    });
  }
  if (time.trim() === "40") {
    domElements.trash.forEach((item) => {
      item.style.display = "block";
    });
    globals.numberCounter = 0;
    domElements.emptySlip.style.display='block'
    domElements.results.innerHTML = "";
    globals.textArray = [];
    globals.numBalls = -1;
    domElements.count.innerHTML = globals.numberCounter;

    domElements.resultsNumbers.forEach((item) => {
      item.style.transform = "scale(0)";
      newArray.push(item.innerHTML);
    });

    const timeStamp = document.createElement("span");
    timeStamp.classList.add("time-stamp");
    timeStamp.innerHTML = `<i class="fa-solid fa-clock"></i> ${new Date().toLocaleTimeString()}`;

    saveToHistory(newArray, timeStamp.innerHTML);

    const historicResults = document.createElement("div");
    historicResults.classList.add("historic-results");

    newArray.forEach((item) => {
      const ball = document.createElement("div");
      ball.classList.add("ball-history");
      ball.innerHTML = item;
      historicResults.append(ball);
    });
    newArray = [];
    historicResults.append(timeStamp);
    domElements.history.insertBefore(historicResults, domElements.history.children[0]);
  }
}, 1000);

// clear

setInterval(() => {
  globals.numberCounter === 0
    ? (domElements.emptySlip.style.display = "block")
    : (domElements.emptySlip.style.display = "none");
}, 200);
