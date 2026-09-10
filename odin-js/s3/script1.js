// We practice string and string methods in JavaScript

// Single quotes, double quotes, and backticks

let singleQuote = 'This is a string with single quotes';
let doubleQuote = "This is a string with double quotes";
let backtick = `This is a string with backticks`;

console.log(singleQuote);
console.log(doubleQuote);
console.log(backtick);

// Strings declared using backticks are a special kind of string called a template literal.

let name_ = 'John';
let sirname_ = 'Doe';
let full_name = `${name_} ${sirname_}`;
console.log(`The full name is: ${full_name}`);

full_name = name_ + ' ' + sirname_;
console.log(`The full name is: ${full_name}`);

//  multiline text: use backticks (`) for template literals or use newline characters (\n) in regular strings

let multilineText = `This is a string
that spans multiple
lines.`;
console.log(multilineText);

multilineText = "This is a string\nthat spans multiple\nlines.";
console.log(multilineText);

// using quotes: you can include single quotes inside double quotes, double quotes inside single quotes, or use backticks for template literals

const goodQuotes1 = 'She said "I think so!"';
const goodQuotes2 = `She said "I'm not going in there!"`;
console.log(goodQuotes1);
console.log(goodQuotes2);

//  add number and string it comes as a string
let number = 42;
let string = "The answer is: ";
console.log(string + number);

// Convert text to number
let textNumber = "123";
let convertedNumber = Number(textNumber);
console.log(convertedNumber);

// Convert number to text
let numberToConvert = 456;
let convertedText = String(numberToConvert);
console.log(convertedText);

//  string methods

let sampleText = "Hello , World";
console.log(`the length is ${sampleText.length}`);
console.log(`the first character is ${sampleText[0]}`);
console.log(`the last character is ${sampleText[sampleText.length - 1]}`);
console.log(`the text in uppercase is ${sampleText.toUpperCase()}`);
console.log(`the text in lowercase is ${sampleText.toLowerCase()}`);

// check if a substring exists within the string using substring methods
console.log(sampleText.includes("ello"));
console.log(sampleText.startsWith("Hello"));
console.log(sampleText.endsWith("World"));

// position of a substring within the string
console.log(`the starting position of world is ${sampleText.indexOf("World")}`);
console.log(`the starting position of Hello is ${sampleText.indexOf("Hello")}`);

// slice substring
console.log(`slicing 0 to 4 from the text ${sampleText.slice(0, 4)}`);

// updating parts of a string: replace only the first occurrence, replaceAll for all occurrences
sampleText2 = sampleText.replace("ello", "emmo");
console.log(`the updated text is ${sampleText2}`);

let quote = "To be or not to be";
quote = quote.replaceAll("be", "code");
console.log(quote);
