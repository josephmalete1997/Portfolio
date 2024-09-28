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

const linkNames = ["Home", "About", "Skills", "Work Experience", "Projects", "Contact"];
const linkArray = ["#home", "#about", "#skills", "#work-experience", "#portfolio", "#contact"];

for (let i = 0; i < linkNames.length; i++) {
  const link = document.createElement("a");
  const below = document.createElement("div");
  below.classList.add("below");
  link.innerHTML = linkNames[i];
  link.classList.add("link");
  link.append(below);
  link.href = linkArray[i];
  sideNav.appendChild(link);
}
const socialIcons = document.createElement("div");
socialIcons.classList.add("socials-icons");
socialIcons.innerHTML = `
          <div class="socials-inner">
            <div class="tool-tip">Facebook</div>
            <a href="https://web.facebook.com/profile.php?id=61553547607080" target="_blank"> <i
                class="fa-brands fa-facebook"></i></a>
          </div>
          <div class="socials-inner">
            <div class="tool-tip">Github</div>
            <a href="https://github.com/josephmalete1997" target="_blank"> <i class="fa-brands fa-github"></i></a>
          </div>
          <div class="socials-inner">
            <div class="tool-tip">LinkedIn</div>
            <a href="https://www.linkedin.com/in/joseph-jacob-malete-a5b263276/" target="_blank">
              <i class="fa-brands fa-linkedin"></i>
            </a>
        </div>`;

sideNav.append(socialIcons);

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
    button.style.transform="scale(0.9)";
    setTimeout(() => {
      button.style.transform="scale(1)";
    }, 300);
  });
});
