
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
      };

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

      //If todo list has children, hide the error message. else display it.//
      const checkItemCount = () => {
        if (document.querySelector(".todo-list.active").children.length < 1) {
          document.querySelector(".no-todo-container").classList.add("display");
        } else {
          document.querySelector(".no-todo-container").classList.remove("display");
        }
      }


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

      // Character Count in Pop Up Text Inputs // 
      {
        const textArea = document.getElementById("new-list-input");
        const characters = document.getElementById("characters");

        textArea.addEventListener("input", function () {
          let content = this.value;
          characters.textContent = content.length;
        });
        
        const renameTextArea = document.getElementById("rename-list-input");
        const renameCharacters = document.getElementById("rename-characters");

        renameTextArea.addEventListener("input", function () {
          let renameContent = this.value;
          renameCharacters.textContent = renameContent.length;
        });
      }

      // Controller
      
      //Clears the input fields of the Add Item bad and Date Picker//
      const clearAddBarInput = () => {
        const textField = document.getElementById("todo-title");
        textField.value = "";
        const datePicker = document.getElementById("date-picker");
        datePicker.value = "";
      };

      const clearNewRenameListInput = () => {
        const newListTextbox = document.getElementById("new-list-input")
        newListTextbox.value = "";

        const renameListTextbox = document.getElementById("rename-list-input")
        renameListTextbox.value = "";
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
/*       {
      const moreButton = document.getElementById("more-button")
      const moreDropDown = document.getElementById("more-dropdown")

      moreButton.addEventListener("click", function(){moreDropDown.classList.toggle("dd-display")})

      const sortButton = document.getElementById("sort-button")
      const sortDropDown = document.getElementById("sort-dropdown")

      sortButton.addEventListener("click", function(){sortDropDown.classList.toggle("dd-display")})
      }
 */
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
      
      function toggleNewListPopup() {
        const popUp = document.getElementById("popup-field");
        popUp.classList.toggle("reveal-popup");
      }
      
      const addTodo = () => {
        const textbox = document.getElementById("todo-title");
        const title = textbox.value;
        
        const datePicker = document.getElementById("date-picker");
        const dueDate = datePicker.value;
        
        createTodo(title, dueDate);
        render();
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
      }

      function checkTodo(event) {
        const checkbox = event.target;

        const todoId = checkbox.dataset.todoId;
        const checked = checkbox.checked;

        toggleTodo(todoId, checked);
        render();
      }

      function deleteTodosWithList() {
        let filteredTodos = todos.filter(todo => todo.listTag !== activeListValue());

        todos = filteredTodos;
        saveTodos();
      }



      
      //View
      const render = () => {
        //reset todo-list elements to allow new items to populate//
        const listEls = document.querySelectorAll(".todo-list");
        let sbTabItemCounts = document.querySelectorAll(".sb-tab-item-count");

        sbTabItemCounts.forEach(function (sbTabItemCount) {
          sbTabItemCount.innerText = "0 items"
        })
        listEls.forEach(function (listEl) {
          listEl.innerHTML = ""
        })
        
        todos.forEach(function (todo) {
                  
          const element = document.createElement("div");
          element.className = "todo-item";
          element.id = todo.title.toUpperCase().slice(0, 5);
          

            if (todo.isEditing === true) {
              const textbox = document.createElement("input");
              textbox.type = "text";
              textbox.placeholder = todo.title;
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
            
            //if the todo-item's listTag === the ID of the list, append the item to that list//
            listEls.forEach(function (listEl) {
              
              if (todo.listTag === listEl.id) {
                listEl.appendChild(element);
                checkItemCount();
              }  else {
                checkItemCount();
              }
              const listElChildren = listEl.children;
              const listElChildrenCount = listElChildren.length;
              const sbTabBox = document.querySelector(`[for='${listEl.id}']`);
              const sbTabItemCount = sbTabBox.querySelector('.sb-tab-item-count');
              const listTitleCaption = document.querySelector(".list-title-caption");
              if (listElChildrenCount === 1) {
                sbTabItemCount.innerText = listElChildrenCount + " item";
                listTitleCaption.innerText = listElChildrenCount + " item";

              } else {
                sbTabItemCount.innerText = listElChildrenCount + " items";
                listTitleCaption.innerText = listElChildrenCount + " items";
              }
            })
          
        });      
      };
      
      render();


      
      $(function() {
        const activeListCount = $('.todo-list.active').children().length;
        console.log(activeListCount);
      }) 


      function toggleDropdown(event) {
        // Get the clicked button
        const button = event.target;
      
        // Find the dropdown element that has the same tag as the clicked button
        const dropdown = document.querySelector(`div[tag=${button.getAttribute('tag')}]`);
      
        // Hide all dropdowns except for the selected one
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(el => {
          if (el === dropdown) {
            el.classList.toggle('display');
          } else {
            el.classList.remove('display');
          }
        });
      }
      
    
      const titleButtons = document.querySelectorAll('.title-button');
      titleButtons.forEach(button => button.addEventListener('click', toggleDropdown));
      

      document.addEventListener('click', event => {
        // Check if the click originated from a title button
        if (!event.target.matches('.title-button')) {
          // If not, hide all dropdowns
          const dropdowns = document.querySelectorAll('.dropdown-content');
          dropdowns.forEach(el => el.classList.remove('display'));
        }
      });


      const target = document.querySelector('.todo-list.active');

      const observer = new MutationObserver(function() {
        // reattach the event listener to the updated element
        $(".todo-list.active input[type='text']").keyup(function(event) {
          if (event.keyCode === 13) {
              $(".update-button").click();
          }
        });
      });

      // start observing the target element for changes
      observer.observe(target, { childList: true, subtree: true });


      $(".todo-list.active input[type='text']").keyup(function(event) {
        if (event.keyCode === 13) {
            $(".update-button").click();
        }
      });
      
      


          
      

      
      