const title = document.querySelectorAll(".section");
const links = document.querySelectorAll(".link");
const sideNavigation = document.querySelector(".side-nav");
const logo = document.querySelector(".side-nav h1");

if (window.innerWidth >= 298 && window.innerWidth <= 600) {
  document.querySelectorAll(".link").forEach((link) => {
    link.addEventListener("click", () => {
      sideNavigation.classList.toggle("show");
    });
  });
}

let rotateIndexOne = 0;
let rotateIndexTwo = 0;
const gears = document.querySelectorAll(".gear-scroll .fa-solid");

const home = document.querySelector("#home").getBoundingClientRect();
const nav = document.querySelector(".side-nav").getBoundingClientRect();
const education = document.querySelector(".Education").getBoundingClientRect();
const about = document.querySelector("#about").getBoundingClientRect();
const imageAndText = document.querySelector(".text-image");
const hobby = document.querySelector(".panel-one");
imageAndText.style.transition = ".5s";

downloadButton = document.querySelector("#download");

downloadButton.addEventListener("mouseover", () => {
  // alert("Yes");
  downloadButton.style.setProperty("--before-left", "0%");
  downloadButton.style.setProperty("--opacity", "1");
});
downloadButton.addEventListener("mouseout", () => {
  downloadButton.style.setProperty("--before-left", "100%");

  setTimeout(() => {
    downloadButton.style.setProperty("--opacity", "0");
    downloadButton.style.setProperty("--before-left", "-100%");
  }, 300); // Match this to your CSS transition duration
});

