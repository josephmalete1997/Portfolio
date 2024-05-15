const panel = document.querySelectorAll(".panel-one");
const loading = document.querySelector(".loading");
loading.style.display = "none";
const panelContent = document.querySelectorAll(
  ".panel-one .skillsPanel-display"
);
const pointer = document.querySelectorAll(".panel-one p img");

panel.forEach((panel, index) => {
  panel.addEventListener("click", () => {
    panelContent[index].style.transform = "scale(1)";
    pointer[index].style.transform = "rotate(-90deg)";
  });
});

const intro = document.querySelector(".intro");
const mainIntro = document.querySelector(".open-scene");

const introTextDisplay = document.querySelector(".intro-text");

intro.innerHTML = "";
const text = `$ Hey    , I am <em>Joseph</em>           <br>$
 Welcome to my digital profile.  <br>$           cd   <em><font color="yellow">my_portfolio/simple_website</font></em>          <br>$`;
let count = -20;
let countTwo = -20;
const arrayText = [];

function introText() {
  const body = document.querySelector("body");
  const content = document.querySelector(".content");
  body.style.overflow = "hidden";
  content.style.display = "none";
  count++;
  arrayText.push(text[count]);
  intro.innerHTML = arrayText.join("");

  if (arrayText.length - 20 > text.length) {
    loading.style.display = "flex";
    countTwo++;
    loadingBar();

    if (countTwo === 30) {
      clearInterval(x);
      loading.innerHTML = "<h1>Enjoy the moment!</h1>";
      loading.style.color = "lightgreen";
      loading.style.textAlign = "center";
      loading.style.border = "none";
      setTimeout(() => {
        mainIntro.style.top = "-100vh";
        body.style.overflow = "auto";
        content.style.display = "block";
      }, 1000);
    }
  }
}

// const x = setInterval(introText, 80);

function loadingBar() {
  const bar = document.createElement("div");
  bar.classList.add("bar");
  loading.append(bar);
}
// setInterval(, 50);

const skip = document.querySelector(".skip");
skip.addEventListener("click", () => {
  clearInterval(x);
  loading.style.display = "flex";
  const y = setInterval(loadingBar, 50);
  setTimeout(() => {
    clearInterval(y);
    mainIntro.style.top = "-100vh";
    body.style.overflow = "auto";
    content.style.display = "block";
  }, 2500);
});
