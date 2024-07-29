function makeVisible(...item) {
  for (let i = 0; i < item.length; i++) item[i].style.display = "flex";
}

function makeInvisible(...item) {
  for (let i = 0; i < item.length; i++) item[i].style.display = "none";
}

export { makeVisible, makeInvisible };
