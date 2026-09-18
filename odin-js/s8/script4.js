// before() and after() methods allow you to insert content relative to an element.
// before() inserts content before the element itself.
// after() inserts content after the element itself.

let para = document.getElementById('para');
const h2Tag = document.createElement('h3');
h2Tag.innerText = "This is a heading inserted before the paragraph.";
para.before(h2Tag);

// Using JavaScript before() to insert multiple nodes before an element

let mainList = document.getElementById('myList');
const libs = ['React', 'Vue', 'Angular'];
const listItems = libs.map((lib) => {
    const item = document.createElement('li');
    item.innerText = lib;
    return item;
});

// very important: use firstChild.before() to insert before the first list item
mainList.firstChild.before(...listItems);

// adding after the last list item
let libs2 = ['Svelte', 'Ember', 'Backbone'];
const listItemsAfter = libs2.map((lib) => {
    const item = document.createElement('li');
    item.innerText = lib;
    return item;
});
mainList.lastChild.after(...listItemsAfter);


//  application of before and after methods in DOM manipulation on button element

// Example: using before() and after() methods to insert elements relative to the button by inserting strings before and after clicking it and first child

let myButton = document.getElementById('myButton');
myButton.firstChild.before("Lovely ");
myButton.firstChild.after(" Beautiful");



// map and spread opertor few generic and holistic examples fro practice based on different scenarios and not related to DOM manipulation
// map: creates a new array by applying a function to each element of an existing array.
// spread operator (...): allows an iterable such as an array to be expanded in places where zero or more arguments or elements are expected.

// basic usage examples of map and spread operator

// Example: only use map to transform an array
const nums = [1, 2, 3, 4];
const doubled = nums.map(x => x * 2);
console.log(doubled); // Output: [2, 4, 6, 8]

// Example: using map and spread operator to create a new array with each element incremented by 1
const incremented = [...nums.map(x => x + 1)];
console.log(incremented); // Output: [2, 3, 4, 5]

// Example: using map and spread operator to create a new array from existing arrays
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinedArray = [...array1.map(x => x * 2), ...array2.map(x => x * 3)];
console.log(combinedArray); // Output: [2, 4, 6, 12, 15, 18]

// Example: using map and spread operator to filter and transform an array
const numbers = [1, 2, 3, 4, 5, 6];
const evenSquares = [...numbers.filter(x => x % 2 === 0).map(x => x * x)];
console.log(evenSquares); // Output: [4, 16, 36]

// Example: using map and spread operator to merge and transform multiple arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const mergedTransformed = [...arr1.map(x => x + 1), ...arr2.map(x => x + 2), ...arr3.map(x => x + 3)];
console.log(mergedTransformed); // Output: [2, 3, 5, 6, 8, 9]

// Example: using map and spread operator to flatten an array of arrays
const nestedArrays = [[1, 2], [3, 4], [5, 6]];
const flattened = [...nestedArrays.map(arr => arr.map(x => x * 2)).flat()];
console.log(flattened); // Output: [2, 4, 6, 8, 10, 12]

// Example: using map and spread operator to create a new array with unique values
const arrayWithDuplicates = [1, 2, 2, 3, 3, 3, 4];
const uniqueArray = [...new Set(arrayWithDuplicates.map(x => x))];
console.log(uniqueArray); // Output: [1, 2, 3, 4]
