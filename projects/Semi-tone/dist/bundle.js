/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./spec/test_helper_functions.js":
/*!***************************************!*\
  !*** ./spec/test_helper_functions.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { elements, display } = __webpack_require__(/*! ../src/helper_objects */ \"./src/helper_objects.js\");\r\nconst correctAnswer = (notesArray, noteOne, noteTwo) => {\r\n  let firstNote, secondNote;\r\n\r\n  for (let i = 0; i < notesArray.length; i++) {\r\n    if (Array.isArray(notesArray[i])) {\r\n      for (let j = 0; j < notesArray[i].length; j++) {\r\n        if (notesArray[i][j] === noteOne) firstNote = i;\r\n        if (notesArray[i][j] === noteTwo) secondNote = i;\r\n      }\r\n    }\r\n    if (notesArray[i] === noteOne) firstNote = i;\r\n    if (notesArray[i] === noteTwo) secondNote = i;\r\n  }\r\n\r\n  return [\r\n    Math.abs(firstNote - secondNote),\r\n    notesArray.length - Math.abs(firstNote - secondNote),\r\n  ];\r\n};\r\n\r\nconst getNotesContent = () => {\r\n  return Array.from(elements.notes).map((note) => note.innerHTML);\r\n};\r\n\r\nconst resetState = () => {\r\n  elements.answerInput.value = \"\";\r\n  elements.resultMessage.style.display = display.none;\r\n  elements.successMessage.style.display = display.none;\r\n  elements.details.style.display = display.none;\r\n  elements.randomizeButton.disabled = false;\r\n  elements.checkAnswerButton.disabled = false;\r\n  elements.giveUpButton.disabled = false;\r\n  elements.randomizeButton.click();\r\n};\r\n\r\nmodule.exports = { correctAnswer, getNotesContent, resetState };\r\n\n\n//# sourceURL=webpack://josephjacob-malete-199-semitone-difference-basic-algorithm-javascript/./spec/test_helper_functions.js?");

/***/ }),

