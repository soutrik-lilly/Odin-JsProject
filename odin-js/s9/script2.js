// We will discuss about different methods of DOM manipulation in this script.

/*
To set the value of an attribute on a specified element, you use the setAttribute() method:

element.setAttribute(name, value);
Parameters
The name specifies the attribute name whose value is set. It’s automatically converted to lowercase if you call the setAttribute() on an HTML element.

The value specifies the value to assign to the attribute. It’s automatically converted to a string if you pass a non-string value to the method.
*/
let btnSend = document.querySelector('#btnSend');
console.log(btnSend);
if (btnSend) {
    btnSend.setAttribute('name', 'sendButton');
    btnSend.setAttribute('type', 'button');
}

//  loop over each attribute with name and value
if (btnSend) {
    for (let attr of btnSend.attributes) {
        console.log(`Attribute name: ${attr.name}, Attribute value: ${attr.value}`);
    }
}

/*
To get the value of an attribute on a specified element, you call the getAttribute() method of the element:

let value = element.getAttribute(name);

*/

let hrefElem = document.getElementById('exampleLink');
if (hrefElem) {
    let hrefValue = hrefElem.getAttribute('href');
    console.log(`Href attribute value: ${hrefValue}`);
}

/*
The removeAttribute() method removes an attribute with a specified name from an element:

element.removeAttribute(name);

*/

// hasAttribute() method checks if an element has a specified attribute:

if (hrefElem) {
    console.log(`Has href attribute: ${hrefElem.hasAttribute('href')}`);
    console.log(`Has title attribute: ${hrefElem.hasAttribute('title')}`);
}
