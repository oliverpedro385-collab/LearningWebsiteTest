/* =========================================================
   TECHNOLOGY DATA
   Programming curriculum for Grades 1-5.
   ========================================================= */

const technologyUI = {
    technology: { en: "Technology", pt: "Tecnologia" },
    programming: { en: "Programming", pt: "Programação" },
    programmingLanguages: { en: "Programming Languages", pt: "Linguagens de Programação" },
    chooseLanguage: { en: "Choose a language", pt: "Escolha uma linguagem" },
    chooseProgrammingGrade: { en: "Choose your grade", pt: "Escolha seu ano" },
    java: { en: "Java", pt: "Java" },
    python: { en: "Python", pt: "Python" },
    luau: { en: "Luau", pt: "Luau" },
    programmingChallenge: { en: "Programming Challenge", pt: "Desafio de Programação" },
    runCode: { en: "Run Code", pt: "Executar Código" },
    resetCode: { en: "Reset", pt: "Redefinir" },
    yourCode: { en: "Your Code", pt: "Seu Código" },
    objective: { en: "Objective", pt: "Objetivo" },
    console: { en: "Console", pt: "Console" },
    needHint: { en: "Need a hint?", pt: "Precisa de uma dica?" },
    showHint: { en: "Show Hint", pt: "Mostrar Dica" },
    hideHint: { en: "Hide Hint", pt: "Esconder Dica" },
    codeRunning: { en: "Running your code...", pt: "Executando seu código..." },
    codeComplete: { en: "Nice! Challenge complete!", pt: "Boa! Desafio concluído!" },
    codeFailed: { en: "The code stopped before reaching the goal.", pt: "O código parou antes de chegar ao objetivo." },
    syntaxError: { en: "Syntax error", pt: "Erro de sintaxe" },
    runtimeError: { en: "Runtime error", pt: "Erro durante a execução" },
    hitWall: { en: "The square hit a wall.", pt: "O quadrado bateu em uma parede." },
    leftBoard: { en: "The square tried to leave the board.", pt: "O quadrado tentou sair do tabuleiro." },
    maxSteps: { en: "Your program used too many steps.", pt: "Seu programa usou passos demais." },
    emptyCode: { en: "Write some code first!", pt: "Escreva algum código primeiro!" }
};

const programmingLanguages = [
    {
        id: "python",
        name: "Python",
        description: {
            en: "Readable code with indentation, variables, loops and conditions.",
            pt: "Código fácil de ler com indentação, variáveis, laços e condições."
        }
    },
    {
        id: "java",
        name: "Java",
        description: {
            en: "A structured language with types, braces, loops and methods.",
            pt: "Uma linguagem estruturada com tipos, chaves, laços e métodos."
        }
    },
    {
        id: "luau",
        name: "Luau",
        description: {
            en: "A fast scripting language made for Roblox experiences.",
            pt: "Uma linguagem de scripts rápida feita para experiências Roblox."
        }
    }
];

