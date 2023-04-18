//------selector------//
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");
//------event listenets-------//
todoButton.addEventListener("click", addIodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);
//-------functions----------//

function addIodo(e) {
  e.preventDefault();
  // console.log(e);

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = `
<li>${todoInput.value}</li>
<span><i class="far fa-check-square"></i></span>
<span><i class="far fa-trash-alt"></i></span>`;
  todoDiv.innerHTML = newTodo;

  //-------append to todolist -------//

  todoList.appendChild(todoDiv);
  saveLocalTodos(todoInput.value);
  todoInput.value = "";
}

function checkRemove(e) {
  const classList = [...e.target.classList];
  const item = e.target;
  // console.log(item.parentElement.parentElement);
  // console.log(classList);
  if (classList[1] === "fa-check-square") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("copmleted");
  } else if (classList[1] === "fa-trash-alt") {
    const todo = item.parentElement.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
}

function filterTodos(e) {
  const todos = [...todoList.childNodes];
  console.log(todoList.childNodes);
  todos.forEach((todo) => {
    // console.log(e.target.value);
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "copmleted":
        if (todo.classList.contains("copmleted")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("copmleted")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//locol

function saveLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  savedTodos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `
  <li>${todo}</li>
  <span><i class="far fa-check-square"></i></span>
  <span><i class="far fa-trash-alt"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  console.log(todo.children[0].innerText);
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filtertodos = savedTodos.filter(
    (item) => item != todo.children[0].innerText
  );
  localStorage.setItem("todos", JSON.stringify(filtertodos));
}
