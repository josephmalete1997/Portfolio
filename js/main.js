const contentInner = document.querySelector(".content");
const progress = document.querySelector(".progress");

const menu = document.querySelector(".menu");
const button = document.querySelectorAll(".button");
const inside = document.querySelectorAll(".menu-one");
const insideChild = document.querySelectorAll(".menu-inside");
const header = document.querySelector(".header");
const sideNav = document.querySelector(".side-nav");
const content = document.querySelector(".content");
const textImage = document.querySelector(".text-image");
const body = document.querySelector("body");
const hobbies = document.querySelectorAll(".welcome");

const toolTip = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];
const linkNames = [
  `<i class="fa-solid fa-home"></i>`,
  `<i class="fa-solid fa-user"></i>`,
  `<i class="fa-solid fa-gear"></i>`,
  `<i class="fa-solid fa-hand"></i>`,
  `<i class="fa-solid fa-folder"></i>`,
  `<i class="fa-solid fa-envelope"></i>`,
];
const linkArray = ["#home", "#about", "#skills", "#work-experience", "#portfolio", "#contact"];

for (let i = 0; i < linkNames.length; i++) {
  //scroll effect
  document.querySelector(linkArray[i]).className = "scroll-section hidden-when-scrolling-down";
  const link = document.createElement("a");
  const below = document.createElement("div");
  below.classList.add("below");
  below.innerHTML = toolTip[i];
  link.innerHTML = linkNames[i];
  link.classList.add("link");
  link.append(below);
  link.href = linkArray[i];
  sideNav.appendChild(link);
}

//Hobbies

const loadDownload = document.querySelectorAll(".btn-load");

document.getElementById("download").addEventListener("click", () => {
  loadDownload[0].style.visibility = "visible";
  setTimeout(() => {
    loadDownload[0].style.visibility = "hidden";
    download();
  }, 1500);
});

function download() {
  const pdfUrl = "Joseph_malete(Updated_CV).pdf";
  const anchor = document.createElement("a");

  anchor.href = pdfUrl;
  anchor.download = "CV Joseph Malete.pdf";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

document.getElementById("view").addEventListener("click", () => {
  loadDownload[1].style.visibility = "visible";
  setTimeout(() => {
    loadDownload[1].style.visibility = "hidden";
    view();
  }, 2500);
});

function view() {
  const pdfUrl = "projects/CV/index.html";
  window.open(pdfUrl, "_blank");
}
button.forEach((button) => {
  button.addEventListener("click", () => {
    button.style.transform = "scale(0.9)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 300);
  });
});
