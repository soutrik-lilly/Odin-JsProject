// loops: use of while do-while and for loops

// while loop
let count = 0;
while (count <= 5) {
    console.log(`Count is using while-loop: ${count}`);
    count++;
}

// do-while loop
let count1 = 0;
do {
    console.log(`Count is using do-while-loop: ${count1}`);
    count1++;
} while (count1 <= 5);

//  diff b/w while and do-while loop is that in while loop, the condition is checked before executing the loop body, whereas in do-while loop, the loop body is executed at least once before checking the condition.

// for loop
/*
for (begin; condition; step) {
  // ... loop body ...
}
That is, begin executes once, and then it iterates: after each condition test, body and step are executed.
*/

for (let i = 0; i <= 5; i++) {
    console.log(`Count is using for-loop: ${i}`);
}
//  skipping the begin part of for loop is possible, but you must have a variable defined before the loop. The begin part is optional, but the condition and step parts are required. If you skip the begin part, you must ensure that the variable used in the condition is defined and initialized before the loop starts.
let k = 1

for (; k <= 5; k++) {
    console.log(`Count is using for-loop with no begin: ${k}`);
}

// break and continue statements in loops

//  break : exits the loop entirely, while continue skips the current iteration and moves to the next one. Both can be used in any type of loop (for, while, do-while).
let m = 0;
while (m <= 10) {
    if (m === 5) {
        console.log("Breaking the loop at m = 5");
        break; // exit the loop when m is 5
    }
    console.log(`Count is: ${m}`);
    m++;
}

// continue : skips the current iteration and moves to the next one. It is often used to skip certain conditions within a loop without exiting the entire loop.
let n = 0;
while (n <= 10) {
    n++;
    if (n % 2 === 0) {
        // console.log(`Skipping even number: ${n}`);
        continue; // skip the rest of the loop body for even numbers
    }
    console.log(`Odd Count is: ${n}`);
}

//  use of break and continue in for loop

for (let p = 0; p <= 10; p++) {
    if (p % 2 == 0) {
        console.log(`Skipping even number in for-loop: ${p}`);
        continue; // skip the rest of the loop body for even numbers
    }
    if (p === 7) {
        console.log("Breaking the for-loop at p = 7");
        break; // exit the loop when p is 7
    }
    console.log(`Odd Count in for-loop is: ${p}`);
}

//  multiple loops: nested loops and labeled statements

// nested loops: a loop inside another loop. The inner loop runs completely for each iteration of the outer loop.
for (let i = 1; i <= 3; i++) {
    console.log(`Outer loop iteration: ${i}`);
    for (let j = 1; j <= 2; j++) {
        console.log(`  Inner loop iteration: ${j}`);
    }
}

// labeled statements: allow you to name a loop, which can be useful for breaking out of nested loops.
// labeled statement syntax: labelName: statement
outerLoop: for (let x = 0; x <= 3; x++) {
    console.log(`New Outer loop iteration: ${x}`);
    for (let y = 0; y <= 3; y++) {
        if (y === 2) {
            console.log("Breaking out of outer loop from inner loop");
            break outerLoop; // breaks out of the outer loop
        }
        console.log(`New Inner loop iteration: ${y}`);
    }
}


// skip and conitinue inner loop and continue outer loop
outerLoop: for (let a = 0; a <= 3; a++) {
    console.log(`Super Outer loop iteration: ${a}`);
    for (let b = 0; b <= 3; b++) {
        if (b === 2) {
            console.log("Skipping inner loop iteration when b = 2");
            continue; // skips the rest of the inner loop body for this iteration
        }
        console.log(`Super Inner loop iteration: ${b}`);
    }
}
