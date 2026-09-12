//  Array Methods in details ( other than push, pop, shift, unshift)

// Json Stringify: converts a JavaScript object or value to a JSON string. Without using JSON.stringify, objects and arrays are converted to strings in a less readable format. Without the output looks like [object Object] for objects and comma-separated values for arrays.

// splice: changes the contents of an array by removing or replacing existing elements and/or adding new elements in place

//  the args can be understood as follows: from index i delete deleteCount elements and insert any additional elements provided

let arr = ["A", "B", "C", "D", "E"];
console.log(`arr before splice: ${arr}`);
// remove 2 elements starting from index 0
arr.splice(0, 2);
console.log(`arr after splice: ${arr}`);

// splice can also be used to replace elements in an array

arr = ["I", "study", "JavaScript", "right", "now"];
console.log(`arr before splice: ${arr}`);
// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", "dance");
console.log(`arr after splice: ${arr}`);

// remove elements from an array and store them in a variable
arr = ["I", "study", "JavaScript", "right", "now"];
// remove 2 first elements
let removed = arr.splice(0, 2);
console.log(`arr after splice: ${arr}`);
console.log(`removed elements: ${removed}`);

// The splice method is also able to insert the elements without any removals. For that, we need to set deleteCount to 0

arr = ["This", "is", "a", "test"];
console.log(`arr before splice: ${arr}`);
// insert elements at index 2 without removing any elements
arr.splice(2, 0, "simple", "example");
console.log(`arr after splice: ${arr}`);

//  so it says from index 2 delete 0 elements and insert "simple" and "example"

arr = [1, 2, 5];
console.log(`arr before splice: ${arr}`);
// from index -1 (one step from the end)
// delete 0 elements,
// then insert 3 and 4
arr.splice(-1, 0, 3, 4);
console.log(`arr after splice: ${arr}`);

// slice: returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) without modifying the original array.

arr = ["I", "study", "JavaScript", "right", "now"];

console.log(`slice the array from index 0 to 3: ${arr.slice(0, 3)}`);
console.log(`slice the array from index 2 to the end: ${arr.slice(2)}`);
console.log(`slice the array from index -3 to -1: ${arr.slice(-3, -1)}`);
console.log(`slice the array from index -2 to the end: ${arr.slice(-2)}`);


// concat: merges two or more arrays into a new array without modifying the original arrays.

arr = ["I", "study"];
let arr2 = ["JavaScript", "right", "now"];
console.log(`arr before concat: ${arr}`);
console.log(`arr2 before concat: ${arr2}`);
let merged = arr.concat(arr2);
console.log(`merged array: ${merged}`);

//  complete examples of using concat method
arr = [1, 2];
console.log(`arr before concat: ${arr}`);
// create an array from: arr and [3,4]
console.log(`create an array from: arr and [3,4]: ${arr.concat([3, 4])}`);

// create an array from: arr and [3,4] and [5,6]
console.log(`create an array from: arr and [3,4] and [5,6]: ${arr.concat([3, 4], [5, 6])}`);

// create an array from: arr and [3,4], then add values 5 and 6
console.log(`create an array from: arr and [3,4], then add values 5 and 6: ${arr.concat([3, 4], 5, 6)}`);

// Iterate: forEach
// The arr.forEach method allows to run a function for every element of the array.

arr = ["I", "study", "JavaScript"];
let randApply = function (item, index, array) {
    console.log(`Element at index ${index} is ${item} in array ${array}`);
};
arr.forEach(randApply);


/*
indexOf/lastIndexOf and includes
The methods arr.indexOf and arr.includes have the similar syntax and do essentially the same as their string counterparts, but operate on items instead of characters:

arr.indexOf(item, from) – looks for item starting from index from, and returns the index where it was found, otherwise -1.
arr.includes(item, from) – looks for item starting from index from, returns true if found.
*/

arr = ["I", "study", "JavaScript", "right", "now"];
console.log(`index of "JavaScript": ${arr.indexOf("JavaScript")}`);
console.log(`index of "JavaScript" starting from index 3: ${arr.indexOf("JavaScript", 3)}`);
console.log(`last index of "JavaScript": ${arr.lastIndexOf("JavaScript")}`);
console.log(`includes "JavaScript": ${arr.includes("JavaScript")}`);
console.log(`includes "JavaScript" starting from index 3: ${arr.includes("JavaScript", 3)}`);

//  index of vs last index of: demonstrates the difference between finding the first and last occurrence of an item in the array.

arr = ["I", "study", "JavaScript", "right", "now", "JavaScript"];
console.log(`index of "JavaScript": ${arr.indexOf("JavaScript")}`);
console.log(`last index of "JavaScript": ${arr.lastIndexOf("JavaScript")}`);

//  indexOf vs includes with NaN: demonstrates that indexOf cannot find NaN, but includes can.
arr = [NaN];
console.log(arr.indexOf(NaN)); // -1 (wrong, should be 0)
console.log(arr.includes(NaN));// true (correct)


/* find and findIndex/findLastIndex
Imagine we have an array of objects. How do we find an object with a specific condition?
The arr.find method returns the value of the first element in the array that satisfies the provided testing function.
The arr.findIndex method returns the index of the first element in the array that satisfies the provided testing function, otherwise -1.
The arr.findLastIndex method returns the index of the last element in the array that satisfies the provided testing function, otherwise -1.
*/


