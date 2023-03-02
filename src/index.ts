const btn = document.getElementById("btn")! as HTMLButtonElement; // type assertion
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!
const todolist = document.getElementById("todolist")! as HTMLUListElement;



function addToDo(event : Event) { // event is the event object, which is passed to the callback function by the browser when the event is triggered (in this case, the submit event) 
  event.preventDefault(); // prevent the default behaviour of the form, which is to refresh the page
  const newToDo = input.value; // get the value of the input
  console.log("New toDo submited: ", newToDo);
  const newElement = document.createElement("li"); // create a new li element
  newElement.innerText = newToDo; // set the text of the new li element to the value of the input
  //create a check box and prepend it to the new li element
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  newElement.prepend(checkBox);
  const deleteButton = document.createElement("button");   //create a delete button and append it to the new li element
  deleteButton.style.border = "none";  // make the delete button have no border and no background
  deleteButton.style.background = "none";
  deleteButton.innerText = "✕"; // set the text of the delete button to the unicode character for the cross symbol
  deleteButton.style.float = "right"; // align the delete button to the right of the container
  newElement.appendChild(deleteButton); // append the delete button to the new li element
  todolist.appendChild(newElement); // append the new li element to the ul element
}

// a function that changes the background color of the body element to a random color when called
function changeBackground(event : Event) {
  event.preventDefault(); // prevent the default behaviour of the form, which is to refresh the page
  // generate a random color
  const randomColor = generateLightColor()
  // generate a light random color
  document.body.style.backgroundColor = "#" + randomColor;
}

// form.addEventListener("submit", changeBackground)  // we pass the callback function to the event listener, without any arguments, because the event object is passed to the callback function by the browser automatically
// btn.addEventListener("click", addToDo)

form.addEventListener("submit", (e) => {
  addToDo(e);
  changeBackground(e);
 })

