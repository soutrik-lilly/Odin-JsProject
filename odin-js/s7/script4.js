// Parent Node attribute - accessing the parent element of the selected paragraph
let pClass = document.querySelector('.text');
console.log(`Parent element of the selected paragraph: ${pClass.parentElement}`);
console.log(pClass.parentElement);
console.log(`Parent node of the selected paragraph: ${pClass.parentNode}`);
console.log(pClass.parentNode);


// nextElementSibling - accessing the next sibling element of the selected paragraph
// previousElementSibling - accessing the previous sibling element of the selected paragraph

let currentNode = document.querySelector("#about");
console.log(`Next sibling element of the selected node: ${currentNode.nextElementSibling}`);
console.log(currentNode.nextElementSibling);
console.log(`Previous sibling element of the selected node: ${currentNode.previousElementSibling}`);
console.log(currentNode.previousElementSibling);

// Get Child Elements of the selected node
let menuId = document.getElementById("menu");
let firstChild = menuId.firstElementChild;
console.log(`First child element of the selected node: ${firstChild}`);
console.log(firstChild);

//  get the last child
let lastChild = menuId.lastElementChild;
console.log(`Last child element of the selected node: ${lastChild}`);
console.log(lastChild);

// return all the children belonging to parent node
let allChildren = menuId.children;
console.log(`All child elements of the selected node: ${allChildren}`);
console.log(allChildren);