/***/ "./src/helper_functions.js":
/*!*********************************!*\
  !*** ./src/helper_functions.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { notesArray, errorMessage, display } = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\r\n\r\nconst getNewNotesArray = (notesArray) => {\r\n  const flatSharpArray = [];\r\n\r\n  for (let i = 0; i < notesArray.length; i++) {\r\n    if (Array.isArray(notesArray[i])) {\r\n      for (let j = 0; j < notesArray[i].length; j++) {\r\n        flatSharpArray.push(notesArray[i][j]);\r\n      }\r\n    } else {\r\n      flatSharpArray.push(notesArray[i]);\r\n    }\r\n  }\r\n  return flatSharpArray;\r\n};\r\n\r\nconst getSetCurrentNotesErrors = (notes) => {\r\n  if (!notes || !Array.isArray(notes) || notes.length !== 2)\r\n    throw new Error(errorMessage.undefinedNotes);\r\n\r\n  const [noteOne, noteTwo] = notes;\r\n\r\n  if (noteOne === noteTwo) throw new Error(errorMessage.sameNote);\r\n\r\n  for (let i = 0; i < notesArray.length; i++) {\r\n    if (notesArray[i].includes(noteOne) && notesArray[i].includes(noteTwo))\r\n      throw new Error(errorMessage.sameNote);\r\n  }\r\n\r\n  if (\r\n    !getNewNotesArray(notesArray).includes(noteOne) ||\r\n    !getNewNotesArray(notesArray).includes(noteTwo)\r\n  )\r\n    throw new Error(errorMessage.invalidNote);\r\n\r\n  if (typeof noteOne !== \"string\" || typeof noteTwo !== \"string\")\r\n    throw new Error(errorMessage.notOfTypeString);\r\n};\r\n\r\nconst getAnswerErrors = (answer) => {\r\n  if (answer < 1 || answer > 11) throw new Error(errorMessage.invalidRange);\r\n  if (!Number.isInteger(answer)) throw new Error(errorMessage.notWholeNumber);\r\n};\r\n\r\nconst getRandom = () => Math.floor(Math.random() * getNewNotesArray(notesArray).length);\r\n\r\nconst hasFlatAndSharp = (notes, thisNotes) => {\r\n  if (notes) {\r\n    for (let i = 0; i < notesArray.length; i++) {\r\n      if (Array.isArray(notesArray[i])) {\r\n        if (notes.includes(notesArray[i][0]) && notes.includes(notesArray[i][1])) {\r\n          thisNotes[0] = notesArray[i][0];\r\n          thisNotes[1] = notesArray[i][1];\r\n        }\r\n      }\r\n    }\r\n  }\r\n};\r\n\r\nconst checkAnswerHelper = (answer, getNote) => {\r\n  let note1, note2;\r\n  getAnswerErrors(answer);\r\n\r\n  for (let i = 0; i < notesArray.length; i++) {\r\n    if (Array.isArray(notesArray[i])) {\r\n      for (let j = 0; j < notesArray[i].length; j++) {\r\n        if (notesArray[i][j] === getNote[0]) note1 = i;\r\n        if (notesArray[i][j] === getNote[1]) note2 = i;\r\n      }\r\n    }\r\n    if (notesArray[i] === getNote[0]) note1 = i;\r\n    if (notesArray[i] === getNote[1]) note2 = i;\r\n  }\r\n\r\n  const differenceOne = Math.abs(note2 - note1);\r\n  const differenceTwo = notesArray.length - differenceOne;\r\n\r\n  return answer === differenceOne || answer === differenceTwo;\r\n};\r\n\r\nconst hideElement = (...args) => {\r\n  args.forEach((element) => {\r\n    element.style.display = display.none;\r\n  });\r\n};\r\n\r\nconst displayElement = (...args) => {\r\n  args.forEach((element) => {\r\n    element.style.display = display.flex;\r\n  });\r\n};\r\n\r\nconst isDisabled = (element, boolean, cursor) => {\r\n  element.disabled = boolean;\r\n  element.style.cursor = cursor;\r\n};\r\n\r\nconst changeVisibility = (element, visibility) => {\r\n  element.style.visibility = visibility;\r\n};\r\n\r\nmodule.exports = {\r\n  getAnswerErrors,\r\n  getSetCurrentNotesErrors,\r\n  getRandom,\r\n  hasFlatAndSharp,\r\n  checkAnswerHelper,\r\n  getNewNotesArray,\r\n  hideElement,\r\n  displayElement,\r\n  changeVisibility,\r\n  isDisabled,\r\n};\r\n\n\n//# sourceURL=webpack://josephjacob-malete-199-semitone-difference-basic-algorithm-javascript/./src/helper_functions.js?");

/***/ }),

/***/ "./src/helper_objects.js":
/*!*******************************!*\
  !*** ./src/helper_objects.js ***!
  \*******************************/
