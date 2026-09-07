// condtional statements

const age = 18;

if (age >= 18) {
    console.log("You are eligible to vote.");
}
else {
    console.log("You are not eligible to vote.");
}

const salary = 50000;

// if else if else statement (mark the use of && and || operators)

if (salary > 40000 && salary < 45000) {
    console.log("You are eligible for a bonus.");
}
else if (salary >= 45000 && salary < 60000) {
    console.log("You are eligible for a lower bonus.");
}
else {
    console.log("You are not eligible for a bonus.");
}


// conditional assignment

let access_allowed
// const user_role = "admin";
// const user_role = "editor";
const user_role = "viewer";

if (user_role == "admin") {
    access_allowed = true;
    console.log("Access granted to admin.");
}
else if (user_role == "editor") {
    access_allowed = true;
    console.log("Access granted to editor.");
}
else {
    access_allowed = false;
    console.log("Access denied.Only admin and editor roles are allowed.");
}

//  Conditonal Operator ?
/* Conditional (ternary) operator is the only JavaScript operator that takes three operands: a condition followed by a question mark (?), then an expression to execute if the condition is truthy followed by a colon (:), and finally the expression to execute if the condition is falsy. */

const nw_age = 20;
let access = (nw_age >= 18) ? "Eligible to vote" : "Not eligible to vote";
console.log(access);

// Multiple ‘?’

const nw_salary = 55000;
let bonus = (nw_salary > 40000 && nw_salary < 45000) ? "Eligible for a bonus" :
    (nw_salary >= 45000 && nw_salary < 60000) ? "Eligible for a lower bonus" :
        "Not eligible for a bonus";
console.log(bonus);

// You can think of condition similar to if else then {} replaced with ? and : operators. The first condition is checked, if it is true then the first expression is executed otherwise the second expression is executed. If there are multiple conditions then the second expression can be another condition followed by ? and : operators.

//  Logical Operators
// There are four logical operators in JavaScript: || (OR), && (AND), ! (NOT), ?? (Nullish Coalescing)

// OR operator (||) returns true if either of the operands is true. If both operands are false, it returns false.

const isWeekend = true;
const isHoliday = false;

if (isWeekend || isHoliday) {
    console.log("You can relax today.");
}
else {
    console.log("You have to work today.");
}
// Getting the first truthy value from a list of variables or expressions and returning it. If all values are falsy, it returns the last value.
let varA = 0 || 1; // true
console.log(varA); // Output: 1

let varB = 0 || 0; // false
console.log(varB); // Output: 0

let varC = 1 || 2; // true
console.log(varC); // Output: 1

let varD = 0 || 2 || 3; // true
console.log(varD); // Output: 2

// AND operator (&&) returns true if both operands are true. If either operand is false, it returns false.

const hasTicket = true;
const hasID = true;

if (hasTicket && hasID) {
    console.log("You can enter the concert.");
}
else {
    console.log("You cannot enter the concert.");
}
//  getting the first falsy value from a list of variables or expressions and returning it. If all values are truthy, it returns the last value.
let var1 = 1 && 0; // false
console.log(var1); // Output: 0

let var2 = 1 && 2; // true
console.log(var2); // Output: 2

let var3 = 1 && 2 && 0; // false
console.log(var3); // Output: 0

let var4 = 1 && 2 && 3; // true
console.log(var4); // Output: 3

// important case - AND get highest precedence than OR operator. So, it is evaluated first before OR operator.
console.log(null || 2 && 3 || 4); // Output: 3

// Nullish coalescing operator '??' - ?? returns the first argument if it’s not null/undefined. Otherwise, the second one.
a = "jam"
// normal way
result = (a !== null && a !== undefined) ? a : "default value";
console.log(result); // Output: jam
// using nullish coalescing operator
result = a ?? "default value";
console.log(result); // Output: jam
//  classic scenario of using nullish coalescing operator is to provide default values for function parameters.
let user
console.log(user ?? "User is not defined"); // Output: User is not defineds

let user1 = "JJ"
console.log(user1 ?? "User is not defined"); // Output: JJ

// chain of nullish coalescing operator
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first defined value:
console.log(firstName ?? lastName ?? nickName ?? "Anonymous"); // Output: Supercoder

// diff b/w || and ?? operators
// The main difference between the || and ?? operators is how they handle falsy values. The || operator considers all falsy values (false, 0, "", null, undefined, NaN) as false, while the ?? operator only considers null and undefined as false. This means that if you use the || operator with a falsy value like 0 or "", it will return the second operand, while the ?? operator will return the first operand.

let x = 0;
let y = "default";

console.log(x || y); // Output: "default" (because 0 is falsy)
console.log(x ?? y); // Output: 0 (because 0 is not null or undefined)

let z = "";
console.log(z || y); // Output: "default" (because "" is falsy)
console.log(z ?? y); // Output: "" (because "" is not null or undefined)

// some more examples of nullish coalescing operator
let height = null;
let width = null;

// important: use parentheses
let area = (height ?? 100) * (width ?? 50);

console.log(area); // Output: 5000

// Due to safety reasons, JavaScript forbids using ?? together with && and || operators, unless the precedence is explicitly specified with parentheses
