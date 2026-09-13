// in this code we will learn about usage of getElementsByName and getElementById and how to access and manipulate form elements in the DOM.
//  addEventListener to the submit button to handle the form submission. We will learn about Events later in the course.


let btn = document.getElementById("btnRate");
let op = document.getElementById("output");

btn.addEventListener("click",
    () => {
        // Get all radio buttons with the name "rate" and check which one is selected.
        let ratings = document.getElementsByName("rate");
        // Loop through each radio button and check if it is selected.
        ratings.forEach(rating => {
            if (rating.checked) {
                op.textContent = `You have rated: ${rating.value}`;
            }
        });
    }
)
