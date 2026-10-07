/* =========================================================
   MATH LAB DATA + QUESTION GENERATORS
   ========================================================= */

(() => {
    "use strict";

    const difficulties = [
        { id: "easy", en: "Easy", pt: "Fácil" },
        { id: "medium", en: "Medium", pt: "Médio" },
        { id: "hard", en: "Hard", pt: "Difícil" },
        { id: "difficult", en: "Difficult", pt: "Muito difícil" },
        { id: "extreme", en: "Extreme", pt: "Extremo" }
    ];

    const tabs = {
        operations: {
            en: "Operations",
            pt: "Operações",
            topics: [
                {
                    id: "addition",
                    en: "Addition",
                    pt: "Adição",
                    descriptionEn: "Build speed and accuracy with sums.",
                    descriptionPt: "Treine velocidade e precisão com somas."
                },
                {
                    id: "subtraction",
                    en: "Subtraction",
                    pt: "Subtração",
                    descriptionEn: "Subtract numbers without losing your way.",
                    descriptionPt: "Subtraia números sem se perder."
                },
                {
                    id: "multiplication",
                    en: "Multiplication",
                    pt: "Multiplicação",
                    descriptionEn: "From quick facts to larger products.",
                    descriptionPt: "De contas rápidas a produtos maiores."
                },
                {
                    id: "division",
                    en: "Division",
                    pt: "Divisão",
                    descriptionEn: "Practice exact and whole-number division.",
                    descriptionPt: "Pratique divisões exatas e com números inteiros."
                }
            ]
        },

        numbers: {
            en: "Numbers",
            pt: "Números",
            topics: [
                {
                    id: "fractions",
                    en: "Fractions",
                    pt: "Frações",
                    descriptionEn: "Compare, simplify and calculate with fractions.",
                    descriptionPt: "Compare, simplifique e calcule com frações."
                },
                {
                    id: "decimals",
                    en: "Decimals",
                    pt: "Decimais",
                    descriptionEn: "Move between place values and calculations.",
                    descriptionPt: "Trabalhe com casas decimais e cálculos."
                },
                {
                    id: "percentages",
                    en: "Percentages",
                    pt: "Porcentagens",
                    descriptionEn: "Turn percentages into useful calculations.",
                    descriptionPt: "Transforme porcentagens em cálculos úteis."
                },
                {
                    id: "powers",
                    en: "Powers",
                    pt: "Potências",
                    descriptionEn: "See how repeated multiplication grows.",
                    descriptionPt: "Veja como a multiplicação repetida cresce."
                },
                {
                    id: "square-roots",
                    en: "Square Roots",
                    pt: "Raízes quadradas",
                    descriptionEn: "Find the number that squares to the target.",
                    descriptionPt: "Encontre o número que elevado ao quadrado dá o alvo."
                }
            ]
        },

        functions: {
            en: "Functions",
            pt: "Funções",
            topics: [
                {
                    id: "function-basics",
                    en: "Function Basics",
                    pt: "Funções básicas",
                    descriptionEn: "Feed values into functions and predict outputs.",
                    descriptionPt: "Coloque valores nas funções e descubra as saídas."
                },
                {
                    id: "function-tables",
                    en: "Function Tables",
                    pt: "Tabelas de funções",
                    descriptionEn: "Complete tables and discover patterns.",
                    descriptionPt: "Complete tabelas e descubra padrões."
                },
                {
                    id: "linear-functions",
                    en: "Linear Functions",
                    pt: "Funções lineares",
                    descriptionEn: "Work with slope, intercepts and straight lines.",
                    descriptionPt: "Trabalhe com inclinação, interceptos e retas."
                },
                {
                    id: "quadratics",
                    en: "Quadratics",
                    pt: "Quadráticas",
                    descriptionEn: "Explore parabolas and quadratic expressions.",
                    descriptionPt: "Explore parábolas e expressões quadráticas."
                },
                {
                    id: "graphs",
                    en: "Graphs",
                    pt: "Gráficos",
                    descriptionEn: "Read coordinates and reason from graphs.",
                    descriptionPt: "Leia coordenadas e raciocine a partir dos gráficos."
                },
                {
                    id: "function-art",
                    en: "Function Art",
                    pt: "Arte com funções",
                    descriptionEn: "Turn equations into drawings on a coordinate plane.",
                    descriptionPt: "Transforme equações em desenhos no plano cartesiano."
                }
            ]
        },

        geometry: {
            en: "Geometry",
            pt: "Geometria",
            topics: [
                {
                    id: "shapes",
                    en: "Shapes",
                    pt: "Formas",
                    descriptionEn: "Recognize properties of common shapes.",
                    descriptionPt: "Reconheça propriedades de formas comuns."
                },
                {
                    id: "angles",
                    en: "Angles",
                    pt: "Ângulos",
                    descriptionEn: "Measure and classify angles.",
                    descriptionPt: "Meça e classifique ângulos."
                },
                {
                    id: "area-perimeter",
                    en: "Area & Perimeter",
                    pt: "Área e perímetro",
                    descriptionEn: "Calculate space inside and around shapes.",
                    descriptionPt: "Calcule o espaço dentro e ao redor das formas."
                },
                {
                    id: "coordinates",
                    en: "Coordinate Geometry",
                    pt: "Geometria no plano",
                    descriptionEn: "Use x and y coordinates to locate points.",
                    descriptionPt: "Use coordenadas x e y para localizar pontos."
                }
            ]
        }
    };

    const allTopics = Object.values(tabs)
        .flatMap(tab => tab.topics);

    function getTopic(id) {
        return allTopics.find(topic => topic.id === id) || allTopics[0];
    }

    function getDifficulty(id) {
        return difficulties.find(item => item.id === id) || difficulties[0];
    }

    function getAllTopics() {
        return allTopics.slice();
    }

    function randomInt(min, max) {
        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;
    }

    function gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);

        while (b !== 0) {
            const temp = a % b;
            a = b;
            b = temp;
        }

        return a || 1;
    }

    function fraction(
        numerator,
        denominator
    ) {

        if (denominator === 0) {
            return "undefined";
        }

        if (numerator === 0) {
            return "0";
        }

        const sign =
            denominator < 0
                ? -1
                : 1;

        numerator *= sign;
        denominator *= sign;

        const divisor =
            gcd(
                numerator,
                denominator
            );

        const n =
            numerator / divisor;

        const d =
            denominator / divisor;

        return d === 1
            ? String(n)
            : `${n}/${d}`;
    }

    function shuffle(array) {

        const result =
            array.slice();

        for (
            let i = result.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() *
                    (i + 1)
                );

            [
                result[i],
                result[j]
            ] = [
                result[j],
                result[i]
            ];
        }

        return result;
    }

    function choiceSet(
        answer,
        makeChoices,
        explanation,
        hint,
        prompt
    ) {

        const values =
            new Set([
                String(answer)
            ]);

        let guard = 0;

        while (
            values.size < 4 &&
            guard < 100
        ) {

            values.add(
                String(
                    makeChoices()
                )
            );

            guard++;
        }

        return {

            prompt,

            choices:
                shuffle([
                    ...values
                ]),

            answer:
                String(answer),

            explanation,

            hint
        };
    }


    /* =====================================================
       OPERATIONS
       ===================================================== */

    function generateAddition(
        level
    ) {

        const ranges = {

            easy: [
                1,
                20
            ],

            medium: [
                10,
                80
            ],

            hard: [
                20,
                250
            ],

            difficult: [
                50,
                1000
            ],

            extreme: [
                200,
                5000
            ]
        };

        const [
            min,
            max
        ] = ranges[level];

        const a =
            randomInt(
                min,
                max
            );

        const b =
            randomInt(
                min,
                max
            );

        const answer =
            a + b;

        return choiceSet(

            answer,

            () =>
                answer +
                randomInt(
                    -10,
                    10
                ) ||
                answer + 1,

            `${a} + ${b} = ${answer}.`,

            `Add ${a} and ${b}.`,

            `What is ${a} + ${b}?`
        );
    }


    function generateSubtraction(
        level
    ) {

        const ranges = {

            easy: [
                1,
                20
            ],

            medium: [
                10,
                80
            ],

            hard: [
                20,
                250
            ],

            difficult: [
                50,
                1000
            ],

            extreme: [
                200,
                5000
            ]
        };

        const [
            min,
            max
        ] = ranges[level];

        const a =
            randomInt(
                min,
                max
            );

        const b =
            randomInt(
                min,
                a
            );

        const answer =
            a - b;

        return choiceSet(

            answer,

            () =>
                Math.max(
                    0,
                    answer +
                    randomInt(
                        -10,
                        10
                    )
                ) +
                (
                    answer === 0
                        ? 1
                        : 0
                ),

            `${a} − ${b} = ${answer}.`,

            `Start with ${a} and take away ${b}.`,

            `What is ${a} − ${b}?`
        );
    }


    function generateMultiplication(
        level
    ) {

        const ranges = {

            easy: [
                1,
                5
            ],

            medium: [
                2,
                12
            ],

            hard: [
                5,
                25
            ],

            difficult: [
                10,
                60
            ],

            extreme: [
                20,
                150
            ]
        };

        const [
            min,
            max
        ] = ranges[level];

        const a =
            randomInt(
                min,
                max
            );

        const b =
            randomInt(
                min,
                max
            );

        const answer =
            a * b;

        return choiceSet(

            answer,

            () =>
                answer +
                randomInt(
                    -a * 2,
                    a * 2
                ) +
                1,

            `${a} × ${b} = ${answer}.`,

            `Multiply ${a} by ${b}.`,

            `What is ${a} × ${b}?`
        );
    }


    function generateDivision(
        level
    ) {

        const ranges = {

            easy: [
                1,
                5
            ],

            medium: [
                2,
                12
            ],

            hard: [
                3,
                25
            ],

            difficult: [
                5,
                60
            ],

            extreme: [
                10,
                150
            ]
        };

        const [
            min,
            max
        ] = ranges[level];

        const divisor =
            randomInt(
                min,
                max
            );

        const quotient =
            randomInt(
                min,
                max
            );

        const dividend =
            divisor *
            quotient;

        return choiceSet(

            quotient,

            () =>
                quotient +
                randomInt(
                    -5,
                    5
                ) +
                1,

            `${dividend} ÷ ${divisor} = ${quotient}.`,

            `Ask yourself: what number times ${divisor} gives ${dividend}?`,

            `What is ${dividend} ÷ ${divisor}?`
        );
    }


    /* =====================================================
       NUMBERS
       ===================================================== */

    function generateFractions(
        level
    ) {

        const max = {

            easy: 4,
            medium: 8,
            hard: 12,
            difficult: 18,
            extreme: 30

        }[level];

        const denominator =
            randomInt(
                2,
                max
            );

        const numerator =
            randomInt(
                1,
                denominator - 1
            );

        const multiplier =
            randomInt(
                2,
                4
            );

        const answer =
            fraction(
                numerator *
                multiplier,

                denominator *
                multiplier
            );

        return choiceSet(

            answer,

            () =>
                fraction(
                    randomInt(
                        1,
                        denominator * 2
                    ),
                    denominator
                ),

            `Multiplying numerator and denominator by ${multiplier} does not change the fraction.`,

            `Look for a common factor in the numerator and denominator.`,

            `Simplify ${numerator * multiplier}/${denominator * multiplier}.`
        );
    }


    function generateDecimals(
        level
    ) {

        const places = {

            easy: 1,
            medium: 1,
            hard: 2,
            difficult: 2,
            extreme: 3

        }[level];

        const scale =
            10 ** places;

        const a =
            randomInt(
                10,
                900
            ) / scale;

        const b =
            randomInt(
                10,
                500
            ) / scale;

        const answer =
            Number(
                (
                    a + b
                ).toFixed(
                    places
                )
            );

        return choiceSet(

            answer,

            () =>
                Number(
                    (
                        answer +
                        randomInt(
                            -20,
                            20
                        ) /
                        scale
                    ).toFixed(
                        places
                    )
                ),

            `${a.toFixed(places)} + ${b.toFixed(places)} = ${answer.toFixed(places)}.`,

            `Line up the decimal places before adding.`,

            `What is ${a.toFixed(places)} + ${b.toFixed(places)}?`
        );
    }


    function generatePercentages(
        level
    ) {

        const base = {

            easy:
                randomInt(
                    20,
                    100
                ),

            medium:
                randomInt(
                    40,
                    200
                ),

            hard:
                randomInt(
                    80,
                    500
                ),

            difficult:
                randomInt(
                    100,
                    1000
                ),

            extreme:
                randomInt(
                    300,
                    5000
                )

        }[level];

        const percentages = [
            5,
            10,
            15,
            20,
            25,
            30,
            40,
            50
        ];

        const percent =
            percentages[
                randomInt(
                    0,
                    percentages.length - 1
                )
            ];

        const answer =
            base *
            percent /
            100;

        return choiceSet(

            answer,

            () =>
                Number(
                    (
                        answer +
                        randomInt(
                            -5,
                            5
                        )
                    ).toFixed(2)
                ),

            `${percent}% of ${base} is ${answer}.`,

            `Turn ${percent}% into ${percent}/100, then multiply by ${base}.`,

            `What is ${percent}% of ${base}?`
        );
    }


    function generatePowers(
        level
    ) {

        const base = {

            easy:
                randomInt(
                    2,
                    5
                ),

            medium:
                randomInt(
                    2,
                    8
                ),

            hard:
                randomInt(
                    2,
                    12
                ),

            difficult:
                randomInt(
                    3,
                    15
                ),

            extreme:
                randomInt(
                    4,
                    20
                )

        }[level];

        const exponent =
            level === "extreme"
                ? randomInt(
                    2,
                    4
                )
                : randomInt(
                    2,
                    3
                );

        const answer =
            base **
            exponent;

        return choiceSet(

            answer,

            () =>
                base **
                Math.max(
                    1,
                    exponent +
                    randomInt(
                        -1,
                        1
                    )
                ),

            `${base}^${exponent} means multiplying ${base} by itself ${exponent} times.`,

            `A power tells you how many times the base is used as a factor.`,

            `What is ${base}^${exponent}?`
        );
    }


    function generateSquareRoots(
        level
    ) {

        const maxRoot = {

            easy: 10,
            medium: 15,
            hard: 25,
            difficult: 40,
            extreme: 75

        }[level];

        const root =
            randomInt(
                2,
                maxRoot
            );

        const number =
            root *
            root;

        return choiceSet(

            root,

            () =>
                Math.max(
                    1,
                    root +
                    randomInt(
                        -4,
                        4
                    )
                ),

            `${root} × ${root} = ${number}, so √${number} = ${root}.`,

            `Find the number that multiplied by itself equals ${number}.`,

            `What is √${number}?`
        );
    }


    /* =====================================================
       FUNCTIONS
       ===================================================== */

    function generateFunctionBasics(
        level
    ) {

        const max = {

            easy: 3,
            medium: 6,
            hard: 10,
            difficult: 15,
            extreme: 25

        }[level];

        const a =
            randomInt(
                -max,
                max
            ) || 1;

        const b =
            randomInt(
                -max,
                max
            );

        const x =
            randomInt(
                -5,
                8
            );

        const answer =
            a * x +
            b;

        const sign =
            b >= 0
                ? `+ ${b}`
                : `− ${Math.abs(b)}`;

        return choiceSet(

            answer,

            () =>
                answer +
                randomInt(
                    -8,
                    8
                ) +
                1,

            `f(${x}) = ${a}(${x}) ${sign} = ${answer}.`,

            `Substitute x = ${x} into the function.`,

            `If f(x) = ${a}x ${sign}, what is f(${x})?`
        );
    }


    function generateFunctionTables(
        level
    ) {

        const a =
            randomInt(
                -5,
                7
            ) || 1;

        const b =
            randomInt(
                -8,
                8
            );

        const x =
            randomInt(
                -4,
                6
            );

        const answer =
            a * x +
            b;

        const sign =
            b >= 0
                ? `+ ${b}`
                : `− ${Math.abs(b)}`;

        return choiceSet(

            answer,

            () =>
                answer +
                randomInt(
                    -6,
                    6
                ) +
                1,

            `The rule is y = ${a}x ${sign}; putting in x = ${x} gives ${answer}.`,

            `Use the same rule for every row of a function table.`,

            `Complete the table for y = ${a}x ${sign}: when x = ${x}, what is y?`
        );
    }


    function generateLinear(
        level
    ) {

        const slope =
            randomInt(
                -6,
                8
            ) || 1;

        const intercept =
            randomInt(
                -10,
                10
            );

        const x =
            randomInt(
                -4,
                5
            );

        const answer =
            slope *
            x +
            intercept;

        const sign =
            intercept >= 0
                ? `+ ${intercept}`
                : `− ${Math.abs(intercept)}`;

        const kind =
            level === "easy" ||
            level === "medium"
                ? "y-value"
                : "output";

        return choiceSet(

            answer,

            () =>
                answer +
                randomInt(
                    -10,
                    10
                ) +
                1,

            `For y = ${slope}x ${sign}, x = ${x} gives y = ${answer}.`,

            `The slope multiplies x; the intercept is added afterward.`,

            `For y = ${slope}x ${sign}, what ${kind} do you get when x = ${x}?`
        );
    }


    function generateQuadratics(
        level
    ) {

        const a =
            randomInt(
                1,
                level === "extreme"
                    ? 5
                    : 3
            );

        const b =
            randomInt(
                -6,
                6
            );

        const c =
            randomInt(
                -8,
                8
            );

        const x =
            randomInt(
                -4,
                4
            );

        const answer =
            a * x * x +
            b * x +
            c;

        return choiceSet(

            answer,

            () =>
                answer +
                randomInt(
                    -12,
                    12
                ) +
                1,

            `Substitute x = ${x}: ${a}(${x})² + ${b}(${x}) + ${c} = ${answer}.`,

            `Square x first, then multiply by the coefficient.`,

            `What is y when y = ${a}x² ${b >= 0 ? "+ " + b : "− " + Math.abs(b)} ${c >= 0 ? "+ " + c : "− " + Math.abs(c)} and x = ${x}?`
        );
    }


    function generateGraphs(
        level
    ) {

        const x =
            randomInt(
                -8,
                8
            );

        const y =
            randomInt(
                -8,
                8
            );

        const distance =
            Math.abs(x) +
            Math.abs(y);

        const answer =
            level === "easy" ||
            level === "medium"
                ? `${x}, ${y}`
                : String(
                    distance
                );

        if (
            level === "easy" ||
            level === "medium"
        ) {

            return choiceSet(

                answer,

                () =>
                    `${x + randomInt(-2, 2)}, ${y + randomInt(-2, 2)}`,

                `The point keeps its x-coordinate first and y-coordinate second.`,

                `Coordinates are written as (x, y).`,

                `Which ordered pair describes the point shown conceptually at x = ${x}, y = ${y}?`
            );
        }

        return choiceSet(

            answer,

            () =>
                String(
                    Math.max(
                        1,
                        distance +
                        randomInt(
                            -4,
                            4
                        )
                    )
                ),

            `The point (${x}, ${y}) is ${distance} units from the origin by the simple grid-distance rule used here.`,

            `Add the absolute values of x and y for this challenge.`,

            `For the point (${x}, ${y}), what is |x| + |y|?`
        );
    }


    /* =====================================================
       GEOMETRY
       ===================================================== */

    function generateShapes(
        level
    ) {

        const sides =
            level === "easy"
                ? 3
                : level === "medium"
                    ? 4
                    : randomInt(
                        3,
                        6
                    );

        const names = {

            3: "triangle",
            4: "quadrilateral",
            5: "pentagon",
            6: "hexagon"

        };

        const answer =
            names[sides];

        return choiceSet(

            answer,

            () =>
                names[
                    randomInt(
                        3,
                        6
                    )
                ],

            `A polygon with ${sides} sides is a ${answer}.`,

            `Count the sides, then match the number to the shape name.`,

            `A polygon has ${sides} sides. What is it called?`
        );
    }


    function generateAngles(
        level
    ) {

        const ranges = {

            easy: [
                5,
                89
            ],

            medium: [
                10,
                89
            ],

            hard: [
                91,
                179
            ],

            difficult: [
                30,
                330
            ],

            extreme: [
                10,
                350
            ]
        };

        const [
            min,
            max
        ] = ranges[level];

        const angle =
            randomInt(
                min,
                max
            );

        let answer;

        if (
            angle < 90
        ) {

            answer =
                "acute";

        } else if (
            angle === 90
        ) {

            answer =
                "right";

        } else if (
            angle < 180
        ) {

            answer =
                "obtuse";

        } else {

            answer =
                "reflex";
        }

        return choiceSet(

            answer,

            () =>
                shuffle([
                    "acute",
                    "right",
                    "obtuse",
                    "reflex"
                ])[0],

            `An angle of ${angle}° is ${answer}.`,

            `Acute < 90°, right = 90°, obtuse is between 90° and 180°.`,

            `How would you classify a ${angle}° angle?`
        );
    }


    function generateAreaPerimeter(
        level
    ) {

        const a =
            randomInt(
                2,
                level === "extreme"
                    ? 50
                    : 15
            );

        const b =
            randomInt(
                2,
                level === "extreme"
                    ? 40
                    : 12
            );

        const area =
            a * b;

        return choiceSet(

            area,

            () =>
                Math.max(
                    1,
                    area +
                    randomInt(
                        -10,
                        10
                    ) +
                    1
                ),

            `For a rectangle, area = length × width = ${a} × ${b} = ${area}.`,

            `Rectangle area is length times width.`,

            `What is the area of a rectangle that is ${a} by ${b}?`
        );
    }


    function generateCoordinates(
        level
    ) {

        const x =
            randomInt(
                -8,
                8
            );

        const y =
            randomInt(
                -8,
                8
            );

        const quadrant =
            x > 0 &&
            y > 0

                ? 1

                : x < 0 &&
                  y > 0

                    ? 2

                    : x < 0 &&
                      y < 0

                        ? 3

                        : 4;

        return choiceSet(

            quadrant,

            () =>
                randomInt(
                    1,
                    4
                ),

            `The signs (+,+), (−,+), (−,−), (+,−) correspond to quadrants I, II, III and IV.`,

            `Look at the signs of x and y.`,

            `Which quadrant contains (${x}, ${y})?`
        );
    }


    const generators = {

        addition:
            generateAddition,

        subtraction:
            generateSubtraction,

        multiplication:
            generateMultiplication,

        division:
            generateDivision,

        fractions:
            generateFractions,

        decimals:
            generateDecimals,

        percentages:
            generatePercentages,

        powers:
            generatePowers,

        "square-roots":
            generateSquareRoots,

        "function-basics":
            generateFunctionBasics,

        "function-tables":
            generateFunctionTables,

        "linear-functions":
            generateLinear,

        quadratics:
            generateQuadratics,

        graphs:
            generateGraphs,

        shapes:
            generateShapes,

        angles:
            generateAngles,

        "area-perimeter":
            generateAreaPerimeter,

        coordinates:
            generateCoordinates

    };


    function createQuestions(
        topicId,
        difficultyId,
        count = 10
    ) {

        const generator =
            generators[topicId] ||
            generateAddition;

        const result = [];

        const seen =
            new Set();

        let guard = 0;

        while (
            result.length <
                count &&
            guard < 500
        ) {

            guard++;

            const question =
                generator(
                    difficultyId
                );

            if (
                seen.has(
                    question.prompt
                )
            ) {
                continue;
            }

            seen.add(
                question.prompt
            );

            result.push({

                ...question,

                topicId,

                difficultyId

            });
        }

        return result;
    }


    /* =====================================================
       FUNCTION ART
       ===================================================== */

    const artChallenges = {

        easy: {

            en:
                "Draw a simple tent with two slanted lines and a flat base.",

            pt:
                "Desenhe uma barraca simples com duas retas inclinadas e uma base.",

            preset: [

                "y = x + 2",

                "y = -x + 2",

                "y = 0"

            ]
        },

        medium: {

            en:
                "Draw a little house using lines and a roof.",

            pt:
                "Desenhe uma casinha usando retas e um telhado.",

            preset: [

                "y = 0",

                "x = -3",

                "x = 3",

                "y = 2x + 6",

                "y = -2x + 6",

                "y = 6"

            ]
        },

        hard: {

            en:
                "Draw a mountain using a few straight function segments.",

            pt:
                "Desenhe uma montanha usando alguns segmentos de funções lineares.",

            preset: [

                "y = 0.7x + 2",

                "y = -0.7x + 2",

                "y = 0"

            ]
        },

        difficult: {

            en:
                "Build a rocket with a body, fins and nose.",

            pt:
                "Monte um foguete com corpo, aletas e ponta.",

            preset: [

                "x = -2",

                "x = 2",

                "y = 0",

                "y = 4",

                "y = 2x + 8",

                "y = -2x + 8"

            ]
        },

        extreme: {

            en:
                "Create your own function drawing. Use at least six equations.",

            pt:
                "Crie seu próprio desenho com funções. Use pelo menos seis equações.",

            preset: []
        }

    };


    window.MathLab = {

        difficulties,

        tabs,

        getTopic,

        getDifficulty,

        getAllTopics,

        createQuestions,

        artChallenges

    };

})();