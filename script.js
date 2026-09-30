const questions = [
    {
        question: "What is 2 + 2?",
        answers: [
            "3",
            "4",
            "5",
            "6"
        ],
        correctAnswer: "4"
    },

    {
        question: "What is the capital of France?",
        answers: [
            "London",
            "Madrid",
            "Paris",
            "Rome"
        ],
        correctAnswer: "Paris"
    },

    {
        question: "What color do you get when you mix red and blue?",
        answers: [
            "Green",
            "Orange",
            "Purple",
            "Yellow"
        ],
        correctAnswer: "Purple"
    }
];

let currentQuestion;

function loadQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);

    currentQuestion = questions[randomIndex];

    document.getElementById("question").textContent = currentQuestion.question;

    const answersContainer = document.getElementById("answers");

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(function(answer) {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answerButton");

        button.onclick = function() {
            checkAnswer(answer, button);
        };

        answersContainer.appendChild(button);
    });

    document.getElementById("result").textContent = "";

    document.getElementById("nextButton").style.display = "none";
}

function checkAnswer(answer, clickedButton) {
    const result = document.getElementById("result");

    const answerButtons = document.querySelectorAll(".answerButton");

    // Stop the player from clicking multiple answers
    answerButtons.forEach(function(button) {
        button.disabled = true;
    });

    if (answer === currentQuestion.correctAnswer) {
        result.textContent = "Correct!";
        result.style.color = "green";

        clickedButton.style.backgroundColor = "lightgreen";
    } else {
        result.textContent = "Wrong!";
        result.style.color = "red";

        clickedButton.style.backgroundColor = "lightcoral";

        // Highlight the correct answer
        answerButtons.forEach(function(button) {
            if (button.textContent === currentQuestion.correctAnswer) {
                button.style.backgroundColor = "lightgreen";
            }
        });
    }

    document.getElementById("nextButton").style.display = "inline-block";
}

loadQuestion();