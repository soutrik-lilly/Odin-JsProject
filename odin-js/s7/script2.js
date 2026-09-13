// 1) Calling JavaScript getElementsByClassName() on an element example
let menu = document.getElementById("menu");
let items = menu.getElementsByClassName('item');

console.log(items);

let data = [].map.call(items, (item) => item.textContent);
console.log(data);
console.log(typeof items);
console.log(typeof data);
console.log(Array.isArray(items));
console.log(Array.isArray(data));
console.log(items instanceof HTMLCollection);
console.log(items instanceof NodeList);

// use of Array.of() and spread operator in details
// Array.of() creates a new Array instance with a variable number of arguments
// lets see how can we convert HTMLCollection to an Array
// items: HTMLCollection of elements with class 'item' within the 'menu' element
// arrayOfItems: Array created from the HTMLCollection 'items' using Array.of() and the spread operator
//  spread operator (...) is used to expand the HTMLCollection 'items' into individual elements for Array.of()
//  They work together; Array.of() creates the array and the spread operator expands the HTMLCollection into individual elements.
//  Array.from() is another method to convert array-like objects (like HTMLCollection) into an array.
let arrayOfItems = Array.of(...items);
console.log(arrayOfItems);
console.log(Array.isArray(arrayOfItems));

let arrayOfText = arrayOfItems.map(item => item.textContent);
console.log(arrayOfText);
console.log(Array.isArray(arrayOfText));

// Another way to convert HTMLCollection to an array is using Array.from()
let arrayFromItems = Array.from(items);
console.log(arrayFromItems);
console.log(Array.isArray(arrayFromItems));

// Calling JavaScript getElementsByClassName() on the document example

items = document.getElementsByClassName('secondary');
data = Array.of(...items).map((item) => item.textContent);

console.log(data);
