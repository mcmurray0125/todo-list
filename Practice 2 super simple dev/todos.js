const noTodoMessage = () => {
  const listContainer = document.getElementById("list-container");
  const noTodoContainer = document.createElement('div');
  noTodoContainer.className = "no-todo-container"
  const noTodoText = document.createElement('div');
  noTodoText.className = "no-todo-text"
  noTodoText.innerText = "There are no todos here"
  const noTodoImage = document.createElement('img');
  noTodoImage.className = "no-todo-img"
  noTodoImage.src = "/Practice 2 super simple dev/images/cat_box_image.svg" 

  noTodoContainer.appendChild(noTodoImage);
  noTodoContainer.appendChild(noTodoText);
  listContainer.appendChild(noTodoContainer)  
}


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
        noTodoMessage();
      };

      //Creates a todo
      const createTodo = (title, dueDate) => {
        const id = "" + new Date().getTime();

        todos.push({
          title: title,
          dueDate: dueDate,
          id: id,
        });
        
        saveTodos();
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

      //Character Count in Pop Up Dialog
      {
        const textArea = document.getElementById("new-list-input");
        const characters = document.getElementById("characters");

        textArea.addEventListener("input", function () {
          let content = this.value;
          characters.textContent = content.length;
        });
      }

      // Controller
      
      //Clears the input fields of the Add Item bad and Date Picker//
      const clearText = () => {
        const textField = document.getElementById("todo-title");
        textField.value = "";
        const datePicker = document.getElementById("date-picker");
        datePicker.value = "";
      };

      //Add Item underline animation
      const focusLine = () => {
        let addBar = document.getElementById("add-bar");
        addBar.style.marginBottom = "-1px";
        addBar.style.borderBottom = "2px solid rgb(73, 64, 163)";
      };
      
      const focusoutLine = () => {
        let addBar = document.getElementById("add-bar");
        addBar.style.borderBottom =
          "1px solid rgb(128, 128, 128)";
        addBar.style.marginBottom = "0px";
      };


      //Drop Down Sub Menu Displays  
      {
      const moreButton = document.getElementById("more-button")
      const moreDropDown = document.getElementById("more-dropdown")

      moreButton.addEventListener("click", function(){moreDropDown.classList.toggle("dd-display")})

      const sortButton = document.getElementById("sort-button")
      const sortDropDown = document.getElementById("sort-dropdown")

      sortButton.addEventListener("click", function(){sortDropDown.classList.toggle("dd-display")})
      }

      function alphabetSort() {
        var mylist = document.querySelector(".todo-list.active");
        var divs = mylist.getElementsByTagName("div");
        var listitems = [];
        for (i = 0; i < divs.length; i++) {
          listitems.push(divs.item(i));
        }
        listitems.sort(function (a, b) {
          var compA = a.getAttribute("id").toUpperCase();
          var compB = b.getAttribute("id").toUpperCase();
          return compA < compB ? -1 : compA > compB ? 1 : 0;
        });
        for (i = 0; i < listitems.length; i++) {
          mylist.appendChild(listitems[i]);
        }
        saveTodos();
      }

      
      function sidebarCollapse() {
        const collapsedClass = "sidebar-collapsed";
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle(collapsedClass);
      }
      function revealPopup() {
        const popUp = document.getElementById("popup-field");
        popUp.classList.toggle("reveal-popup");
      }
      
      const addTodo = () => {
        const textbox = document.getElementById("todo-title");
        const title = textbox.value;
        
        const datePicker = document.getElementById("date-picker");
        const dueDate = datePicker.value;
        
        createTodo(title, dueDate);
/*         refresh();
 */        render();
      };
      
      const onDelete = (todoToDelete) => {
        return () => {
          removeTodo(todoToDelete.id);
          render();
        };
      };
      

      
      function onEdit(event) {
        const editButton = event.target;
        const todoId = editButton.dataset.todoId;

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
      }

      function checkTodo(event) {
        const checkbox = event.target;

        const todoId = checkbox.dataset.todoId;
        const checked = checkbox.checked;

        toggleTodo(todoId, checked);
        render();
      }

      
      //View
      const render = () => {
        //reset our list
        document.querySelector(".todo-list.active").innerHTML = "";
        
        
        todos.forEach(function (todo) {
        
          const element = document.createElement("div");
          element.className = "todo-item";
          element.id = todo.title.toUpperCase().slice(0, 5);


          if (todo.isEditing === true) {
            const textbox = document.createElement("input");
            textbox.type = "text";
            textbox.id = "edit-title-" + todo.id;
            element.appendChild(textbox);

            const datePicker = document.createElement("input");
            datePicker.type = "date";
            datePicker.id = "edit-date-" + todo.id;
            element.appendChild(datePicker);

            const updateButton = document.createElement("button");
            updateButton.innerText = "Update";
            updateButton.dataset.todoId = todo.id;
            updateButton.className = "update-button";
            updateButton.onclick = onUpdate;
            element.appendChild(updateButton);
          } else {
            // element.innerText = todo.title + " " + todo.dueDate;
            element.innerHTML =
              `<p class= 'todo-title'>${todo.title}</p>` +
              `<p class = 'todo-due-date'>${todo.dueDate}</p>`;

            const editButton = document.createElement("button");
            editButton.className = "edit-button";
            editButton.innerText = "Edit";
            editButton.onclick = onEdit;
            editButton.dataset.todoId = todo.id;
            element.appendChild(editButton);

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.onchange = checkTodo;
            checkbox.dataset.todoId = todo.id;
            if (todo.isDone === true) {
              checkbox.checked = true;
            } else {
              checkbox.checked = false;
            }
            element.prepend(checkbox);

            const deleteButton = document.createElement("button");
            // deleteButton.innerText = "Delete";
            deleteButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
            deleteButton.className = "delete-button";
            deleteButton.onclick = onDelete(todo);
            element.appendChild(deleteButton);
          }
          
          const todoList = document.querySelector('.todo-list.active');
          todoList.appendChild(element);

        });

      };
      
      render();


      const assignActiveId = () => {
        const activeId = activeListValue();
        const todoItems = document.querySelectorAll('.todo-list.active .todo-item');

        todoItems.forEach (function (todoItem) {
          if (todoItem === todoItems[todoItems.length -1]) {
            todoItem.dataset.parentId = activeId;
          }
        })
      }

      const appendToList = () => {

      }

      


      
      $(function() {
        const activeListCount = $('.todo-list.active').children().length;
        console.log(activeListCount);
      }) 

      
      