/***/ ((module) => {

eval("const notesArray = [\r\n  \"A\",\r\n  [\"A#\", \"Bb\"],\r\n  \"B\",\r\n  \"C\",\r\n  [\"C#\", \"Db\"],\r\n  \"D\",\r\n  [\"D#\", \"Eb\"],\r\n  \"E\",\r\n  \"F\",\r\n  [\"F#\", \"Gb\"],\r\n  \"G\",\r\n  [\"G#\", \"Ab\"],\r\n];\r\n\r\nconst errorMessage = {\r\n  undefinedNotes: \"Notes are not set and/or are incorrectly set!\",\r\n  notOfTypeString: \"Notes should be of type string!\",\r\n  invalidNote: \"Invalid note selected!\",\r\n  sameNote: \"You are not allowed to enter two of the same notes!\",\r\n  invalidRange: \"Invalid range. Answer must not be less than 1 or greater than 11!\",\r\n  notWholeNumber: \"Answer must be a whole number!\",\r\n  emptyAnswer: \"Answer cannot be empty!\",\r\n};\r\n\r\nconst results = {\r\n  correct: \"Correct<br>Well done!\",\r\n  incorrect: \"Wrong answer, try again!\",\r\n};\r\n\r\nconst display = {\r\n  flex: \"flex\",\r\n  none: \"none\",\r\n};\r\n\r\nconst visibility = {\r\n  visible: \"visible\",\r\n  hidden: \"hidden\",\r\n};\r\n\r\nconst cursor = {\r\n  pointer: \"pointer\",\r\n  text: \"text\",\r\n  notAllowed: \"not-allowed\",\r\n};\r\n\r\nconst event = {\r\n  click: \"click\",\r\n  input: \"input\",\r\n};\r\n\r\nconst elements = {\r\n  resultMessage: document.querySelector(\".messages\"),\r\n  checkAnswerButton: document.querySelector(\".answer\"),\r\n  answerInput: document.getElementById(\"answer-input\"),\r\n  randomizeButton: document.querySelector(\".randomize\"),\r\n  notes: document.querySelectorAll(\".note\"),\r\n  notesList: document.querySelector(\".notes-list\"),\r\n  giveUpButton: document.querySelector(\".give-up\"),\r\n  restartButton: document.querySelector(\".restart\"),\r\n  streak: document.querySelector(\"#streak\"),\r\n  finalAnswer: document.querySelector(\"#final-answer\"),\r\n  finalAnswerPanel: document.querySelector(\".final-answer\"),\r\n  details: document.querySelector(\".details-inner\"),\r\n  successMessage: document.querySelector(\".success-message\"),\r\n  restartMessage: document.querySelector(\".click-restart\"),\r\n  restartMessage: document.querySelector(\".click-restart\"),\r\n  answerTwo: document.querySelector(\".alternative-answer\"),\r\n};\r\n\r\nmodule.exports = {\r\n  notesArray,\r\n  errorMessage,\r\n  results,\r\n  display,\r\n  elements,\r\n  visibility,\r\n  cursor,\r\n  event,\r\n};\r\n\n\n//# sourceURL=webpack://josephjacob-malete-199-semitone-difference-basic-algorithm-javascript/./src/helper_objects.js?");

/***/ }),

/***/ "./src/jam_buddy.js":
/*!**************************!*\
  !*** ./src/jam_buddy.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { notesArray } = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\r\nconst {\r\n  getSetCurrentNotesErrors,\r\n  getRandom,\r\n  hasFlatAndSharp,\r\n  checkAnswerHelper,\r\n  getNewNotesArray,\r\n} = __webpack_require__(/*! ./helper_functions */ \"./src/helper_functions.js\");\r\n\r\nclass JamBuddy {\r\n  constructor() {\r\n    this.notes = null;\r\n  }\r\n\r\n  setCurrentNotes(notes) {\r\n    this.notes = notes;\r\n    hasFlatAndSharp(notes, this.notes);\r\n    getSetCurrentNotesErrors(notes);\r\n  }\r\n\r\n  randomizeCurrentNotes() {\r\n    let selectedNotes = [];\r\n\r\n    const startLoop = () => {\r\n      while (selectedNotes.length < 2) {\r\n        const randomNote = getNewNotesArray(notesArray)[getRandom()];\r\n        if (!selectedNotes.includes(randomNote)) selectedNotes.push(randomNote);\r\n      }\r\n    };\r\n    startLoop();\r\n    for (let i = 0; i < notesArray.length; i++) {\r\n      if (notesArray[i].includes(selectedNotes[0]) && notesArray[i].includes(selectedNotes[1]))\r\n        selectedNotes = [];\r\n      startLoop();\r\n    }\r\n    this.notes = selectedNotes;\r\n  }\r\n\r\n  getCurrentNotes() {\r\n    return this.notes;\r\n  }\r\n\r\n  checkAnswer(answer) {\r\n    return checkAnswerHelper(answer, this.getCurrentNotes());\r\n  }\r\n}\r\n\r\nmodule.exports = { JamBuddy };\r\n\n\n//# sourceURL=webpack://josephjacob-malete-199-semitone-difference-basic-algorithm-javascript/./src/jam_buddy.js?");

