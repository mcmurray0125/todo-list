      const noListMessage = () => {
      const listContainer = document.getElementById("list-container");
      const noListContainer = document.createElement('div');
      noListContainer.className = "no-list-container"
      const noListText = document.createElement('div');
      noListText.className = "no-list-text"
      noListText.innerText = "There are no lists here"
      const noListImage = document.createElement('img');
      noListImage.className = "no-list-img"
      noListImage.src = "/Practice 2 super simple dev/images/clipboard_image.png"

      let listTitleContainer = document.getElementById('list-title-container');
      let addBar = document.getElementById('add-bar');
      
      listTitleContainer.style = "display: none";
      addBar.style = "display: none";
      noListContainer.appendChild(noListImage);
      noListContainer.appendChild(noListText);
      listContainer.appendChild(noListContainer)
    }

    let noTodosMessage = () => {
      const listContainer = document.getElementById("list-container");
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
    
    
    
    const renderList = () => { 
      lists.forEach(function (list) {
        const listElement = document.createElement("div");
        listElement.className = "todo-list"
        listElement.id = list.id;
        
        const listContainer = document.getElementById("list-container");
        listContainer.appendChild(listElement);
      


        const sbRadio = document.getElementById("radio");

        const SbInput = document.createElement("input");
        SbInput.className = "sb-input";
        SbInput.type = "radio";
        SbInput.name = "sbRadio"
        SbInput.id = list.id; 
        sbRadio.appendChild(SbInput);

        const sidebarTabBox = document.createElement('label');
        sidebarTabBox.id = list.id;
        sidebarTabBox.htmlFor = list.id;
        sidebarTabBox.className = "sb-tab-box";
        sbRadio.appendChild(sidebarTabBox);
        
        const sidebarTabContents = document.createElement('div');
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


      
    


























    //jQuery//
/*     $(function() {
      //Set Active Side Bar//
      $('.sidebar .sb-tab-box').click(function(){
        $(this).parent().find('.sb-tab-box').removeClass('active');
        $(this).addClass('active');

        const activeSideBar = $('.sb-tab-box.active').attr('id');
        $('.list-container').find('.todo-list').removeClass('active');
        $(".list-container").find("#" + activeSideBar).addClass('active');
      })

        if ( $('.todo-list.active').children().length < 1 ) {
          $('.no-todo-container').css("display", "flex");
          console.log("no children in list")
        } else {
          $('.no-todo-container').css("display", "none");
          console.log("there's childern here");
        }

        let test = $('.sidebar').children().length;
        if (test < 4 ) {
          console.log("hello");
        }  

      })      */ 
      

      
      
      //Refreshes Page when todo-list are empty//
      /* $(function () {
        let addTodoBtn = document.getElementById("add-todo-btn");
        
        addTodoBtn.addEventListener("click", function () {
          if ($('.todo-list.active').children().length < 1) {
            alert("im small");
          } else {
            alert("i'm big")
          }
        });
      }) */