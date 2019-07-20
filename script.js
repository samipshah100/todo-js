// init

const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}
const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const newList = []
var uncheckedTotal = 0
var itemTotal = 0
var counter = 0

//fn init
function addItem(parentId, elementTag, propertiesObj, htmlText )  {
  let p = document.getElementById(parentId)
  let newElement = document.createElement(elementTag)

  for (const [key, value] of Object.entries(propertiesObj)) {
    newElement.setAttribute(key,value)
  }

  newElement.innerHTML = htmlText
  // this adds at the end
  // p.appendChild(newElement)

  // this adds at the beginning
  p.insertBefore(newElement,p.childNodes[0])
}

function removeItem(nodeId){
  //  get digits from the tag name
  var id = nodeId.replace(/[^0-9]/g,'');
  // alert(id)
  let containerId =  "li" + id
  let checkboxID = "checkbox" + id
  let item = document.getElementById(containerId)
  
  if (confirm("Do you want to delete that item?"))  {
    
    itemTotal--
    itemCountSpan.innerHTML = itemTotal
  
    // if the checkbox for this item is unchecked, then unchecked 
    //count will --. else if it was checked then unchecked count remains same.
    checkboxElement = document.getElementById("checkbox" + id)
    if (checkboxElement.checked === false) {
      uncheckedTotal--
      uncheckedCountSpan.innerHTML = uncheckedTotal
    }

    fadeOutEffect("delete")
    item.remove()
  }

}


function fadeOutEffect(action)  {
  
  //init
  let fadeTarget

  if (action === "add") {
    fadeTarget = document.getElementById('successContainer')
  }
  else if (action === "delete") {
    fadeTarget = document.getElementById('deleteContainer')
  }
  
  fadeTarget.style.opacity = 0

  let fadeEffect = setInterval( function()  {
    // if ( fadeTarget.style.opacity < 0.1)  {
    //   fadeTarget.style.opacity = 1
    //   // alert("opac")
    //   // fadeTarget.style.display = "block"
    // }

    if (fadeTarget.style.display === "none" || fadeTarget.style.display === "") {
      fadeTarget.style.display = "block"
      fadeTarget.style.opacity = 1
    }
    if (fadeTarget.style.opacity > 0) {
      fadeTarget.style.opacity -= 0.1
    }
    else {
      clearInterval(fadeEffect)
      fadeTarget.style.display = "none"
    }
  }, 300) // multiply by 10 to get fade out time in miliseconds.
}

function sanitarize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}

// focus input
document.getElementById("todo-input").focus()

// listen for enter
document.getElementById("todo-input").addEventListener("keyup", function(event) {
event.preventDefault()
if (event.keyCode === 13) {
  document.getElementById("btn").click()
}
})

// update vals on checkbox clicks
document.getElementById('todo-list').addEventListener('click', function(e)  {
  // if checkbox was not chcecked previously, decrease uncheckedTotal
  if (e.target.type === 'checkbox' && e.target.checked === true) {
    if (uncheckedTotal != 0)  {
      // alert("target.checked ma chu")
      uncheckedTotal--
      uncheckedCountSpan.innerHTML = uncheckedTotal
    }
  }
  // else increase uncheckedTotal
  else if (e.target.type=== 'checkbox'){
    // alert("else ma chu")
    uncheckedTotal++
    uncheckedCountSpan.innerHTML = uncheckedTotal
  }
})

function newTodo() {
  //alert('New TODO button clicked!')

  if (document.getElementById("todo-input").value==="")  {
    alert ("Hmm ... don't you want to add any to-do item?")
    return false
  }

  let sanitized_input = sanitarize(document.getElementById('todo-input').value)
  const item = {text: sanitized_input, checked: false }
  newList.push(item)
  // itemCreated = true
  // if (itemCreated)  {
  //   fadeOutEffect()
  //   itemCreated = false
  // }
  
  fadeOutEffect("add")

  document.getElementById("todo-input").value=""

  // increase counts.
  uncheckedTotal++
  itemTotal++

  //display newlist as li. use itemtotal to keep track

  // add li todo-container of type li
  //create todoContainerObj first 
  todoContainerText =""
  // todoContainerId
  todoContainerObj = {
    "class":"list-group-item",
    "id": "li"+counter,
  }
  addItem("todo-list", "li", todoContainerObj,todoContainerText)

  // add delete btn of type input
  deleteBtnContent = ""
  deleteBtnObj = {
    "type": "image",
    "id": "delete" + counter,
    "name": "delete-btn",
    "src": "./delete.png",
    class: "todo-delete",
    title: "Delete this item",
    style: "margin-left:50px; height:25px; width:25px;",
    onClick: "removeItem(this.id)"
  }
  addItem(todoContainerObj.id,"input",deleteBtnObj,deleteBtnContent)
  
  // add todo-text of type span
  todoTextContent = item.text
  todoTextObj = {
    "class": "todo-text",
    "id": "text" + counter,
  }
  addItem(todoContainerObj.id,"div",todoTextObj,todoTextContent)

  // add checkbox of type input
  checkboxText=""
  checkboxObj = {
    "type": "checkbox",
    "class": "todo-checkbox",
    "id": "checkbox" + counter,
  }
  addItem(todoContainerObj.id,"input",checkboxObj,checkboxText)

  // removeItem(document.getElementById('samlist'))

  // counter for naming
  counter++

  uncheckedCountSpan.innerHTML = uncheckedTotal
  itemCountSpan.innerHTML = itemTotal
}
