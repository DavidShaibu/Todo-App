const addTodo = document.querySelector(".addTodo");
let list = document.querySelector(".ul");
const hiddenList = document.querySelector(".hidden");
const search = document.querySelector(".search");
const checkbox = document.querySelectorAll(".checkbox");
const undoBtn = document.querySelector(".btn-main");
const deleted = [];

//add Todo item
const generateTemplate = (todo) => {
  let count = 3;
  count++;
  let html = `
  <li class="todo" order=${count}>
    <div class="checker">
                        <input type="checkbox" class="checkbox">
    </div>
    <div class="todo-item">${todo}</div>
  </li>`;
  list.innerHTML += html;
};

addTodo.addEventListener("submit", (event) => {
  event.preventDefault();
  let todoText = addTodo.todoText.value.trim();
  if (todoText) {
    todoText = todoText.slice(0, 1).toUpperCase() + todoText.slice(1);
    generateTemplate(todoText);
    addTodo.reset();
  }
});

//delete Todo item
function deleTodo(event) {
  if (event.target.classList.contains("checkbox")) {
    event.target.checked = false;
    let liNode = event.target.parentNode.parentNode;
    deleted.push(liNode);
    event.target.parentNode.parentNode.remove();
  }
}

list.addEventListener("click", deleTodo);

//Search
function filterTodo(term) {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
}

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodo(term);
});

// Undo button
undoBtn.addEventListener("click", () => {
  if (deleted.length > 0) {
    list.append(deleted.pop());
    const todoArray = Array.from(list.children);
    list.textContent = "";
    todoArray.sort((a, b) => a.getAttribute("order") - b.getAttribute("order"));
    todoArray.forEach((todo) => list.append(todo));
  }
});