const programmingChallenges = {
    1: {
        concept: "Sequencing + Comments",
        conceptPt: "Sequência + Comentários",

        title: "Move the Happy Square",
        titlePt: "Mova o Quadrado Feliz",

        objective: {
            en: "Reach the star. Use movement commands in order, and include at least one comment explaining your code.",
            pt: "Chegue até a estrela. Use os comandos de movimento em ordem e inclua pelo menos um comentário explicando seu código."
        },

        world: {
            width: 6,
            height: 4,
            start: { x: 0, y: 1 },
            finish: { x: 4, y: 1 },
            obstacles: []
        },

        requirements: {
            comment: true
        },

        hint: {
            python: "Try move_right() a few times. Lines beginning with # are comments.",
            java: "Try moveRight(); a few times. Lines beginning with // are comments.",
            luau: "Try moveRight() a few times. Lines beginning with -- are comments."
        },

        starterCode: {
            python: `# Explain what this code is doing
move_right()
move_right()`,

            java: `// Explain what this code is doing
moveRight();
moveRight();`,

            luau: `-- Explain what this code is doing
moveRight()
moveRight()`
        },

        postSuccess: {
            en: "You just wrote a program as a sequence of instructions!",
            pt: "Você acabou de escrever um programa como uma sequência de instruções!"
        }
    },

    2: {
        concept: "Variables + Math",
        conceptPt: "Variáveis + Matemática",

        title: "Calculate the Steps",
        titlePt: "Calcule os Passos",

        objective: {
            en: "Create a variable named steps, calculate 2 + 4, and use steps to reach the star. Printing steps is optional but useful for debugging.",
            pt: "Crie uma variável chamada steps, calcule 2 + 4 e use steps para chegar até a estrela. Imprimir steps é opcional, mas ajuda a depurar."
        },

        world: {
            width: 7,
            height: 5,
            start: { x: 0, y: 2 },
            finish: { x: 6, y: 2 },
            obstacles: []
        },

        requirements: {
            variable: "steps",
            variableValue: 6
        },

        hint: {
            python: "Try: steps = 2 + 4\nThen: move_right(steps)",
            java: "Try: int steps = 2 + 4;\nThen: moveRight(steps);",
            luau: "Try: local steps = 2 + 4\nThen: moveRight(steps)"
        },

        starterCode: {
            python: `steps = 2 + 2
print(steps)
move_right(steps)`,

            java: `int steps = 2 + 2;
System.out.println(steps);
moveRight(steps);`,

            luau: `local steps = 2 + 2
print(steps)
moveRight(steps)`
        },

        postSuccess: {
            en: "Variables let you name data, and math lets your program calculate with it.",
            pt: "Variáveis dão nome aos dados, e a matemática permite que o programa faça cálculos com eles."
        }
    },

    3: {
        concept: "Conditions",
        conceptPt: "Condições",

        title: "Find a Way Around",
        titlePt: "Encontre um Caminho",

        objective: {
            en: "Use an if statement to react to the wall. The path is designed so a hard-coded line of movement is not enough.",
            pt: "Use uma condição if para reagir à parede. O caminho foi feito para que apenas uma sequência fixa de movimentos não seja suficiente."
        },

        world: {
            width: 7,
            height: 4,
            start: { x: 0, y: 2 },
            finish: { x: 6, y: 0 },

            obstacles: [
                { x: 3, y: 2 }
            ]
        },

        requirements: {
            ifStatement: true
        },

        hint: {
            python: "Check the path with if is_wall_ahead(): and move up when needed.",
            java: "Check the path with if (isWallAhead()) { ... } and move up when needed.",
            luau: "Check the path with if isWallAhead() then ... end and move up when needed."
        },

        starterCode: {
            python: `move_right(2)
if is_wall_ahead():
    move_up(2)
move_right(4)`,

            java: `moveRight(2);
if (isWallAhead()) {
    moveUp(2);
}
moveRight(4);`,

            luau: `moveRight(2)
if isWallAhead() then
    moveUp(2)
end
moveRight(4)`
        },

        postSuccess: {
            en: "A condition lets your program make a choice based on what is happening.",
            pt: "Uma condição permite que seu programa tome uma decisão com base no que está acontecendo."
        }
    },

    4: {
        concept: "Loops",
        conceptPt: "Laços de Repetição",

        title: "Repeat the Pattern",
        titlePt: "Repita o Padrão",

        objective: {
            en: "Use a loop to move right 9 times. Do not write nine separate movement commands.",
            pt: "Use um laço para mover 9 vezes para a direita. Não escreva nove comandos de movimento separados."
        },

        world: {
            width: 10,
            height: 4,
            start: { x: 0, y: 2 },
            finish: { x: 9, y: 2 },
            obstacles: []
        },

        requirements: {
            loop: true
        },

        hint: {
            python: "Try: for i in range(9):\n    move_right()",
            java: "Try: for (int i = 0; i < 9; i++) {\n    moveRight();\n}",
            luau: "Try: for i = 1, 9 do\n    moveRight()\nend"
        },

        starterCode: {
            python: `for i in range(3):
    move_right()
move_right()`,

            java: `for (int i = 0; i < 3; i++) {
    moveRight();
}
moveRight();`,

            luau: `for i = 1, 3 do
    moveRight()
end
moveRight()`
        },

        postSuccess: {
            en: "Loops let you repeat instructions without writing the same code again and again.",
            pt: "Laços permitem repetir instruções sem escrever o mesmo código várias vezes."
        }
    },

    5: {
        concept: "Functions + Debugging",
        conceptPt: "Funções + Depuração",

        title: "Fix the Function",
        titlePt: "Conserte a Função",

        objective: {
            en: "Fix the broken function, then call it. The function must guide the square to the star. Look for the wrong movement in the starter code.",
            pt: "Conserte a função quebrada e depois chame-a. A função deve levar o quadrado até a estrela. Procure o movimento errado no código inicial."
        },

        world: {
            width: 10,
            height: 6,
            start: { x: 0, y: 5 },
            finish: { x: 9, y: 0 },
            obstacles: []
        },

        requirements: {
            functionDefinition: "go",
            functionCall: "go"
        },

        hint: {
            python: "The function is named go. One movement inside it is wrong. Fix it, then call go().",
            java: "The method is named go. One movement inside it is wrong. Fix it, then call go();",
            luau: "The function is named go. One movement inside it is wrong. Fix it, then call go()"
        },

        starterCode: {
            python: `def go():
    move_right(8)
    move_left()
    move_up(5)

go()`,

            java: `void go() {
    moveRight(8);
    moveLeft();
    moveUp(5);
}

go();`,

            luau: `function go()
    moveRight(8)
    moveLeft()
    moveUp(5)
end

go()`
        },

        postSuccess: {
            en: "Great debugging! Functions let you package instructions and reuse them by name.",
            pt: "Boa depuração! Funções permitem agrupar instruções e reutilizá-las pelo nome."
        }
    }
};

function getProgrammingChallenge(grade) {
    const numericGrade = Number(grade);
    return programmingChallenges[numericGrade] || programmingChallenges[1];
}