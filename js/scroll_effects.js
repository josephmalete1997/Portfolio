const title = document.querySelectorAll(".section");
const links = document.querySelectorAll(".link");
const bars = document.querySelector(".fa-bars");
const sideNavigation = document.querySelector(".side-nav");

links[0].classList.add("active");
title[0].style.transform = "scale(1)";

links.forEach((link, i) => {
  link.addEventListener("click", () => {
    setActiveLink(i);
  });
});

bars.addEventListener("click", () => {
  sideNavigation.classList.toggle("show");
  bars.classList.toggle("times");
});

let rotateIndexOne = 0;
let rotateIndexTwo = 0;
const gears = document.querySelectorAll(".gear-scroll .fa-solid");
function showAlert() {
  title.forEach((section, i) => {
    const rect = section.getBoundingClientRect();
    const home = document.querySelector("#home").getBoundingClientRect();
    const about = document.querySelector("#about").getBoundingClientRect();
    const imageAndText = document.querySelector(".text-image");
    const hobby = document.querySelector(".panel-one");
    imageAndText.style.transition = ".5s";

    hobby.style.transition = ".5s";

    if (home.top > 0) {
      sideNavigation.style.top = "-200px";
      bars.style.top = "-100px";
    } else {
      sideNavigation.style.top = "0px";
      bars.style.top = "0px";
    }
  });
}

window.addEventListener("scroll", showAlert);
