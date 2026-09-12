// Loops and arrays: In this section, we will explore how to use loops to iterate over arrays and perform various operations on their elements.

// declare arrays

let arr = new Array();
let arr1 = [];

console.log(typeof arr);
console.log(typeof arr1);
console.log(Array.isArray(arr));
console.log(Array.isArray(arr1));

// declare and initialize arrays
let arr2 = [1, 2, 3];
let arr3 = ['a', 'b', 'c'];

// iterate over arrays manually
console.log(`the first element of arr2 is ${arr2[0]}`);

console.log(`the second element of arr2 is ${arr2[1]}`);
console.log(`the second element of arr3 is ${arr3[1]}`);

console.log(`the last element of the arr2 is ${arr2.at(-1)}`);
console.log(`the last element of the arr3 is ${arr3.at(-1)}`);

// forcefit array values by index
arr2[0] = 10;
arr3[1] = 'z';

console.log(`the first element of arr2 after forcefit is ${arr2[0]}`);
console.log(`the second element of arr3 after forcefit is ${arr3[1]}`);

// check length
console.log(`the length of arr2 is ${arr2.length}`);
console.log(`the length of arr3 is ${arr3.length}`);

// any type of value can be stored in an array
let arrN = ['Apple', { name: 'John' }, true, function () { alert('hello'); }];
console.log(`the elements of arrN are: ${arrN}`);
console.log(`the type of each element in arrN are: ${arrN.map(element => typeof element)}`);

// main methods which makes an array as queue or stack
// queue - First In First Out (FIFO) behavior (line of people waiting)
// stack - Last In First Out (LIFO) behavior (stack of plates in a wedding)

// pop - removes the last element from an array and return , First In Last Out (FILO) behavior
let arrNW = [1, 2, 3];

// pop - removes the last element from an array and returns it, First In Last Out (FILO) behavior
console.log(`before pop, arrStack: ${arrNW}`);
let poppedElement = arrNW.pop();
console.log(`popped element from arrQueue: ${poppedElement}`);
console.log(`after pop, arrNW: ${arrNW}`);

// shift - removes the first element from an array and returns it, First In First Out (FIFO) behavior
console.log(`before shift, arrNW: ${arrNW}`);
let shiftedElement = arrNW.shift();
console.log(`shifted element from arrNW: ${shiftedElement}`);
console.log(`after shift, arrNW: ${arrNW}`);


//  push and unshift
// push - adds one or more elements to the end of an array and returns the new length
// unshift - adds one or more elements to the beginning of an array and returns the new length

let arrPU = ["A", "B", "C"];
console.log(`before push, arrPU: ${arrPU}`);
let newLengthAfterPush = arrPU.push("D");
console.log(`after push, arrPU: ${arrPU}, new length: ${newLengthAfterPush}`);

console.log(`before unshift, arrPU: ${arrPU}`);
let newLengthAfterUnshift = arrPU.unshift("Z");
console.log(`after unshift, arrPU: ${arrPU}, new length: ${newLengthAfterUnshift}`);

// together for your testing
let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
console.log(`fruits after push and unshift: ${fruits}`);

// diff b/w length method and size of an array using Set
console.log(`length of fruits array: ${fruits.length}`);
console.log(`size of fruits array using Set: ${new Set(fruits).size}`);

// Use of loops different ways to iterate over arrays

// traditonal way

for (let i = 0; i < fruits.length; i++) {
    console.log(`fruits[${i}]: ${fruits[i]}`);
}

// latest way
for (var_ in fruits) {
    console.log(`fruits[${var_}]: ${fruits[var_]}`);
}

//  multi-dimensional arrays
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
        console.log(`matrix[${i}][${j}]: ${matrix[i][j]}`);
    }
}

// Never compare 2 arrays using == or ===, because it will compare references, not the content of the arrays
// Instead, you can compare arrays using a loop or by converting them to strings or using JSON.stringify
arr1 = [1, 2, 3];
arr2 = [1, 2, 3];

console.log(`arr1 and arr2 are equal using ==: ${arr1 == arr2}`);
console.log(`arr1 and arr2 are equal using ===: ${arr1 === arr2}`);

// Using JSON.stringify
console.log(`arr1 and arr2 are equal: ${JSON.stringify(arr1) === JSON.stringify(arr2)}`);

/*
Let’s try 5 array operations.

Create an array styles with items “Jazz” and “Blues”.
Append “Rock-n-Roll” to the end.
Replace the value in the middle with “Classics”. Your code for finding the middle value should work for any arrays with odd length.
Strip off the first value of the array and show it.
Prepend Rap and Reggae to the array.
*/


let newArr = ["Jazz", "Blues"];
// Append "Rock-n-Roll" to the end of the array
newArr.push("Rock-n-Roll");
console.log(`newArr after push: ${newArr}`);

// Replace the value in the middle with "Classics"
let mid_index = Math.floor(newArr.length / 2);
newArr[mid_index] = "Classics";
console.log(`newArr after replacing middle value: ${newArr}`);

// Strip off the first value of the array and show it
newArr.shift();
console.log(`newArr after shifting the first value: ${newArr}`);

// Prepend Rap and Reggae to the array
newArr.unshift("Rap", "Reggae");
console.log(`newArr after unshifting Rap and Reggae: ${newArr}`);
