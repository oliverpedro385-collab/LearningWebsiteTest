/* =========================================================
   ENGLISH QUIZ
   The English subject currently uses Portuguese prompts only.
   The questions still test English vocabulary and grammar.
   ========================================================= */

function Q(topic, question, answers, correctAnswer, hint) {
    return {
        topic,
        "pt-BR": {
            question,
            answers,
            correctAnswer,
            hint
        }
    };
}

const englishQuestions = {
    1: [
        Q(
            "Cumprimentos",
            "Qual palavra em inglês significa \"olá\"?",
            ["Hello", "Goodbye", "Sorry", "Thanks"],
            "Hello",
            "É uma saudação usada quando você encontra alguém."
        ),
        Q(
            "Vocabulário",
            "Qual palavra em inglês significa \"lápis\"?",
            ["Pencil", "Chair", "Window", "Bag"],
            "Pencil",
            "É um objeto usado para escrever."
        ),
        Q(
            "Animais",
            "Qual palavra em inglês significa \"gato\"?",
            ["Cat", "Dog", "Fish", "Bird"],
            "Cat",
            "É o animal que faz \"miau\"."
        ),
        Q(
            "Cores",
            "Qual palavra em inglês significa \"azul\"?",
            ["Blue", "Green", "Yellow", "Red"],
            "Blue",
            "É a cor do céu em um dia claro."
        ),
        Q(
            "Números",
            "Qual palavra em inglês representa o número 7?",
            ["Seven", "Six", "Eight", "Ten"],
            "Seven",
            "Vem depois de six."
        ),
        Q(
            "Pronomes",
            "Qual pronome em inglês significa \"ela\"?",
            ["She", "He", "We", "They"],
            "She",
            "É usado para falar de uma menina ou mulher."
        ),
        Q(
            "Vocabulário",
            "O que a palavra inglesa \"happy\" significa?",
            ["Feliz", "Triste", "Cansado", "Bravo"],
            "Feliz",
            "É o contrário de sad."
        ),
        Q(
            "Artigos",
            "Complete corretamente: \"I have ___ apple.\"",
            ["an", "a", "the", "is"],
            "an",
            "Use \"an\" antes de um som de vogal."
        ),
        Q(
            "Verbos",
            "Qual palavra em inglês significa \"comer\"?",
            ["Eat", "Run", "Sleep", "Read"],
            "Eat",
            "É o verbo usado quando você coloca comida para dentro."
        ),
        Q(
            "Frases Básicas",
            "Qual frase em inglês significa \"Eu gosto de música\"?",
            ["I like music.", "I likes music.", "I am music.", "I like musics."],
            "I like music.",
            "Com I, usamos \"like\", não \"likes\"."
        )
    ],

    2: [
        Q(
            "Vocabulário",
            "Qual palavra em inglês significa \"pequeno\"?",
            ["Small", "Tall", "Fast", "Heavy"],
            "Small",
            "É o contrário de big."
        ),
        Q(
            "Dias da Semana",
            "Qual é o dia depois de Monday?",
            ["Tuesday", "Sunday", "Friday", "Saturday"],
            "Tuesday",
            "Pense na ordem dos dias da semana."
        ),
        Q(
            "Plural",
            "Qual é o plural correto de \"box\"?",
            ["Boxes", "Boxs", "Boxies", "Box"],
            "Boxes",
            "Palavras terminadas em x normalmente recebem \"-es\"."
        ),
        Q(
            "There is / There are",
            "Complete corretamente: \"There ___ two books.\"",
            ["are", "is", "am", "be"],
            "are",
            "Use \"are\" com algo no plural."
        ),
        Q(
            "Presente Simples",
            "Qual frase está correta?",
            ["He plays soccer.", "He play soccer.", "He playing soccer.", "He are play soccer."],
            "He plays soccer.",
            "Com he, she e it, o verbo normalmente recebe -s."
        ),
        Q(
            "Preposições",
            "Complete: \"The book is ___ the table.\"",
            ["on", "under", "between", "from"],
            "on",
            "A palavra indica que o livro está sobre a mesa."
        ),
        Q(
            "Can / Can't",
            "Qual frase significa \"Eu posso nadar\"?",
            ["I can swim.", "I can't swim.", "I can swimming.", "I am swim."],
            "I can swim.",
            "\"Can\" indica capacidade ou possibilidade."
        ),
        Q(
            "Possessivos",
            "Qual frase significa \"Este é meu livro\"?",
            ["This is my book.", "This is I book.", "This is me book.", "This my book."],
            "This is my book.",
            "\"My\" mostra que algo pertence a você."
        ),
        Q(
            "Perguntas",
            "Qual palavra em inglês usamos para perguntar \"onde\"?",
            ["Where", "Who", "When", "Why"],
            "Where",
            "\"Where\" é usada para perguntar sobre lugares."
        ),
        Q(
            "Sala de Aula",
            "Qual palavra em inglês significa \"borracha\"?",
            ["Eraser", "Ruler", "Desk", "Notebook"],
            "Eraser",
            "É usada para apagar o que foi escrito com lápis."
        )
    ],

    3: [
        Q(
            "Presente Simples",
            "Escolha a frase correta para dizer \"Ela vai para a escola todos os dias\".",
            ["She goes to school every day.", "She go to school every day.", "She going to school every day.", "She is go to school every day."],
            "She goes to school every day.",
            "Com she, o verbo \"go\" vira \"goes\" no presente simples."
        ),
        Q(
            "Passado Simples",
            "Qual é o passado de \"go\"?",
            ["Went", "Goed", "Gone", "Goes"],
            "Went",
            "\"Go\" é um verbo irregular."
        ),
        Q(
            "Comparativos",
            "Complete: \"A lion is ___ than a cat.\"",
            ["bigger", "big", "biggest", "more big"],
            "bigger",
            "Para comparar duas coisas, use o comparativo."
        ),
        Q(
            "Palavras de Pergunta",
            "Qual palavra usamos para perguntar o motivo de alguma coisa?",
            ["Why", "Where", "Who", "When"],
            "Why",
            "\"Why\" pergunta a razão."
        ),
        Q(
            "Vocabulário",
            "O que \"borrow\" significa em português?",
            ["Pegar emprestado", "Comprar", "Vender", "Perder"],
            "Pegar emprestado",
            "É quando você pega algo e pretende devolver."
        ),
        Q(
            "Leitura",
            "Leia: \"Tom has a red bike.\" Qual é a cor da bicicleta?",
            ["Red", "Blue", "Green", "Yellow"],
            "Red",
            "A frase diz que a bicicleta é red."
        ),
        Q(
            "Futuro",
            "Qual frase fala sobre uma ação futura?",
            ["I will play soccer.", "I played soccer.", "I play soccer every day.", "I am playing soccer now."],
            "I will play soccer.",
            "\"Will\" é usado para falar sobre o futuro."
        ),
        Q(
            "Conjunções",
            "Qual palavra em inglês significa \"porque\"?",
            ["Because", "But", "Or", "And"],
            "Because",
            "Ela é usada para dar uma razão."
        ),
        Q(
            "Possessivos",
            "Qual frase mostra que a mochila pertence a Ana?",
            ["Ana's backpack is blue.", "Ana backpack is blue.", "Anas backpack is blue.", "Ana is backpack blue."],
            "Ana's backpack is blue.",
            "Use apostrofo + s para mostrar posse."
        ),
        Q(
            "Advérbios",
            "Qual palavra completa melhor: \"He speaks ___.\"?",
            ["clearly", "blue", "book", "tall"],
            "clearly",
            "A palavra deve dizer como ele fala."
        )
    ],

    4: [
        Q(
            "Presente Contínuo",
            "Qual frase significa \"Ela está lendo agora\"?",
            ["She is reading now.", "She reads yesterday.", "She is read now.", "She reading now."],
            "She is reading now.",
            "Use \"is + verbo com -ing\" para uma ação acontecendo agora."
        ),
        Q(
            "Superlativos",
            "Complete: \"Mount Everest is the ___ mountain.\"",
            ["highest", "higher", "high", "most high"],
            "highest",
            "O superlativo compara uma coisa com um grupo inteiro."
        ),
        Q(
            "Preposições",
            "Complete: \"The keys are ___ my bag.\"",
            ["in", "at", "to", "from"],
            "in",
            "\"In\" indica que algo está dentro."
        ),
        Q(
            "Verbos Modais",
            "Qual frase dá um conselho?",
            ["You should study.", "You studied.", "You are study.", "You studies."],
            "You should study.",
            "\"Should\" é usado para dar conselhos."
        ),
        Q(
            "Condicionais",
            "Complete: \"If it rains, I ___ at home.\"",
            ["stay", "stays", "stayed", "staying"],
            "stay",
            "Nesse padrão básico, usamos presente depois de \"if\"."
        ),
        Q(
            "Passado Simples",
            "Qual frase está no passado corretamente?",
            ["We visited the museum yesterday.", "We visit the museum yesterday.", "We visits the museum yesterday.", "We are visit the museum yesterday."],
            "We visited the museum yesterday.",
            "\"Yesterday\" mostra que a ação aconteceu no passado."
        ),
        Q(
            "Comparativos",
            "Qual frase está correta?",
            ["Math is more difficult than art.", "Math is difficulter than art.", "Math more difficult art.", "Math is most difficult than art."],
            "Math is more difficult than art.",
            "Com adjetivos longos, usamos \"more + adjetivo + than\"."
        ),
        Q(
            "Vocabulário",
            "O que \"careful\" significa?",
            ["Cuidadoso", "Barulhento", "Vazio", "Cansado"],
            "Cuidadoso",
            "Uma pessoa careful toma cuidado para evitar erros ou perigos."
        ),
        Q(
            "Leitura",
            "Leia: \"The store opens at 9:00 and closes at 18:00.\" Quando ela fecha?",
            ["18:00", "9:00", "8:00", "17:00"],
            "18:00",
            "Observe o segundo horário da frase."
        ),
        Q(
            "Perguntas",
            "Qual é a pergunta correta para \"Onde você mora?\"",
            ["Where do you live?", "Where you live?", "Where does you live?", "Where are live you?"],
            "Where do you live?",
            "Com you, use \"do\" no presente simples."
        )
    ],

    5: [
        Q(
            "Present Perfect",
            "Qual frase está correta?",
            ["She has lived here for two years.", "She live here for two years.", "She living here for two years.", "She has live here for two years."],
            "She has lived here for two years.",
            "Use \"has + particípio passado\" com she."
        ),
        Q(
            "Passado Simples",
            "Qual frase está no passado simples?",
            ["They ate dinner.", "They have eaten.", "They are eating.", "They will eat."],
            "They ate dinner.",
            "\"Ate\" é a forma passada de \"eat\"."
        ),
        Q(
            "First Conditional",
            "Complete: \"If I have time, I ___ you.\"",
            ["will call", "called", "calling", "calls"],
            "will call",
            "No first conditional, usamos \"will\" na consequência."
        ),
        Q(
            "Comparativos",
            "Qual frase usa o comparativo corretamente?",
            ["This puzzle is less difficult than the last one.", "This puzzle is less difficulter than the last one.", "This puzzle less difficult the last one.", "This puzzle is least difficult than the last one."],
            "This puzzle is less difficult than the last one.",
            "Use \"less + adjetivo + than\"."
        ),
        Q(
            "Vocabulário",
            "O que \"improve\" significa?",
            ["Melhorar", "Parar", "Perder", "Esconder"],
            "Melhorar",
            "É tornar alguma coisa melhor."
        ),
        Q(
            "Leitura",
            "Leia: \"Lucas wanted to learn guitar, so he practiced every day.\" Por que Lucas praticava todos os dias?",
            ["He wanted to learn guitar.", "He disliked music.", "He was sleeping.", "He lost his guitar."],
            "He wanted to learn guitar.",
            "\"So\" liga a ideia ao resultado."
        ),
        Q(
            "Voz Passiva",
            "Qual frase está na voz passiva?",
            ["The meal was cooked by the chef.", "The chef cooked the meal.", "The chef is cooking the meal.", "The chef will cook the meal."],
            "The meal was cooked by the chef.",
            "Na voz passiva, o foco está em quem ou no que recebeu a ação."
        ),
        Q(
            "Modais",
            "Qual frase expressa possibilidade?",
            ["It might rain.", "It must rain.", "It rains.", "It rained."],
            "It might rain.",
            "\"Might\" indica possibilidade."
        ),
        Q(
            "Second Conditional",
            "Qual frase está correta?",
            ["If I had more time, I would read more.", "If I have more time, I would read more.", "If I had more time, I will read more.", "If I has more time, I would read more."],
            "If I had more time, I would read more.",
            "Esse é um padrão básico do second conditional."
        ),
        Q(
            "Vocabulário",
            "O que \"reliable\" significa?",
            ["Em que se pode confiar", "Barulhento", "Pequeno", "Perigoso"],
            "Em que se pode confiar",
            "Algo reliable é algo em que podemos confiar."
        )
    ]
};

