const listItem = document.querySelectorAll(".list-item");

listItem[0].classList.add("active-selection");

function clearSelection() {
  listItem.forEach((item) => {
    item.classList.remove("active-selection");
  });
}

listItem.forEach((item) => {
  item.addEventListener("click", () => {
    clearSelection();
    item.classList.add("active-selection");
  });
});
