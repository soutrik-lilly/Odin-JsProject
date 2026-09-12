// Usually you create an Error object with the intention of raising it using the throw keyword. You can handle the error using the try...catch construct:

// try {
//     throw new Error("Manufacturing error occurred");
// } catch (e) {
//     console.error(e);
// }

// You can choose to handle only specific error types by testing the error type with the instanceof keyword:

try {
    foo.bar();
} catch (e) {
    if (e instanceof TypeError) {
        console.error("Type error occurred:", e);
    }
    else if (e instanceof ReferenceError) {
        console.error("Reference error occurred:", e);
    }
    else {
        console.error("Unknown error occurred:", e);
    }
}

// The ReferenceError object represents an error when a variable that doesn't exist (or hasn't yet been initialized) in the current scope is referenced.

try {
    let a = b; // b is not defined, will cause a ReferenceError
} catch (e) {
    if (e instanceof ReferenceError) {
        console.log(`Name of the error: ${e.name}`);
        console.log("Reference error occurred:", e.message);
        console.log(`Stack trace of the error: ${e.stack}`);
        console.error("Reference error occurred:", e);
    }
    else {
        console.log(`Name of the error: ${e.name}`);
        console.log("Unknown error occurred:", e.message);
        console.error("Unknown error stack trace:", e.stack);
        console.error("Unknown error occurred:", e);
    }
}

// Syntax Error: A syntax error occurs when the code contains invalid syntax, preventing it from being parsed correctly.
try {
    eval('foo bar'); // Invalid JavaScript syntax, will cause a SyntaxError
} catch (e) {
    if (e instanceof SyntaxError) {
        console.log(`Name of the error: ${e.name}`);
        console.log("Syntax error occurred:", e.message);
        console.log(`Stack trace of the error: ${e.stack}`);
        console.error("Syntax error occurred:", e);
    }
    else {
        console.log(`Name of the error: ${e.name}`);
        console.log("Unknown error occurred:", e.message);
        console.error("Unknown error stack trace:", e.stack);
        console.error("Unknown error occurred:", e);
    }
}

// Type Error: A type error occurs when a value is not of the expected type, such as calling a method on an undefined variable.

try {
    throw new TypeError("This is a type error");
} catch (e) {
    console.log(`Name of the error: ${e.name}`);
    console.log("Type error occurred:", e.message);
    console.log(`Stack trace of the error: ${e.stack}`);
    console.error("Type error occurred:", e);
}
