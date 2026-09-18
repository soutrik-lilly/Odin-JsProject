// more example usage of appendChild() method
// In general it is select some parent element and then append new child elements to it using appendChild() method

function createMenuItem(name) {
    let li = document.createElement('li');
    li.textContent = name;
    return li;
}
// get the ul#menu
const menu = document.querySelector('#myList');
// add menu item
menu.appendChild(createMenuItem('Home'));
menu.appendChild(createMenuItem('Services'));
menu.appendChild(createMenuItem('About Us'));

// textContent vs. innerText : textContent gets the content of all elements, including <script> and <style> elements, while innerText only shows "human-readable" elements.

const exampleDiv = document.createElement('div');
exampleDiv.innerHTML = '<p>This is a paragraph.</p><script>console.log("Hello World")</script>';
mainElement = document.querySelector('main');
mainElement.appendChild(exampleDiv);

console.log('textContent:', exampleDiv.textContent);
console.log('innerText:', exampleDiv.innerText);

// we can set text of any selected or new element using textContent or innerText
exampleDiv.textContent = 'This is the new text content.';
console.log('Updated textContent:', exampleDiv.textContent);
console.log('Updated innerText:', exampleDiv.innerText);

/*

is it accurate : that you create a new element and add it once to the dom and can keep modifying it afterwards without needing to re-add it?
Yes, once an element is appended to the DOM, you can continue to modify its properties, attributes, and content, and the changes will be reflected in the DOM immediately

*/
