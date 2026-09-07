//  basic maths operations

let a = 10;
a = -a
console.log(a); // Output: -10

a += 5;
console.log(a); // Output: -5

// reminder operator  and exponentiation operator

let b = 10;
b %= 3;
console.log(b); // Output: 1

let c = 2;
c **= 3;
console.log(c); // Output: 8

// string concatenation operator

let str1 = "Hello";
let str2 = "World";
let result = str1 + " " + str2;
console.log(result); // Output: Hello World

console.log("If we start with string and add n numbers, the result will be a string:", "Hello" + 5 + 10); // Output: Hello510
console.log("if we start with number and add n strings, the result will be a string:", 5 + 10 + "Hello"); // Output: 15Hello

// Assignment

let x = 2 * 3 + 2;
console.log(x); // Output: 8

x *= 2;
console.log(x); // Output: 16

x /= 4;
console.log(x); // Output: 4

x -= 1;
console.log(x); // Output: 3

// Chaining assignment operators

let l, k, m;
l = k = m = 10;
console.log(l, k, m); // Output: 10 10 10

// Modify-in-place

let p = 5;
p += 3; // equivalent to p = p + 3
console.log(p); // Output: 8

p *= 2; // equivalent to p = p * 2
console.log(p); // Output: 16

p -= 4; // equivalent to p = p - 4
console.log(p); // Output: 12

p /= 3; // equivalent to p = p / 3
console.log(p); // Output: 4

// Increment/decrement
/*
The operators ++ and -- can be placed either before or after a variable.

When the operator goes after the variable, it is in “postfix form”: counter++.
The “prefix form” is when the operator goes before the variable: ++counter.
Both of these statements do the same thing: increase counter by 1.

Is there any difference? Yes, but we can only see it if we use the returned value of ++/--.

Let’s clarify. As we know, all operators return a value. Increment/decrement is no exception. The prefix form returns the new value while the postfix form returns the old value (prior to increment/decrement).

The difference is visible only when the returned value is used. For example, in alert(++counter) the counter is incremented first and then the new value is returned and shown. In alert(counter++) the old value of counter is returned first and then it is incremented.

So in postfix form, the increment happens after the value is returned, while in prefix form, the increment happens before the value is returned i.e on the fly. This is the only difference between them.
*/

let counter = 5;

console.log(counter++); // Output: 5 (postfix form, returns old value)
console.log(counter);   // Output: 6 (counter is now incremented)

let counter2 = 5;
console.log(++counter2); // Output: 6 (prefix form, returns new value)
console.log(counter2);   // Output: 6 (counter2 is now incremented)

// Comparisons
let res = 5 > 3; // true
console.log(res); // Output: true

res = "apple" < "banana"; // true (lexicographical comparison)
console.log(res); // Output: true

// funny consequence of type coercion in comparisons

let num1 = 0
console.log(Boolean(num1) == false); // Output: true (0 is falsy)

let num2 = "0"
console.log(Boolean(num2) == true); // Output: true ("0" is truthy)

//  An equality check converts values using the numeric conversion (hence "0" becomes 0)
console.log(num1 == num2); // Output: true (loose equality, type coercion)

// strict equality check does not perform type conversion
console.log(0 == false); // Output: true (loose equality, type coercion)
console.log(0 == ""); // Output: true (loose equality, type coercion)

console.log(0 === false); // Output: false (strict equality, no type coercion)
console.log(0 === ""); // Output: false (strict equality, no type coercion)

//  null and undefined

console.log(null == undefined); // Output: true (loose equality, type coercion)
console.log(null === undefined); // Output: false (strict equality, no type coercion)

// Why is null > 0 false, but null >= 0 true? The reason is that the greater/less comparison converts null to a number, treating it as 0. So null > 0 becomes 0 > 0, which is false. However, null >= 0 becomes 0 >= 0, which is true.
// == works differently. It does not convert null to a number, so null == 0 is false.
console.log(null > 0); // Output: false (null is converted to 0, so 0 > 0 is false)
console.log(null >= 0); // Output: true (null is converted to 0, so 0 >= 0 is true)
console.log(null == 0); // Output: false (strict equality, no type coercion)

//  Numeric conversion of undefined results in NaN, which is not equal to any number, including 0. Therefore, undefined > 0, undefined < 0, and undefined == 0 all evaluate to false.
console.log(undefined > 0); // false (1)
console.log(undefined < 0); // false (2)
console.log(undefined == 0); // false (3)
