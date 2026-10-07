const makerUI = {

    en: {

        midDay:
            "Mid-Day",

        maker:
            "Maker",

        chooseGrade:
            "Choose your grade.",

        chooseProject:
            "Choose a project to make.",

        buildProject:
            "Build Project",

        instructions:
            "How to build",

        requiredParts:
            "Required parts",

        testCircuit:
            "Test Circuit",

        wireMode:
            "Wire Mode",

        wireModeOn:
            "Wire Mode: ON",

        deleteSelected:
            "Remove Selected",

        clearBoard:
            "Clear Board",

        selectedNothing:
            "Nothing selected.",

        clickHole:
            "Click a second hole to connect the wire.",

        circuitWorking:
            "Circuit working!",

        circuitNotWorking:
            "The circuit isn't working yet.",

        missingParts:
            "Missing required parts.",

        tooManyParts:
            "Remove the extra parts before testing.",

        switchClosed:
            "Switch closed.",

        switchOpen:
            "Switch open.",

        removeHint:
            "Select a component first.",

        dragHint:
            "Add the required parts to the board, then use Wire Mode to connect them.",

        projectComplete:
            "Project complete!",

        projectIncomplete:
            "Not quite yet!"

    },


    "pt-BR": {

        midDay:
            "Meio-Dia",

        maker:
            "Maker",

        chooseGrade:
            "Escolha seu ano.",

        chooseProject:
            "Escolha um projeto para fazer.",

        buildProject:
            "Construir Projeto",

        instructions:
            "Como construir",

        requiredParts:
            "Peças necessárias",

        testCircuit:
            "Testar Circuito",

        wireMode:
            "Modo Fio",

        wireModeOn:
            "Modo Fio: ATIVO",

        deleteSelected:
            "Remover Selecionado",

        clearBoard:
            "Limpar Placa",

        selectedNothing:
            "Nada selecionado.",

        clickHole:
            "Clique em outro furo para conectar o fio.",

        circuitWorking:
            "Circuito funcionando!",

        circuitNotWorking:
            "O circuito ainda não está funcionando.",

        missingParts:
            "Faltam peças necessárias.",

        tooManyParts:
            "Remova as peças extras antes de testar.",

        switchClosed:
            "Interruptor fechado.",

        switchOpen:
            "Interruptor aberto.",

        removeHint:
            "Selecione uma peça primeiro.",

        dragHint:
            "Adicione as peças necessárias à placa e use o Modo Fio para conectá-las.",

        projectComplete:
            "Projeto concluído!",

        projectIncomplete:
            "Ainda não!"

    }

};





/* =========================================================
   COMPONENTS
   ========================================================= */

const makerComponents = {

    battery: {

        name: {
            en:
                "Battery",

            "pt-BR":
                "Bateria"
        },

        shortName: {
            en:
                "BATTERY",

            "pt-BR":
                "BATERIA"
        },

        span:
            4

    },


    resistor: {

        name: {
            en:
                "Resistor",

            "pt-BR":
                "Resistor"
        },

        shortName: {
            en:
                "RESISTOR",

            "pt-BR":
                "RESISTOR"
        },

        span:
            2

    },


    led: {

        name: {
            en:
                "LED",

            "pt-BR":
                "LED"
        },

        shortName: {
            en:
                "LED",

            "pt-BR":
                "LED"
        },

        span:
            2

    },


    switch: {

        name: {
            en:
                "Switch",

            "pt-BR":
                "Interruptor"
        },

        shortName: {
            en:
                "SWITCH",

            "pt-BR":
                "INTERRUPTOR"
        },

        span:
            2

    },


    buzzer: {

        name: {
            en:
                "Buzzer",

            "pt-BR":
                "Campainha"
        },

        shortName: {
            en:
                "BUZZER",

            "pt-BR":
                "CAMPAINHA"
        },

        span:
            3

    }

};





/* =========================================================
   PROJECTS
   ========================================================= */

