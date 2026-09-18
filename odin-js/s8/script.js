// create element using document.createElement('tagName') and then add html content using element.innerHTML or element.textContent and then append it to the DOM using parentElement.appendChild(element)

const newDiv = document.createElement('div');
newDiv.innerHTML = '<p>Creating a new div element using JavaScript</p>';
document.body.appendChild(newDiv);

// create a new div element using JavaScript and then add an id to it using element.id
const anotherDiv = document.createElement('div');
anotherDiv.id = 'myNewDiv';
anotherDiv.innerHTML = '<p>This div has an id of "myNewDiv"</p>';
document.body.appendChild(anotherDiv);

// create a new div element using JavaScript and then add a class to it using element.className
const classDiv = document.createElement('div');
classDiv.id = 'myClassDiv';
classDiv.className = 'myClassDiv';
classDiv.innerHTML = '<p>This div has a class of "myClassDiv"</p>';
document.body.appendChild(classDiv);

// adding text using TextNode and appending it to a div element
const textDiv = document.createElement('div');
textDiv.id = 'textDiv';
textDiv.className = 'textDiv';
const textNode = document.createTextNode('This text is added using TextNode');
textDiv.appendChild(textNode);
document.body.appendChild(textDiv);


// now how to add elements to a new div element using JavaScript
// only create the container div without appending it to the DOM
let containerDiv = document.createElement('div');
containerDiv.id = 'div-id';
containerDiv.className = 'div-class';

// create a new h2 element and append it to the container div
let h2 = document.createElement('h2');
h2.innerHTML = 'This is a heading inside the container div';

// append the h2 element to the container div
containerDiv.appendChild(h2);

// finally, append the container div to the DOM
document.body.appendChild(containerDiv);

// add to existing nodes: start with getting the parent element by its id and then create new child elements and append them to the parent

let menu = document.getElementById('myList');
let newItem = document.createElement('li');
newItem.textContent = 'Item 2';
menu.appendChild(newItem);

let anotherItem = document.createElement('li');
anotherItem.textContent = 'Item 3';
menu.appendChild(anotherItem);
