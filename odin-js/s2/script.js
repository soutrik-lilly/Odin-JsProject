/*In most editors, a line of code can be commented out by pressing the Ctrl+/ hotkey
for a single-line comment and something like Ctrl+Shift+/ – for multiline comments
*/

// usage of alert() function - a javaScript function that displays an alert dialog box with a specified message and an OK button. It is commonly used for debugging purposes or to provide information to the user.
// alert("Hello World!");

// alert("This is an alert message!");
// alert("This is another alert message!");

/*semicolon is optional in JavaScript, if you are writing multiple statements
on a single line, you should use semicolons to separate them.
However, if you are writing each statement on a new line, you can omit the semicolon.
*/
// alert("This is an alert message!")
// alert("This is another alert message!")
code_path = "odin-js/s2/script.js"
alert(`the script.js file is loaded successfully! from the path ${code_path}`);

// different ways to declare a variable in JavaScript
let user = 'John', age = 25, message = 'Hello';
alert(`User: ${user}, Age: ${age}, Message: ${message}`);

let user1 = 'John',
    age1 = 25,
    message1 = 'Hello';
alert(`User: ${user1}, Age: ${age1}, Message: ${message1}`);


let hello = 'Hello world!';
let world;
// copy 'Hello world' from hello into message
world = hello;

// now two variables hold the same data
alert(hello); // Hello world!
alert(world); // Hello world!

// if a variable is declared once , again declaring it with the same name will throw an error
// let, class, return, and function are reserved we cannot use them as variable names
// Variables named apple and APPLE are two different variables, case matters in JavaScript
/*There are two limitations on variable names in JavaScript:

The name must contain only letters, digits, or the symbols $ and _.
The first character must not be a digit.
Examples of valid names:

let userName;
let test123;
When the name contains multiple words, camelCase is commonly used. That is: words go one after another, with each word except the first starting with a capital letter: myVeryLongName.

What’s interesting – the dollar sign '$' and the underscore '_' can also be used in names. They are regular symbols, just like letters, without any special meaning.

These names are valid:

let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"

alert($ + _); // 3
*/
// Constants are like variables, but their value cannot be changed after they are assigned. They are declared using the const keyword. Constants are useful for values that should remain constant throughout the program, such as mathematical constants or configuration settings.

const myBirthday = '01.01.2000';
alert(`My birthday is ${myBirthday}`);

// myBirthday = '02.02.2000'; // This will throw an error because myBirthday is a constant and cannot be reassigned.
/*
There is a widespread practice to use constants as aliases for difficult-to-remember values that are known before execution.

Such constants are named using capital letters and underscores.

For example, the speed of light is a known value that can be represented as a constant:
const SPEED_OF_LIGHT = 299792458; // in meters per second
alert(`The speed of light is ${SPEED_OF_LIGHT} m/s`);
*/
