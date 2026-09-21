// event handler: A function that will execute to respond to that event, It is also known as an event listener. An event handler is attached to an element using methods like addEventListener().
// HTML event handler attribute : You can directly assign an event handler to an HTML element using attributes like onclick, onsubmit, etc. For example:
// <button onclick="alert('Button clicked!')">Click Me</button>
/*
Assigning event handlers using HTML event handler attributes is considered a bad practice and should be avoided as much as possible for the following reasons:
First, the event handler code is mixed with the HTML code, which will make the code more difficult to maintain and extend.
Second, it is a timing issue. If the element is loaded fully before the JavaScript code, users can start interacting with the element on the webpage which will cause an error.
Third, it is less flexible. Using HTML event handler attributes limits you to one event handler per event type per element, whereas addEventListener allows multiple handlers for the same event.
Fourth, it is harder to remove event handlers. With addEventListener, you can easily remove an event handler using removeEventListener, but with HTML attributes, you cannot.
In summary, it is generally better to use JavaScript to attach event handlers rather than using HTML event handler attributes.
*/

//  DOM-0 level event handling: This is the traditional way of assigning event handlers directly to DOM elements using properties like onclick, onmouseover, etc. For example:
//  <button id="myButton">Click Me</button>
//  <script>
//    var button = document.getElementById('myButton');
//    button.onclick = function() {
//      alert('Button clicked!');
//    };
//  </script>

// this keyword inside an event handler refers to the element that received the event. In this case, it refers to the button element with id 'btn'.
let btn = document.getElementById('btn');
btn.onclick = function () {
    console.log(`Button with id ${this.id} was clicked.`);
    alert(`Button clicked! for ${this.id}`);
};

// DOM Level 2 event handlers
/*
DOM Level 2 Event Handlers provide two main methods for dealing with the registering/deregistering event listeners:

addEventListener() – register an event handler.
removeEventListener() – remove an event handler.
These methods are available in all DOM nodes.
*/

// Example of using DOM Level 2 event handlers with addEventListener:
// The addEventListener() method accepts three arguments: an event name, an event handler function, and a Boolean value that instructs the method to call the event handler during the capture phase (true) or during the bubble phase (false)

//  we have a form with id 'exampleForm' and we want to attach a submit event listener to it.We want to capture the text and print in cosole and give out the alert like "You submitted: <input value>".

// Step-by-step guide:
// 1. Get a reference to the form element using document.getElementById('exampleForm').
// 2. Get a reference to the input field inside the form (assume it has id 'exampleInput').
// 3. Attach a 'submit' event listener to the form using addEventListener('submit', callback).
// 4. Inside the callback, accept the event object (commonly named 'e' or 'event').
// 5. Call event.preventDefault() to stop the form from actually submitting/reloading the page.
// 6. Read the value from the input field using inputField.value.
// 7. Print the value to the console using console.log().
// 8. Show an alert with the message "You submitted: <input value>".

let exampleForm = document.getElementById('exampleForm');
// Note: The HTML input inside #exampleForm currently has no id="exampleInput" attribute.
// Falling back to a query selector so the input is still found and the form works correctly.
let exampleInput = document.getElementById('exampleInput') || exampleForm.querySelector('input');

exampleForm.addEventListener('submit', function (event) {
    // Step 5: prevent default form submission behavior (page reload)
    event.preventDefault();

    // Step 6: capture the input value
    let submittedValue = exampleInput.value;

    // Step 7: print to console
    console.log(`You submitted: ${submittedValue}`);

    // Step 8: show alert
    alert(`You submitted: ${submittedValue}`);
});

//  how do we remove existing event listeners?
//  We can use the removeEventListener() method. It requires the same event name and the exact same callback function reference that was used with addEventListener.
//  Example:
//  function handleSubmit(event) {
//      event.preventDefault();
//      let submittedValue = exampleInput.value;
//      console.log(`You submitted: ${submittedValue}`);
//      alert(`You submitted: ${submittedValue}`);
//  }
//  exampleForm.addEventListener('submit', handleSubmit);
//  // To remove the event listener:
//  exampleForm.removeEventListener('submit', handleSubmit);
