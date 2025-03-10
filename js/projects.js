const projects = [
  {
    title: "Marketing Fridays Website",
    link: "https://www.marketingfridays.com",
    image: "./projects/marketing.png",
    stack: [
      "UI/UX Design",
      "Front-End Development",
      "Back-End development",
      "PHP",
      "SQL Database",
    ],
  },
  {
    title: "014 Database",
    link: "404.html",
    image: "./projects/014database.png",
    stack: [
      "UI/UX Design",
      "Front-End Development",
      "Back-End development",
      "PHP",
      "SQL Database",
    ],
  },
  {
    title: "Bela-Bela Guesthouse Website",
    link: "https://www.belabelaguesthouse.co.za",
    image: "./projects/belabela.png",
    stack: [
      "UI/UX Design",
      "Front-End Development",
      "Back-End development",
      "PHP",
      "SQL Database",
    ],
  },
  {
    title: "Helgeo Guesthouse Website",
    link: "https://www.helgeo.co.za",
    image: "./projects/helgeo.png",
    stack: [
      "UI/UX Design",
      "Front-End Development",
      "Back-End development",
      "PHP",
      "SQL Database",
    ],
  },
  {
    title: "Task Management Web App",
    link: "https://intli.rf.gd/task%20manager/login",
    image: "./projects/planner-new.png",
    stack: [
      "Front-End Development",
      "HTML",
      "CSS",
      "Javascript",
      "Local Storage",
    ],
  },
];

function initProjectCarousel() {
  const projectContainer = document.querySelector(".project-scroll");
  const leftScroll = document.querySelector(".scrollers .fa-chevron-left");
  const rightScroll = document.querySelector(".scrollers .fa-chevron-right");
  let currentIndex = 0;

  function renderProjects() {
    projectContainer.innerHTML = projects
      .map(
        (project, index) => `
      <div class="scroll-item ${index === 0 ? "active" : ""}">
        <h2>${project.title}</h2>
        <a href="${
          project.link
        }" style="text-decoration: none;" target="_blank" class="button">Live site</a>
        <img src="${project.image}" width="70%" alt="${project.title} photo" 
             />
        <div class="stack">
          ${project.stack
            .map((tech) => `<div class="stack-item">${tech}</div>`)
            .join("")}
        </div>
      </div>
    `
      )
      .join("");
  }

  function updateScroll() {
    projectContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    leftScroll.style.display = currentIndex === 0 ? "none" : "flex";
    rightScroll.style.display =
      currentIndex === projects.length - 1 ? "none" : "flex";
  }

  function scrollRight() {
    if (currentIndex < projects.length - 1) {
      currentIndex++;
      updateScroll();
    }
  }

  function scrollLeft() {
    if (currentIndex > 0) {
      currentIndex--;
      updateScroll();
    }
  }

  leftScroll.addEventListener("click", scrollLeft);
  rightScroll.addEventListener("click", scrollRight);
  leftScroll.style.display = "none";

  renderProjects();
}

document.addEventListener("DOMContentLoaded", initProjectCarousel);
