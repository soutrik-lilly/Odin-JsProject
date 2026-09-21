// Event Bubbling : When an event occurs on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors. for example, if you click the button inside a div, the click event will first trigger on the button, then on the div, tenn to body then to html and finally to document.

// Event Capturing : The event first runs the handlers on the outermost element and then on its descendants, opposite of event bubbling. For example, if you click the button inside a div, the click event will first trigger on the document, then on html, then on body, then on the div, and finally on the button.

/*
For example, if you click a a button inside a dive inside the body:

document → html → body → div → button → div → body → html → document
Capturing phase: document → html → body → div → button
Target phase: button
Bubbling phase: button → div → body → html → document
This model allows you to:

Catch the event early during capturing.
React to the event late during bubbling.
Stop it in either phase using methods like stopPropagation().
*/


let btn = document.getElementById('btn');

btn.addEventListener('click', function () {
    console.log('Button was clicked');
    alert('Button was clicked!');
});

let exampleForm = document.getElementById('exampleForm');
exampleForm.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('Form submission prevented');
    alert('Form submission prevented!');
});

// using arrow function
// btn.addEventListener('click', () => {
//     alert('Button was clicked using arrow function!');
// });




//  preventDefault() : This method can be used to prevent the default action associated with an event. For example, preventing a form submission or a link navigation.
