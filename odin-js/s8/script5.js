//  insertAdjacentHTML: Inserts a text as HTML at a specified position relative to the element.
//  Syntax: element.insertAdjacentHTML(position, text);
//  Positions: "beforebegin", "afterbegin", "beforeend", "afterend"


let list = document.querySelector("#myList")
list.insertAdjacentHTML('beforebegin', '<h2> Web Technology </h2>');
list.insertAdjacentHTML('beforeend', '<li>New Item</li>');
list.insertAdjacentHTML('afterend', '<p>End of the list</p>');


// Node.replaceChild: Replaces a child node with a new node.
// Syntax: parentNode.replaceChild(newChild, oldChild);

// Node.removeChild: Removes a child node from the DOM.
// Syntax: parentNode.removeChild(childNode);

// lets remove the last element: removes the last child of the list i.e the last <li> element

let menu = document.getElementById("myList");
menu.removeChild(menu.lastElementChild);

// use cloneNode() to create a copy of an element
// arg deep is true if you want to clone the element along with its child nodes and false if you only want to clone the element itself.

let clonedMenu = menu.cloneNode(true);
clonedMenu.id = "myClonedList";
// change the text of the first child of the cloned menu
clonedMenu.firstElementChild.textContent = "Changed Item";
// append the cloned menu to the body
document.body.appendChild(clonedMenu);

// append() vs appendChild()
// append() can append multiple nodes and strings, while appendChild() can only append a single node.
// Example:
let newItem = document.querySelector("#myList");
let newItems = ["Updated Item 1", "Updated Item 2", "Updated Item 3"];

// method-1
// newItems.forEach(item => {
//     let li = document.createElement("li");
//     li.textContent = item;
//     newItem.append(li);
// });

// method-2
let nodes = newItems.map(item => {
    let li = document.createElement("li");
    li.textContent = item;
    return li;
});
nodes.forEach(node => newItem.append(node));

// JavaScript prepend() method that inserts Node objects or DOMString objects before the first child of a parent node.
// Syntax: parentNode.prepend(...nodesOrDOMStrings);
// Example:
let newItems2 = ["Prepended Item 1", "Prepended Item 2", "Prepended Item 3"];
newItems2.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    newItem.prepend(li);
});
