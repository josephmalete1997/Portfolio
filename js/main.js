const contentInner = document.querySelector(".content");
const progress = document.querySelector(".progress");

const menu = document.querySelector(".menu");
const inside = document.querySelectorAll(".menu-one");
const insideChild = document.querySelectorAll(".menu-inside");
const header = document.querySelector(".header");
const sideNav = document.querySelector(".side-nav");
const content = document.querySelector(".content");
const textImage = document.querySelector(".text-image");
const body = document.querySelector("body");
const hobbies = document.querySelectorAll(".welcome");
const details = document.querySelector("#details");

const linkNames = [
  ` <div class="socials-icons" id="top-icons">
<div class="socials-inner">
    <a href="https://web.facebook.com/profile.php?id=61553547607080" target="_blank"><img
            src="css/icons/facebook.svg" alt="Facebook"></a>
</div>
<div class="socials-inner">
    <a href="https://github.com/josephmalete1997" target="_blank"><img
            src="css/icons/github.svg" alt="Github"></a>
</div>
<div class="socials-inner">
<a href="https://www.linkedin.com/in/joseph-jacob-malete-a5b263276/" target="_blank"
><img src="css/icons/linkedin.svg" alt="linkedin"
/></a>
</div>
</div>`,
  "Home",
  "About",
  "Skills",
  "Portfolio",
  "Contact",
];
const linkArray = ["#home", "#about", "#skills", "#portfolio", "#contact"];

for (let i = 0; i < linkNames.length; i++) {
  const link = document.createElement("a");
  link.innerHTML = linkNames[i];
  link.classList.add("link");
  link.href = linkArray[i - 1];
  const belowBorder = document.createElement("div");
  belowBorder.classList.add("below-border");
  link.appendChild(belowBorder);
  sideNav.appendChild(link);
}

//Hobbies
hobbies.forEach((hobby) => {
  hobby.addEventListener("click", () => {
    location.href = "#details";
    details.style.display = "block";
    details.innerHTML = `<h1>bg= ${hobby.style.backgroundImage.toString()}</h1>` + hobby.innerHTML;
  });
});

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
  anchor.download = "Joseph Malete Updated CV.pdf";
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
  const pdfUrl = "Joseph_malete(Updated_CV).pdf";
  window.open(pdfUrl, "_blank");
}
