const LANGUAGE_KEY = "siteLanguage";

const translations = {

    "en": {

        welcome: "Welcome",
        whatShouldWeCallYou: "What should we call you?",
        enterYourName: "Enter your name",
        continue: "Continue",

        chooseSubject: "Choose a subject to start learning.",

        math: "Math",
        english: "English",
        science: "Science",
        history: "History",

        library: "Library",
        libraryDescription: "Read about different topics and subjects.",

        settings: "Settings",

        darkMode: "Dark Mode",
        darkModeDescription: "Change between day and night",
        on: "ON",
        off: "OFF",

        yourName: "Your Name",
        changeName: "Change Name",
        nameChanged: "Name changed!",
        pleaseEnterName: "Please enter a name.",

        language: "Language",
        englishLanguage: "English",
        portugueseBrazil: "Português (Brasil)",

        highlighterColor: "Highlighter Color",
        highlighterDescription:
            "Choose the color used for new highlights.",

        midDay: "Mid-Day",
        chooseGrade: "Choose your grade.",

        grade1: "Grade 1",
        grade2: "Grade 2",
        grade3: "Grade 3",
        grade4: "Grade 4",
        grade5: "Grade 5",

        correct: "Correct!",
        wrong: "Wrong!",
        nextQuestion: "Next Question",

        learnMath:
            "Learn useful mathematical concepts.",

        learnEnglish:
            "Explore grammar, vocabulary and language.",

        learnScience:
            "Discover how the world around us works.",

        learnHistory:
            "Learn about important events and civilizations."
    },


    "pt-BR": {

        welcome: "Opa, seja bem vindo",
        whatShouldWeCallYou: "Como podemos te chamar?",
        enterYourName: "Coloque seu nome",
        continue: "Continuar",

        chooseSubject: "Escolha a matéria que você gostaria de estudar!",

        math: "Matemática",
        english: "Inglês",
        science: "Ciências",
        history: "História",

        library: "Biblioteca",
        libraryDescription: "Leia sobre diferentes assuntos e matérias.",

        settings: "Configurações",

        darkMode: "Modo Escuro",
        darkModeDescription: "Alterne entre dia e noite",
        on: "ATIVADO",
        off: "DESATIVADO",

        yourName: "Seu Nome",
        changeName: "Alterar Nome",
        nameChanged: "Nome alterado!",
        pleaseEnterName: "Digite um nome.",

        language: "Idioma",
        englishLanguage: "English",
        portugueseBrazil: "Português (Brasil)",

        highlighterColor: "Cor do Marca-texto",
        highlighterDescription:
            "Escolha a cor usada para novos destaques.",

        midDay: "Novos",
        chooseGrade: "Escolha seu ano para ter o conteúdo",

        grade1: "1º Ano",
        grade2: "2º Ano",
        grade3: "3º Ano",
        grade4: "4º Ano",
        grade5: "5º Ano",

        correct: "Correto!",
        wrong: "Errado!",
        nextQuestion: "Próxima Questão",

        learnMath:
            "Aprenda conceitos matemáticos importantes.",

        learnEnglish:
            "Explore gramática, vocabulário e linguagem.",

        learnScience:
            "Descubra como o mundo ao seu redor funciona.",

        learnHistory:
            "Aprenda sobre acontecimentos e civilizações importantes."
    }
};


function getLanguage() {

    return localStorage.getItem(LANGUAGE_KEY) || "en";
}


function setLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    localStorage.setItem(
        LANGUAGE_KEY,
        language
    );

    applyLanguage();

    document.dispatchEvent(
        new CustomEvent("languageChanged")
    );
}


function t(key) {

    const language = getLanguage();

    return (
        translations[language]?.[key] ??
        translations["en"]?.[key] ??
        key
    );
}


function applyLanguage() {

    const language = getLanguage();

    document.documentElement.lang =
        language;


    document
        .querySelectorAll("[data-i18n]")
        .forEach(function(element) {

            const key =
                element.dataset.i18n;

            element.textContent =
                t(key);
        });


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(function(element) {

            const key =
                element.dataset.i18nPlaceholder;

            element.placeholder =
                t(key);
        });
}


window.getLanguage =
    getLanguage;

window.setLanguage =
    setLanguage;

window.t =
    t;

window.applyLanguage =
    applyLanguage;


document.addEventListener(
    "DOMContentLoaded",
    function() {

        applyLanguage();
    }
);