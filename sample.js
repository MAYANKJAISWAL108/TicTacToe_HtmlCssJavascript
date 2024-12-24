// Select all the required DOM elements
let boxes = document.querySelectorAll(".box"); // Tic-tac-toe grid boxes
let ResetButton = document.querySelector("#ResetButton"); // Reset button
let newGame = document.querySelector("#NewGame"); // New game button
let outputContainer = document.querySelector(".output-container"); // Winner message container
let output = document.querySelector("#output"); // Winner display message

let turn = true; // Keeps track of the current player's turn (true for "0", false for "X")
let moveCount = 0; // Tracks the total number of moves made

// Define all possible winning combinations
const WinArr = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

// Function to disable all boxes to prevent further clicks
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true; // Disable the button
    }
};

// Function to enable all boxes and reset their content
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false; // Enable the button
        box.innerText = ""; // Clear the text content of the button
    }
};

// Function to display the winner or a draw and show the output container
const showMessage = (message) => {
    output.innerText = message; // Update the output message
    outputContainer.classList.remove("hide"); // Make the output container visible
    disableBoxes(); // Disable all boxes to prevent further play
};

// Add event listeners to each box to handle player clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Alternate turns between "0" and "X"
        if (turn) {
            box.innerText = "0"; // Current turn is "0"
            turn = false; // Switch turn to "X"
        } else {
            box.innerText = "X"; // Current turn is "X"
            turn = true; // Switch turn to "0"
        }

        box.disabled = true; // Disable the clicked box to prevent overwriting
        moveCount++; // Increment the move counter

        checkGameStatus(); // Check for a winner or draw after every move
    });
});

// Function to check if there is a winner or if the game ends in a draw
const checkGameStatus = () => {
    for (let pattern of WinArr) {
        // Get the values of the three boxes in the current winning pattern
        let v1 = boxes[pattern[0]].innerText;
        let v2 = boxes[pattern[1]].innerText;
        let v3 = boxes[pattern[2]].innerText;

        // Check if all three boxes are non-empty and have the same value
        if (v1 !== "" && v2 !== "" && v3 !== "") {
            if (v1 === v2 && v2 === v3) {
                showMessage(`Winner: ${v1}`); // Announce the winner
                return; // Stop further checks once a winner is found
            }
        }
    }

    // If all boxes are filled and no winner is found, it's a draw
    if (moveCount === 9) {
        showMessage("It's a Draw!"); // Announce the draw
    }
};

// Function to reset the game state
const resetGame = () => {
    turn = true; // Reset the turn to the initial state ("0" goes first)
    moveCount = 0; // Reset the move counter
    enableBoxes(); // Clear the board and enable all boxes
    outputContainer.classList.add("hide"); // Hide the output container
};

// Attach event listeners to the reset and new game buttons
newGame.addEventListener("click", resetGame); // Reset the game when "New Game" is clicked
ResetButton.addEventListener("click", resetGame); // Reset the game when "Reset" is clicked
