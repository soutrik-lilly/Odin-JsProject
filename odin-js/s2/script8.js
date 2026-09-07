// function - allows code to be executed when called multiple times. It is a block of code designed to perform a particular task.
// A function is executed when "something" invokes it (calls it).

/*
function name(parameter1, parameter2, ... parameterN) {
 // body
}
*/

function greet() {
    console.log("Hello, welcome to the world of functions!");
}

greet(); // calling the function

// use of local variable and global variable
let globalVar = "I am a global variable";

function localScope() {
    let localVar = "I am a local variable";
    console.log(localVar); // Accessing local variable
    console.log(globalVar); // Accessing global variable
}

localScope();
// console.log(localVar); // This will throw an error because localVar is not accessible outside the function

//  args in function addNumbers(a, b)

function add_numbers(a, b) {
    console.log("The sum of " + a + " and " + b + " is: " + (a + b));
}


add_numbers(5, 10); // calling the function with arguments 5 and 10

function multiply_numbers(a = 10, b = 10) {
    console.log("The product of " + a + " and " + b + " is: " + (a * b));
}

multiply_numbers(); // calling the function without arguments, default values will be used

// function with return statement

function rand1(arg1, arg2) {
    return arg1 + arg2;
}

function rand2(arg1, arg2, arg3) {
    temp = rand1(arg1, arg2);
    return temp * arg3;
}

op = rand2(5, 10, 2);
console.log("The final result is: " + op); // Output: The final result is: 30

function check_age(age) {
    if (age < 18) {
        confirm("You are a minor, Do you want to continue?");
    } else {
        return "You are an adult.";
    }
}

let age = 18
let result = check_age(age);
if (result) {
    console.log(result); // Output: You are an adult.
}

function showMovie(age) {
    if (!check_age(age)) {
        console.log("Skipping any return value as the user is a minor.");
        return;
    }

    return "You can watch the movie as you are an adult.";
}

age = 20
result = showMovie(age);
if (result) {
    console.log(result); // Output: You can watch the movie.
}


// undefined return value - If a function does not explicitly return a value, it implicitly returns undefined. This means that if you call a function and do not use the return statement, the function will return undefined by default.


function doNothing() { /* empty */ }

console.log(doNothing() === undefined); // true


function doNothing() {
    return;
}

console.log(doNothing() === undefined); // true


//  prime number: a prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers. A prime number is only divisible by 1 and itself. The first few prime numbers are: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...
function isPrime(num) {
    for (i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
        return num > 1; // return true if num is greater than 1 and not divisible by any number less than itself
    }
}

console.log(`Is 7 prime? ${isPrime(7)}`); // Output: Is 7 prime? true
console.log(`Is 10 prime? ${isPrime(10)}`); // Output: Is 10 prime? false

//  Function Expressions: A function expression is a function that is assigned to a variable. Function expressions can be anonymous (without a name) or named. They are not hoisted, meaning they cannot be called before they are defined. It is similar to lambda functions in Python. Function expressions are often used as arguments to other functions or as immediately invoked function expressions (IIFE).
/*

let variableName = function (parameter1, parameter2, ... parameterN) {
    // body
}
*/

let greetExpression = function (name) {
    console.log(`Hello, ${name}! Welcome to the world of function expressions.`);
}

greetExpression("Alice"); // Output: Hello, Alice! Welcome to the world of function expressions.
// Callback functions
// Let’s look at more examples of passing functions as values and using function expressions.

// We’ll write a function ask(question, yes, no) with three parameters:

//  using standard function declaration
function ask(question, yes, no) {
    if (confirm(question)) yes();
    else no();
}

function showOk() {
    console.log("You agreed.");
}

function showCancel() {
    console.log("You canceled the execution.");
}

// usage: functions showOk, showCancel are passed as arguments to ask
// ask("Do you agree?", showOk, showCancel);

// using function expression

// ask("Do you agree?", function () { console.log("You agreed."); }, function () { console.log("You canceled the execution."); });

/*
Function Expression vs Function Declaration
Let’s formulate the key differences between Function Declarations and Expressions.

First, the syntax: how to differentiate between them in the code.

Function Declaration: a function, declared as a separate statement, in the main code flow:

// Function Declaration
function sum(a, b) {
  return a + b;
}
Function Expression: a function, created inside an expression or inside another syntax construct. Here, the function is created on the right side of the “assignment expression” =:

// Function Expression
let sum = function(a, b) {
  return a + b;
};
The more subtle difference is when a function is created by the JavaScript engine.

A Function Expression is created when the execution reaches it and is usable only from that moment.

Once the execution flow passes to the right side of the assignment let sum = function… – here we go, the function is created and can be used (assigned, called, etc. ) from now on.

Function Declarations are different.

A Function Declaration can be called earlier than it is defined.

For example, a global Function Declaration is visible in the whole script, no matter where it is.

That’s due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an “initialization stage”.

And after all Function Declarations are processed, the code is executed. So it has access to these functions.

* Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
* Function Expressions are created when the execution flow reaches them.

*/

// Arrow Functions: Arrow functions are a more concise syntax for writing function expressions. They are always anonymous and change the way this binds in functions. Arrow functions are often used for short, simple functions, especially as callbacks.

/*

let variableName = (parameter1, parameter2, ... parameterN) => {
    // body
}
*/
let sum = (a, b) => a + b; // concise body syntax

console.log(sum(5, 10)); // Output: 15

let double = (n) => n * 2; // single parameter, concise body syntax

console.log(double(5)); // Output: 10

let greetArrow = (name) => {
    console.log(`Hello, ${name}! Welcome to the world of arrow functions.`);
}

greetArrow("Bob"); // Output: Hello, Bob! Welcome to the world of arrow functions.

// no args arrow function
let sayHi = () => alert("Hello!");

sayHi();

// multiline arrow function: using curly braces and return statement for multiple lines of code
let safe_divide = (a, b) => {
    if (b === 0) {
        console.log("Error: Division by zero is not allowed.");
        return null; // or throw an error, depending on your use case
    }
    return a / b;
}

console.log(safe_divide(10, 2));

//  inline function calling using arrow function

function ask(question, yes, no) {
    if (confirm(question)) yes();
    else no();
}

ask(
    "Do you agree?",
    () => alert("You agreed."),
    () => alert("You canceled the execution.")
);
