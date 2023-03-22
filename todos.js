let todos;

//Retrieve localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos"));
// Check if it's an array
//if localstorage has a todos array, then use it.
//otherwise, use the default array.
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [];
}

//Creates a todo
const createTodo = (title, dueDate) => {
  const id = "" + new Date().getTime();

  todos.push({
    title: title,
    dueDate: dueDate,
    id: id,
    listTag: activeListValue(),
  });

  saveTodos();
};

//If todo list has children, hide the no-todos message. else display it.//
const checkItemCount = () => {
  if (document.querySelector(".todo-list") && document.querySelector(".todo-list.active").children.length < 1) {
    document.querySelector(".no-todo-container").classList.add("display");
  } else {
    document.querySelector(".no-todo-container").classList.remove("display");
  }
};

//Deletes a todo
const removeTodo = (idToDelete) => {
  todos = todos.filter((todo) => {
    //If the id of this todo matches idToDelete, return false
    //for everything else, return true
    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });
  saveTodos();
};

function setEditing(todoId) {
  todos.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.isEditing = true;
    }
  });

  saveTodos();
}

function updateTodo(todoId, newTitle, newDate) {
  todos.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.title = newTitle;
      todo.date = newDate;
      todo.isEditing = false;
    }
  });

  saveTodos();
}

function toggleTodo(todoId, checked) {
  todos.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.isDone = checked;
    }
  });

  saveTodos();
}

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Controller

//Clears the input fields of the Add Item bad and Date Picker//
const clearAddBarInput = () => {
  const textField = document.getElementById("todo-title");
  textField.value = "";
  const datePicker = document.getElementById("date-picker");
  datePicker.value = "";
};

const clearNewRenameListInput = () => {
  const newListTextbox = document.getElementById("new-list-input");
  newListTextbox.value = "";

  const renameListTextbox = document.getElementById("rename-list-input");
  renameListTextbox.value = "";
};

function toggleNewListPopup() {
  const popUp = document.getElementById("popup-field");
  popUp.classList.toggle("reveal-popup");
  const newListPopupBox = document.querySelector(".nl-popup-box");
  newListPopupBox.classList.toggle("active");
}

const addTodo = () => {
  const textbox = document.getElementById("todo-title");
  const title = textbox.value;

  const datePicker = document.getElementById("date-picker");
  const dueDate = datePicker.value;

  createTodo(title, dueDate);
  render();
  checkItemCount();
  changeListTitleCaption(activeListValue());
};

const onDelete = (todoToDelete) => {
  return () => {
    removeTodo(todoToDelete.id);
    render();
    checkItemCount();
    changeListTitleCaption(activeListValue());
  };
};

function onEdit(event) {
  const editButton = event.target;
  const todoId = editButton.dataset.todoId || todoTitle.dataset.todoId;

  setEditing(todoId);
  render();
}

function onUpdate(event) {
  const updateButton = event.target;
  const todoId = updateButton.dataset.todoId;

  const textbox = document.getElementById("edit-title-" + todoId);
  const newTitle = textbox.value;

  const datePicker = document.getElementById("edit-date-" + todoId);
  const newDate = datePicker.value;

  updateTodo(todoId, newTitle, newDate);
  render();
  changeListTitleCaption(activeListValue());
}

function checkTodo(event) {
  const checkbox = event.target;

  const todoId = checkbox.dataset.todoId;
  const checked = checkbox.checked;

  toggleTodo(todoId, checked);
  render();
  changeListTitleCaption(activeListValue());
}

function deleteTodosWithList() {
  let filteredTodos = todos.filter(
    (todo) => todo.listTag !== activeListValue()
  );

  todos = filteredTodos;
  saveTodos();
}

//View
const render = () => {
  //reset todo-list elements to allow new items to populate//
  const listEls = document.querySelectorAll(".todo-list");
  let sbTabItemCounts = document.querySelectorAll(".sb-tab-item-count");

  sbTabItemCounts.forEach(function (sbTabItemCount) {
    sbTabItemCount.innerText = "0 items";
  });
  listEls.forEach(function (listEl) {
    listEl.innerHTML = "";
  });

  todos.forEach(function (todo) {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    todoItem.id = todo.title.toUpperCase().slice(0, 5);

    if (todo.isEditing === true) {
      const textbox = document.createElement("input");
      textbox.type = "text";
      textbox.placeholder = todo.title;
      textbox.id = "edit-title-" + todo.id;
      todoItem.appendChild(textbox);

      const datePicker = document.createElement("input");
      datePicker.type = "date";
      datePicker.id = "edit-date-" + todo.id;
      todoItem.appendChild(datePicker);

      const updateButton = document.createElement("button");
      updateButton.innerText = "Update";
      updateButton.dataset.todoId = todo.id;
      updateButton.className = "update-button";
      updateButton.onclick = onUpdate;
      todoItem.appendChild(updateButton);
    } else {
      todoItem.innerHTML =
        `<p class= 'todo-title'>${todo.title}</p>` +
        `<p class = 'todo-due-date'>${todo.dueDate}</p>`;

      const editButton = document.createElement("button");
      editButton.className = "edit-button";
      editButton.innerText = "Edit";
      editButton.onclick = onEdit;
      editButton.dataset.todoId = todo.id;
      todoItem.appendChild(editButton);

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.onchange = checkTodo;
      checkbox.dataset.todoId = todo.id;
      if (todo.isDone === true) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
      todoItem.prepend(checkbox);

      const deleteButton = document.createElement("button");
      // deleteButton.innerText = "Delete";
      deleteButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
      deleteButton.className = "delete-button";
      deleteButton.onclick = onDelete(todo);
      todoItem.appendChild(deleteButton);
    }

    //if the todo-item's listTag === the ID of the list, append the item to that list//
    listEls.forEach(function (listEl) {
      if (todo.listTag === listEl.id) {
        listEl.appendChild(todoItem);
        checkItemCount();
      } else {
        checkItemCount();
      }
      const listElChildren = listEl.children;
      const listElChildrenCount = listElChildren.length;
      const sbTabBox = document.querySelector(`[for='${listEl.id}']`);
      const sbTabItemCount = sbTabBox.querySelector(".sb-tab-item-count");
      const listTitleCaption = document.querySelector(".list-title-caption");
      if (listElChildrenCount === 1) {
        sbTabItemCount.innerText = listElChildrenCount + " item";
        listTitleCaption.innerText = listElChildrenCount + " item";
      } else {
        sbTabItemCount.innerText = listElChildrenCount + " items";
        listTitleCaption.innerText = listElChildrenCount + " items";
      }
    });
  });
  changeListTitleCaption(activeListValue());
};

render();


//When editing a todo, if return key is pressed, update button is clicked
const target = document.querySelector(".todo-list.active");
const observer = new MutationObserver(function () {
  // reattach the event listener to the updated element
  $(".todo-list.active input[type='text']").keyup(function (event) {
    if (event.keyCode === 13) {
      $(".update-button").click();
    }
  });
});

// start observing the target element for changes
if (document.querySelector(".todo-list.active")) {
  observer.observe(target, { childList: true, subtree: true });
}

/* $(".todo-list.active input[type='text']").keyup(function (event) {
  if (event.keyCode === 13) {
    $(".update-button").click();
  }
}); */