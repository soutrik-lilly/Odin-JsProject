function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getHumanChoice() {
    const validChoices = ["rock", "paper", "scissors"];
    while (true) {
        const rawChoice = prompt("Enter rock, paper, or scissors:");

        if (rawChoice === null) {
            return null;
        }

        const choice = rawChoice.trim().toLowerCase();
        if (validChoices.includes(choice)) {
            return choice;
        }
    }
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
    console.log(`Human choice: ${humanChoice}`);
    console.log(`Computer choice: ${computerChoice}`);

    if (humanChoice === computerChoice) {
        console.log("It's a tie!");
    }

    else {
        if (
            (humanChoice === "rock" && computerChoice === "scissors") ||
            (humanChoice === "paper" && computerChoice === "rock") ||
            (humanChoice === "scissors" && computerChoice === "paper")
        ) {
            console.log("Human wins!");
            humanScore++;
        } else {
            console.log("Computer wins!");
            computerScore++;
        }
    }
    console.log(`Human score: ${humanScore}`);
    console.log(`Computer score: ${computerScore}`);
}

// Your game will play 5 rounds. You will write a function named playGame that calls playRound to play 5 rounds, keeps track of the scores and declares a winner at the end.

function playGame() {
    for (let i = 0; i < 5; i++) {
        const humanChoice = getHumanChoice();
        if (!humanChoice) {
            console.log("Game canceled. Declaring winner from the current score.");
            break;
        }
        const computerChoice = getComputerChoice();
        playRound(humanChoice, computerChoice);
    }

    if (humanScore > computerScore) {
        console.log("Human wins the game!");
    } else if (computerScore > humanScore) {
        console.log("Computer wins the game!");
    } else {
        console.log("The game is a tie!");
    }
}

playGame();
