/*
    ============================================================
    SCIENCE LAB DATA + QUESTION GENERATORS
    ============================================================
*/

(function () {

    "use strict";


    const difficulties = [

        {
            id: "easy",
            en: "Easy",
            pt: "Fácil"
        },

        {
            id: "medium",
            en: "Medium",
            pt: "Médio"
        },

        {
            id: "hard",
            en: "Hard",
            pt: "Difícil"
        },

        {
            id: "difficult",
            en: "Difficult",
            pt: "Muito difícil"
        },

        {
            id: "extreme",
            en: "Extreme",
            pt: "Extremo"
        }

    ];


    const tabs = {

        life: {

            en: "Life Science",
            pt: "Ciências da Vida",

            topics: [

                {
                    id: "cells",
                    en: "Cells",
                    pt: "Células",

                    descriptionEn:
                        "Explore the parts of cells and what they do.",

                    descriptionPt:
                        "Explore as partes das células e suas funções."
                },

                {
                    id: "human-body",
                    en: "Human Body",
                    pt: "Corpo Humano",

                    descriptionEn:
                        "Learn how organs and body systems work together.",

                    descriptionPt:
                        "Aprenda como os órgãos e sistemas do corpo trabalham juntos."
                },

                {
                    id: "ecosystems",
                    en: "Ecosystems",
                    pt: "Ecossistemas",

                    descriptionEn:
                        "Explore food chains, habitats, and relationships between organisms.",

                    descriptionPt:
                        "Explore cadeias alimentares, habitats e relações entre organismos."
                },

                {
                    id: "genetics",
                    en: "Genetics Basics",
                    pt: "Genética Básica",

                    descriptionEn:
                        "Discover simple patterns of inheritance and traits.",

                    descriptionPt:
                        "Descubra padrões simples de hereditariedade e características."
                }

            ]

        },


        physical: {

            en: "Physical Science",
            pt: "Ciências Físicas",

            topics: [

                {
                    id: "matter",
                    en: "Matter",
                    pt: "Matéria",

                    descriptionEn:
                        "Investigate solids, liquids, gases, and changes of state.",

                    descriptionPt:
                        "Investigue sólidos, líquidos, gases e mudanças de estado."
                },

                {
                    id: "forces",
                    en: "Forces & Motion",
                    pt: "Forças e Movimento",

                    descriptionEn:
                        "Experiment with speed, force, friction, and motion.",

                    descriptionPt:
                        "Experimente com velocidade, força, atrito e movimento."
                },

                {
                    id: "energy",
                    en: "Energy",
                    pt: "Energia",

                    descriptionEn:
                        "See how energy moves and changes form.",

                    descriptionPt:
                        "Veja como a energia se move e muda de forma."
                },

                {
                    id: "electricity",
                    en: "Electricity",
                    pt: "Eletricidade",

                    descriptionEn:
                        "Build simple virtual circuits and understand current.",

                    descriptionPt:
                        "Monte circuitos virtuais simples e entenda a corrente elétrica."
                }

            ]

        },


        earth: {

            en: "Earth Science",
            pt: "Ciências da Terra",

            topics: [

                {
                    id: "earth-systems",
                    en: "Earth Systems",
                    pt: "Sistemas da Terra",

                    descriptionEn:
                        "Explore the major systems that interact on Earth.",

                    descriptionPt:
                        "Explore os principais sistemas que interagem na Terra."
                },

                {
                    id: "weather",
                    en: "Weather",
                    pt: "Clima e Tempo",

                    descriptionEn:
                        "Experiment with temperature, humidity, wind, and weather.",

                    descriptionPt:
                        "Experimente com temperatura, umidade, vento e tempo."
                },

                {
                    id: "rocks",
                    en: "Rocks & Minerals",
                    pt: "Rochas e Minerais",

                    descriptionEn:
                        "Identify rocks and learn how minerals are classified.",

                    descriptionPt:
                        "Identifique rochas e aprenda como os minerais são classificados."
                },

                {
                    id: "water-cycle",
                    en: "Water Cycle",
                    pt: "Ciclo da Água",

                    descriptionEn:
                        "Follow water through evaporation, condensation, and precipitation.",

                    descriptionPt:
                        "Acompanhe a água pela evaporação, condensação e precipitação."
                }

            ]

        },


        space: {

            en: "Space Science",
            pt: "Ciências Espaciais",

            topics: [

                {
                    id: "solar-system",
                    en: "Solar System",
                    pt: "Sistema Solar",

                    descriptionEn:
                        "Explore the planets and their positions in our solar system.",

                    descriptionPt:
                        "Explore os planetas e suas posições em nosso sistema solar."
                },

                {
                    id: "gravity",
                    en: "Gravity",
                    pt: "Gravidade",

                    descriptionEn:
                        "Experiment with gravity and how it affects objects.",

                    descriptionPt:
                        "Experimente com a gravidade e veja como ela afeta objetos."
                },

                {
                    id: "stars",
                    en: "Stars",
                    pt: "Estrelas",

                    descriptionEn:
                        "Explore star colors, temperatures, and life cycles.",

                    descriptionPt:
                        "Explore cores, temperaturas e ciclos de vida das estrelas."
                },

                {
                    id: "space-exploration",
                    en: "Space Exploration",
                    pt: "Exploração Espacial",

                    descriptionEn:
                        "Explore rockets, orbits, and the challenges of reaching space.",

                    descriptionPt:
                        "Explore foguetes, órbitas e os desafios de chegar ao espaço."
                }

            ]

        }

    };


    function randomInt(
        min,
        max
    ) {

        return Math.floor(
            Math.random() *
            (
                max -
                min +
                1
            )
        ) + min;

    }


    function shuffle(
        array
    ) {

        const copy =
            [...array];


        for (
            let i = copy.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() *
                    (i + 1)
                );


            [
                copy[i],
                copy[j]
            ] =
            [
                copy[j],
                copy[i]
            ];

        }


        return copy;

    }


    function choices(
        answer,
        alternatives
    ) {

        const values =
            [
                String(answer),
                ...alternatives.map(
                    value =>
                        String(value)
                )
            ];


        return shuffle(
            [...new Set(values)]
                .slice(
                    0,
                    4
                )
        );

    }


    function q(
        prompt,
        answer,
        alternatives,
        hint,
        explanation
    ) {

        return {

            prompt,

            answer:
                String(answer),

            choices:
                choices(
                    answer,
                    alternatives
                ),

            hint,

            explanation

        };

    }


    /*
        ========================================================
        CELLS
        ========================================================
    */

    function cellsQuestion(
        difficulty
    ) {

        const easy = [

            () =>
                q(
                    "Which part of a cell contains its genetic material?",
                    "Nucleus",
                    [
                        "Cell membrane",
                        "Cytoplasm",
                        "Vacuole"
                    ],
                    "Think about the control center of the cell.",
                    "The nucleus contains most of a cell's genetic material."
                ),

            () =>
                q(
                    "Which structure controls what enters and leaves the cell?",
                    "Cell membrane",
                    [
                        "Nucleus",
                        "Mitochondrion",
                        "Ribosome"
                    ],
                    "It forms the outer boundary of the cell.",
                    "The cell membrane controls movement of substances into and out of the cell."
                ),

            () =>
                q(
                    "Which organelle is often called the powerhouse of the cell?",
                    "Mitochondrion",
                    [
                        "Nucleus",
                        "Ribosome",
                        "Vacuole"
                    ],
                    "It helps release usable energy from food.",
                    "Mitochondria are major sites of cellular respiration."
                )

        ];


        const harder = [

            () =>
                q(
                    "Which structure is especially important for making proteins?",
                    "Ribosome",
                    [
                        "Vacuole",
                        "Lysosome",
                        "Cell wall"
                    ],
                    "It assembles amino acids into proteins.",
                    "Ribosomes are responsible for protein synthesis."
                ),

            () =>
                q(
                    "Which structure gives plant cells extra support?",
                    "Cell wall",
                    [
                        "Nucleus",
                        "Cytoplasm",
                        "Cell membrane"
                    ],
                    "Plant cells have a rigid layer outside the membrane.",
                    "The cell wall provides structural support."
                ),

            () =>
                q(
                    "Photosynthesis mainly takes place in which organelle?",
                    "Chloroplast",
                    [
                        "Mitochondrion",
                        "Nucleus",
                        "Ribosome"
                    ],
                    "Think about the organelle containing chlorophyll.",
                    "Chloroplasts contain chlorophyll and are the main site of photosynthesis."
                )

        ];


        const extreme = [

            () =>
                q(
                    "A cell that needs large amounts of usable energy would likely contain many...",
                    "Mitochondria",
                    [
                        "Vacuoles",
                        "Cell walls",
                        "Chromosomes"
                    ],
                    "Think about the organelles involved in cellular respiration.",
                    "Cells with high energy demands often contain many mitochondria."
                ),

            () =>
                q(
                    "Which organelle packages and processes many proteins before they are transported?",
                    "Golgi apparatus",
                    [
                        "Ribosome",
                        "Nucleus",
                        "Vacuole"
                    ],
                    "It acts like a cellular packaging center.",
                    "The Golgi apparatus modifies, sorts, and packages proteins and other molecules."
                )

        ];


        const pool =
            difficulty === "easy"
                ? easy
                : difficulty === "medium"
                    ? [...easy, ...harder]
                    : difficulty === "extreme"
                        ? [...easy, ...harder, ...extreme]
                        : [...easy, ...harder];


        return pool[
            randomInt(
                0,
                pool.length - 1
            )
        ]();

    }


    /*
        ========================================================
        HUMAN BODY
        ========================================================
    */

    function bodyQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "Which organ pumps blood around the body?",
                "Heart",
                [
                    "Lungs",
                    "Stomach",
                    "Kidneys"
                ],
                "It beats continuously.",
                "The heart pumps blood through the circulatory system."
            ),

            q(
                "Which organs are mainly responsible for gas exchange?",
                "Lungs",
                [
                    "Kidneys",
                    "Liver",
                    "Stomach"
                ],
                "They take in oxygen from the air.",
                "The lungs exchange oxygen and carbon dioxide."
            ),

            q(
                "Which organ begins most chemical digestion of food?",
                "Stomach",
                [
                    "Heart",
                    "Brain",
                    "Lungs"
                ],
                "It contains acid and digestive substances.",
                "The stomach uses acid and enzymes during digestion."
            ),

            q(
                "Which organ controls many body activities?",
                "Brain",
                [
                    "Heart",
                    "Liver",
                    "Small intestine"
                ],
                "It is part of the nervous system.",
                "The brain processes information and coordinates many body functions."
            ),

            q(
                "Which system is mainly responsible for carrying oxygen around the body?",
                "Circulatory system",
                [
                    "Digestive system",
                    "Skeletal system",
                    "Nervous system"
                ],
                "Think about blood vessels and the heart.",
                "The circulatory system transports blood, including oxygen."
            ),

            q(
                "Which system sends rapid electrical signals through the body?",
                "Nervous system",
                [
                    "Digestive system",
                    "Respiratory system",
                    "Skeletal system"
                ],
                "Think about the brain, spinal cord, and nerves.",
                "The nervous system communicates using electrical and chemical signals."
            )

        ];


        if (
            difficulty === "extreme"
        ) {

            questions.push(

                q(
                    "Which tiny structures in the lungs provide a large surface for gas exchange?",
                    "Alveoli",
                    [
                        "Nephrons",
                        "Villi",
                        "Tendons"
                    ],
                    "They are tiny air sacs.",
                    "Alveoli are tiny air sacs where oxygen and carbon dioxide are exchanged."
                )

            );

        }


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        ECOSYSTEMS
        ========================================================
    */

    function ecosystemQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "Which organism makes its own food?",
                "Producer",
                [
                    "Consumer",
                    "Decomposer",
                    "Predator"
                ],
                "Plants are a common example.",
                "Producers make their own food, often through photosynthesis."
            ),

            q(
                "What do decomposers do?",
                "Break down dead material",
                [
                    "Make sunlight",
                    "Create rocks",
                    "Stop all competition"
                ],
                "Think about fungi and many bacteria.",
                "Decomposers recycle nutrients by breaking down dead material."
            ),

            q(
                "In a food chain, arrows usually show the direction of...",
                "Energy transfer",
                [
                    "Water flow",
                    "Gravity",
                    "Weather"
                ],
                "Think about energy moving from food to the organism eating it.",
                "Food-chain arrows commonly show the transfer of energy from one organism to another."
            ),

            q(
                "Which is a habitat?",
                "A pond",
                [
                    "A single cell",
                    "A chromosome",
                    "A molecule"
                ],
                "A habitat is where an organism lives.",
                "A pond can provide food, water, shelter, and space for organisms."
            ),

            q(
                "What happens to available energy as you move up a food chain?",
                "It generally decreases",
                [
                    "It doubles",
                    "It stays exactly the same",
                    "It becomes sunlight"
                ],
                "Not all energy is passed to the next level.",
                "Only part of the energy at one trophic level is transferred to the next."
            )

        ];


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        GENETICS
        ========================================================
    */

    function geneticsQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "What carries genetic information?",
                "DNA",
                [
                    "Water",
                    "Glucose",
                    "Calcium"
                ],
                "It is found in chromosomes.",
                "DNA stores genetic information."
            ),

            q(
                "What is a trait?",
                "A characteristic of an organism",
                [
                    "A type of cell",
                    "A planet",
                    "A chemical reaction"
                ],
                "Eye color can be an example.",
                "A trait is a characteristic that can vary among organisms."
            ),

            q(
                "What is a gene?",
                "A section of DNA",
                [
                    "A type of organ",
                    "A whole ecosystem",
                    "A mineral"
                ],
                "Genes are smaller sections within chromosomes.",
                "A gene is a segment of DNA associated with a particular function or trait."
            ),

            q(
                "Chromosomes are mainly made of...",
                "DNA and proteins",
                [
                    "Water and sugar",
                    "Calcium and salt",
                    "Fat only"
                ],
                "Think about what genetic material is packaged with.",
                "Chromosomes consist largely of DNA associated with proteins."
            )

        ];


        if (
            difficulty === "hard" ||
            difficulty === "difficult" ||
            difficulty === "extreme"
        ) {

            questions.push(

                q(
                    "If two parents each pass one version of a gene to an offspring, the offspring receives...",
                    "One copy from each parent",
                    [
                        "Both copies from only one parent",
                        "No genetic information",
                        "One chromosome total"
                    ],
                    "Think about paired versions of genes.",
                    "Offspring inherit genetic copies from both biological parents."
                )

            );

        }


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        MATTER
        ========================================================
    */

    function matterQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "Which state of matter has a fixed volume but takes the shape of its container?",
                "Liquid",
                [
                    "Solid",
                    "Gas",
                    "Plasma"
                ],
                "Water is an example.",
                "Liquids keep a definite volume but take the shape of their container."
            ),

            q(
                "Which state of matter usually spreads out to fill its container?",
                "Gas",
                [
                    "Solid",
                    "Liquid",
                    "Crystal"
                ],
                "Air behaves this way.",
                "Gases expand to fill the available space."
            ),

            q(
                "What happens during melting?",
                "A solid becomes a liquid",
                [
                    "A liquid becomes a gas",
                    "A gas becomes a solid",
                    "A liquid becomes a solid"
                ],
                "Ice melting is a common example.",
                "Melting changes a solid into a liquid."
            ),

            q(
                "What happens during condensation?",
                "A gas becomes a liquid",
                [
                    "A solid becomes a gas",
                    "A liquid becomes a gas",
                    "A solid becomes a liquid"
                ],
                "Water droplets can form when moist air cools.",
                "Condensation changes a gas into a liquid."
            ),

            q(
                "Which particle has a negative electric charge?",
                "Electron",
                [
                    "Proton",
                    "Neutron",
                    "Atom"
                ],
                "It is found outside the nucleus.",
                "Electrons carry negative charge."
            )

        ];


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        FORCES
        ========================================================
    */

    function forceQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "A force is best described as...",
                "A push or pull",
                [
                    "A type of matter",
                    "A color",
                    "A temperature"
                ],
                "Think about opening a door.",
                "A force is a push or pull that can affect motion."
            ),

            q(
                "What force pulls objects toward Earth?",
                "Gravity",
                [
                    "Friction",
                    "Magnetism",
                    "Buoyancy"
                ],
                "It keeps you on the ground.",
                "Gravity attracts objects toward Earth."
            ),

            q(
                "What force opposes motion between surfaces?",
                "Friction",
                [
                    "Gravity",
                    "Radiation",
                    "Buoyancy"
                ],
                "It makes sliding objects slow down.",
                "Friction acts between surfaces and opposes relative motion."
            ),

            q(
                "If an object travels 20 meters in 4 seconds, its average speed is...",
                "5 m/s",
                [
                    "4 m/s",
                    "16 m/s",
                    "80 m/s"
                ],
                "Use distance divided by time.",
                "Average speed is distance divided by time: 20 ÷ 4 = 5 m/s."
            )

        ];


        if (
            difficulty === "hard" ||
            difficulty === "difficult" ||
            difficulty === "extreme"
        ) {

            questions.push(

                q(
                    "If the net force on an object is zero, its motion...",
                    "Does not change",
                    [
                        "Must instantly stop",
                        "Must speed up",
                        "Must turn"
                    ],
                    "Think about balanced forces.",
                    "With zero net force, an object's velocity stays constant."
                )

            );

        }


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        ENERGY
        ========================================================
    */

    function energyQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "Which form of energy is stored in food?",
                "Chemical energy",
                [
                    "Sound energy",
                    "Light energy",
                    "Gravitational energy"
                ],
                "Your body releases energy from nutrients.",
                "Food contains chemical energy."
            ),

            q(
                "A moving object has...",
                "Kinetic energy",
                [
                    "Only chemical energy",
                    "No energy",
                    "Only light energy"
                ],
                "Motion is the key clue.",
                "Kinetic energy is the energy of motion."
            ),

            q(
                "Which type of energy comes from a stretched spring?",
                "Elastic potential energy",
                [
                    "Sound energy",
                    "Thermal energy",
                    "Nuclear energy"
                ],
                "It is stored because of deformation.",
                "A stretched spring stores elastic potential energy."
            ),

            q(
                "Energy can be...",
                "Transferred and transformed",
                [
                    "Created from nothing",
                    "Destroyed completely",
                    "Made to disappear"
                ],
                "Think about energy conservation.",
                "Energy can move between objects and change form."
            )

        ];


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        ELECTRICITY
        ========================================================
    */

    function electricityQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "Which component provides electrical energy in a simple circuit?",
                "Battery",
                [
                    "Switch",
                    "Wire",
                    "Bulb"
                ],
                "It has positive and negative terminals.",
                "A battery provides electrical energy to a circuit."
            ),

            q(
                "What happens when an open switch is closed in a simple circuit?",
                "Current can flow",
                [
                    "The battery disappears",
                    "The wires melt",
                    "The circuit gets longer"
                ],
                "A closed switch completes the path.",
                "Closing the switch completes the circuit path."
            ),

            q(
                "Which material is generally a good electrical conductor?",
                "Copper",
                [
                    "Rubber",
                    "Plastic",
                    "Glass"
                ],
                "It is commonly used in wires.",
                "Copper conducts electricity well."
            ),

            q(
                "A complete path for electric current is called a...",
                "Circuit",
                [
                    "Spectrum",
                    "Habitat",
                    "Vacuum"
                ],
                "A battery, wires, and bulb can form one.",
                "A circuit is a complete path through which electric current can flow."
            )

        ];


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        EARTH SYSTEMS
        ========================================================
    */

    function earthSystemsQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "Which Earth system includes living things?",
                "Biosphere",
                [
                    "Geosphere",
                    "Hydrosphere",
                    "Atmosphere"
                ],
                "Think about biology.",
                "The biosphere includes Earth's living organisms."
            ),

            q(
                "Which Earth system contains most of Earth's water?",
                "Hydrosphere",
                [
                    "Atmosphere",
                    "Biosphere",
                    "Geosphere"
                ],
                "Think about oceans, rivers, and ice.",
                "The hydrosphere includes Earth's water."
            ),

            q(
                "Which system includes rocks and the solid Earth?",
                "Geosphere",
                [
                    "Atmosphere",
                    "Biosphere",
                    "Hydrosphere"
                ],
                "Think about Earth's physical ground.",
                "The geosphere includes rocks, soil, and Earth's solid structure."
            ),

            q(
                "Which system is the layer of gases surrounding Earth?",
                "Atmosphere",
                [
                    "Biosphere",
                    "Hydrosphere",
                    "Geosphere"
                ],
                "It is the air around Earth.",
                "The atmosphere is Earth's layer of gases."
            )

        ];


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        WEATHER
        ========================================================
    */

    function weatherQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "Which instrument measures temperature?",
                "Thermometer",
                [
                    "Barometer",
                    "Anemometer",
                    "Rain gauge"
                ],
                "It is commonly used to tell how hot or cold something is.",
                "A thermometer measures temperature."
            ),

            q(
                "Which instrument measures air pressure?",
                "Barometer",
                [
                    "Thermometer",
                    "Anemometer",
                    "Hygrometer"
                ],
                "Pressure changes can help indicate weather changes.",
                "A barometer measures atmospheric pressure."
            ),

            q(
                "Which instrument measures wind speed?",
                "Anemometer",
                [
                    "Thermometer",
                    "Barometer",
                    "Rain gauge"
                ],
                "It has cups or another moving part in many designs.",
                "An anemometer measures wind speed."
            ),

            q(
                "What is humidity?",
                "The amount of water vapor in the air",
                [
                    "The speed of wind",
                    "The amount of sunlight",
                    "The weight of clouds"
                ],
                "Think about moisture in the atmosphere.",
                "Humidity describes the amount of water vapor in air."
            )

        ];


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        ROCKS
        ========================================================
    */

    function rocksQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "Which type of rock forms when magma or lava cools?",
                "Igneous rock",
                [
                    "Sedimentary rock",
                    "Metamorphic rock",
                    "Organic rock"
                ],
                "Think about volcanic material cooling.",
                "Igneous rocks form from cooled magma or lava."
            ),

            q(
                "Which type of rock commonly forms from compressed sediments?",
                "Sedimentary rock",
                [
                    "Igneous rock",
                    "Metamorphic rock",
                    "Metallic rock"
                ],
                "Sand and mud can become sediments.",
                "Sedimentary rocks can form from deposited and compacted sediments."
            ),

            q(
                "Which type of rock forms when existing rock is changed by heat and pressure?",
                "Metamorphic rock",
                [
                    "Igneous rock",
                    "Sedimentary rock",
                    "Liquid rock"
                ],
                "The name means changed form.",
                "Metamorphic rocks form when existing rocks are altered by heat, pressure, or both."
            ),

            q(
                "A mineral is best described as...",
                "A naturally occurring solid with an ordered structure",
                [
                    "Any piece of metal",
                    "A type of living thing",
                    "A gas in the atmosphere"
                ],
                "Think about the definition used in geology.",
                "Minerals are naturally occurring solids with characteristic compositions and ordered structures."
            )

        ];


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        WATER CYCLE
        ========================================================
    */

    function waterQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "What is evaporation?",
                "Liquid water becoming water vapor",
                [
                    "Water vapor becoming ice",
                    "Ice becoming rock",
                    "Rain becoming sunlight"
                ],
                "It often happens when water gains heat.",
                "Evaporation changes liquid water into water vapor."
            ),

            q(
                "What is condensation?",
                "Water vapor becoming liquid water",
                [
                    "Liquid water becoming gas",
                    "Ice becoming liquid",
                    "Water becoming salt"
                ],
                "Cloud formation involves this process.",
                "Condensation changes water vapor into liquid water."
            ),

            q(
                "What is precipitation?",
                "Water falling from clouds",
                [
                    "Water evaporating",
                    "Plants making sugar",
                    "Rocks melting"
                ],
                "Rain and snow are examples.",
                "Precipitation includes rain, snow, sleet, and hail."
            ),

            q(
                "What is the main source of energy driving the water cycle?",
                "The Sun",
                [
                    "The Moon",
                    "Earth's core",
                    "Ocean currents"
                ],
                "Think about what causes evaporation.",
                "Solar energy drives much of the water cycle."
            )

        ];


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        SOLAR SYSTEM
        ========================================================
    */

    function solarQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "Which planet is closest to the Sun?",
                "Mercury",
                [
                    "Venus",
                    "Earth",
                    "Mars"
                ],
                "It is the first planet in order from the Sun.",
                "Mercury is the closest planet to the Sun."
            ),

            q(
                "Which planet is known for its prominent ring system?",
                "Saturn",
                [
                    "Earth",
                    "Mars",
                    "Mercury"
                ],
                "It is a large gas giant.",
                "Saturn is famous for its extensive ring system."
            ),

            q(
                "Which planet is called the Red Planet?",
                "Mars",
                [
                    "Venus",
                    "Jupiter",
                    "Neptune"
                ],
                "Its surface contains iron-rich material.",
                "Mars appears reddish because of iron oxides on its surface."
            ),

            q(
                "What does a planet orbit?",
                "A star",
                [
                    "Only a moon",
                    "Only another planet",
                    "A cloud"
                ],
                "Earth's orbit is around the Sun.",
                "Planets orbit stars; in our solar system, the planets orbit the Sun."
            )

        ];


        if (
            difficulty === "hard" ||
            difficulty === "difficult" ||
            difficulty === "extreme"
        ) {

            questions.push(

                q(
                    "Which planet is the largest in our solar system?",
                    "Jupiter",
                    [
                        "Saturn",
                        "Neptune",
                        "Earth"
                    ],
                    "It is a very large gas giant.",
                    "Jupiter is the largest planet in the solar system."
                )

            );

        }


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        GRAVITY
        ========================================================
    */

    function gravityQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "Gravity is a force of...",
                "Attraction",
                [
                    "Repulsion",
                    "Friction",
                    "Sound"
                ],
                "It pulls objects toward one another.",
                "Gravity is an attractive force."
            ),

            q(
                "Why do objects fall toward Earth?",
                "Earth's gravity pulls them",
                [
                    "Air pushes everything down",
                    "The Sun repels them",
                    "The Moon creates all falling motion"
                ],
                "Think about Earth's mass.",
                "Earth's gravitational attraction pulls objects toward its center."
            ),

            q(
                "A person would generally weigh less on the Moon because...",
                "The Moon has weaker gravity",
                [
                    "Their mass disappears",
                    "The Moon has no matter",
                    "Time stops there"
                ],
                "Compare the Moon's mass with Earth's.",
                "The Moon's weaker gravitational field produces a lower weight."
            )

        ];


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        STARS
        ========================================================
    */

    function starsQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "Stars produce their own...",
                "Light",
                [
                    "Oxygen only",
                    "Rocks",
                    "Planets"
                ],
                "The Sun is a star.",
                "Stars emit their own light."
            ),

            q(
                "Which color usually indicates a hotter star?",
                "Blue",
                [
                    "Red",
                    "Orange",
                    "Brown"
                ],
                "Think about hot flames and stellar temperature.",
                "Blue stars generally have higher surface temperatures than red stars."
            ),

            q(
                "What powers the Sun?",
                "Nuclear fusion",
                [
                    "Burning coal",
                    "Chemical batteries",
                    "Friction"
                ],
                "It happens in the Sun's core.",
                "The Sun produces energy mainly through nuclear fusion."
            ),

            q(
                "The Sun is classified as a...",
                "Star",
                [
                    "Planet",
                    "Moon",
                    "Galaxy"
                ],
                "Earth orbits it.",
                "The Sun is the star at the center of our solar system."
            )

        ];


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    /*
        ========================================================
        SPACE EXPLORATION
        ========================================================
    */

    function spaceQuestion(
        difficulty
    ) {

        const questions = [

            q(
                "What force keeps a spacecraft in orbit around a planet?",
                "Gravity",
                [
                    "Friction",
                    "Sound",
                    "Magnetism only"
                ],
                "The same force keeps moons in orbit.",
                "Gravity provides the inward pull needed for an orbit."
            ),

            q(
                "What does a rocket mainly need to produce to accelerate?",
                "Thrust",
                [
                    "Rain",
                    "Friction",
                    "Darkness"
                ],
                "It comes from pushing mass away from the rocket.",
                "Thrust is the force produced to propel the rocket."
            ),

            q(
                "Why can astronauts appear weightless while orbiting Earth?",
                "They are continuously falling around Earth",
                [
                    "There is no gravity",
                    "Earth stops attracting them",
                    "Space has no motion"
                ],
                "They are in free fall.",
                "Orbiting spacecraft and astronauts are in continuous free fall around Earth."
            )

        ];


        return questions[
            randomInt(
                0,
                questions.length - 1
            )
        ];

    }


    const generators = {

        cells:
            cellsQuestion,

        "human-body":
            bodyQuestion,

        ecosystems:
            ecosystemQuestion,

        genetics:
            geneticsQuestion,

        matter:
            matterQuestion,

        forces:
            forceQuestion,

        energy:
            energyQuestion,

        electricity:
            electricityQuestion,

        "earth-systems":
            earthSystemsQuestion,

        weather:
            weatherQuestion,

        rocks:
            rocksQuestion,

        "water-cycle":
            waterQuestion,

        "solar-system":
            solarQuestion,

        gravity:
            gravityQuestion,

        stars:
            starsQuestion,

        "space-exploration":
            spaceQuestion

    };


    function getTopic(
        id
    ) {

        for (
            const tab of Object.values(
                tabs
            )
        ) {

            const found =
                tab.topics.find(
                    topic =>
                        topic.id ===
                        id
                );


            if (found) {
                return found;
            }

        }


        return tabs.life.topics[0];

    }


    function getDifficulty(
        id
    ) {

        return (
            difficulties.find(
                item =>
                    item.id ===
                    id
            ) ||
            difficulties[0]
        );

    }


    function createQuestions(
        topicId,
        difficultyId,
        amount
    ) {

        const count =
            Math.max(
                1,
                Math.min(
                    30,
                    Number(amount) || 10
                )
            );


        const generator =
            generators[
                topicId
            ] ||
            generators.cells;


        const questions =
            [];


        const seen =
            new Set();


        let attempts =
            0;


        while (
            questions.length <
                count &&
            attempts <
                count * 20
        ) {

            attempts++;


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


            questions.push(
                question
            );

        }


        while (
            questions.length <
            count
        ) {

            questions.push(
                generator(
                    difficultyId
                )
            );

        }


        return questions;

    }


    window.ScienceLab = {

        difficulties,

        tabs,

        generators,

        getTopic,

        getDifficulty,

        createQuestions

    };


})();