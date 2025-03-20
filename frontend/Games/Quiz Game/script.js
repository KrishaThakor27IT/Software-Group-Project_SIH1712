const questions = [
    {
        question: "If a cat has four legs, how many legs do 3 cats have?",
        options: ["8", "12", "16", "10"],
        answer: "12"
    },
    {
        question: "What is 5 + 7?",
        options: ["10", "12", "14", "16"],
        answer: "12"
    },
    {
        question: "Which number comes after 11?",
        options: ["10", "12", "13", "14"],
        answer: "12"
    },
    {
        question: "What is half of 20?",
        options: ["5", "10", "15", "20"],
        answer: "10"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const retryButton = document.getElementById("retry-btn");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz-container");
const resultText = document.getElementById("result-text");
const playAgainButton = document.getElementById("play-again");
const timerElement = document.getElementById("time");

function startTimer() {
    timeLeft = 15;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleNextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timer);
    startTimer();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(button, option, currentQuestion.answer));
        optionsContainer.appendChild(button);
    });

    retryButton.classList.add("hidden");
    nextButton.classList.add("hidden");
}

function checkAnswer(button, selected, correct) {
    clearInterval(timer);
    const allButtons = document.querySelectorAll(".option");
    
    if (selected === correct) {
        button.classList.add("correct");
        score += 10;
    } else {
        button.classList.add("wrong");
        button.classList.add("hover-effect");
    }

    allButtons.forEach(btn => {
        if (btn.textContent === correct) {
            btn.classList.add("correct");
        } else {
            btn.disabled = true;
        }
    });

    nextButton.classList.remove("hidden");
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    resultText.textContent = `You scored ${score} out of ${questions.length * 10}! 🎉`;
}

nextButton.addEventListener("click", handleNextQuestion);

playAgainButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    loadQuestion();
});

loadQuestion();
