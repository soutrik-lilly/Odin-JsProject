// set innerHTML of an element: Set html markup inside the element
const mainElement = document.querySelector('main');
console.log(`Current innerHTML of main element: ${mainElement.innerHTML}`);
mainElement.innerHTML = '<p>This content was set using innerHTML.</p>';
console.log(`Updated innerHTML of main element: ${mainElement.innerHTML}`);

let newDiv = document.createElement('div');
newDiv.innerHTML = '<p>This is a new div added to the main element.</p>';
mainElement.appendChild(newDiv);
console.log(`Updated innerHTML of main element after adding new div: ${mainElement.innerHTML}`);

//  add to existing content using innerHTML
mainElement.innerHTML += '<p>This content was added to the existing content using innerHTML.</p>';
console.log(`Updated innerHTML of main element after adding more content: ${mainElement.innerHTML}`);


// innerHTML vs CreateElement

// Using innerHTML replaces the entire content of the element, while createElement allows you to add new elements without affecting existing content.
// Example:
// mainElement.innerHTML = '<p>New content</p>'; // Replaces all existing content
// let anotherDiv = document.createElement('div');
// anotherDiv.innerHTML = '<p>Additional content</p>';
// mainElement.appendChild(anotherDiv); // Adds new content without removing existing content

// Conclusion:
// Use innerHTML when you need to quickly set or update the entire content of an element.
// Use createElement and appendChild when you want to add new elements without affecting existing content.

//  Document Fragment
// A Document Fragment is a lightweight container for DOM nodes. It allows you to build a DOM structure off-screen and then append it to the document, which can improve performance.A document fragment does not link to the active DOM tree, therefore, it doesn’t incur any performance. Unless you append it to the DOM, it remains in memory and does not affect the live document.

let div = document.querySelector('main');

// compose DOM nodes
let fragment = document.createDocumentFragment();
for (let i = 0; i < 10; i++) {
    let p = document.createElement('p');
    p.textContent = `Paragraph ${i}`;
    fragment.appendChild(p);
}

// append the fragment to the DOM tree
div.appendChild(fragment);
