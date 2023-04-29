// Quiz questions array
const questions = [
    {
        question: "Question 1.What does HTML stand for ?",
        answers: [
            { text: "1.Hyper Text Markup Language", correct: true},
            { text: "2.Hyperlinks and text markup language", correct: false },
            { text: "3.Home tool markup language", correct: false },
        ]
    },
    {
        question: "Question 2.Which character is used to indicate an Start tag?",
        answers: [
            { text: "1.< ", correct: true},
            { text: " 2./ ", correct: false },
            { text: " 3.* ", correct: false },
            { text: " 4.^ ", correct: false}
        ]
    },
    {
        question: "Question 3.How can you make a numbered list?",
        answers: [
            { text: " 1.ol", correct: true },
            { text: " 2.dl", correct: false },
            { text: " 3.list", correct: false },
            { text: "4.ul", correct: false }
        ]
    },
    {
        question: "Question 4.Which HTML element defines the title of a document?",
        answers: [
            { text: "1.title ", correct: true },
            { text: "2.head ", correct: false },
            { text: " 3.meta", correct: false },
            { text: "4.header", correct: false }
        ]
    },
    {
        question: "Question 5.Choose the correct HTML element for the largest heading:",
        answers: [
            { text: "1.h6 ", correct: false  },
            { text: "2.h1 ", correct: true},
            { text: " 3.heading", correct: false },
            { text: "4.head", correct: false }
        ]
    }

];

// DOM elements
const questionContainer = document.querySelector('.question-container');
const answerButtons = document.querySelectorAll('.answer-button');
const scoreText = document.querySelector('#score');

// Quiz game variables
let currentQuestion = 0;
let score = 0;

// Load the first question
loadQuestion();

// Function to load a question
function loadQuestion() {
    const currentQuestionData = questions[currentQuestion];
    const questionText = questionContainer.querySelector('.question-text');
    const answerContainer = questionContainer.querySelector('.answer-container');

    questionText.innerText = currentQuestionData.question;
    answerButtons.forEach((button, index) => {
        button.innerText = currentQuestionData.answers[index].text;
        button.dataset.correct = currentQuestionData.answers[index].correct;
        button.addEventListener('click', selectAnswer);
    });
}

// Function to select an answer
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    if (isCorrect) {
        selectedButton.classList.add('correct-answer');
        score++;
    } else {
        selectedButton.classList.add('incorrect-answer');
    }

    // Disable answer buttons
    answerButtons.forEach(button => {
        button.removeEventListener('click', selectAnswer);
        if (button.dataset.correct === 'true') {
            button.classList.add('correct-answer');
        }
    });

    // Update score
    scoreText.innerText = `${score}/${questions.length}`;

    // Load the next question or end the quiz
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        setTimeout(loadQuestion, 1000);
    } else {
        setTimeout(endQuiz, 1000);
    }
}

// Function to end the quiz
function submit() {
    questionContainer.innerHTML = `<h2>score!</h2><p>Your score is ${score}/${questions.length}</p>`;
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    scoreText.innerText = `${score}/${questions.length}`;
}
