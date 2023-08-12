// Get references to the menu elements
const startMenu = document.getElementById("startMenu");
const gameMenu = document.getElementById("gameMenu");
const endMenu = document.getElementById("endMenu");

// Get references to HTML elements
const levelSelector = document.getElementById("levelSelector");
const guessInput = document.getElementById('guessInput');
const maxGuessingNumber = document.getElementById('maxGuessingNumber');
const feedbackMessage = document.getElementById("feedback");
const timerElement = document.getElementById("timer");

startMenu.style.display = 'block';
gameMenu.style.display = 'none';
endMenu.style.display = 'none';

let targetNumber = 10;
let guessNumber = 0;
let maxNumber = 10;
let timeRemaining = 60;
let playerScore = 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let timerInterval;

function startGame() {
    maxNumber = parseInt(levelSelector.value);
    targetNumber = generateNumber(maxNumber);
    maxGuessingNumber.textContent = maxNumber;
    timerInterval = setInterval(updateTimer, 1000);

    displayGameMenu();
}

function updateTimer() {
    if(timeRemaining > 0) {
        timeRemaining--;
        timerElement.textContent = `${timeRemaining}`;
    } else {
        clearInterval(timerInterval);
        endGame();
    }
}

function updateScores() {
    playerScore = ((timeRemaining * (100 - guessNumber)) * maxNumber);

    if (playerScore > highScore) {
        highScore = playerScore;
        localStorage.setItem("highScore", highScore);
    }
}

function endGame() {

    displayEndMenu();
    updateScores();

    const winText = `Congratulation! You guessed the number ${targetNumber} in ${guessNumber} attempts!`;
    const loseText = `You run out of time! The number was ${targetNumber}!`;
    endMenu.textContent = timeRemaining > 0 ? winText: loseText;

    // Update best score
    endMenu.innerHTML += `<p>Your Score: <span id="playerScore">${playerScore}</span></p>`;
    endMenu.innerHTML += `<p>High Score: <span id="highScore">${highScore}</span></p>`;

    endMenu.innerHTML += '<div><button onclick="startGame()">Play Again</button></div>';
    endMenu.innerHTML += '<div><button onclick="displayStartMenu()">Choose another level</button></div>';

    resetGame();

    // Play victory sound effect (if applicable)

    // Display animation or confetti (if applicable)
}

function checkGuess() {
    feedbackMessage.textContent = '';
    const guess = parseInt(guessInput.value);

    if (!guess) {
        return;
    }

    guessNumber++;

    if (guess === targetNumber) {
        endGame();
        return;
    }

    if (guess > targetNumber) {
        feedbackMessage.textContent = `Lower than ${guess}`;
    } else {
        feedbackMessage.textContent = `Greater than ${guess}`;
    }

    guessInput.value = '';

}

function generateNumber(maxNumber) {
    return Math.floor((Math.random() * maxNumber) + 1);
}

function resetGame() {
    targetNumber = generateNumber(maxNumber);

    guessNumber = 0;
    playerScore = 0;
    timeRemaining = 60;
    guessInput.value = '';
    feedbackMessage.innerHTML = '';
    clearInterval(timerInterval);
}

function displayStartMenu() {
    startMenu.style.display = 'block';
    gameMenu.style.display = 'none';
    endMenu.style.display = 'none';
}

function displayGameMenu() {
    startMenu.style.display = 'none';
    gameMenu.style.display = 'block';
    endMenu.style.display = 'none';
}

function displayEndMenu() {
    startMenu.style.display = 'none';
    gameMenu.style.display = 'none';
    endMenu.style.display = 'flex';
}
