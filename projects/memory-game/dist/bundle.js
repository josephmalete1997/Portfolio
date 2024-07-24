/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./src/helper_functions.js":
      /*!*********************************!*\
  !*** ./src/helper_functions.js ***!
  \*********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const images = __webpack_require__(/*! ./images.json */ "./src/images.json");\r\nconst { domElements, elementStrings, moveCount } = __webpack_require__(/*! ./helper_objects */ "./src/helper_objects.js");\r\n\r\nconst randomizeCards = (cards, numberOfCards) => {\r\n  const cardsArray = [];\r\n  const selectedIndices = [];\r\n\r\n  while (cardsArray.length < numberOfCards / 2) {\r\n    const randomIndex = Math.floor(Math.random() * images.length);\r\n    if (!selectedIndices.includes(randomIndex)) {\r\n      selectedIndices.push(randomIndex);\r\n      cardsArray.push(images[randomIndex]);\r\n    }\r\n  }\r\n\r\n  const newCardsArray = cardsArray.concat(cardsArray);\r\n  const resultArray = [];\r\n  const selectedIndicesTwo = [];\r\n\r\n  while (resultArray.length < numberOfCards) {\r\n    const randomIndex = Math.floor(Math.random() * newCardsArray.length);\r\n    if (!selectedIndicesTwo.includes(randomIndex)) {\r\n      selectedIndicesTwo.push(randomIndex);\r\n      resultArray.push(newCardsArray[randomIndex]);\r\n    }\r\n  }\r\n\r\n  cards.forEach((card, index) => {\r\n    card.style.backgroundImage = `url(${resultArray[index]})`;\r\n  });\r\n};\r\n\r\nconst setUpGridSize = (size, canvas) => {\r\n  if (size === 4) {\r\n    canvas.style.gridTemplateColumns = "repeat(2, 100px)";\r\n    return size;\r\n  } else if (size === 6) {\r\n    canvas.style.gridTemplateColumns = "repeat(3, 100px)";\r\n    return size;\r\n  } else if (size === 8 || size === 0) {\r\n    canvas.style.gridTemplateColumns = "repeat(4, 100px)";\r\n    return 8;\r\n  } else if (size === 12) {\r\n    canvas.style.gridTemplateColumns = "repeat(4, 100px)";\r\n    return size;\r\n  } else if (size === 16) {\r\n    canvas.style.gridTemplateColumns = "repeat(4, 100px)";\r\n    return size;\r\n  }\r\n};\r\n\r\nconst createCards = (number) => {\r\n  for (let i = 0; i < number; i++) {\r\n    const card = document.createElement(elementStrings.div);\r\n    card.classList.add("card");\r\n    card.setAttribute(elementStrings.id, i);\r\n    domElements.canvas.append(card);\r\n  }\r\n};\r\n\r\nconst countMoves = () => {\r\n  moveCount.number++;\r\n  domElements.moves.innerHTML = moveCount.number;\r\n};\r\n\r\nconst resetMoves = () => {\r\n  moveCount.number = 0;\r\n  domElements.moves.innerHTML = moveCount.number;\r\n};\r\n\r\nmodule.exports = {\r\n  randomizeCards,\r\n  setUpGridSize,\r\n  createCards,\r\n  countMoves,\r\n  resetMoves,\r\n};\r\n\n\n//# sourceURL=webpack://memory-game/./src/helper_functions.js?'
        );

        /***/
      },

    /***/ "./src/helper_objects.js":
      /*!*******************************!*\
  !*** ./src/helper_objects.js ***!
  \*******************************/
      /***/ (module) => {
        eval(
          'const toggleObject = {\r\n  flipped: "flipped",\r\n  original: "original",\r\n  pointer: "pointer",\r\n  default: "default",\r\n  block: "block",\r\n  none: "none",\r\n  flex: "flex",\r\n};\r\n\r\nconst domElements = {\r\n  cards: document.querySelectorAll(".card"),\r\n  restartButton: document.getElementById("restart-btn"),\r\n  replayButton: document.getElementById("replay-btn"),\r\n  gridSize: document.querySelector("#grid-size"),\r\n  canvas: document.querySelector(".canvas"),\r\n  timer: document.querySelector("#timer"),\r\n  minutes: document.querySelector("#minutes"),\r\n  seconds: document.querySelector("#seconds"),\r\n  feedback: document.querySelector(".feedback"),\r\n  moves: document.querySelector("#moves"),\r\n  totalMoves: document.querySelector("#total-moves"),\r\n  gridButton: document.querySelector(".size-panel p"),\r\n  grid: document.querySelector(".grid-size"),\r\n  gridSizes: document.querySelectorAll(".grid-size div"),\r\n};\r\n\r\nconst elementStrings = {\r\n  card: ".card",\r\n  script: "script",\r\n  div: "div",\r\n  id: "id",\r\n};\r\n\r\nconst eventObject = {\r\n  click: "click",\r\n};\r\n\r\nconst visibility = {\r\n  hidden: "hidden",\r\n  visible: "visible",\r\n};\r\n\r\nconst numberOfCards = {\r\n  number: 8,\r\n};\r\n\r\nconst cardsIdArray = [];\r\nconst cards = [];\r\n\r\nconst countDownObject = {\r\n  countDown: domElements.cards.length,\r\n};\r\n\r\nconst timerObject = {\r\n  count: 0,\r\n  minutes: 0,\r\n  seconds: 0,\r\n};\r\n\r\nconst startTimer = {\r\n  interval: undefined,\r\n};\r\n\r\nconst moveCount = {\r\n  number: 0,\r\n};\r\n\r\nmodule.exports = {\r\n  toggleObject,\r\n  domElements,\r\n  elementStrings,\r\n  eventObject,\r\n  numberOfCards,\r\n  cardsIdArray,\r\n  countDownObject,\r\n  visibility,\r\n  cards,\r\n  timerObject,\r\n  startTimer,\r\n  moveCount,\r\n};\r\n\n\n//# sourceURL=webpack://memory-game/./src/helper_objects.js?'
        );

        /***/
      },

    /***/ "./src/memory_game_dom.js":
      /*!********************************!*\
  !*** ./src/memory_game_dom.js ***!
  \********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const {\r\n  toggleObject,\r\n  domElements,\r\n  elementStrings,\r\n  eventObject,\r\n  numberOfCards,\r\n  cardsIdArray,\r\n  countDownObject,\r\n  visibility,\r\n  cards,\r\n  timerObject,\r\n  startTimer,\r\n  moveCount,\r\n} = __webpack_require__(/*! ./helper_objects */ "./src/helper_objects.js");\r\nconst { randomizeCards, createCards, countMoves, resetMoves, setUpGridSize } = __webpack_require__(/*! ./helper_functions */ "./src/helper_functions.js");\r\n\r\ndomElements.gridButton.addEventListener("click", () => {\r\n  domElements.grid.classList.toggle("hide");\r\n});\r\n\r\ndomElements.gridSizes.forEach((gridSize) => {\r\n  gridSize.addEventListener("click", () => {\r\n    const changeGridSize = () => {\r\n      domElements.canvas.innerHTML = "";\r\n      numberOfCards.number = setUpGridSize(parseInt(gridSize.getAttribute("value")), domElements.canvas);\r\n      createCards(numberOfCards.number);\r\n      cards.length = 0;\r\n      document.querySelectorAll(elementStrings.card).forEach((card) => {\r\n        cards.push(card);\r\n      });\r\n      randomizeCards(cards, numberOfCards.number);\r\n      resetGame();\r\n    };\r\n    changeGridSize();\r\n    domElements.grid.classList.toggle("hide");\r\n  });\r\n});\r\n\r\nconst resetGame = () => {\r\n  setTimeout(() => {\r\n    cards.forEach((card) => {\r\n      card.style.backgroundImage = "";\r\n      card.classList.remove(toggleObject.flipped);\r\n      card.classList.remove(toggleObject.original);\r\n      card.style.cursor = toggleObject.pointer;\r\n      card.addEventListener(eventObject.click, cardClick);\r\n    });\r\n    domElements.restartButton.style.visibility = visibility.hidden;\r\n    cardsIdArray.splice(0, cardsIdArray.length);\r\n    randomizeCards(cards, numberOfCards.number);\r\n    countDownObject.countDown = cards.length;\r\n    domElements.feedback.style.display = toggleObject.none;\r\n    clearInterval(startTimer.interval);\r\n    timerObject.count = 0;\r\n    timerObject.minutes = 0;\r\n    timerObject.seconds = 0;\r\n    domElements.timer.innerHTML = "0 : 00";\r\n    startTimer.interval = undefined;\r\n    resetMoves();\r\n  }, 100);\r\n};\r\n\r\ncreateCards(numberOfCards.number);\r\n\r\ndocument.querySelectorAll(elementStrings.card).forEach((card) => {\r\n  cards.push(card);\r\n});\r\n\r\nrandomizeCards(cards, numberOfCards.number);\r\ncountDownObject.countDown = cards.length;\r\n\r\ndomElements.restartButton.addEventListener(eventObject.click, resetGame);\r\ndomElements.replayButton.addEventListener(eventObject.click, resetGame);\r\n\r\nconst removeClickEvent = () => {\r\n  document.querySelectorAll(elementStrings.card).forEach((card) => {\r\n    if (!card.classList.contains(toggleObject.flipped)) {\r\n      card.removeEventListener(eventObject.click, cardClick);\r\n    }\r\n  });\r\n};\r\n\r\nconst addClickEvent = () => {\r\n  document.querySelectorAll(elementStrings.card).forEach((card) => {\r\n    if (!card.classList.contains(toggleObject.flipped)) {\r\n      card.addEventListener(eventObject.click, cardClick);\r\n    }\r\n  });\r\n};\r\n\r\nconst handleMatched = (cardOne, cardTwo) => {\r\n  removeClickEvent();\r\n  setTimeout(() => {\r\n    cardOne.style.cursor = toggleObject.default;\r\n    cardTwo.style.cursor = toggleObject.default;\r\n    cardOne.removeEventListener(eventObject.click, cardClick);\r\n    cardTwo.removeEventListener(eventObject.click, cardClick);\r\n    countDownObject.countDown = countDownObject.countDown - 2;\r\n    addClickEvent();\r\n    if (countDownObject.countDown === 0) {\r\n      setTimeout(() => {\r\n        clearTimeout(startTimer.interval);\r\n        domElements.feedback.style.display = toggleObject.flex;\r\n        domElements.totalMoves.innerHTML = moveCount.number;\r\n      }, 100);\r\n    }\r\n  }, 800);\r\n};\r\n\r\nconst handleMismatched = (cardOne, cardTwo) => {\r\n  removeClickEvent();\r\n  setTimeout(() => {\r\n    cardOne.classList.remove(toggleObject.flipped);\r\n    cardTwo.classList.remove(toggleObject.flipped);\r\n    cardOne.classList.remove(toggleObject.original);\r\n    cardTwo.classList.remove(toggleObject.original);\r\n    cardOne.style.cursor = toggleObject.pointer;\r\n    cardTwo.style.cursor = toggleObject.pointer;\r\n    cardOne.addEventListener(eventObject.click, cardClick);\r\n    cardTwo.addEventListener(eventObject.click, cardClick);\r\n    addClickEvent();\r\n  }, 800);\r\n};\r\n\r\nconst setTimer = () => {\r\n  timerObject.count++;\r\n  if (timerObject.count === 10) {\r\n    timerObject.count = 0;\r\n    timerObject.seconds++;\r\n    if (timerObject.seconds === 6) {\r\n      timerObject.seconds = 0;\r\n      timerObject.minutes++;\r\n    }\r\n  }\r\n  domElements.timer.innerHTML = `${timerObject.minutes} : ${timerObject.seconds}${timerObject.count}`;\r\n  if (timerObject.minutes === 0) domElements.minutes.innerHTML = ``;\r\n  if (timerObject.minutes === 1) {\r\n    domElements.minutes.innerHTML = `${timerObject.minutes} minute and `;\r\n  }\r\n  if (timerObject.minutes > 1) {\r\n    domElements.minutes.innerHTML = `${timerObject.minutes} minutes and `;\r\n  }\r\n  domElements.seconds.innerHTML = `${timerObject.seconds}${timerObject.count}`;\r\n};\r\n\r\nconst cardClick = (event) => {\r\n  countMoves();\r\n  if (!startTimer.interval) {\r\n    startTimer.interval = setInterval(setTimer, 1000);\r\n  }\r\n  setTimeout(() => {\r\n    domElements.restartButton.style.visibility = visibility.visible;\r\n  }, 500);\r\n  const card = event.target;\r\n  card.classList.toggle(toggleObject.flipped);\r\n  card.classList.toggle(toggleObject.original);\r\n\r\n  if (card.classList.contains(toggleObject.flipped)) {\r\n    card.style.cursor = toggleObject.default;\r\n    card.removeEventListener(eventObject.click, cardClick);\r\n  }\r\n\r\n  if (cardsIdArray.length < 2) {\r\n    if (!cardsIdArray.includes(card.getAttribute(elementStrings.id)))\r\n      cardsIdArray.push(card.getAttribute(elementStrings.id));\r\n  }\r\n\r\n  if (cardsIdArray.length === 2) {\r\n    const cardOne = document.getElementById(cardsIdArray[0]);\r\n    const cardTwo = document.getElementById(cardsIdArray[1]);\r\n\r\n    if (cardOne.style.backgroundImage === cardTwo.style.backgroundImage) {\r\n      handleMatched(cardOne, cardTwo);\r\n    } else {\r\n      handleMismatched(cardOne, cardTwo);\r\n    }\r\n    cardsIdArray.splice(0, cardsIdArray.length);\r\n  }\r\n};\r\n\r\nconst setupEventListeners = () => {\r\n  cards.forEach((card) => {\r\n    card.addEventListener(eventObject.click, cardClick);\r\n  });\r\n};\r\nsetupEventListeners();\r\n\r\nmodule.exports = {\r\n  cardClick,\r\n  setupEventListeners,\r\n  resetGame,\r\n  changeGridSize,\r\n  setTimer,\r\n};\r\n\n\n//# sourceURL=webpack://memory-game/./src/memory_game_dom.js?'
        );

        /***/
      },

    /***/ "./src/images.json":
      /*!*************************!*\
  !*** ./src/images.json ***!
  \*************************/
      /***/ (module) => {
        "use strict";
        eval(
          'module.exports = /*#__PURE__*/JSON.parse(\'["src/images/1.png","src/images/2.png","src/images/3.png","src/images/4.png","src/images/5.png","src/images/6.png","src/images/7.png","src/images/8.png","src/images/9.png","src/images/10.png","src/images/11.png","src/images/12.png","src/images/13.png","src/images/14.png","src/images/15.png","src/images/16.png"]\');\n\n//# sourceURL=webpack://memory-game/./src/images.json?'
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module is referenced by other modules so it can't be inlined
  /******/ var __webpack_exports__ = __webpack_require__("./src/memory_game_dom.js");
  /******/
  /******/
})();