let currentGrade = 1;
let currentQuestion = null;
let questionsAnswered = 0;
let correctAnswers = 0;
const totalQuestions = 10;
let mistakesByTopic = {};
let hintUsedThisQuestion = false;
let totalHintsUsed = 0;
let hintPenaltyPoints = 0;
let hintTalkTimer = null;
let answeredThisQuestion = false;
let questionOrder = [];
let questionOrderIndex = 0;

const quizContainer = document.getElementById("quizContainer");
const gradeLabel = document.getElementById("gradeLabel");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("nextButton");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("quizProgressFill");
const hintTitle = document.getElementById("hintTitle");
const hintText = document.getElementById("hintText");
const hintButton = document.getElementById("hintButton");
const assistantFace = document.getElementById("assistantFace");

function getGradeFromURL() {
    const params = new URLSearchParams(window.location.search);
    const grade = Number(params.get("grade"));

    return grade >= 1 &&
        grade <= 5 &&
        englishQuestions[grade]
        ? grade
        : 1;
}

function shuffle(array) {
    const shuffled = [...array];

    for (
        let i = shuffled.length - 1;
        i > 0;
        i--
    ) {
        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

/*
    The English subject is Portuguese-only for now.
    We can add the English UI/content mode later.
*/

function getCurrentLanguage() {
    return "pt-BR";
}

function formatScore(score) {
    return Number.isInteger(score)
        ? String(score)
        : score.toFixed(1);
}

function updateProgress() {
    progressText.textContent =
        `Questão ${questionsAnswered + 1} de ${totalQuestions}`;

    progressFill.style.width =
        `${(questionsAnswered / totalQuestions) * 100}%`;
}

function resetHint() {
    if (hintTalkTimer) {
        clearTimeout(hintTalkTimer);
        hintTalkTimer = null;
    }

    hintTitle.textContent = "Dica";
    hintText.textContent =
        "Estou aqui para ajudar!";

    hintText.classList.remove("shown");

    hintButton.textContent =
        "Mostrar Dica";

    assistantFace.textContent = ":)";
    assistantFace.classList.remove("talking");
}

function showHint() {
    if (!currentQuestion) {
        return;
    }

    if (
        hintText.classList.contains(
            "shown"
        )
    ) {
        hintText.textContent =
            "Estou aqui para ajudar!";

        hintText.classList.remove(
            "shown"
        );

        hintButton.textContent =
            "Mostrar Dica";

        assistantFace.textContent = ":)";
        assistantFace.classList.remove(
            "talking"
        );

        if (hintTalkTimer) {
            clearTimeout(hintTalkTimer);
            hintTalkTimer = null;
        }

        return;
    }

    if (!hintUsedThisQuestion) {
        hintUsedThisQuestion = true;
        totalHintsUsed++;
    }

    hintText.textContent =
        currentQuestion["pt-BR"].hint;

    hintText.classList.add("shown");

    hintButton.textContent =
        "Esconder Dica";

    assistantFace.textContent = ":D";
    assistantFace.classList.add("talking");

    if (hintTalkTimer) {
        clearTimeout(hintTalkTimer);
    }

    hintTalkTimer = setTimeout(
        () => {
            assistantFace.textContent =
                ":)";

            assistantFace.classList.remove(
                "talking"
            );

            hintTalkTimer = null;
        },
        2500
    );
}

function renderAnswers() {
    const questionData =
        currentQuestion["pt-BR"];

    answersElement.innerHTML = "";

    shuffle(
        questionData.answers
    ).forEach(answer => {

        const button =
            document.createElement(
                "button"
            );

        button.type = "button";
        button.className =
            "answerButton";

        button.textContent =
            answer;

        button.addEventListener(
            "click",
            () =>
                checkAnswer(
                    answer,
                    button
                )
        );

        answersElement.appendChild(
            button
        );
    });
}

function loadQuestion() {
    answeredThisQuestion = false;
    hintUsedThisQuestion = false;

    resetHint();

    resultElement.textContent = "";
    resultElement.className =
        "quizResult";

    nextButton.style.display =
        "none";

    const pool =
        englishQuestions[
            currentGrade
        ];

    if (questionOrder.length > 0) {

        currentQuestion =
            pool[
                questionOrder[
                    questionOrderIndex
                ]
            ];

        questionOrderIndex++;

    } else {

        currentQuestion =
            pool[
                Math.floor(
                    Math.random() *
                    pool.length
                )
            ];
    }

    const questionData =
        currentQuestion["pt-BR"];

    gradeLabel.textContent =
        `Inglês • Ano ${currentGrade}`;

    questionElement.textContent =
        questionData.question;

    renderAnswers();
    updateProgress();
}

function checkAnswer(
    selectedAnswer,
    clickedButton
) {
    if (answeredThisQuestion) {
        return;
    }

    answeredThisQuestion = true;

    const questionData =
        currentQuestion["pt-BR"];

    const answerButtons =
        answersElement.querySelectorAll(
            ".answerButton"
        );

    answerButtons.forEach(
        button => {
            button.disabled = true;
        }
    );

    const isCorrect =
        selectedAnswer ===
        questionData.correctAnswer;

    if (isCorrect) {

        correctAnswers++;

        if (hintUsedThisQuestion) {
            hintPenaltyPoints += 0.5;
        }

        clickedButton.classList.add(
            "correct"
        );

        resultElement.textContent =
            "Correto!";

        resultElement.className =
            "quizResult correctResult";

    } else {

        clickedButton.classList.add(
            "wrong"
        );

        answerButtons.forEach(
            button => {

                if (
                    button.textContent ===
                    questionData.correctAnswer
                ) {
                    button.classList.add(
                        "correct"
                    );
                }
            }
        );

        const topic =
            currentQuestion.topic;

        mistakesByTopic[topic] =
            (mistakesByTopic[topic] || 0)
            + 1;

        resultElement.textContent =
            "Errado!";

        resultElement.className =
            "quizResult wrongResult";
    }

    if (hintTalkTimer) {
        clearTimeout(hintTalkTimer);
        hintTalkTimer = null;
    }

    assistantFace.textContent = ":)";
    assistantFace.classList.remove(
        "talking"
    );

    nextButton.textContent =
        questionsAnswered + 1 >=
        totalQuestions
            ? "Ver Resultado"
            : "Próxima Questão";

    nextButton.style.display =
        "block";
}

nextButton.addEventListener(
    "click",
    () => {

        if (!answeredThisQuestion) {
            return;
        }

        questionsAnswered++;

        if (
            questionsAnswered >=
            totalQuestions
        ) {
            finishQuiz();
            return;
        }

        loadQuestion();
    }
);

function finishQuiz() {

    if (hintTalkTimer) {
        clearTimeout(hintTalkTimer);
        hintTalkTimer = null;
    }

    const finalScore =
        Math.max(
            0,
            correctAnswers -
            hintPenaltyPoints
        );

    const percentage =
        Math.round(
            (finalScore /
                totalQuestions) *
            100
        );

    let weakestTopic = "";
    let highestMistakes = 0;

    Object.keys(
        mistakesByTopic
    ).forEach(topic => {

        if (
            mistakesByTopic[topic] >
            highestMistakes
        ) {
            highestMistakes =
                mistakesByTopic[topic];

            weakestTopic =
                topic;
        }
    });

    let feedback;

    if (finalScore === 10) {

        feedback =
            "Perfeito! Você mandou muito bem!";

    } else if (finalScore >= 8) {

        feedback =
            "Muito bom! Você está entendendo bastante inglês.";

    } else if (finalScore >= 6) {

        feedback =
            "Bom trabalho! Continue praticando para ficar ainda melhor.";

    } else if (finalScore >= 4) {

        feedback =
            "Você já tem uma boa base. Continue praticando!";

    } else {

        feedback =
            "Não tem problema! Revise as palavras e tente novamente.";
    }

    quizContainer.innerHTML = "";

    const completeScreen =
        document.createElement(
            "div"
        );

    completeScreen.className =
        "quizComplete";

    const title =
        document.createElement(
            "h2"
        );

    title.textContent =
        "Quiz Completo!";

    completeScreen.appendChild(
        title
    );

    const scoreElement =
        document.createElement(
            "div"
        );

    scoreElement.className =
        "quizScore";

    scoreElement.textContent =
        `${formatScore(finalScore)}/${totalQuestions}`;

    completeScreen.appendChild(
        scoreElement
    );

    const percentageElement =
        document.createElement(
            "div"
        );

    percentageElement.className =
        "quizPercentage";

    percentageElement.textContent =
        `${percentage}%`;

    completeScreen.appendChild(
        percentageElement
    );

    const feedbackElement =
        document.createElement(
            "p"
        );

    feedbackElement.className =
        "quizFeedback";

    feedbackElement.textContent =
        feedback;

    completeScreen.appendChild(
        feedbackElement
    );

    if (weakestTopic) {

        const weakTopicElement =
            document.createElement(
                "p"
            );

        weakTopicElement.className =
            "quizWeakTopic";

        weakTopicElement.textContent =
            `Você teve mais dificuldade em: ${weakestTopic}`;

        completeScreen.appendChild(
            weakTopicElement
        );
    }

    if (totalHintsUsed > 0) {

        const hintInfo =
            document.createElement(
                "p"
            );

        hintInfo.className =
            "quizWeakTopic";

        hintInfo.textContent =
            `Dicas usadas: ${totalHintsUsed}`;

        completeScreen.appendChild(
            hintInfo
        );
    }

    const backButton =
        document.createElement(
            "a"
        );

    backButton.className =
        "backToGradesButton";

    backButton.href =
        "english.html";

    backButton.textContent =
        "Voltar para os Anos";

    completeScreen.appendChild(
        backButton
    );

    quizContainer.appendChild(
        completeScreen
    );

    if (
        finalScore ===
        totalQuestions
    ) {
        createConfetti();
    }
}

function createConfetti() {

    const container =
        document.createElement(
            "div"
        );

    container.className =
        "confettiContainer";

    const colors = [
        "#ff6b6b",
        "#ffd56e",
        "#6bcb77",
        "#4d96ff",
        "#c77dff",
        "#ff9f68"
    ];

    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );

        piece.className =
            "confetti";

        piece.style.left =
            `${Math.random() * 100}%`;

        piece.style.backgroundColor =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        piece.style.animationDelay =
            `${Math.random() * 0.8}s`;

        piece.style.animationDuration =
            `${2 + Math.random() * 2}s`;

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        container.appendChild(
            piece
        );
    }

    document.body.appendChild(
        container
    );

    setTimeout(
        () => container.remove(),
        5000
    );
}

hintButton.addEventListener(
    "click",
    showHint
);

currentGrade =
    getGradeFromURL();

const questionPool =
    englishQuestions[
        currentGrade
    ];

if (
    questionPool.length >=
    totalQuestions
) {

    questionOrder =
        shuffle(
            questionPool.map(
                (_, index) =>
                    index
            )
        );

    questionOrderIndex = 0;

} else {

    questionOrder = [];
    questionOrderIndex = 0;
}

loadQuestion();