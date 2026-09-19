//  when the web browser loads an html page , it generated the corresponding DOM (Document Object Model) representation of the page.
// The DOM allows JavaScript to access and manipulate the content, structure, and style of a web page dynamically.
// The DOM represents the document as a tree of nodes, where each node corresponds to a part of the document, such as an element, attribute, or text content.
// Each node in the DOM tree can be accessed and manipulated using JavaScript methods and properties, allowing developers to dynamically update the content and structure of a web page.
// The webbrowser converts the standard attributes of the HTML elements into DOM properties, allowing JavaScript to interact with them programmatically.

let input = document.querySelector('#myInput');

for (let key of input.attributes) {
    console.log(`${key.name} = ${key.value}`);
}

// set attributes

input.setAttribute('tabIndex', '2');
console.log(`After setting tabIndex: ${input.getAttribute('tabIndex')}`);

//  get attributes
console.log(`Current tabIndex: ${input.getAttribute('tabIndex')}`);

//  diff between attributes and properties
console.log(`tabIndex property: ${input.tabIndex}`);

//  what is the meaning and diff of setting a property and setting an attribute
input.tabIndex = 10;
console.log(`After setting tabIndex property to 10:`);
console.log(`tabIndex attribute: ${input.getAttribute('tabIndex')}`);
console.log(`tabIndex property: ${input.tabIndex}`);

// we can set new value for every property but not for every attribute directly through the property.
// For example, we can set the 'value' property of an input element, but we cannot set the 'value' attribute directly through the property.
input.value = 'Hello, World!';
console.log(`After setting value property:`);
console.log(`value attribute: ${input.getAttribute('value')}`);
console.log(`value property: ${input.value}`);

// DOM properties are typed
// In general the value of an attribute in always a string, but when the attribute is reflected as a DOM property, the property may have a different type, such as a number, boolean, or object.

let checkbox = document.querySelector('#myCheckbox');
console.log(`type of checkbox.checked property: ${typeof checkbox.checked}`);
console.log(`type of checkbox.getAttribute('checked') attribute: ${typeof checkbox.getAttribute('checked')}`);

// adding custom properties to any element using data-* attributes
let divElem = document.querySelector('#myDiv');
console.log(`data-progress attribute: ${divElem.getAttribute('data-progress')}`);
console.log(`data-value attribute: ${divElem.getAttribute('data-value')}`);
console.log(`data-progress property: ${divElem.dataset.progress}`);
console.log(`data-value property: ${divElem.dataset.value}`);

// set data-* attributes and properties
divElem.setAttribute('data-progress', 'in-progress');
divElem.setAttribute('data-value', '50%');
console.log(`After setting attributes:`);
console.log(`data-progress attribute: ${divElem.getAttribute('data-progress')}`);
console.log(`data-value attribute: ${divElem.getAttribute('data-value')}`);

divElem.dataset.progress = 'in-progress';
divElem.dataset.value = '75%';
console.log(`After setting properties:`);
console.log(`data-progress property: ${divElem.dataset.progress}`);
console.log(`data-value property: ${divElem.dataset.value}`);

// demonstrate the difference between setting attributes and properties for data-* attributes
console.log(`Final state:`);
console.log(`data-progress attribute: ${divElem.getAttribute('data-progress')}`);
console.log(`data-value attribute: ${divElem.getAttribute('data-value')}`);
console.log(`data-progress property: ${divElem.dataset.progress}`);
console.log(`data-value property: ${divElem.dataset.value}`);

