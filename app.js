// "use strict";
// window.addEventListener("load", start);
// let toDoList = [];
// let option = localStorage.getItem("savedOption");

// function start() {
//   changeMode();
//   document.querySelector("#form-todo").addEventListener("submit", submitList);
//   document.querySelector("#mode").addEventListener("change", chooseMode);
// }

// function submitList(event) {
//   event.preventDefault();
//   const form = event.target;
//   const todo = form.todo.value;
//   form.reset();

//   toDoList.push(todo);
//   console.log(toDoList);
//   showTodoList(toDoList);
// }

// function showTodoList(toDoList) {
//   document.querySelector("#todo-list-div").innerHTML = "";

//   for (const item of toDoList) {
//     document.querySelector("#todo-list-div").insertAdjacentHTML(
//       "beforeend",
//       /*html*/ `
// <article>
// <p>${item}</p>
// <button>done</button>
// </article>

// `
//     );
//     document.querySelector("article:last-child button").addEventListener("click", () => deleteItem(item));
//   }
// }

// function deleteItem(item) {
//   let itemIndex = toDoList.indexOf(item);
//   console.log(itemIndex);
//   toDoList.splice(itemIndex, 1);
//   console.log(toDoList);
//   showTodoList(toDoList);
// }

// function chooseMode() {
//   option = document.querySelector("#mode").value;
//   document.querySelector("body").removeAttribute("class");
//   //   fjerner alle klasser ^
//   changeMode();
// }

// function changeMode() {
//   if (option == "light") {
//     document.querySelector("body").classList.add("lightmode");
//   } else if (option == "dark") {
//     document.querySelector("body").classList.add("darkmode");
//   } else if (option == "non-binary") {
//     document.querySelector("body").classList.add("non-binary-mode");
//   }

//   localStorage.setItem("savedOption", option);
//   console.log(option);
// }

// CRUD APP NEDENFOR

"use strict";
const endpoint = "https://traening-sem2-default-rtdb.europe-west1.firebasedatabase.app/";
let posts = [];

window.addEventListener("load", start);

async function start() {
  posts = await getPosts();
  console.log(posts);
  showPosts(posts);
  document.querySelector("#post-form").addEventListener("submit", createPostsClicked);
}

async function getPosts() {
  const response = await fetch(`${endpoint}/posts.json`);
  const data = await response.json();
  const posts = prepPostData(data);
  return posts;
}

function createPostsClicked(event) {
  event.preventDefault();
  const form = event.target;
  const title = form.title.value;
  const caption = form.caption.value;
  const image = form.image.value;

  const post = { title, caption, image };

  posts.push(post);
  console.log(posts);
  createPosts(post);
}

async function createPosts(post) {
  const json = JSON.stringify(post);
  const response = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: json,
  });

  showPosts(posts);
  return response;
}

function showPosts(posts) {
  document.querySelector("#grid-center").innerHTML = "";
  for (const post of posts) {
    document.querySelector("#grid-center").insertAdjacentHTML(
      "beforeend",
      /*html*/ `

      <article class="list-user">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-caption">${post.caption}</p>
       <img src="${post.image}">
       <button>Delete Post</button>

      </article>



`
    );
    document.querySelector("article:last-child button").addEventListener("click", () => deletePostsClicked(post));
  }
}

async function deletePostsClicked(post) {
  const response = await fetch(`${endpoint}/posts/${post.id}.json`, {
    method: "DELETE",
  });
  return response;
}

function prepPostData(postObject) {
  const postArr = [];
  for (const key in postObject) {
    const post = postObject[key];
    post.id = key;
    postArr.push(post);
  }
  return postArr;
}