const makerProjects = {


    light: {

        id:
            "light",

        grade:
            1,


        title: {

            en:
                "Make a Light",

            "pt-BR":
                "Faça uma Luz"

        },


        description: {

            en:
                "Build a simple circuit that powers an LED.",

            "pt-BR":
                "Monte um circuito simples que acenda um LED."

        },


        required: [

            {
                type:
                    "battery",

                count:
                    1
            },

            {
                type:
                    "resistor",

                count:
                    1
            },

            {
                type:
                    "led",

                count:
                    1
            }

        ],


        instructions: {

            en: [

                "Place the battery on the breadboard.",
                "Place the resistor and LED on separate parts of the board.",
                "Use Wire Mode to connect the circuit.",
                "Make a complete path from the battery + to the battery -.",
                "Test the circuit."

            ],

            "pt-BR": [

                "Coloque a bateria na protoboard.",
                "Coloque o resistor e o LED em partes diferentes da placa.",
                "Use o Modo Fio para conectar o circuito.",
                "Faça um caminho completo do + da bateria até o - da bateria.",
                "Teste o circuito."

            ]

        },


        tip: {

            en:
                "The LED has a direction. Its positive side must be connected toward the battery +.",

            "pt-BR":
                "O LED tem uma direção. Seu lado positivo deve ficar voltado para o + da bateria."

        }

    },



    buzzer: {

        id:
            "buzzer",

        grade:
            2,


        title: {

            en:
                "Make a Buzzer",

            "pt-BR":
                "Faça uma Campainha"

        },


        description: {

            en:
                "Complete a circuit that makes a buzzer turn on.",

            "pt-BR":
                "Complete um circuito que faça uma campainha ligar."

        },


        required: [

            {
                type:
                    "battery",

                count:
                    1
            },

            {
                type:
                    "switch",

                count:
                    1
            },

            {
                type:
                    "buzzer",

                count:
                    1
            }

        ],


        instructions: {

            en: [

                "Place the battery on the board.",
                "Place the switch and buzzer.",
                "Connect the parts with Wire Mode.",
                "Close the switch by clicking it.",
                "Test the circuit."

            ],

            "pt-BR": [

                "Coloque a bateria na placa.",
                "Coloque o interruptor e a campainha.",
                "Conecte as peças usando o Modo Fio.",
                "Feche o interruptor clicando nele.",
                "Teste o circuito."

            ]

        },


        tip: {

            en:
                "The switch must be closed for electricity to flow.",

            "pt-BR":
                "O interruptor precisa estar fechado para a eletricidade passar."

        }

    },



    twoLights: {

        id:
            "twoLights",

        grade:
            3,


        title: {

            en:
                "Two Lights",

            "pt-BR":
                "Duas Luzes"

        },


        description: {

            en:
                "Build a series circuit with two LEDs.",

            "pt-BR":
                "Monte um circuito em série com dois LEDs."

        },


        required: [

            {
                type:
                    "battery",

                count:
                    1
            },

            {
                type:
                    "switch",

                count:
                    1
            },

            {
                type:
                    "resistor",

                count:
                    2
            },

            {
                type:
                    "led",

                count:
                    2
            }

        ],


        instructions: {

            en: [

                "Place the battery, switch, two resistors, and two LEDs.",
                "Connect everything into one continuous path.",
                "Make sure both LEDs point in the correct direction.",
                "Close the switch.",
                "Test the circuit."

            ],

            "pt-BR": [

                "Coloque a bateria, o interruptor, dois resistores e dois LEDs.",
                "Conecte tudo em um único caminho contínuo.",
                "Certifique-se de que os dois LEDs estão na direção correta.",
                "Feche o interruptor.",
                "Teste o circuito."

            ]

        },


        tip: {

            en:
                "A series circuit has one path for the electricity to follow.",

            "pt-BR":
                "Um circuito em série possui um único caminho para a eletricidade seguir."

        }

    },



    warningLight: {

        id:
            "warningLight",

        grade:
            4,


        title: {

            en:
                "Warning Signal",

            "pt-BR":
                "Sinal de Alerta"

        },


        description: {

            en:
                "Make an LED and buzzer work together.",

            "pt-BR":
                "Faça um LED e uma campainha funcionarem juntos."

        },


        required: [

            {
                type:
                    "battery",

                count:
                    1
            },

            {
                type:
                    "switch",

                count:
                    1
            },

            {
                type:
                    "resistor",

                count:
                    1
            },

            {
                type:
                    "led",

                count:
                    1
            },

            {
                type:
                    "buzzer",

                count:
                    1
            }

        ],


        instructions: {

            en: [

                "Place all five required parts.",
                "Connect the parts into one complete circuit.",
                "Remember that the LED has a direction.",
                "Close the switch.",
                "Test the circuit."

            ],

            "pt-BR": [

                "Coloque as cinco peças necessárias.",
                "Conecte as peças em um circuito completo.",
                "Lembre-se de que o LED tem uma direção.",
                "Feche o interruptor.",
                "Teste o circuito."

            ]

        },


        tip: {

            en:
                "Both the LED and buzzer need a complete path to the battery.",

            "pt-BR":
                "O LED e a campainha precisam de um caminho completo até a bateria."

        }

    },



    signalCircuit: {

        id:
            "signalCircuit",

        grade:
            5,


        title: {

            en:
                "Signal Circuit",

            "pt-BR":
                "Circuito de Sinal"

        },


        description: {

            en:
                "Build a longer series circuit using several components.",

            "pt-BR":
                "Monte um circuito em série maior usando várias peças."

        },


        required: [

            {
                type:
                    "battery",

                count:
                    1
            },

            {
                type:
                    "switch",

                count:
                    1
            },

            {
                type:
                    "resistor",

                count:
                    2
            },

            {
                type:
                    "led",

                count:
                    1
            },

            {
                type:
                    "buzzer",

                count:
                    1
            }

        ],


        instructions: {

            en: [

                "Place every required component.",
                "Create one complete electrical path.",
                "Use both resistors in the circuit.",
                "Make sure the LED is facing the correct way.",
                "Close the switch and test the circuit."

            ],

            "pt-BR": [

                "Coloque todos os componentes necessários.",
                "Crie um único caminho elétrico completo.",
                "Use os dois resistores no circuito.",
                "Certifique-se de que o LED está na direção correta.",
                "Feche o interruptor e teste o circuito."

            ]

        },


        tip: {

            en:
                "Follow the circuit from + to - and make sure every required component is part of the path.",

            "pt-BR":
                "Siga o circuito do + até o - e certifique-se de que todas as peças fazem parte do caminho."

        }

    }

};