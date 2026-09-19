// JavaScript code for manipulating CSS styles of elements in the HTML page
//  css properties wriiten with hypen are accessed using camelCase in JavaScript for example:
//  background-color becomes backgroundColor, font-size becomes fontSize, etc.
/*
To completely override the existing inline style, you set the cssText property of the style object. For example:
element.style.cssText = 'color:red;background-color:yellow';

Or you can use the setAttribute() method:
element.setAttribute('style','color:red;background-color:yellow');

Once setting the inline style, you can modify one or more CSS properties:
element.style.color = 'blue';

If you do not want to overwrite the existing CSS properties completely, you can concatenate the new CSS property
to the cssText as follows:
element.style.cssText += 'color:red;background-color:yellow';
*/


let aElem = document.querySelector("#exampleLink")
aElem.style.color = 'red';
aElem.style.backgroundColor = 'yellow';
aElem.style.fontSize = '20px';
aElem.style.fontWeight = 'bold';
aElem.style.textDecoration = 'underline';
aElem.style.padding = '10px';
aElem.style.border = '2px solid black';
aElem.style.borderRadius = '5px';
aElem.style.margin = '10px';
aElem.style.cursor = 'pointer';
aElem.style.transition = 'all 0.3s ease';

// getComputedStyle example: method of window object that returns an object that contain the computed style properties of the specified element
// the syntax is getComputedStyle(element, pseudoElement)
// where pseudoElement is an optional string specifying the pseudo-element to match. For example, '::before', '::after', ':hover', etc.
let link = document.querySelector("#exampleLink");
let computedStyle = getComputedStyle(link);
console.log(computedStyle.color);
console.log(computedStyle.backgroundColor);
console.log(computedStyle.fontSize);
console.log(computedStyle.fontWeight);
console.log(computedStyle.textDecoration);
console.log(computedStyle.padding);
console.log(computedStyle.border);
console.log(computedStyle.borderRadius);
console.log(computedStyle.margin);
console.log(computedStyle.cursor);
console.log(computedStyle.transition);

// className example: property of an element that gets and sets the value of the class attribute
let div = document.querySelector("#exampleDiv");
console.log(div.className); // output: example-class
div.className = "new-class";
console.log(div.className); // output: new-class

// We will learbn about classList property of an element that provides methods to add, remove, and toggle CSS classes.
let formElement = document.getElementById('exampleForm');
// check the initial class list of the form element
console.log(`Initial class list of form element: ${formElement.classList}`);
console.log(`Type of class list of form element: ${typeof formElement.classList}`);

// add new class to the form element
formElement.classList.add('new-class');
console.log(`Class list of form element after adding new class: ${formElement.classList}`);

// add one more new class to the form element
formElement.classList.add('another-class');
console.log(`Class list of form element after adding another new class: ${formElement.classList}`);

// remove a class from the form element
formElement.classList.remove('new-class');
console.log(`Class list of form element after removing new class: ${formElement.classList}`);

// contains method: checks if the form element contains a specific class
console.log(`Does the form element contain 'another-class'? ${formElement.classList.contains('another-class')}`);
console.log(`Does the form element contain 'new-class'? ${formElement.classList.contains('new-class')}`);

// Use the toggle() method to toggle a class: if the class exists, it will be removed; if it doesn't exist, it will be added.
formElement.classList.toggle('another-class');
console.log(`Class list of form element after toggling 'another-class': ${formElement.classList}`);
formElement.classList.toggle('new-class');
console.log(`Class list of form element after toggling 'new-class': ${formElement.classList}`);

// Very Important: Get height and width of the form element along with its padding, border, and margin
// To get the element’s width and height including the padding and border, you use the offsetWidth and offsetHeight properties of the element formElement.

// offsetWidth and offsetHeight include the element's padding and border, but not the margin.
console.log(`Offset width of form element: ${formElement.offsetWidth}`);
console.log(`Offset height of form element: ${formElement.offsetHeight}`);

// To get the element’s width and height that include padding but without the border, you use the clientWidth and clientHeight properties

console.log(`Client width of form element: ${formElement.clientWidth}`);
console.log(`Client height of form element: ${formElement.clientHeight}`);

// To get the margin of an element, you use the getComputedStyle() method

computedStyle = getComputedStyle(formElement);
console.log(`Margin of form element (top): ${computedStyle.marginTop}`);
console.log(`Margin of form element (right): ${computedStyle.marginRight}`);
console.log(`Margin of form element (bottom): ${computedStyle.marginBottom}`);
console.log(`Margin of form element (left): ${computedStyle.marginLeft}`);


