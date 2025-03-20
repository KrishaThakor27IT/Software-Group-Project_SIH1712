const words = [
    { word: "apple", category: "Fruits", hint: "A red or green fruit" },
    { word: "elephant", category: "Animals", hint: "A large mammal with a trunk" },
    { word: "laptop", category: "Electronics", hint: "A portable computer" },
    { word: "guitar", category: "Musical Instruments", hint: "A stringed musical instrument" },
    { word: "bicycle", category: "Vehicles", hint: "A two-wheeled mode of transport" }
];

let selectedWordObj, selectedWord, guessedWord;
let attempts = 6;
const wordDisplay = document.getElementById("wordDisplay");
const letterButtons = document.getElementById("letterButtons");
const message = document.getElementById("message");
const categorySpan = document.getElementById("category");
const hintSpan = document.getElementById("hint");
const playAgainBtn = document.getElementById("playAgainBtn");
const goBackBtn = document.getElementById("goBackBtn");

function startGame() {
    attempts = 6;
    message.textContent = "";

    // FORCE BUTTONS TO SHOW
    playAgainBtn.style.display = "block";
    goBackBtn.style.display = "block";

    // Select a random word
    selectedWordObj = words[Math.floor(Math.random() * words.length)];
    selectedWord = selectedWordObj.word.toUpperCase();
    guessedWord = Array(selectedWord.length).fill("_");

    // Update category and hint
    categorySpan.textContent = selectedWordObj.category;
    hintSpan.textContent = selectedWordObj.hint;

    // Display the word with underscores
    wordDisplay.textContent = guessedWord.join(" ");

    // Generate letter buttons
    letterButtons.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.onclick = () => guessLetter(letter, btn);
        letterButtons.appendChild(btn);
    }
}

function guessLetter(letter, btn) {
    btn.disabled = true;
    let correctGuess = false;

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            guessedWord[i] = letter;
            correctGuess = true;
        }
    }

    wordDisplay.textContent = guessedWord.join(" ");

    if (!correctGuess) {
        attempts--;
    }

    checkGameStatus();
}

function checkGameStatus() {
    if (guessedWord.join("") === selectedWord) {
        message.textContent = "🎉 You guessed the word!";
        endGame();
    } else if (attempts === 0) {
        message.textContent = `💀 You lost! The word was ${selectedWord}`;
        endGame();
    }
}

function endGame() {
    document.querySelectorAll(".letter-buttons button").forEach(btn => btn.disabled = true);

    // FORCE BUTTONS TO SHOW
    playAgainBtn.style.display = "block";
    goBackBtn.style.display = "block";
}

// Play Again button
playAgainBtn.onclick = startGame;

// Go Back button
goBackBtn.onclick = () => location.reload();

// Start game
startGame();
