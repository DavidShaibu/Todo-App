const addTodo = document.querySelector(".addTodo");
const list = document.querySelector(".ul");
const hiddenList = document.querySelector(".hidden");
const search = document.querySelector(".search");
const checkbox = document.querySelectorAll(".checkbox");
const undoBtn = document.querySelector(".btn-main");

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
    let todoText = event.target.parentNode.nextElementSibling.textContent;
    let count = event.target.parentNode.parentNode.getAttribute("order");
    // console.log(count);
    let html = `
        <li class="todo filtered" order=${count}>
            <div class="checker">
                                <input type="checkbox" class="checkbox">
            </div>
            <div class="todo-item">${todoText}</div>
        </li>`;
    hiddenList.innerHTML += html;
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

// Undo button click
undoBtn.addEventListener("click", () => {
  if (hiddenList.firstElementChild) {
    hiddenList.lastElementChild.classList.remove("filtered");
    list.append(hiddenList.lastElementChild);
    sort(list);
  }
});

function sort(todoNode) {
  let todoArray = Array.from(todoNode.children);
  // console.log(array[0]);
  list.textContent = "";
  todoArray.sort((a, b) => a.getAttribute("order") - b.getAttribute("order"));
  todoArray.forEach((todo) => list.append(todo));
}
