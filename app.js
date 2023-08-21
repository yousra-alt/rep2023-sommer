"use strict";

let toDoList = [];
let option = localStorage.getItem("savedOption");
window.addEventListener("load", start);

function start() {
  changeMode();
  document.querySelector("#form-todo").addEventListener("submit", submitList);
  document.querySelector("#mode").addEventListener("change", chooseMode);
}

function submitList(event) {
  event.preventDefault();
  const form = event.target;
  const todo = form.todo.value;
  form.reset();

  toDoList.push(todo);
  console.log(toDoList);
  showTodoList(toDoList);
}

function showTodoList(toDoList) {
  document.querySelector("#todo-list-div").innerHTML = "";

  for (const item of toDoList) {
    document.querySelector("#todo-list-div").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
<article>
<p>${item}</p>
<button>done</button>
</article>

`
    );
    document.querySelector("article:last-child button").addEventListener("click", () => deleteItem(item));
  }
}

function deleteItem(item) {
  let itemIndex = toDoList.indexOf(item);
  console.log(itemIndex);
  toDoList.splice(itemIndex, 1);
  console.log(toDoList);
  showTodoList(toDoList);
}

function chooseMode() {
  option = document.querySelector("#mode").value;
  document.querySelector("body").removeAttribute("class");
  //   fjerner alle klasser ^
  changeMode();
}

function changeMode() {
  if (option == "light") {
    document.querySelector("body").classList.add("lightmode");
  } else if (option == "dark") {
    document.querySelector("body").classList.add("darkmode");
  } else if (option == "non-binary") {
    document.querySelector("body").classList.add("non-binary-mode");
  }

  localStorage.setItem("savedOption", option);
  console.log(option);
}


