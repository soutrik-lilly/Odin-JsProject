// Sum of tripple even numbers in an array using filter,map and reduce

// What is sum of tripple even numbers? It is the sum of all even numbers in an array after tripling each of them.

// Example:
// Input: [1, 2, 3, 4, 5]
// Even numbers: [2, 4]
// Tripled: [6, 12]
// Sum: 18

let numbersArray = [1, 2, 3, 4, 5];

let filterArray = numbersArray.filter(num => num % 2 === 0);
console.log(`filtered array (even numbers): ${JSON.stringify(filterArray)}`);

let tripledArray = filterArray.map(num => num * 3);
console.log(`tripled array: ${JSON.stringify(tripledArray)}`);

let sumOfTripledEvens = tripledArray.reduce((acc, curr) => acc + curr, 0);
console.log(`sum of tripled even numbers: ${sumOfTripledEvens}`);


// we can chain filter, map and reduce in a single statement
let sumOfTripledEvensChained = numbersArray
    .filter(num => num % 2 === 0)
    .map(num => num * 3)
    .reduce((acc, curr) => acc + curr, 0);
console.log(`sum of tripled even numbers (chained): ${sumOfTripledEvensChained}`);
