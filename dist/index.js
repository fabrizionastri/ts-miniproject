"use strict";
const btn = document.getElementById("btn"); // type assertion
const input = document.getElementById("input");
const form = document.querySelector("form");
const list = document.getElementById("list");
function loadToDos() {
    const toDosJSON = localStorage.getItem("toDos");
    if (!toDosJSON)
        return [];
    return JSON.parse(toDosJSON);
}
// display the toDos array on page load
const toDos = loadToDos(); // load the toDos array from local storage
toDos.forEach(createToDoElement); // add the toDos to the ul element (the list variable
// toDos.forEach((toDo: ToDo) => { // this is the same as the line above
//   createToDoElement(toDo);
// });
function saveToDos() {
    localStorage.setItem("toDos", JSON.stringify(toDos)); // convert the toDos array to a JSON string and save it to local storage under the key "toDos"
}
function addToDo(event) {
    console.log("Event: ", event); // print the event object to the console
    event.preventDefault(); // prevent the default behaviour of the form, which is to refresh the page
    const toDo = {
        text: input.value,
        done: false,
    }; // assign the value of the input to the newToDo variable
    createToDoElement(toDo);
    toDos.push(toDo); // add the new toDo to the toDos array
    saveToDos(); // save the toDos array to local storage
    input.value = ""; // clear the input field
}
function createToDoElement(toDo) {
    console.log('list object: ', list)
    console.log('toDo object: ', toDo)
    const toDoBlock = document.createElement("li"); // create a new li element
    list.appendChild(toDoBlock); // append the new li element to the ul element
    const checkBox = document.createElement("input"); //create a check box and prepend it to the new li element
    checkBox.type = "checkbox";
    toDoBlock.appendChild(checkBox);
    const toDoText = document.createElement("span"); //create a span element and append it to the new li element
    toDoText.innerText = toDo.text; // set the text of the span element to the text of the toDo object
    toDoBlock.appendChild(toDoText);
    const actionDiv = document.createElement("div"); //create a div and append it to the new li element
    actionDiv.className = "float-right"; // give the div a class name
    toDoBlock.appendChild(actionDiv); // append the delete button to the new li element
    // create up, down and delete buttons and append them to the new actionDiv
    const upButton = document.createElement("button");
    upButton.className = "text-button";
    upButton.innerText = "△";
    actionDiv.appendChild(upButton);
    const downButton = document.createElement("button");
    downButton.className = "text-button";
    downButton.innerText = "▽";
    actionDiv.appendChild(downButton);
    const deleteButton = document.createElement("button"); //create a delete button and append it to the new li element
    deleteButton.className = "text-button"; // give the delete button a class name
    deleteButton.innerText = "✕"; // set the text of the delete button to the unicode character for the cross symbol
    actionDiv.appendChild(deleteButton);
}
form.addEventListener("submit", addToDo); // when I click on the submit button or hit enter in the input field, I want to add a new ToDo
list.addEventListener("click", (event) => {
    const target = event.target;
    if (target.type === "checkbox") {
        const parent = target.parentNode;
        parent.style.textDecoration = target.checked ? "line-through" : "none";
    }
});
list.addEventListener("click", (event) => {
    const button = event.target; // button is target element that was clicked
    const line = button.parentNode.parentNode; // line is the li element that contains the button (the parent of the parent of the button)
    const span = line.querySelector("span"); // span is the element that contains the text of the toDo
    const index = toDos.findIndex((toDo) => toDo.text == span.innerText); // find the index of the toDo object in the toDos array
    console.log("ToDos before taking any action: ", toDos);
    console.log("Target toDo index :", index, " = ", span.innerText); // print the value of the toDo object to the console
    switch (button.innerText) { // switch statement to check the text of the button
        case "△": {
            const previousLine = line.previousElementSibling; // the previousElement is the previous li element
            if (previousLine) { // if the previousElement exists, move the li element up the list
                list.insertBefore(line, previousLine); // insert the li element before the previous li element
                const previousIndex = index - 1; // find the index of the previous toDo object in the toDos array
                console.log("Previous index: ", previousIndex);
                const temp = toDos[previousIndex]; // create a temporary variable to store the toDo object
                toDos[previousIndex] = toDos[index]; // assign the toDo text of the previous toDo object to the current toDo object
                toDos[index] = temp; // assign the toDo text of the current toDo object to the previous toDo object
                console.log("ToDos after moving up: ", toDos);
            }
            break;
        }
        case "▽": {
            const nextLine = line.nextElementSibling; // the nextElement is the next li element
            if (nextLine) { // if the nextElement exists, move the li element down the list
                list.insertBefore(nextLine, line); // insert the li element before the next li element
                const nextIndex = index + 1; // find the index of the next toDo object in the toDos array
                console.log("Next index: ", nextIndex);
                const temp = toDos[nextIndex]; // create a temporary variable to store the toDo object
                toDos[nextIndex] = toDos[index]; // assign the toDo text of the next toDo object to the current toDo object
                toDos[index] = temp; // assign the toDo text of the current toDo object to the next toDo object
                console.log("ToDos after moving down: ", toDos);
            }
            break;
        }
        case "✕": {
            // delete the line from the ul element and the toDo object from the toDos array
            list.removeChild(line);
            toDos.splice(index, 1);
            console.log("ToDos after deleting: ", toDos);
            break;
        }
        default: break;
    }
    saveToDos(); // update the local storage
});
