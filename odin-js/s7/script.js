// Select the h1 element and log its content, then change its text content.
const h1 = document.querySelector("h1");
console.log(h1);
console.log(h1.textContent);

h1.textContent = "Hello DOM!!!!";

// selection by id and check type and all attributes and content
//  diff between querySelector and getElementById
//  querySelector returns the first element that matches the CSS selector
//  getElementById returns the element with the specified id

const p1C = document.querySelector("#demo");
console.log(`p1C: ${p1C}`);
console.log(`p1C.textContent: ${p1C.textContent}`);
console.log(`p1C.nodeType: ${p1C.nodeType}`);
console.log(`p1C.attributes: ${p1C.attributes}`);
console.log(`p1C.outerHTML: ${p1C.outerHTML}`);
console.log(`p1C.innerHTML: ${p1C.innerHTML}`);
console.log(`p1C.tagName: ${p1C.tagName}`);
console.log(`p1C.id: ${p1C.id}`);
console.log(`p1C.className: ${p1C.className}`);
console.log(`p1C.style: ${p1C.style}`);
console.log(`p1C.dataset: ${p1C.dataset}`);


const p1E = document.getElementById("demo");
console.log(`p1E: ${p1E}`);
console.log(`p1E.textContent: ${p1E.textContent}`);
console.log(`p1E.nodeType: ${p1E.nodeType}`);
console.log(`p1E.attributes: ${p1E.attributes}`);
console.log(`p1E.outerHTML: ${p1E.outerHTML}`);
console.log(`p1E.innerHTML: ${p1E.innerHTML}`);
console.log(`p1E.tagName: ${p1E.tagName}`);
console.log(`p1E.id: ${p1E.id}`);
console.log(`p1E.className: ${p1E.className}`);
console.log(`p1E.style: ${p1E.style}`);
console.log(`p1E.dataset: ${p1E.dataset}`);

// selection by name: Selection of elements by their name attribute especially useful for radio buttons and checkboxes
const ratings = document.getElementsByName("rate");
console.log(`ratings: ${ratings}`);
ratings.forEach(rating => {
    console.log(`rating.value: ${rating.value}`);
    console.log(`rating.checked: ${rating.checked}`);
    console.log(`rating.name: ${rating.name}`);
    console.log(`rating.type: ${rating.type}`);
});


// selection by tag name: Selection of elements by their tag name, returns an HTMLCollection of elements with the specified tag name. Tags like "p", "div", "span", "h1", etc. can be selected using this method.
let btn = document.getElementById("btnCount");
btn.addEventListener("click", () => {
    const h2Tags = document.getElementsByTagName("h2");
    console.log(`Count of h-tags: ${h2Tags.length}`);
    alert(`Count of h-tags: ${h2Tags.length}`);
});
