/* In this code we will discuss about data-types and how to use them in JavaScript. Data types are an important concept in programming as they define the type of data that can be stored and manipulated within a program.
JavaScript has several built-in data types, including:
1. Number: Represents numeric values, both integers and floating-point numbers.
2. String: Represents sequences of characters, used for text.
3. Boolean: Represents true or false values.
4. Object: Represents complex data structures that can hold multiple values and properties.
5. Array: A special type of object that holds a collection of values in an ordered list.
6. Null: Represents the intentional absence of any object value.
7. Undefined: Represents a variable that has been declared but has not yet been assigned a value.
8. Symbol: A unique and immutable primitive value used as an identifier for object properties.

In addition to these built-in data types, JavaScript also allows for the creation of custom data types through the use of classes and functions.
*/

// use of typeof operator to check data types
let num = 42;
console.log(typeof num); // Output: "number"

let str = "Hello, World!";
console.log(typeof str); // Output: "string"

let bool = true;
console.log(typeof bool); // Output: "boolean"

let obj = { name: "John", age: 30 };
console.log(typeof obj); // Output: "object"

let arr = [1, 2, 3, 4, 5];
console.log(typeof arr); // Output: "object" (arrays are a type of object)

let n = null;
console.log(typeof n); // Output: "object" (this is a known quirk in JavaScript)

let u;
console.log(typeof u); // Output: "undefined"

let sym = Symbol("unique");
console.log(typeof sym); // Output: "symbol"

let var1 = NaN;
console.log(typeof var1); // Output: "number" (NaN is considered a number in JavaScript)

// alert(NaN + 1); // NaN

/*
In JavaScript, there are 3 types of quotes.

Double quotes: "Hello".
Single quotes: 'Hello'.
Backticks: `Hello`.
Double and single quotes are “simple” quotes. There’s practically no difference between them in JavaScript.

Backticks are “extended functionality” quotes. They allow us to embed variables and expressions into a string by wrapping them in ${…}
without `` the entire string would be treated as a literal string and the variable or expression would not be evaluated. This is known as string interpolation.
*/

let name = "John";
let greeting1 = 'Hello, ' + name + "!"; // Using single quotes with concatenation
let greeting2 = "Hello, " + name + "!"; // Using double quotes with concatenation
let secondGreeting = `Hello, ${name}!`; // Using backticks with template literals
let thirdGreeting = "the result is ${1 + 2}";

console.log(greeting1); // Output: Hello, John!
console.log(greeting2); // Output: Hello, John!
console.log(secondGreeting); // Output: Hello, John!
console.log(thirdGreeting); // Output: the result is 3

// boolean data type
let isJavaScriptFun = true;
let isCodingHard = false;

console.log(isJavaScriptFun); // Output: true
console.log(isCodingHard); // Output: false

//null - in js null is just a value that represents the absence of any object value. It is one of JavaScript's primitive values and is treated as falsy for boolean operations.

let age = null;
console.log(age); // Output: null
console.log(typeof age); // Output: "object" (this is a known quirk in JavaScript)

//undefined - in js undefined is a primitive value automatically assigned to variables that have just been declared, or to formal arguments for which there are no actual arguments.

let x;
console.log(x); // Output: undefined
console.log(typeof x); // Output: "undefined"

x = 5;
console.log(x);
typeof x; // Output: "number"

x = 'undefined';
console.log(x); // Output: "undefined"
console.log(typeof x); // Output: "string"

// type of is same as typeof operator. It is used to determine the type of a variable or an expression. It returns a string indicating the type of the operand.
console.log(typeof x); // Output: "string"
console.log(typeof (x)); // Output: "string"
