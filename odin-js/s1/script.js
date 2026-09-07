// basic variable declaration and usage
let firstname = "john";
let lastname = "doe";

console.log("Hello, " + firstname + " " + lastname + "!");

let age = 30;
console.log("You are " + age + " years old.");

age += 1;
console.log("Next year, you will be " + age + " years old.");

// use of constant variable
const birthYear = 1990;
console.log("You were born after " + birthYear + ".");
// birthYear = 1991; // This will throw an error because birthYear is a constant

// f string interpolation
console.log(`Hello, ${firstname} ${lastname}! You are ${age} years old must be born only after year ${birthYear}.`);

// Number operations using PEMDAS and BODMAS

console.log("Addition of 2 numbers: " + (5 + 3)); // 8
console.log("Subtraction of 2 numbers: " + (10 - 4)); // 6
console.log("Multiplication of 2 numbers: " + (7 * 3)); // 21
console.log("Division of 2 numbers: " + (20 / 5)); // 4
console.log("Modulus of 2 numbers: " + (10 % 3)); // 1

let a = 10;
let b = 5;

result = (a + b) * 2; // 10 + (5 * 2) = 10 + 10 = 20
console.log(`the value of a is ${a} and the value of b is ${b}`);
console.log("Result of (a + b) * 2: " + result);

// working with constants
const var1 = 112
const var2 = 12
const var3 = var1 + var2

console.log(`the value of var1 is ${var1} and the value of var2 is ${var2}`);
console.log(`the value of var3 is ${var3}`);

// working with let variables(obsolete way to declare variables)
let var4 = 112
let var5 = 12
let var6 = var4 + var5

console.log(`the value of var4 is ${var4} and the value of var5 is ${var5}`);
console.log(`the value of var6 is ${var6}`);
