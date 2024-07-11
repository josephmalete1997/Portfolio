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
  history: document.querySelector(".history-results"),
  timeLeft: document.querySelector("#seconds"),
  stake: document.querySelector("#stake"),
  trash: document.querySelectorAll(".deleteItem"),
  clearHistory: document.querySelector("#clear-history"),
  historyIcon: document.querySelector("#clear-history .fa-solid"),
};

const light = 70;

const colors = [
  `hsl(270, 100%, ${light}%)`,
  `hsl(0, 100%, ${light}%)`,
  `hsl(30, 100%, ${light}%)`,
  `hsl(240, 100%,${light}%)`,
  `hsl(120, 100%, ${light}%)`,
  `hsl(120, 100%,${light}%)`,
  `hsl(60, 100%, ${light}%)`,
];

const userObject = {
  name: "Joseph",
  balance: null,
  namePanel: document.querySelector(".name"),
  balancePanel: document.querySelector("#balance"),
};

const getBalance = Math.round((localStorage.getItem("balance") * 100) / 100.0);
getBalance ? (userObject.balance = getBalance) : localStorage.setItem("balance", 50);

const betObject = {
  stake: null,
  numbers: null,
  payout: null,
};

const betResults = [];

// console.log(betObject);

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
  resultsArray: JSON.parse(localStorage.getItem("results")) || [],
};

const stringsObject = {
  selected: "selected",
};

let finalArray = [];
let history;

domElements.playButton.style.display = "none";
domElements.clearHistory.addEventListener("click", () => {
  domElements.historyIcon.classList.toggle("rotate");
  localStorage.setItem("results", "[]");
  setTimeout(() => {
    domElements.history.innerHTML = "";
  }, 1000);
});
