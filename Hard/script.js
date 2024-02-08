const operators = ['+', '-', '*', '/'];
let score = 0;
let currentQuestionIndex = 0;

const timerElement = document.getElementById('timer');
const questionElement = document.getElementById("question");
const scoreElement = document.getElementById("score");

let timer;

function generateRandomQuestion() {
    const num1 = Math.ceil(Math.random() * 1000);
    const num2 = Math.ceil(Math.random() * 1000);
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let correctAnswer;
    switch (operator) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            correctAnswer = parseFloat((num1 / num2).toFixed(2));
            break;
        default:
            correctAnswer = num1 + num2;
    }

    const incorrectAnswer = correctAnswer + Math.ceil(Math.random() * 5);
    const isCorrect = Math.random() >= 0.5;
    const answer = isCorrect ? correctAnswer : incorrectAnswer;
    return {
        question: `Is ${num1} ${operator} ${num2} = ${answer.toFixed(2)}?`,
        answer: isCorrect,
    };
}

const questions = Array.from({ length: 100 }, generateRandomQuestion);

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
}

function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (userAnswer === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;
    showNextQuestion();
}

function showNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    questionElement.innerText = "Quiz finished!";
    scoreElement.innerText = ` ${score}  `;
}

function startTimer(duration, display) {
    let timer = duration; // Use a separate variable for the interval ID
    let minutes, seconds;

    const intervalId = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(intervalId); // Clear the interval using the correct ID
            endQuiz();
        }
    }, 1000);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        // User pressed left arrow (choose "yes")
        checkAnswer(true);
    } else if (event.key === 'ArrowRight') {
        // User pressed right arrow (choose "no")
        checkAnswer(false);
    }
});

window.onload = function () {
    const sixtyMinutes = 60; // Timer set for 60 minutes
    startTimer(sixtyMinutes, timerElement);
    showQuestion();
};
