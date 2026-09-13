// we will learn about querySelector() and querySelectorAll() in JavaScript in details

// universal selector is * that matches all the elements of any type

let element = document.querySelector('*');
console.log(`The first element in the document is:`, element);

// querySelectorAll() returns a NodeList of all elements matching the selector
let allElements = document.querySelectorAll('*');
console.log(`All elements in the document are:`, allElements);

//  Type Selector: to select elements by node name we use the node name as the selector
//  What is node name? The node name is the name of the HTML element, like 'DIV', 'P', 'IMG', etc.

let firstHeading = document.querySelector('h1');
console.log(`The first heading in the document is:`, firstHeading);

// what are the common type selectors in HTML? Some common type selectors are 'div', 'p', 'span', 'img', 'a', 'ul', 'li', 'h1', 'h2', 'h3', etc.

// class selector: we have a class called primary-nav and underneath we have a class menu-item
//  The class selector is denoted by a '.' followed by the class name.
let primaryNav = document.querySelector('.primary-nav');
console.log(`The primary navigation element is:`, primaryNav);

let menuItems = primaryNav.querySelector('.menu-item');
console.log(`All menu items are:`, menuItems);

//  or we can directly select all menu items without first selecting the primary navigation element
let allMenuItems = document.querySelectorAll('.menu-item');
console.log(`All menu items selected directly are:`, allMenuItems);


// id selection using the '#' symbol followed by the id value
let logo = document.querySelector('#logo');
console.log(`The logo element is:`, logo);

//  grouping selector: to select multiple elements with a single query, we can use a comma-separated list of selectors
let groupedElements = document.querySelectorAll('h1, h2, h3, .menu-item, #logo');
console.log(`All grouped elements are:`, groupedElements);

// combinator selectors: to select elements based on their relationship with other elements, we use combinators like descendant (space), child (>), adjacent sibling (+), and general sibling (~)

// descendant combinator (space): selects all elements that are descendants of a specified element i.e all .menu-item elements that are descendants of .primary-nav
let descendantItems = document.querySelector('.primary-nav .menu-item');
console.log(`All descendant menu items are:`, descendantItems);

// child combinator (>): selects all elements that are direct children of a specified element i.e all li elements that are direct children of a ul element
let childItems = document.querySelector('ul > li');
console.log(`All child menu items are:`, childItems);

let listItems = document.querySelectorAll('ul.nav > li');
console.log(`All list items that are direct children of ul.nav are:`, listItems);

// adjacent sibling combinator (+): selects all elements that are the next sibling of a specified element i.e all .menu-item elements that are immediately preceded by another .menu-item element
let links = document.querySelectorAll('p ~ a');
console.log(`All adjacent sibling links are:`, links);

// general sibling combinator (~): selects all elements that are siblings of a specified element i.e all .menu-item elements that are preceded by another .menu-item element
links = document.querySelectorAll('h1 + a');
console.log(`All general sibling links are:`, links);

//  diff in descendant and child combinators: the descendant combinator (space) selects all elements that are descendants of a specified element, regardless of their depth, whereas the child combinator (>) selects only the direct children of a specified element.

// pseudo-class selectors: to select elements based on their state or position, we use pseudo-classes like :first-child, :last-child, :nth-child(n), :hover, :focus, etc.

// first-child pseudo-class: selects the first child element of a specified parent
let firstChild = document.querySelector('ul.nav > li:first-child');
console.log(`The first child list item is:`, firstChild);

// last-child pseudo-class: selects the last child element of a specified parent
let lastChild = document.querySelector('ul.nav > li:last-child');
console.log(`The last child list item is:`, lastChild);

// nth-child pseudo-class: selects the nth child element of a specified parent
let secondChild = document.querySelector('ul.nav > li:nth-child(2)');
console.log(`The second child list item is:`, secondChild);

// nth-child pseudo-class: selects the nth child element of a specified parent (example for the third child)
let thirdChild = document.querySelector('ul.nav > li:nth-child(3)');
console.log(`The third child list item is:`, thirdChild);
