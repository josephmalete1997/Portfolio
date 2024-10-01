const title = document.querySelectorAll(".section");
const links = document.querySelectorAll(".link");
const sideNavigation = document.querySelector(".side-nav");
const logo = document.querySelector(".side-nav h1");

links[0].classList.add("active");
title[0].style.transform = "scale(1)";

links.forEach((link, i) => {
  link.addEventListener("click", () => {
    setActiveLink(i);
  });
});

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
function showAlert() {
  title.forEach((section, i) => {
    const rect = section.getBoundingClientRect();
    const home = document.querySelector("#home").getBoundingClientRect();
    const about = document.querySelector("#about").getBoundingClientRect();
    const imageAndText = document.querySelector(".text-image");
    const hobby = document.querySelector(".panel-one");
    imageAndText.style.transition = ".5s";

    hobby.style.transition = ".5s";

    if (home.top >= 0) {
      sideNavigation.style.top = "0px";
      sideNavigation.style.background = "transparent";
      sideNavigation.style.backdropFilter = "blur(20px)";
      // changeLinkColor("white", "black", "white", "white", "transparent");
      logo.style.color = "white";
    } else {
      sideNavigation.style.background = "rgb(255,255,255,0.1)";
      sideNavigation.style.backdropFilter = "blur(20px)";
      // changeLinkColor("black", "white", "black", "black", "transparent");
      sideNavigation.style.top = "0px";
      logo.style.color = "white";
    }
  });
}

function changeLinkColor(color, over, out, bgOver, bgOut) {
  links.forEach((item) => {
    item.style.color = color;
    item.addEventListener("mouseover", () => {
      item.style.color = over;
      item.style.background = bgOver;
    });
    item.addEventListener("mouseout", () => {
      item.style.color = out;
      item.style.background = bgOut;
    });
    item.addEventListener("click", () => {
      item.style.color = color;
    });
  });
}

window.addEventListener("scroll", showAlert);

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
