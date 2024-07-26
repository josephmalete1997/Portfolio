function makeWhite(...items) {
  items.forEach((item) => {
    item.style.color = "white";
  });
}

function darkTheme() {
  const bgColor = "hsl(0, 0%, 20%)";
  document.body.style.background = bgColor;
  document.body.style.color = "white";

  timeline.style.background = bgColor;
  document.querySelectorAll(".task").forEach((task) => {
    task.style.background = "hsl(0, 0%, 50%)";
    task.style.color = "hsl(0, 0%, 0%)";
  });
  const calendar = (document.querySelector(".calendar").style.background = bgColor);
  // calendar.style.color = "black";

  // Make white
  makeWhite(document.querySelector(".fa-lightbulb"), document.querySelector(".fa-bell"));
}

// document.querySelector(".fa-lightbulb").addEventListener("click", darkTheme);
