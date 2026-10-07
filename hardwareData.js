/* =========================================================
   HARDWARE CURRICULUM
   Interactive PC / hardware lessons for Grades 1-5.
   ========================================================= */

const hardwareLessons = [

    {
        grade: 1,

        shortEn: "Computer parts and simple device connections.",
        shortPt: "Peças do computador e conexões simples.",

        titleEn: "Computer Basics",
        titlePt: "Noções Básicas de Computador",

        descriptionEn:
            "Learn what common computer devices do, then connect a keyboard and mouse to a PC.",

        descriptionPt:
            "Aprenda o que dispositivos comuns fazem e depois conecte um teclado e um mouse ao PC.",

        objectiveEn:
            "Identify the main input and output devices and connect the keyboard and mouse.",

        objectivePt:
            "Identifique os principais dispositivos de entrada e saída e conecte o teclado e o mouse.",

        tipEn:
            "A keyboard sends typed input to the computer. A mouse sends pointer input.",

        tipPt:
            "O teclado envia o que você digita para o computador. O mouse envia comandos do ponteiro.",

        learnCards: [

            [
                "Keyboard",
                "Keyboard",
                "Used to type letters, numbers, and commands.",
                "Usado para digitar letras, números e comandos."
            ],

            [
                "Mouse",
                "Mouse",
                "Lets you move a pointer and select things.",
                "Permite mover o ponteiro e selecionar coisas."
            ],

            [
                "Monitor",
                "Monitor",
                "Shows visual information from the computer.",
                "Mostra informações visuais do computador."
            ],

            [
                "Speakers",
                "Speakers",
                "Turn audio data into sound you can hear.",
                "Transformam dados de áudio em som que você consegue ouvir."
            ]

        ],

        question: {
            en: "Which device is mainly used to type text?",
            pt: "Qual dispositivo é usado principalmente para digitar texto?",

            answers: [
                "Mouse",
                "Keyboard",
                "Monitor",
                "Speakers"
            ],

            correct: "Keyboard"
        }
    },

    {
        grade: 2,

        shortEn: "Ports, cables, and making the right connections.",
        shortPt: "Portas, cabos e conexões corretas.",

        titleEn: "Ports & Cables",
        titlePt: "Portas e Cabos",

        descriptionEn:
            "Learn what common PC ports are for and connect the right cable to each port.",

        descriptionPt:
            "Aprenda para que servem portas comuns do PC e conecte cada cabo à porta certa.",

        objectiveEn:
            "Connect the monitor, network cable, audio cable, and power cable to their correct ports.",

        objectivePt:
            "Conecte o monitor, o cabo de rede, o cabo de áudio e o cabo de energia às portas corretas.",

        tipEn:
            "Different ports carry different kinds of signals or power. Match the job to the connection.",

        tipPt:
            "Portas diferentes transportam tipos diferentes de sinal ou energia. Combine a função com a conexão certa.",

        question: {
            en: "Which connection is commonly used to send video from a PC to a monitor?",
            pt: "Qual conexão é comumente usada para enviar vídeo do PC para um monitor?",

            answers: [
                "HDMI",
                "Ethernet",
                "Audio jack",
                "Power"
            ],

            correct: "HDMI"
        }
    },

    {
        grade: 3,

        shortEn: "What the main parts inside a PC actually do.",
        shortPt: "O que as principais peças dentro de um PC fazem.",

        titleEn: "Inside the PC",
        titlePt: "Dentro do PC",

        descriptionEn:
            "Explore a simplified motherboard and learn what the CPU, RAM, GPU, storage, PSU, and cooling do.",

        descriptionPt:
            "Explore uma placa-mãe simplificada e aprenda o que CPU, RAM, GPU, armazenamento, fonte e refrigeração fazem.",

        objectiveEn:
            "Identify the main internal computer components by their jobs.",

        objectivePt:
            "Identifique os principais componentes internos do computador pelas funções deles.",

        tipEn:
            "Think of the CPU as processing instructions, RAM as fast working space, and storage as long-term data storage.",

        tipPt:
            "Pense na CPU como a peça que processa instruções, na RAM como espaço rápido de trabalho e no armazenamento como local de dados de longo prazo.",

        components: {

            cpu: [
                "CPU",
                "Processes instructions and performs calculations.",
                "Processa instruções e realiza cálculos."
            ],

            ram: [
                "RAM",
                "Temporarily holds data programs are actively using.",
                "Mantém temporariamente dados que os programas estão usando."
            ],

            gpu: [
                "GPU",
                "Processes graphics and visual workloads.",
                "Processa gráficos e tarefas visuais."
            ],

            storage: [
                "Storage",
                "Keeps files and programs even when power is off.",
                "Guarda arquivos e programas mesmo quando o computador está desligado."
            ],

            psu: [
                "Power Supply",
                "Converts incoming electrical power into forms the PC components can use.",
                "Converte a energia elétrica recebida em formas que os componentes do PC podem usar."
            ],

            cooling: [
                "Cooling",
                "Moves heat away from important components.",
                "Ajuda a retirar calor dos componentes importantes."
            ],

            motherboard: [
                "Motherboard",
                "Connects many components so they can communicate.",
                "Conecta muitos componentes para que eles possam se comunicar."
            ]

        },

        question: {
            en: "Which part provides fast temporary working memory for programs?",
            pt: "Qual peça fornece memória temporária e rápida para os programas?",

            answers: [
                "Storage",
                "RAM",
                "Power Supply",
                "Cooling"
            ],

            correct: "RAM"
        }
    },

    {
        grade: 4,

        shortEn: "Diagnose common computer problems step by step.",
        shortPt: "Diagnostique problemas comuns do computador passo a passo.",

        titleEn: "Troubleshooting",
        titlePt: "Solução de Problemas",

        descriptionEn:
            "Read symptoms from a simulated PC and decide what to check before guessing at the cause.",

        descriptionPt:
            "Leia os sintomas de um PC simulado e decida o que verificar antes de tentar adivinhar a causa.",

        objectiveEn:
            "Solve three simple PC problems by checking the most relevant connection or component first.",

        objectivePt:
            "Resolva três problemas simples do PC verificando primeiro a conexão ou componente mais relevante.",

        tipEn:
            "Troubleshooting is a process: observe the symptom, form a likely explanation, test it, and check the result.",

        tipPt:
            "Solucionar problemas é um processo: observe o sintoma, pense em uma explicação provável, teste e confira o resultado.",

        problems: [

            {
                id: "monitor",

                titleEn: "No Signal",
                titlePt: "Sem Sinal",

                symptomEn:
                    "The PC sounds like it is on, but the monitor says No Signal.",

                symptomPt:
                    "O PC parece estar ligado, mas o monitor mostra Sem Sinal.",

                answers: [
                    "Check the video cable",
                    "Replace the keyboard",
                    "Increase speaker volume",
                    "Unplug the mouse"
                ],

                correct: "Check the video cable"
            },

            {
                id: "network",

                titleEn: "No Internet Connection",
                titlePt: "Sem Conexão com a Internet",

                symptomEn:
                    "The computer works, but the wired network connection is not available.",

                symptomPt:
                    "O computador funciona, mas a conexão de rede com fio não está disponível.",

                answers: [
                    "Check the Ethernet cable",
                    "Change the monitor",
                    "Remove the RAM",
                    "Turn the speakers up"
                ],

                correct: "Check the Ethernet cable"
            },

            {
                id: "power",

                titleEn: "Nothing Turns On",
                titlePt: "Nada Liga",

                symptomEn:
                    "The PC and monitor both appear completely without power.",

                symptomPt:
                    "O PC e o monitor parecem estar completamente sem energia.",

                answers: [
                    "Check the power connection",
                    "Change the wallpaper",
                    "Replace the mouse",
                    "Open a game"
                ],

                correct: "Check the power connection"
            }

        ],

        question: {
            en: "What should you usually do first when troubleshooting a problem?",
            pt: "O que você deve fazer primeiro ao tentar solucionar um problema?",

            answers: [
                "Observe the symptoms",
                "Replace every component",
                "Guess randomly",
                "Delete files"
            ],

            correct: "Observe the symptoms"
        }
    },

    {
        grade: 5,

        shortEn: "Build and check a simple PC configuration.",
        shortPt: "Monte e confira uma configuração simples de PC.",

        titleEn: "Build a PC",
        titlePt: "Monte um PC",

        descriptionEn:
            "Choose a set of components for a simple simulated PC and make sure every required part is present.",

        descriptionPt:
            "Escolha um conjunto de componentes para um PC simulado e certifique-se de que todas as peças necessárias estão presentes.",

        objectiveEn:
            "Complete a basic PC with a compatible CPU, motherboard, RAM, storage, and power supply.",

        objectivePt:
            "Complete um PC básico com CPU, placa-mãe, RAM, armazenamento e fonte.",

        tipEn:
            "A PC needs the right roles covered: processing, memory, storage, power, and a board to connect components.",

        tipPt:
            "Um PC precisa cobrir funções importantes: processamento, memória, armazenamento, energia e uma placa para conectar os componentes.",

        question: {
            en: "Which part provides the long-term place where files can be stored?",
            pt: "Qual peça fornece o local de longo prazo onde os arquivos podem ser armazenados?",

            answers: [
                "RAM",
                "Storage",
                "Cooling",
                "Mouse"
            ],

            correct: "Storage"
        }
    }

];

function getHardwareLesson(grade) {
    const value = Number(grade);

    return (
        hardwareLessons.find(
            (lesson) => lesson.grade === value
        ) || hardwareLessons[0]
    );
}