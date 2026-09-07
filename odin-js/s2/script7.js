//  the switch statement: replace multiple if else statements with switch statement

let user_role1 = "admin";

switch (user_role1) {
    case "admin":
        console.log("Access granted to admin.");
        break;
    case "editor":
        console.log("Access granted to editor.");
        break;
    default:
        console.log("Access denied. Only admin and editor roles are allowed.");
}

// grouping cases

let user_role2 = "editor";

switch (user_role2) {
    case "admin":
    case "editor":
        console.log("Access granted to admin or editor.");
        break;
    default:
        console.log("Access denied. Only admin and editor roles are allowed.");
}

let browser = "Chrome";
switch (browser) {
    case 'Edge':
        alert("You've got the Edge!");
        break;

    case 'Chrome':
    case 'Firefox':
    case 'Safari':
    case 'Opera':
        alert('Okay we support these browsers too');
        break;

    default:
        alert('We hope that this page looks ok!');
}
