const btn = document
  .querySelector(".reverse-sort")
  .addEventListener("click", sort);

function sort() {
  ul = document.querySelector(".sortArr");
  ul.classList.toggle("reversed");
}
