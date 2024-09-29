const leftScroll = document.querySelector(".scrollers .fa-chevron-left");
const rightScroll = document.querySelector(".scrollers .fa-chevron-right");

leftScroll.style.display = "none";
leftScroll.addEventListener("click", () => {
  let translateX = 0;
  document.querySelector(".project-scroll").style.transform = `translateX(${translateX}%)`;
  setTimeout(() => {
    rightScroll.style.display = "flex";
    leftScroll.style.display = "none";
  }, 300);
});

rightScroll.addEventListener("click", () => {
  let translateX = -100;
  document.querySelector(".project-scroll").style.transform = `translateX(${translateX}%)`;
  setTimeout(() => {
    leftScroll.style.display = "flex";
    rightScroll.style.display = "none";
  }, 300);
});
