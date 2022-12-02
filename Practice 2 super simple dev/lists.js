      const noListMessage = () => {
      let listContainer = document.querySelector(".list-container");
      let noListContainer = document.createElement('div');
      noListContainer.className = "no-list-container"
      let noListText = document.createElement('div');
      noListText.className = "no-list-text"
      noListText.innerText = "There are no lists here"
      let noListImage = document.createElement('img');
      noListImage.className = "no-list-img"
      noListImage.src = "/Practice 2 super simple dev/images/clipboard_image.png"

      let listTitleContainer = document.querySelector('.list-title-container');
      let addBar = document.querySelector('.add-bar');
      
      listTitleContainer.style = "display: none"
      addBar.style = "display: none"
      noListContainer.appendChild(noListImage);
      noListContainer.appendChild(noListText);
      listContainer.appendChild(noListContainer)
    }

    let noTodosMessage = () => {
      let listContainer = document.querySelector(".list-container");
      let noTodoContainer = document.createElement('div');
      noTodoContainer.className = "no-todo-container"
      let noTodoText = document.createElement('div');
      noTodoText.className = "no-todo-text"
      noTodoText.innerText = "There are no todos here"
      let noTodoImage = document.createElement('img');
      noTodoImage.className = "no-todo-img"
      noTodoImage.src = "/Practice 2 super simple dev/images/cat_box_image.svg" 
    
      noTodoContainer.appendChild(noTodoImage);
      noTodoContainer.appendChild(noTodoText);
      listContainer.appendChild(noTodoContainer)  
    }


      //Model
      //if localstorage has a list array, then use it.
      //otherwise, use the default array.

      let lists;

      //Retrieve localStorage
      const savedLists = JSON.parse(localStorage.getItem("lists"));
      // Check if it's an array
      if (Array.isArray(savedLists)) {
        lists = savedLists;
      } else {
        lists = [
          /* {
            title: "List 1",
            id: "list-id1",
          }, */
        ];
        noListMessage();
      }

      
      const displayTitleElements = () => {
        let listTitleContainer = document.querySelector('.list-title-container');
        let addBar = document.querySelector('.add-bar');
        
        listTitleContainer.style = "display: flex"
        addBar.style = "display: flex"
        /* noListContainer.appendChild(noListImage);
        noListContainer.appendChild(noListText);
        listContainer.appendChild(noListContainer) */
      }
      
      //Creates a todo-list
      const createList = (listTitle) => {
        const listId = "" + new Date().getTime();
        
        lists.push({
          title: listTitle,
          id: listId,
        });
        saveLists();
        refresh();
      };
      
      const refresh = () => {
        window.location.reload()
      }
      
      //Deletes a list
      const removeList = (listIdToDelete) => {
        lists = lists.filter((list) => {
          //If the id of this list matches listIdToDelete, return false
          //for everything else, return true
          if (list.id === listIdToDelete) {
            return false;
          } else {
            return true;
          }
        });

        saveLists();
      };


      function setEditing(listId) {
        lists.forEach(function (list) {
          if (list.id === listId) {
            list.isEditing = true;
          }
        });

        saveLists();
      }

      function updateList(listId, newListTitle) {
        lists.forEach(function (list) {
          if (list.id === listId) {
            list.title = newListTitle;
            todo.isEditing = false;
          }
        });

        saveLists();
      }

      const saveLists = () => {
        localStorage.setItem("lists", JSON.stringify(lists));
      };

    // Controller
    const addList = () => {
        const textbox = document.getElementById("new-list-input");
        const listTitle = textbox.value;

        createList(listTitle);
        renderList();
    };

    const onDeleteList = (listIdToDelete) => {
        return () => {
        removeList(listIdToDelete.id);
        renderList();
        };
    };

    //Set active List//
    $(function(){
      $('.sidebar .sb-tab-box').click(function(){
        $(this).parent().find('.sb-tab-box').removeClass('active');
        $(this).addClass('active');
        console.log($('.sb-tab-box.active').attr('id'));
      })
    })  


    /* Need new edit list event target */

    /* function onEditList(event) {
        const editButton = event.target;
        const listId = editButton.dataset.listId;

        setEditing(listId);
        render();
    } */

    /* Need new save button after entering new list title. */

    /* function onUpdateList(event) {
        const updateButton = event.target;
        const todoId = updateButton.dataset.todoId;

        const textbox = document.getElementById("edit-title-" + todoId);
        const newTitle = textbox.value;

        updateTodo(todoId, newTitle, newDate);
        render();
    } */

    //View

    /* document.body.onload = addTodoList;

    function addTodoList() {
        const newList = document.createElement("div.todo-list");
    } */
    
    //Default Active Class on Load//
    window.onload = function() {
      document.getElementsByClassName('sb-tab-box')[0].classList.add('active');
    };


    const renderList = () => { 
    lists.forEach(function (list) {
        let listElement = document.createElement("div");
        listElement.className = "todo-list"
        listElement.id = list.id;

        let listContainer = document.querySelector(".list-container");
        listContainer.appendChild(listElement);

        let sidebar = document.querySelector(".sidebar");
        let sidebarTabBox = document.createElement('div');

        sidebarTabBox.className = "sb-tab-box";
        sidebarTabBox.id = list.id;
        sidebarTabBox.setAttribute("role", "button");
        sidebar.appendChild(sidebarTabBox);

        let sidebarTabContents = document.createElement('div');
        sidebarTabContents.className = "sb-tab-contents";
        sidebarTabBox.appendChild(sidebarTabContents);

        let sidebarTabTitle = document.createElement('div');
        sidebarTabTitle.className = "sb-tab-title"
        sidebarTabTitle.innerText = list.title;
        sidebarTabContents.appendChild(sidebarTabTitle);
        
        let sidebarTabItemCount = document.createElement('div');
        sidebarTabItemCount.className = "sb-tab-item-count"
        sidebarTabItemCount.innerText = "# of items";
        sidebarTabContents.appendChild(sidebarTabItemCount);
        
      });
    }
    renderList();

