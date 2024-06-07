let up = 0;
let countLeft = 0;
let countRight = 0;
let rotateR = 0;
let rotateL = 0;
let interval = null;
let countDown = 0;
let fade;
let goUp;
let opacity = 1;
let reduce = 1;
const canvas = document.querySelector(".canvas");
const units = document.querySelector("#units");
const tenth = document.querySelector("#tenth");
const win = document.querySelector(".win");
const pause = document.querySelector(".pause");
const fruitsArray = ["pine", "melon"];

pause.addEventListener("click", () => {
  if (!pause.classList.contains("true")) {
    pause.classList.toggle("true");
    pauseGame();
  } else {
    pause.classList.remove("true");
    unPauseGame();
  }
});
let levelUp = 30;

for (let i = 0; i < 10; i++) {
  const number = document.createElement("div");
  number.classList.add("number");
  number.innerHTML = i;
  units.appendChild(number);
}

for (let i = 0; i < 11; i++) {
  const number = document.createElement("div");
  number.classList.add("number");
  number.innerHTML = i;
  tenth.appendChild(number);
}
let score = 0;
let scoreTenth = 0;

function scoreUp() {
  score += 1;
  units.style.top = `-${score * 40}px`;
  if (score === 10) {
    const audio = new Audio();
    levelUp -= 6;
    audio.src = "./cute-level-up-3-189853.mp3";
    audio.volume = 1;
    audio.play();
    scoreTenth++;
    score = 0;
    units.style.top = `-${score * 40}px`;
    tenth.style.top = `-${scoreTenth * 40}px`;
  }
}

function scoreDown() {
  score -= 1;
  units.style.top = `-${score * 40}px`;
  if (score === -1) {
    scoreTenth--;
    score = 9;
    units.style.top = `-${score * 40}px`;
    tenth.style.top = `-${scoreTenth * 40}px`;
  }
}

const colorGenerator = () => {
  const r = Math.floor(Math.random() * 220);
  const g = Math.floor(Math.random() * 150);
  const b = Math.floor(Math.random() * 150);
  return `rgb(${r},${g},${b})`;
};

const music = new Audio();
music.src = "./music-box-for-suspenseful-stories-158419.mp3";
music.play();

function createFruit() {
  const newFruit = fruitsArray[Math.floor(Math.random() * fruitsArray.length)];
  console.log(newFruit);
  const juice = document.createElement("div");
  juice.classList.add("juice");

  for (let i = 0; i < 5; i++) {
    const spit = document.createElement("div");
    spit.classList.add("spit");
    juice.appendChild(spit);
  }

  const fruit = document.createElement("div");
  fruit.classList.add("fruit");

  fruit.style.left = `${Math.floor(Math.random() * canvas.offsetWidth - fruit.offsetWidth)}px`;
  const fruitBottom = document.createElement("div");
  fruitBottom.classList.add("bottom");

  const fruitTop = document.createElement("div");
  fruitTop.classList.add("top");

  for (let i = 0; i < 50; i++) {
    const spot = document.createElement("div");
    spot.classList.add("spot");
    fruitTop.appendChild(spot);
  }
  for (let i = 0; i < 50; i++) {
    const spot = document.createElement("div");
    spot.classList.add("spot");
    fruitBottom.appendChild(spot);
  }

  const randomColorIndex = colorGenerator();
  fruitTop.style.backgroundColor = randomColorIndex;
  fruitBottom.style.backgroundColor = randomColorIndex;

  canvas.appendChild(fruit);
  fruit.appendChild(juice);
  fruit.appendChild(fruitBottom);
  fruit.appendChild(fruitTop);

  let clicked = false;
  const sound = new Audio();
  sound.src = "./woosh-1-84800.mp3";

  fruit.addEventListener("mouseover", (event) => {
    if (!clicked) {
      scoreUp();
      interval = setInterval(slice, 0.5);
      document.querySelectorAll(".spit").forEach((element, index) => {
        element.style.transform = "scale(3)";
        element.style.top = "-20px";
        switch (index) {
          case (index = 0):
            element.style.transform = "scale(5)";
            element.style.top = "-20px";
            break;
          case (index = 1):
            element.style.transform = "scale(7)";
            break;
          case (index = 2):
            element.style.transform = "scale(10)";
            element.style.top = "20px";
            break;
          case (index = 3):
            element.style.transform = "scale(5)";
            break;
        }
      });
      sound.play();
      fruitTop.classList.add("inner");
      fruitBottom.classList.add("inner");
      const ft = event.target;
      clearInterval(goUp);
      clicked = true;
    }
  });

  function slice() {
    countLeft++;
    countRight--;
    fruitBottom.style.left = `${countLeft}%`;
    fruitTop.style.left = `${countRight}%`;

    if (countRight === -80) {
      clearInterval(goUp);
      clearInterval(interval);
      up = 0;
      countRight = 0;
      countLeft = 0;
      fade = setInterval(fading, 2);
    }
  }

  function updateObjectRotation(event) {
    // Calculate the difference between the fruit's position and the mouse cursor's position
    var deltaX = event.clientX - fruit.offsetLeft - fruit.offsetWidth / 2;
    var deltaY = event.clientY - fruit.offsetTop - fruit.offsetHeight / 2;

    // Calculate the angle between the fruit and the mouse cursor
    var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Set the rotation angle
    fruit.style.transform = "rotate(" + angle + "deg)";
  }

  // Add event listener to track mouse movement on the container

  function fading() {
    opacity -= 0.01;
    rotateL++;
    rotateR--;
    fruit.style.opacity = `${opacity}`;
    fruitTop.style.transform = `rotate(${rotateL}deg)`;
    fruitBottom.style.transform = `rotate(${rotateR}deg)`;
    if (opacity <= 0) {
      canvas.removeChild(fruit);
      createFruit();
      opacity = 1;
      clearInterval(fade);
      rotateL = 0;
      rotateR = 0;
    }
  }

  function upMove() {
    up += 3;
    fruit.style.bottom = `${up}px`;
    fruit.style.transform = `rotate(${up}deg)`;

    const fruitRect = fruit.getBoundingClientRect();
    if (fruitRect.top <= 0) {
      canvas.removeChild(fruit);
      clearInterval(goUp);
      up = 0;
      createFruit();
      if (score + scoreTenth !== 0) scoreDown();
    }
    if (scoreTenth === 5) {
      pauseGame();
      win.style.display = "flex";
    }
  }
  goUp = setInterval(upMove, levelUp);
}

function pauseGame() {
  clearInterval(interval);
  clearInterval(fade);
  clearInterval(goUp);
  createFruit();
}

function unPauseGame() {
  goUp = setInterval(upMove, levelUp);
}

const pineParent = document.querySelector(".pine-parent");
const pineTop = document.querySelector(".pine");
const pineBottom = document.querySelector(".pine-bottom");
const leaves = document.querySelector(".leaves");

pineParent.addEventListener("mouseover", (event) => {
  pineTop.classList.add("inner");
  pineBottom.classList.add("inner");
  pineTop.style.left = "-100px";
  pineBottom.style.left = "100px";
  leaves.style.left = "-100px";
});
