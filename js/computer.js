const keyboard = document.querySelector(".computer .keyboard");
const computer = document.querySelector(".computer");

const keyboardAlphabet = [
  "tab",
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "{",
  "}",
  "Caps",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Enter",
  "shift",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "-",
  "<,",
  ">.",
  `"`,
  `ctrl`,
  `<i class="fa-brands fa-windows"></i>`,
  `alt`,
  ``,
  `<i class="fa-brands fa-github"></i>`,
];

for (let i = 0; i < keyboardAlphabet.length; i++) {
  const keyboardKey = document.createElement("div");
  keyboardKey.classList.add("keyboard-key");
  keyboardKey.innerHTML = keyboardAlphabet[i];
  if (keyboardAlphabet[i] === "") {
    keyboardKey.classList.add("space");
  }
  keyboard.appendChild(keyboardKey);
}

const typing = document.querySelector("#typing");
const keys = document.querySelectorAll(".keyboard-key");

const wordsArray = `        cd     josephmalete1997.github.io          _          ls -        l  +  index.html  chrome . =   clear           %


vi        index.html             !         `;
let counting = -1;
function blink() {
  counting++;

  if (wordsArray[counting] === "+") {
    typing.innerHTML += `
        <br><i class="fa-regular fa-folder"></i> css
        <br><i class="fa-regular fa-folder"></i> js
        <br><i class="fa-regular fa-folder"></i> images
        <br><i class="fa-solid fa-file"></i> index.html
        <br><font color="limegreen">josephmalete1997.github.io >></font>
        `;
    wordsArray[counting] = "";
  } else if (wordsArray[counting] === "_") {
    typing.innerHTML += `<br><font color="limegreen">josephmalete1997.github.io >></font>`;
  } else if (wordsArray[counting] === "%") {
    typing.innerHTML = ``;
    typing.innerHTML += `<br><font color="limegreen">josephmalete1997.github.io >></font>`;
  } else if (wordsArray[counting] === "=") {
    typing.innerHTML += `<br><font color="limegreen">josephmalete1997.github.io >></font>`;
  } else if (wordsArray[counting] === "!") {
    typing.innerHTML = `~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>~<br>`;
  } else {
    typing.innerHTML += wordsArray[counting];
  }

  keys.forEach((key) => {
    if (wordsArray[counting] === key.innerHTML.toString().toLowerCase()) {
      key.classList.add("clicked");
      setTimeout(() => {
        key.classList.remove("clicked");
      }, 150);
    }
  });

  if (counting > wordsArray.length - 1) {
    counting = 0;
    typing.innerHTML = ">> ";
  }
}

setInterval(blink, 200);

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
    e.preventDefault();
  }
});
