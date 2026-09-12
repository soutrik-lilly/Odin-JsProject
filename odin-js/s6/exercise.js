// Write the function camelize(str) that changes dash-separated words like “my-short-string” into camel-cased “myShortString”.

function camelize(str) {
    return str.split("-").map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join("");
}

op = camelize("my-short-string");
console.log(op);


// Write a function filterRange(arr, a, b) that gets an array arr, looks for elements with values higher or equal to a and lower or equal to b and return a result as an array.

function filterRange(arr, a, b) {
    return arr.filter(num => num >= a && num <= b);
}

let numbers = [1, 2, 3, 4, 5];
let filteredNumbers = filterRange(numbers, 2, 4);
console.log(filteredNumbers);

// Write a function filterRangeInPlace(arr, a, b) that gets an array arr and removes from it all values except those that are between a and b

function filterRangeInPlace(arr, a, b) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < a || arr[i] > b) {
            arr.splice(i, 1);
            i--;
        }
    }
}
numbers = [1, 2, 3, 4, 5];
filterRangeInPlace(numbers, 2, 4);
console.log(numbers);

// sort in descending

let arr = [5, 2, 1, -10, 8];
arr.sort((a, b) => b - a);
console.log(arr);

// We have an array of strings arr. We’d like to have a sorted copy of it, but keep arr unmodified.

let strings = ["banana", "apple", "cherry"];

let copyStrings = strings.slice().sort();
console.log(copyStrings);

// map to names


let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [john, pete, mary];

let names = users.map(user => user.name);
console.log(names);

// Map to objects

john = { name: "John", surname: "Smith", id: 1 };
pete = { name: "Pete", surname: "Hunt", id: 2 };
mary = { name: "Mary", surname: "Key", id: 3 };

users = [john, pete, mary];

usersMapped = users.map(user => ({ fullName: `${user.name} ${user.surname}`, id: user.id }));
console.log(usersMapped);

// sort user by age

john = { name: "John", age: 25 };
pete = { name: "Pete", age: 30 };
mary = { name: "Mary", age: 28 };

arr = [pete, john, mary];

arr.sort((a, b) => a.age - b.age);
console.log(arr);


// Get average age


john = { name: "John", age: 25 };
pete = { name: "Pete", age: 30 };
mary = { name: "Mary", age: 28 };

arr = [pete, john, mary];

let averageAge = arr.reduce((sum, user) => sum + user.age, 0) / arr.length;
console.log(averageAge);


// Filter unique array members

let uniqueArr = function (arr) {
    tempArr = []
    for (let i = 0; i < arr.length; i++) {
        if (!tempArr.includes(arr[i])) {
            tempArr.push(arr[i]);
        }
    }
    return tempArr;
}


strings = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

let uniqueStrings = uniqueArr(strings);
console.log(uniqueStrings);
