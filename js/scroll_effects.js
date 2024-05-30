const title = document.querySelectorAll(".section");
const links = document.querySelectorAll(".link");

links[0].classList.add("active");
title[0].style.transform = "scale(1)";

links.forEach((link, i) => {
  link.addEventListener("click", () => {
    setActiveLink(i);
  });
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
      document.querySelector(".side-nav").style.top = "-100px";
    } else {
      document.querySelector(".side-nav").style.top = "0px";
    }
  });

  setActiveLink(activeIndex);
}

window.addEventListener("scroll", showAlert);
