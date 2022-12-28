window.onload = function () {
  checkItemCount()
  changeListTitleCaption(activeListValue())
}

//When create list btn is clicked, scroll to top of window.
document.querySelectorAll('.popup-btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
  })
})

//NOT NEEDED function//
function checkRadioValue() {
  const radios = document.getElementsByName('sbRadio')
  for (let radio of radios) {
    if (radio.checked) {
      console.log(radio.id + ' is checked')
    }
  }
}

function sidebarCollapse() {
  const collapsedClass = 'sidebar-collapsed'
  const sidebar = document.getElementById('sidebar')
  sidebar.classList.toggle(collapsedClass)
}

//When ADD BAR INPUT is focused on, create BLUE UNDERLINE
const focusLine = () => {
  let addBar = document.getElementById('add-bar')
  addBar.style.marginBottom = '-1px'
  addBar.style.borderBottom = '2px solid rgb(73, 64, 163)'
}

const focusoutLine = () => {
  let addBar = document.getElementById('add-bar')
  addBar.style.borderBottom = '1px solid rgb(128, 128, 128)'
  addBar.style.marginBottom = '0px'
}

document.getElementById('todo-title').addEventListener('focusin', focusLine)
document.getElementById('todo-title').addEventListener('focusout', focusoutLine)

//USING RETURN KEY TO NAVIGATE SIDEAR//
function sidebarEnterKey() {
  document.querySelectorAll('.sb-tab-box').forEach(function (tabBox) {
    tabBox.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        document.getElementById(event.target.id).click()
      }
    })
  })
}

//DROPDOWN MENU TOGGLE

//each dropdown button has a data-type attribute of their name (sort,more...).
//i.e. the sort btn element has data-type="sort"
//the sort btn has a sibling w/ class of dropdown-content.
//that dropdown-content also has a data-type of sort.
//when sort btn is clicked, the sort dropdown will display because their data-type attributes match.

function toggleDropdown(event) {
  const dropDownButton = event.target

  // Find the dropdown that has the same data-type as the clicked button
  const dropdown = document.querySelector(
    `div[data-type=${dropDownButton.getAttribute('data-type')}]`
  )

  // Hide all dropdowns except for the selected one
  const dropdowns = document.querySelectorAll('.dropdown-content')
  dropdowns.forEach((el) => {
    if (el === dropdown) {
      el.classList.toggle('display')
    } else {
      el.classList.remove('display')
    }
  })
}

//Calling dropdown menu toggle
const titleButtons = document.querySelectorAll('.title-button')
titleButtons.forEach((button) =>
  button.addEventListener('click', toggleDropdown)
)

//If document body is clicked, hide Dropdowns
document.addEventListener('click', (event) => {
  // Check if the click originated from a title button
  if (!event.target.matches('.title-button')) {
    // If not, hide all dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-content')
    dropdowns.forEach((el) => el.classList.remove('display'))
  }
})

function alphabetSort() {
  var mylist = document.querySelector('.todo-list.active')
  var divs = mylist.getElementsByTagName('div')
  var listitems = []
  for (i = 0; i < divs.length; i++) {
    listitems.push(divs.item(i))
  }
  listitems.sort(function (a, b) {
    var compA = a.getAttribute('id').toUpperCase()
    var compB = b.getAttribute('id').toUpperCase()
    return compA < compB ? -1 : compA > compB ? 1 : 0
  })
  for (i = 0; i < listitems.length; i++) {
    mylist.appendChild(listitems[i])
  }
  saveTodos()
  changeListTitleCaption(activeListValue())
}

// Character Counter in Pop Up Text Inputs
const textArea = document.getElementById('new-list-input')
const characters = document.getElementById('characters')

textArea.addEventListener('input', function () {
  let content = this.value
  characters.textContent = content.length
})

const renameTextArea = document.getElementById('rename-list-input')
const renameCharacters = document.getElementById('rename-characters')

renameTextArea.addEventListener('input', function () {
  let renameContent = this.value
  renameCharacters.textContent = renameContent.length
})
