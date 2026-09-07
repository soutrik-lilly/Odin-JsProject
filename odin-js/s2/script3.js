// use of prompt and confirm is not recommended in production code, but for this example it is fine
// let age = prompt("Please enter your age:", 35);
// alert(`You entered: ${age}`);

// confirm("Are you sure you want to proceed?") ? alert("Proceeding...") : alert("Operation cancelled.");

// let isConfirmed = confirm("Do you want to continue?");
// if (isConfirmed) {
//     alert("You chose to continue.");
//     console.log("User confirmed to continue.");
// } else {
//     alert("You chose to cancel.");
//     console.log("User cancelled the operation.");
// }

// String conversion examples

let num = 42
console.log("Number:", num, "Type:", typeof num);

let strNum = String(num);
console.log("String:", strNum, "Type:", typeof strNum);

let boolValue = Boolean(num);
console.log("Boolean:", boolValue, "Type:", typeof boolValue);

let coercedNum = num + " is a number";
console.log("Coerced String:", coercedNum, "Type:", typeof coercedNum);

let val = true;
console.log("Boolean:", val, "Type:", typeof val);
val = String(val);
console.log("String:", val, "Type:", typeof val);

// number conversion examples
console.log(Number("   123   ")); // 123
console.log(Number("123z"));      // NaN (error reading a number at "z")
console.log(Number(true));        // 1
console.log(Number(false));      // 0
console.log(Number(null));        // 0
console.log(Number(undefined));   // NaN
console.log(Number(NaN));       // NaN


// boolean conversion examples
console.log(Boolean(1));          // true
console.log(Boolean(0));          // false
console.log(Boolean("hello"));    // true
console.log(Boolean(""));         // false
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
