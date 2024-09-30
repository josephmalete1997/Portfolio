const keysType = document.querySelectorAll(".key-type");
const outputText = document.querySelector(".output-text");
const outputTextPanel = document.querySelector(".output-text-panel");
const outputTextInput = document.querySelector(".output-text-input");
const displayLetter = document.querySelector(".display-letter");
const bigGear = document.querySelector(".gear");
const smallGear = document.querySelector(".gear-small");
const spaceKey = document.querySelector(".space-type");
const enterKey = document.querySelector(".enter");

const hobbyArray = `     Playing_Soccer.  +  Listening_To_Music.  +  Reading_Books.  +   Writing_Code.  +   Making_Art. +
 ...............++
  Thanks_You
    `;

const splitArray = hobbyArray.split("");

let clickCount = -1;
let rotateSmall = 0;
let scrollIndex = -250;
let leftScrollIndex = 160;
function typeWriting() {
  // Increment click count
  clickCount += 1;

  if (clickCount >= splitArray.length) {
    setTimeout(() => {
      outputTextPanel.style.left = `180px`;
      clickCount = -1;
      scrollIndex = -250;
      leftScrollIndex = 140;
      rotateSmall = 0;
      outputText.style.bottom = `${scrollIndex}px`;
      outputTextPanel.style.left = `${leftScrollIndex}px`;
      outputTextInput.innerHTML = "";
    }, 2000);

    return;
  }

  if (splitArray[clickCount] == "_") {
    outputTextInput.innerHTML += " ";
    spaceKey.classList.add("typed");
    setTimeout(() => {
      spaceKey.classList.remove("typed");
    }, 100);
  } else if (splitArray[clickCount] == "+") {
    leftScrollIndex = 140;
    outputTextPanel.style.left = `${leftScrollIndex}px`;
    bigGear.style.transform = `rotate(${scrollIndex * 3}deg)`;
    enterKey.classList.add("typed");
    setTimeout(() => {
      enterKey.classList.remove("typed");
    }, 100);
    setTimeout(() => {
      scrollIndex += 32;
      outputTextInput.innerHTML += `<br>`;
      outputText.style.bottom = `${scrollIndex}px`;
    }, 200);
  } else {
    outputTextInput.innerHTML += splitArray[clickCount];
  }

  keysType.forEach((item) => {
    // Compare key pressed with the expected character
    if (item.innerHTML.toLowerCase() === splitArray[clickCount].toLowerCase()) {
      leftScrollIndex -= 15;
      rotateSmall -= 60;
      smallGear.style.transform = `rotate(${rotateSmall}deg)`;
      outputTextPanel.style.left = `${leftScrollIndex}px`;
      item.classList.add("typed");
      displayLetter.innerHTML = item.innerHTML;
      setTimeout(() => {
        item.classList.remove("typed");
      }, 100);
    }
  });
}

setInterval(() => {
  typeWriting();
}, 200);