/***/ }),

/***/ "./src/semitone_dom.js":
/*!*****************************!*\
  !*** ./src/semitone_dom.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { JamBuddy } = __webpack_require__(/*! ./jam_buddy */ \"./src/jam_buddy.js\");\r\nconst {\r\n  errorMessage,\r\n  results,\r\n  notesArray,\r\n  visibility,\r\n  cursor,\r\n  event,\r\n} = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\r\nconst { elements } = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\r\nconst {\r\n  checkAnswerHelper,\r\n  hideElement,\r\n  displayElement,\r\n  changeVisibility,\r\n  isDisabled,\r\n} = __webpack_require__(/*! ./helper_functions */ \"./src/helper_functions.js\");\r\nconst { correctAnswer } = __webpack_require__(/*! ../spec/test_helper_functions */ \"./spec/test_helper_functions.js\");\r\n\r\nconst buddy = new JamBuddy();\r\nwindow.addEventListener(\"load\", randomizeNotes);\r\n\r\nfunction randomizeNotes() {\r\n  isDisabled(elements.answerInput, false, cursor.text);\r\n  isDisabled(elements.checkAnswerButton, false, cursor.pointer);\r\n  hideElement(elements.restartMessage, elements.details);\r\n  clearInputValue();\r\n  displayElement(elements.giveUpButton);\r\n  buddy.randomizeCurrentNotes();\r\n  const randomNotes = buddy.getCurrentNotes();\r\n  elements.notes[0].innerHTML = randomNotes[0];\r\n  elements.notes[1].innerHTML = randomNotes[1];\r\n  return randomNotes;\r\n}\r\n\r\nfunction clearInputValue() {\r\n  elements.answerInput.value = \"\";\r\n}\r\n\r\nlet count = 0;\r\nfunction checkAnswers(answer) {\r\n  if (parseInt(answer) < 1 || parseInt(answer) > 11) {\r\n    elements.resultMessage.innerHTML = errorMessage.invalidRange;\r\n    clearInputValue();\r\n  } else if (answer.includes(\".\")) {\r\n    elements.resultMessage.innerHTML = errorMessage.notWholeNumber;\r\n    clearInputValue();\r\n  } else if (\r\n    !answer.includes(\".\") &&\r\n    checkAnswerHelper(parseInt(answer), [elements.notes[0].innerHTML, elements.notes[1].innerHTML])\r\n  ) {\r\n    isDisabled(elements.answerInput, true, cursor.notAllowed);\r\n    isDisabled(elements.checkAnswerButton, true, cursor.notAllowed);\r\n    hideElement(elements.resultMessage, elements.finalAnswerPanel, elements.giveUpButton);\r\n    displayElement(elements.successMessage, elements.details);\r\n    count++;\r\n    elements.streak.innerHTML = count;\r\n  } else {\r\n    elements.resultMessage.innerHTML = results.incorrect;\r\n    count = 0;\r\n    elements.streak.innerHTML = count;\r\n    clearInputValue();\r\n  }\r\n}\r\n\r\nelements.randomizeButton.addEventListener(event.click, () => {\r\n  hideElement(elements.successMessage);\r\n  randomizeNotes();\r\n});\r\n\r\nelements.restartButton.addEventListener(event.click, () => {\r\n  hideElement(elements.details, elements.restartButton, elements.restartMessage);\r\n  displayElement(elements.giveUpButton);\r\n  isDisabled(elements.randomizeButton, false, cursor.pointer);\r\n  isDisabled(elements.answerInput, false, cursor.text);\r\n  changeVisibility(elements.notes[0], visibility.visible);\r\n  changeVisibility(elements.notes[1], visibility.visible);\r\n  randomizeNotes();\r\n});\r\n\r\nelements.checkAnswerButton.addEventListener(event.click, () => {\r\n  displayElement(elements.resultMessage);\r\n  if (elements.answerInput.value === \"\") {\r\n    elements.resultMessage.innerHTML = errorMessage.emptyAnswer;\r\n  } else {\r\n    checkAnswers(elements.answerInput.value);\r\n  }\r\n  isDisabled(elements.giveUpButton, true, cursor.notAllowed);\r\n  isDisabled(elements.answerInput, true, cursor.notAllowed);\r\n  isDisabled(elements.randomizeButton, true, cursor.notAllowed);\r\n  setTimeout(() => {\r\n    hideElement(elements.resultMessage);\r\n    isDisabled(elements.giveUpButton, false, cursor.pointer);\r\n    isDisabled(elements.answerInput, false, cursor.text);\r\n    isDisabled(elements.randomizeButton, false, cursor.pointer);\r\n  }, 2000);\r\n});\r\n\r\nelements.answerInput.addEventListener(event.input, () => {\r\n  if (elements.answerInput.value < 0) {\r\n    elements.answerInput.value = \"\";\r\n  }\r\n});\r\n\r\nfunction listAllNotes() {\r\n  const newNotesArray = [];\r\n  for (let i = 0; i < notesArray.length; i++) {\r\n    if (Array.isArray(notesArray[i])) {\r\n      for (let j = 0; j < notesArray[i].length; j++) {\r\n        newNotesArray.push(notesArray[i][j]);\r\n      }\r\n    } else {\r\n      newNotesArray.push(notesArray[i]);\r\n    }\r\n  }\r\n  for (let i = 0; i < newNotesArray.length; i++) {\r\n    const note = document.createElement(\"div\");\r\n    note.classList.add(\"newNote\");\r\n    note.textContent = newNotesArray[i];\r\n    elements.notesList.appendChild(note);\r\n  }\r\n}\r\nlistAllNotes();\r\n\r\nelements.giveUpButton.addEventListener(event.click, () => {\r\n  isDisabled(elements.answerInput, true, cursor.notAllowed);\r\n  isDisabled(elements.checkAnswerButton, true, cursor.notAllowed);\r\n  isDisabled(elements.randomizeButton, true, cursor.notAllowed);\r\n  hideElement(elements.giveUpButton);\r\n  displayElement(\r\n    elements.details,\r\n    elements.restartButton,\r\n    elements.finalAnswerPanel,\r\n    elements.restartMessage\r\n  );\r\n  changeVisibility(elements.notes[0], visibility.hidden);\r\n  changeVisibility(elements.notes[1], visibility.hidden);\r\n  count = 0;\r\n  elements.streak.innerHTML = count;\r\n});\r\n\r\nfunction highlightNotes() {\r\n  const allNotes = document.querySelectorAll(\".newNote\");\r\n  const noteOne = elements.notes[0].innerHTML;\r\n  const noteTwo = elements.notes[1].innerHTML;\r\n  const answerOne = correctAnswer(notesArray, noteOne, noteTwo)[0];\r\n  const answerTwo = correctAnswer(notesArray, noteOne, noteTwo)[1];\r\n  const input = parseInt(elements.answerInput.value);\r\n  elements.finalAnswer.innerHTML = `${answerOne} or \r\n  ${answerTwo}`;\r\n\r\n  if (input === answerOne) {\r\n    elements.answerTwo.innerHTML = answerTwo;\r\n  } else if (input === answerTwo) {\r\n    elements.answerTwo.innerHTML = answerOne;\r\n  }\r\n\r\n  allNotes.forEach((note) => {\r\n    if (\r\n      note.innerHTML === elements.notes[0].innerHTML ||\r\n      note.innerHTML === elements.notes[1].innerHTML\r\n    ) {\r\n      note.classList.add(\"highlight\");\r\n    } else {\r\n      note.classList.remove(\"highlight\");\r\n    }\r\n  });\r\n}\r\n\r\nsetInterval(highlightNotes, 100);\r\n\n\n//# sourceURL=webpack://josephjacob-malete-199-semitone-difference-basic-algorithm-javascript/./src/semitone_dom.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/semitone_dom.js");
/******/ 	
/******/ })()
;