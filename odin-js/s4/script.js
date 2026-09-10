//  in this script we will practice about functions from the odin course

const myNumber = Math.random()
console.log(`My random number is: ${myNumber}`)


function myRandom(number = 1) {
    result = Math.random() * number;
    return result;
}

console.log(`My random number with default value is: ${myRandom()}`)
console.log(`My random number multiplied by 10 is: ${myRandom(10)}`)

//  anonymous function and arrow function examples

//  anonymous function : The way to define a function without a name and assign it to a variable
let myAnonymousFunction = function (number) {
    return Math.random() * number;
};

console.log(`My random number using anonymous function is: ${myAnonymousFunction(10)}`)

//  arrow function : A shorter syntax to define a function using the "=>" notation
let myArrowFunction = (number) => Math.random() * number;
console.log(`My random number using arrow function is: ${myArrowFunction(10)}`)

// Teaching how to write a recursive function to calculate factorial and also handle edge cases like negative numbers using error handling
function factorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    }
    else if (num < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    return num * factorial(num - 1);
}

console.log(`Factorial of 5 is: ${factorial(5)}`)
console.log(`Factorial of 0 is: ${factorial(0)}`)
console.log(`Factorial of 1 is: ${factorial(1)}`)
console.log(`Factorial of -1 is: ${factorial(-1)}`)