arr = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Jack" },
    { id: 4, name: "John" }
]

//  lets find the object with id 3
let foundObj = arr.find(function (item) {
    return item.id === 3;
});
console.log(`the found object with id 3: ${JSON.stringify(foundObj)}`);

// lets find the index of first object with name "John"
let foundIndex = arr.findIndex(function (item) {
    return item.name === "John";
});
console.log(`index of first object with name "John": ${foundIndex}`);

// lets find the last index of object with name "John"
let foundLastIndex = arr.findLastIndex(function (item) {
    return item.name === "John";
});
console.log(`last index of object with name "John": ${foundLastIndex}`);

//  filter : returns an array of all elements that satisfy the provided testing function.

/*
let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});
*/


let users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Jack" },
    { id: 4, name: "John" }
];

// lets use arrow function to filter users with name "John"

let johnId = users.filter(user => user.name === "John");
console.log(`users with name "John": ${JSON.stringify(johnId)}`);


// map: Transforms each element of the array according to the provided function and returns a new array.
/*
let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
});
*/

salaryArray = [50000, 60000, 70000, 80000]

// lets use map to calculate the annual salary assuming the array contains monthly salaries
let annualSalaryArray = salaryArray.map(salary => salary * 12);
console.log(`annual salaries: ${JSON.stringify(annualSalaryArray)}`);


// sort: Sorts the elements of an array in place and returns the sorted array.
// By default, it sorts elements as strings in ascending order.

let numbers = [4, 22, 5, 1, 3];
numbers.sort();
console.log(`sorted numbers (default): ${JSON.stringify(numbers)}`);

// For numerical sorting in ascending order
numbers.sort((a, b) => a - b);
console.log(`sorted numbers (ascending): ${JSON.stringify(numbers)}`);

// For numerical sorting in descending order
numbers.sort((a, b) => b - a);
console.log(`sorted numbers (descending): ${JSON.stringify(numbers)}`);

// localeCompare: Compares two strings in the current locale, useful for sorting strings with special characters.

let countries = ['Österreich', 'Andorra', 'Vietnam'];

console.log(`sorted countries (default): ${JSON.stringify(countries)}`);
console.log(`sorted countries (localeCompare): ${JSON.stringify(countries.sort((a, b) => a.localeCompare(b)))}`);


// reverse: Reverses the order of the elements in an array in place and returns the reversed array.

let reversedNumbers = numbers.reverse();
console.log(`numbers after reverse without json stringify: ${numbers}`);
console.log(`reversed numbers (with json stringify): ${JSON.stringify(reversedNumbers)}`);

// split : Splits a string into an array of substrings based on a specified separator.
let sentence = "The quick brown fox jumps over the lazy dog";
let words = sentence.split(" ");
console.log(`words: ${JSON.stringify(words)}`);

// split and keep only 3 words
let firstThreeWords = sentence.split(" ", 3);
console.log(`first three words: ${JSON.stringify(firstThreeWords)}`);

// join: Joins all elements of an array into a string, with an optional separator.Same as python ",".join(array)
arr = ["apple", "banana", "cherry"];
let joinedString = arr.join(", ");
console.log(`joined string: ${joinedString}`);

// join with different separator
let joinedStringWithDash = arr.join(" - ");
console.log(`joined string with dash: ${joinedStringWithDash}`);

// reduce: Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.

salaryArray = [3000, 4000, 5000];
let totalSalary = salaryArray.reduce((acc, curr) => acc + curr, 0);
console.log(`total salary: ${totalSalary}`);

// map and reduce : classic case of using map to transform the array and reduce to aggregate the results.
let numbersArray = [1, 2, 3, 4, 5];
let squaredSum = numbersArray.map(num => num * num).reduce((acc, curr) => acc + curr, 0);
console.log(`sum of squares: ${squaredSum}`);

//  flat and flatMap: flat creates a flat array from multi dimensional arrays, flatMap first maps each element using a mapping function, then flattens the result into a new array.
let nestedArray = [1, [2, 3], [4, [5, 6]]];
let flatArray = nestedArray.flat(2); // flatten up to 2 levels
console.log(`flat array: ${JSON.stringify(flatArray)}`);

let flatMappedArray = nestedArray.flatMap(x => Array.isArray(x) ? x : [x]);
console.log(`flat mapped array: ${JSON.stringify(flatMappedArray)}`);

// arr.some() and arr.every():
// some checks if at least one element in the array passes the test implemented by the provided function.
// every checks if all elements in the array pass the test implemented by the provided function.
let testArray = [1, -2, 3, 4, 5];
let hasEven = testArray.some(num => num % 2 === 0);
console.log(`array has even number: ${hasEven}`);
let allPositive = testArray.every(num => num > 0);
console.log(`all numbers are positive: ${allPositive}`);


/*
Why use Array.isArray is necessary?
Arrays do not form a separate language type. They are based on objects.

So typeof does not help to distinguish a plain object from an array:

alert(typeof {}); // object
alert(typeof []); // object (same)
…But arrays are used so often that there’s a special method for that: Array.isArray(value). It returns true if the value is an array, and false otherwise.

alert(Array.isArray({})); // false

alert(Array.isArray([])); // true

*/
