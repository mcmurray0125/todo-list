
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

      }

      
      
      
      //Creates a todo-list
      const createList = (listTitle) => {
        const listId = "" + new Date().getTime();

        lists.push({
          title: listTitle,
          id: listId,
          isActive: true,
        });

        resetActiveLists();
        saveLists();
      };

      
      const refresh = () => {
        window.location.reload()
      }
      
      //Deletes a list
/*       const removeList = (listIdToDelete) => {
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
      }; */

      const saveLists = () => {
        localStorage.setItem("lists", JSON.stringify(lists));
      };
      
      function updateList(listIdA, newListTitle) {
        lists.forEach(function (list) {
          if (list.id === listIdA) {
            list.title = newListTitle;
            todo.isEditing = false;
          }
        });

        saveLists();
      }


    // Controller
    const addList = () => {
        const textbox = document.getElementById("new-list-input");
        const listTitle = textbox.value;

        createList(listTitle);
        renderList();
        render();
        checkItemCount();
    };
    const renameList = () => {
        const textbox = document.getElementById("rename-list-input");
        const newListTitle = textbox.value;

        updateList(newListTitle);
        renderList();
        render();
    };

    function updateList(newListTitle) {
      lists.forEach(function (list) {
        if (list.isActive === true) {
          list.title = newListTitle;
        }
      });

      saveLists();
    }    

    function toggleActive(listIdA, checked) {
      lists.forEach(function (list) {
        if (list.id === listIdA) {
          list.isActive = checked;
        } else {
          list.isActive = false;
        }
      });

      //can I separate this function?//
      const todoLists = document.querySelectorAll('.todo-list');
      todoLists.forEach (function (todolist) {
        if (todolist.id === listIdA) {
          todolist.classList.add('active');
        } else {
          todolist.classList.remove('active');
        }
      }) 

      saveLists();
    }

    function changeListTitle(listTitle) {
      document.querySelector(".list-title").innerText = listTitle;
    }

    function checkList(event) {
      const sbInput = event.target;

      const listIdA = sbInput.id;
      const checked = sbInput.checked;
      const listTitle = sbInput.title

      toggleActive(listIdA, checked);
      checkRadioValue();
      checkItemCount();
      changeListTitle(listTitle);
    }

    //When a New List is created, all other lists are set to not Active //
    const resetActiveLists = () => {
      lists.forEach(function (list) {
        const lastList = lists[lists.length - 1];
        if (list != lastList) {
          list.isActive = false;
        }
      })
      saveLists();
    }
    
    function activeListValue() {
      for (let list of lists) {
        if (list.isActive) {
          let activeListId = list.id
          return activeListId;
        }
      }
    }
    
    const resetActiveListsDelete = () => {
      const firstList = lists[0];
      firstList.isActive = true;

      saveLists();
    }
    
    function onDeleteList() {
      if (lists.length > 1) {
        // Find the index of the array object with isActive === true
        const listToDelete = lists.findIndex(list => list.isActive === true);
  
          lists.splice(listToDelete,1);
          saveLists();
          resetActiveListsDelete();
          renderList();
          render();
          checkItemCount();
      } else {
        const listToDelete = lists.findIndex(list => list.isActive === true);

        document.querySelector(".no-todo-container").classList.remove("display");
        lists.splice(listToDelete,1);
        saveLists();
        renderList();
        render();
      }

              
      
  }

  //Toggles the display for the pop up-box when user Renames a list//
    function toggleRenameListPopup() {
      const popUp = document.getElementById("popup-field-rename");
      popUp.classList.toggle("reveal-popup");
    }

    //Using Return Key to navigate Sidebar Elements//
    function sidebarEnterKey () {
      document.querySelectorAll(".sb-tab-box").forEach(function(tabBox) {
        tabBox.addEventListener("keyup", function(event) {
            if (event.key === 'Enter') {
                document.getElementById(event.target.id).click();
            }
        });
    });
    }


    //NOT NEEDED function//
    function checkRadioValue() {
      const radios = document.getElementsByName("sbRadio");
      for (let radio of radios) {
          if (radio.checked) {
              console.log(radio.id + " is checked");
          }
      }
    }

    
    //View

    const renderList = () => { 
      const noListContainer = document.querySelector(".no-list-container");
      const addBar = document.getElementById("add-bar");
      const listTitleContainer = document.getElementById("list-title-container");
      
      if (lists.length === 0) {
        document.querySelector(".radio").innerHTML = "";
        noListContainer.classList.add("display");
        addBar.classList.add("hidden");
        listTitleContainer.classList.add("hidden")
      } else {
        noListContainer.classList.remove("display");
        addBar.classList.remove("hidden");
        listTitleContainer.classList.remove("hidden")

      
        document.querySelector(".radio").innerHTML = "";
        document.getElementById("lists-wrapper").innerHTML = "";

        lists.forEach(function (list) {
          const listElement = document.createElement("div");
          listElement.className = "todo-list"
          listElement.id = list.id;
          
          const listsWrapper = document.getElementById("lists-wrapper");
          listsWrapper.appendChild(listElement);
        
          const sbRadio = document.getElementById("radio");

          const sbInput = document.createElement("input");
          sbInput.className = "sb-input";
          sbInput.type = "radio";
          sbInput.tabIndex = 0;
          sbInput.name = "sbRadio"
          sbInput.title = list.title;
          sbInput.id = list.id;
          sbInput.onchange = checkList;
          if (list.isActive === true) {
            sbInput.checked = true;
            document.querySelector(".list-title").innerText = list.title;
            listElement.classList.add('active');
          } else {
            sbInput.checked = false;
          }
          sbRadio.appendChild(sbInput);

          const sidebarTabBox = document.createElement('label');
          sidebarTabBox.id = list.id;
          sidebarTabBox.role = "button";
          sidebarTabBox.tabIndex = 0;
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
      sidebarEnterKey();
    }
    
    
    renderList();


    //Accessibility Functions//
    //Using return key on Add Item text input and Date Picker//

    //Adding active class to Pop Up Save Buttons when text input field has characters//

    function checkNewListTitle() {
      const newListInput = document.getElementById("new-list-input");
      const newListInputValue = newListInput.value;
      
      const createButton = document.getElementById("create-btn");
      
      if (newListInputValue.length < 1) {
        createButton.classList.remove("active")
      } else {
        createButton.classList.add("active")
      }
    }
    
          
    function checkRenameListTitle() {
      const renameListInput = document.getElementById("rename-list-input");
      
      const renameListInputValue = renameListInput.value;
      
      const saveButton = document.getElementById("save-btn");
      
      if (renameListInputValue.length < 1) {
        saveButton.classList.remove("active")
      } else {
        saveButton.classList.add("active")
      }
    }

    document.getElementById("todo-title").addEventListener("keyup", function(event) {
      if (event.key === 'Enter') {
          document.getElementById("add-todo-btn").click();
      }
  });
    document.getElementById("rename-list-input").addEventListener("keyup", function(event) {
      checkRenameListTitle();
      if (event.key === 'Enter') {
          document.getElementById("save-btn").click();
      }
  });

    document.getElementById("new-list-input").addEventListener("keyup", function(event) {
      checkNewListTitle();
      if (event.key === 'Enter') {
          document.getElementById("create-btn").click();
      }
  });

    document.getElementById("date-picker").addEventListener("keyup", function(event) {
      if (event.key === 'Enter') {
          document.getElementById("add-todo-btn").click();
      }
  });

// User Action Notifications //  
const createButton = document.querySelector('button.create-btn');
const listCreatedNotification = document.querySelector('div.list-created');

createButton.addEventListener('click', function() {
  
  setTimeout(function() {

    listCreatedNotification.classList.add('display');
    
    setTimeout(function() {
      listCreatedNotification.classList.remove('display');
    }, 5000);
  }, 1000);
  });
const saveButton = document.querySelector('button.save-btn');
const listRenamedNotification = document.querySelector('div.list-renamed');

saveButton.addEventListener('click', function() {
  setTimeout(function() {

    listRenamedNotification.classList.add('display');
    
    setTimeout(function() {
      listRenamedNotification.classList.remove('display');
    }, 5000);
  }, 1000);
  });
const deleteListButton = document.getElementById("delete-list-btn");
const listDeletedNotification = document.querySelector('div.list-deleted');

deleteListButton.addEventListener('click', function() {
  setTimeout(function() {

    listDeletedNotification.classList.add('display');
    
    setTimeout(function() {
      listDeletedNotification.classList.remove('display');
    }, 5000);
  }, 1000);
  });

        




    


