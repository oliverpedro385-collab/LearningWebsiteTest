/* =========================================================
   HARDWARE SIMULATOR
   Interactive hardware lessons for Grades 1-5.
   ========================================================= */

(() => {
    "use strict";

    const params = new URLSearchParams(
        window.location.search
    );

    const grade =
        Number(params.get("grade")) || 1;

    if (
        typeof getHardwareLesson !==
        "function"
    ) {
        console.error(
            "hardwareData.js did not load."
        );

        return;
    }

    const lesson =
        getHardwareLesson(grade);

    if (!lesson) {
        console.error(
            "No hardware lesson was found."
        );

        return;
    }

    const state = {

        pageIndex: 0,

        selectedCable: null,

        connections: {},

        selectedComponent: null,

        componentActivityComplete: false,

        problemIndex: 0,

        solvedProblems: new Set(),

        builder: {
            cpu: "Ryzen 5",
            motherboard: "B550",
            ram: "16 GB DDR4",
            storage: "1 TB SSD",
            psu: "550 W",
            gpu: "Integrated graphics",
            cooling: "Stock cooler"
        },

        buildCorrect: false,

        quizAnswered: false,

        quizCorrect: false

    };

    const pageNames = [
        "learn",
        "do",
        "check"
    ];

    const els = {

        title:
            document.getElementById(
                "lessonTitle"
            ),

        description:
            document.getElementById(
                "lessonDescription"
            ),

        progress:
            document.getElementById(
                "lessonProgress"
            ),

        learnTitle:
            document.getElementById(
                "learnTitle"
            ),

        learnIntro:
            document.getElementById(
                "learnIntro"
            ),

        learnArea:
            document.getElementById(
                "learnArea"
            ),

        doTitle:
            document.getElementById(
                "doTitle"
            ),

        doIntro:
            document.getElementById(
                "doIntro"
            ),

        doArea:
            document.getElementById(
                "doArea"
            ),

        checkTitle:
            document.getElementById(
                "checkTitle"
            ),

        checkIntro:
            document.getElementById(
                "checkIntro"
            ),

        checkArea:
            document.getElementById(
                "checkArea"
            ),

        objectiveTitle:
            document.getElementById(
                "objectiveTitle"
            ),

        objectiveText:
            document.getElementById(
                "objectiveText"
            ),

        status:
            document.getElementById(
                "hardwareStatus"
            ),

        tipTitle:
            document.getElementById(
                "tipTitle"
            ),

        tipText:
            document.getElementById(
                "tipText"
            ),

        progressFill:
            document.getElementById(
                "hardwareProgressFill"
            )

    };

    function isPortuguese() {

        const value =
            localStorage.getItem(
                "siteLanguage"
            );

        return (
            value === "pt-BR" ||
            value === "pt"
        );
    }

    function t(
        english,
        portuguese
    ) {
        return isPortuguese()
            ? portuguese
            : english;
    }

    function makeButton(
        text,
        className,
        callback
    ) {

        const button =
            document.createElement(
                "button"
            );

        button.type = "button";

        button.className =
            className;

        button.textContent =
            text;

        button.addEventListener(
            "click",
            callback
        );

        return button;
    }

    function clearStatus() {

        if (!els.status) {
            return;
        }

        els.status.textContent = "";

        els.status.className =
            "hardwareStatus";
    }

    function setStatus(
        message,
        type = ""
    ) {

        if (!els.status) {
            return;
        }

        els.status.textContent =
            message;

        els.status.className =
            `hardwareStatus ${type}`
                .trim();
    }

    function renderHeader() {

        if (els.title) {

            els.title.textContent =
                isPortuguese()
                    ? lesson.titlePt
                    : lesson.titleEn;
        }

        if (els.description) {

            els.description.textContent =
                isPortuguese()
                    ? lesson.descriptionPt
                    : lesson.descriptionEn;
        }

        if (els.objectiveTitle) {

            els.objectiveTitle.textContent =
                t(
                    "Objective",
                    "Objetivo"
                );
        }

        if (els.objectiveText) {

            els.objectiveText.textContent =
                isPortuguese()
                    ? lesson.objectivePt
                    : lesson.objectiveEn;
        }

        if (els.tipTitle) {

            els.tipTitle.textContent =
                t(
                    "Tip",
                    "Dica"
                );
        }

        if (els.tipText) {

            els.tipText.textContent =
                isPortuguese()
                    ? lesson.tipPt
                    : lesson.tipEn;
        }

        if (els.learnTitle) {

            els.learnTitle.textContent =
                t(
                    "Learn",
                    "Aprenda"
                );
        }

        if (els.learnIntro) {

            els.learnIntro.textContent =
                t(
                    "Read the explanation and explore the lesson.",
                    "Leia a explicação e explore a lição."
                );
        }

        if (els.doTitle) {

            els.doTitle.textContent =
                t(
                    "Do it",
                    "Faça você mesmo"
                );
        }

        if (els.doIntro) {

            els.doIntro.textContent =
                t(
                    "Now use the simulated hardware yourself.",
                    "Agora use o hardware simulado você mesmo."
                );
        }

        if (els.checkTitle) {

            els.checkTitle.textContent =
                t(
                    "Check what you learned",
                    "Confira o que você aprendeu"
                );
        }

        if (els.checkIntro) {

            els.checkIntro.textContent =
                t(
                    "Finish the lesson with a knowledge check.",
                    "Finalize a lição com uma pergunta."
                );
        }
    }

    function renderProgress() {

        if (!els.progress) {
            return;
        }

        els.progress.innerHTML = "";

        const labels =
            isPortuguese()
                ? [
                    "1. Aprender",
                    "2. Fazer",
                    "3. Conferir"
                ]
                : [
                    "1. Learn",
                    "2. Do",
                    "3. Check"
                ];

        labels.forEach(
            (label, index) => {

                const button =
                    makeButton(
                        label,
                        `hardwareStepButton${
                            state.pageIndex === index
                                ? " active"
                                : ""
                        }`,
                        () => setPage(index)
                    );

                els.progress.appendChild(
                    button
                );
            }
        );
    }

    function setPage(index) {

        state.pageIndex =
            Math.max(
                0,
                Math.min(
                    pageNames.length - 1,
                    index
                )
            );

        document
            .querySelectorAll(
                ".lessonPage"
            )
            .forEach(
                (page) => {

                    page.classList.toggle(
                        "active",
                        page.dataset.page ===
                        pageNames[
                            state.pageIndex
                        ]
                    );
                }
            );

        renderProgress();

        updateProgressBar();

        clearStatus();
    }

    function updateProgressBar() {

        if (!els.progressFill) {
            return;
        }

        let percentage = 33;

        if (
            state.pageIndex === 1
        ) {
            percentage = 66;
        }

        if (
            state.pageIndex === 2
        ) {
            percentage =
                state.quizCorrect
                    ? 100
                    : 66;
        }

        els.progressFill.style.width =
            `${percentage}%`;
    }

    function renderGrade1Learn() {

        const grid =
            document.createElement(
                "div"
            );

        grid.className =
            "hardwareOptionGrid";

        lesson.learnCards.forEach(
            (card) => {

                const panel =
                    document.createElement(
                        "div"
                    );

                panel.className =
                    "hardwareInfoPanel";

                panel.style.boxShadow =
                    "none";

                const title =
                    document.createElement(
                        "h3"
                    );

                title.className =
                    "hardwarePanelTitle";

                title.textContent =
                    card[1];

                const text =
                    document.createElement(
                        "p"
                    );

                text.className =
                    "hardwarePanelText";

                text.textContent =
                    isPortuguese()
                        ? card[3]
                        : card[2];

                panel.append(
                    title,
                    text
                );

                grid.appendChild(
                    panel
                );
            }
        );

        els.learnArea.appendChild(
            grid
        );
    }

    function renderGrade2Learn() {

        const panel =
            document.createElement(
                "div"
            );

        panel.className =
            "simPc";

        panel.innerHTML = `

            <div class="simPcTop">

                <span>
                    ${t(
                        "PC TOWER",
                        "TORRE DO PC"
                    )}
                </span>

                <span
                    class="simPcPower"
                ></span>

            </div>

            <div class="simPcBody">

                <div class="simMonitor">

                    <div class="simScreen">

                        ${t(
                            "A monitor receives a video signal from the computer.",
                            "Um monitor recebe um sinal de vídeo do computador."
                        )}

                    </div>

                    <div
                        class="simMonitorStand"
                    ></div>

                </div>

                <div class="simTower">

                    <div
                        class="simTowerTitle"
                    >
                        ${t(
                            "Example ports",
                            "Exemplo de portas"
                        )}
                    </div>

                    <div
                        class="simPortArea"
                    >

                        <div
                            class="simPort"
                        >
                            <span>
                                HDMI
                            </span>

                            <small>
                                VIDEO
                            </small>
                        </div>

                        <div
                            class="simPort"
                        >
                            <span>
                                Ethernet
                            </span>

                            <small>
                                NETWORK
                            </small>
                        </div>

                        <div
                            class="simPort"
                        >
                            <span>
                                Audio
                            </span>

                            <small>
                                SOUND
                            </small>
                        </div>

                        <div
                            class="simPort"
                        >
                            <span>
                                Power
                            </span>

                            <small>
                                ENERGY
                            </small>
                        </div>

                    </div>

                </div>

            </div>
        `;

        els.learnArea.appendChild(
            panel
        );
    }

    function renderGrade3Learn() {

        const intro =
            document.createElement(
                "p"
            );

        intro.className =
            "hardwarePanelText";

        intro.style.marginBottom =
            "15px";

        intro.textContent =
            t(
                "Click a component to see what it does.",
                "Clique em um componente para ver o que ele faz."
            );

        els.learnArea.appendChild(
            intro
        );

        const board =
            document.createElement(
                "div"
            );

        board.className =
            "componentBoard";

        Object.entries(
            lesson.components
        ).forEach(
            ([key, data]) => {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type = "button";

                button.className =
                    "componentPart";

                button.dataset.part =
                    key;

                button.textContent =
                    data[0];

                button.addEventListener(
                    "click",
                    () =>
                        selectComponent(
                            key,
                            button
                        )
                );

                board.appendChild(
                    button
                );
            }
        );

        const info =
            document.createElement(
                "div"
            );

        info.className =
            "componentInfo";

        info.id =
            "componentInfo";

        info.textContent =
            t(
                "Choose a component to inspect it.",
                "Escolha um componente para examiná-lo."
            );

        board.appendChild(
            info
        );

        els.learnArea.appendChild(
            board
        );
    }

    function renderGrade4Learn() {

        const panel =
            document.createElement(
                "div"
            );

        panel.className =
            "troubleshootPanel";

        panel.innerHTML = `

            <div class="symptom">

                <strong>
                    ${t(
                        "Step 1: Observe",
                        "Passo 1: Observe"
                    )}
                </strong>

                <span>
                    ${t(
                        "Look at the symptom before changing anything.",
                        "Observe o sintoma antes de mudar qualquer coisa."
                    )}
                </span>

            </div>

            <div class="symptom">

                <strong>
                    ${t(
                        "Step 2: Think",
                        "Passo 2: Pense"
                    )}
                </strong>

                <span>
                    ${t(
                        "Consider a few causes that could explain the symptom.",
                        "Pense em algumas causas que poderiam explicar o sintoma."
                    )}
                </span>

            </div>

            <div class="symptom">

                <strong>
                    ${t(
                        "Step 3: Test",
                        "Passo 3: Teste"
                    )}
                </strong>

                <span>
                    ${t(
                        "Check the simplest relevant connection or component first.",
                        "Verifique primeiro a conexão ou o componente relevante mais simples."
                    )}
                </span>

            </div>
        `;

        els.learnArea.appendChild(
            panel
        );
    }

    function renderGrade5Learn() {

        const panel =
            document.createElement(
                "div"
            );

        panel.className =
            "builderPanel";

        panel.innerHTML = `

            <h3
                class="hardwarePanelTitle"
            >
                ${t(
                    "A PC is a system of connected parts.",
                    "Um PC é um sistema de peças conectadas."
                )}
            </h3>

            <p
                class="hardwarePanelText"
            >
                ${t(
                    "A basic computer needs processing, memory, storage, power, and a motherboard that connects the components.",
                    "Um computador básico precisa de processamento, memória, armazenamento, energia e uma placa-mãe que conecta os componentes."
                )}
            </p>
        `;

        els.learnArea.appendChild(
            panel
        );
    }

    function renderLearn() {

        els.learnArea.innerHTML =
            "";

        try {

            if (
                lesson.grade === 1
            ) {

                renderGrade1Learn();
                return;
            }

            if (
                lesson.grade === 2
            ) {

                renderGrade2Learn();
                return;
            }

            if (
                lesson.grade === 3
            ) {

                renderGrade3Learn();
                return;
            }

            if (
                lesson.grade === 4
            ) {

                renderGrade4Learn();
                return;
            }

            if (
                lesson.grade === 5
            ) {

                renderGrade5Learn();
                return;
            }

        } catch (error) {

            console.error(
                "Failed to render Learn stage:",
                error
            );

            els.learnArea.innerHTML = "";

            const panel =
                document.createElement(
                    "div"
                );

            panel.className =
                "hardwareInfoPanel";

            panel.style.boxShadow =
                "none";

            panel.innerHTML = `

                <h3
                    class="hardwarePanelTitle"
                >
                    ${t(
                        "Lesson content could not be loaded.",
                        "O conteúdo da lição não pôde ser carregado."
                    )}
                </h3>

                <p
                    class="hardwarePanelText"
                >
                    ${t(
                        "Make sure hardwareData.js and hardwareSimulator.js are in the same folder as hardwareLesson.html.",
                        "Verifique se hardwareData.js e hardwareSimulator.js estão na mesma pasta que hardwareLesson.html."
                    )}
                </p>
            `;

            els.learnArea.appendChild(
                panel
            );
        }
    }

    function selectComponent(
        key,
        button
    ) {

        state.selectedComponent =
            key;

        document
            .querySelectorAll(
                ".componentPart"
            )
            .forEach(
                (part) => {
                    part.classList.remove(
                        "selected"
                    );
                }
            );

        button.classList.add(
            "selected"
        );

        const data =
            lesson.components[key];

        const info =
            document.getElementById(
                "componentInfo"
            );

        if (!info || !data) {
            return;
        }

        info.innerHTML = `
            <strong>
                ${data[0]}
            </strong>

            <br>

            ${
                isPortuguese()
                    ? data[2]
                    : data[1]
            }
        `;
    }

    function renderConnectionActivity() {

        const cables =
            lesson.grade === 1

                ? [

                    {
                        id: "keyboard",
                        label: "Keyboard",
                        pt: "Teclado",
                        port: "usb1"
                    },

                    {
                        id: "mouse",
                        label: "Mouse",
                        pt: "Mouse",
                        port: "usb2"
                    }

                ]

                : [

                    {
                        id: "monitor",
                        label: "HDMI",
                        pt: "HDMI",
                        port: "hdmi"
                    },

                    {
                        id: "network",
                        label: "Ethernet",
                        pt: "Ethernet",
                        port: "ethernet"
                    },

                    {
                        id: "power",
                        label: "Power",
                        pt: "Energia",
                        port: "power"
                    },

                    {
                        id: "audio",
                        label: "Audio",
                        pt: "Áudio",
                        port: "audio"
                    }

                ];

        const tray =
            document.createElement(
                "div"
            );

        tray.className =
            "simCableTray";

        cables.forEach(
            (cable) => {

                const button =
                    makeButton(
                        isPortuguese()
                            ? cable.pt
                            : cable.label,

                        "simCable",

                        () =>
                            selectCable(
                                cable,
                                button
                            )
                    );

                button.dataset.cable =
                    cable.id;

                tray.appendChild(
                    button
                );
            }
        );

        const pc =
            document.createElement(
                "div"
            );

        pc.className =
            "simPc";

        pc.innerHTML = `

            <div class="simPcTop">

                <span>
                    ${t(
                        "SIMULATED PC",
                        "PC SIMULADO"
                    )}
                </span>

                <span
                    class="simPcPower"
                ></span>

            </div>

            <div class="simPcBody">

                <div class="simMonitor">

                    <div
                        class="simScreen"
                        id="monitorScreen"
                    >

                        ${t(
                            "Choose a cable, then choose where it connects.",
                            "Escolha um cabo e depois escolha onde ele será conectado."
                        )}

                    </div>

                    <div
                        class="simMonitorStand"
                    ></div>

                </div>

                <div class="simTower">

                    <div
                        class="simTowerTitle"
                    >
                        ${t(
                            "Ports",
                            "Portas"
                        )}
                    </div>

                    <div
                        class="simPortArea"
                    >

                        <button
                            type="button"
                            class="simPort"
                            data-port="usb1"
                        >
                            <span>
                                USB 1
                            </span>

                            <small>
                                INPUT
                            </small>
                        </button>

                        <button
                            type="button"
                            class="simPort"
                            data-port="usb2"
                        >
                            <span>
                                USB 2
                            </span>

                            <small>
                                INPUT
                            </small>
                        </button>

                        <button
                            type="button"
                            class="simPort"
                            data-port="hdmi"
                        >
                            <span>
                                HDMI
                            </span>

                            <small>
                                VIDEO
                            </small>
                        </button>

                        <button
                            type="button"
                            class="simPort"
                            data-port="ethernet"
                        >
                            <span>
                                Ethernet
                            </span>

                            <small>
                                NETWORK
                            </small>
                        </button>

                        <button
                            type="button"
                            class="simPort"
                            data-port="audio"
                        >
                            <span>
                                Audio
                            </span>

                            <small>
                                SOUND
                            </small>
                        </button>

                        <button
                            type="button"
                            class="simPort"
                            data-port="power"
                        >
                            <span>
                                Power
                            </span>

                            <small>
                                ENERGY
                            </small>
                        </button>

                    </div>

                </div>

            </div>
        `;

        els.doArea.appendChild(
            pc
        );

        els.doArea.appendChild(
            tray
        );

        pc
            .querySelectorAll(
                ".simPort"
            )
            .forEach(
                (port) => {

                    port.addEventListener(
                        "click",
                        () =>
                            connectToPort(
                                port.dataset.port,
                                port,
                                cables
                            )
                    );
                }
            );
    }

    function selectCable(
        cable,
        button
    ) {

        state.selectedCable =
            cable;

        document
            .querySelectorAll(
                ".simCable"
            )
            .forEach(
                (node) => {

                    node.classList.remove(
                        "selected"
                    );
                }
            );

        button.classList.add(
            "selected"
        );

        document
            .querySelectorAll(
                ".simPort"
            )
            .forEach(
                (port) => {

                    port.classList.add(
                        "target"
                    );
                }
            );

        setStatus(
            t(
                "Now choose the matching port.",
                "Agora escolha a porta correspondente."
            )
        );
    }

    function connectToPort(
        portId,
        portElement,
        cables
    ) {

        if (!state.selectedCable) {

            setStatus(
                t(
                    "Choose a cable first.",
                    "Escolha um cabo primeiro."
                ),
                "error"
            );

            return;
        }

        const cable =
            state.selectedCable;

        if (
            cable.port !==
            portId
        ) {

            setStatus(
                t(
                    "That cable does not belong in this port.",
                    "Esse cabo não pertence a esta porta."
                ),
                "error"
            );

            portElement.classList.remove(
                "target"
            );

            setTimeout(
                () => {
                    portElement.classList.add(
                        "target"
                    );
                },
                200
            );

            return;
        }

        state.connections[
            cable.id
        ] = portId;

        portElement.classList.remove(
            "target"
        );

        portElement.classList.add(
            "connected"
        );

        const cableButton =
            document.querySelector(
                `.simCable[data-cable="${cable.id}"]`
            );

        if (cableButton) {

            cableButton.classList.remove(
                "selected"
            );

            cableButton.classList.add(
                "connected"
            );
        }

        state.selectedCable =
            null;

        document
            .querySelectorAll(
                ".simPort"
            )
            .forEach(
                (port) => {

                    port.classList.remove(
                        "target"
                    );
                }
            );

        const connected =
            Object.keys(
                state.connections
            ).length;

        const required =
            cables.length;

        if (
            connected >=
            required
        ) {

            setStatus(
                t(
                    "Nice! All required connections are correct.",
                    "Boa! Todas as conexões necessárias estão corretas."
                ),
                "success"
            );

            const screen =
                document.getElementById(
                    "monitorScreen"
                );

            if (screen) {

                screen.textContent =
                    t(
                        "Connection complete. The simulated computer is ready.",
                        "Conexão concluída. O computador simulado está pronto."
                    );
            }

        } else {

            setStatus(
                t(
                    `${connected} of ${required} connections complete.`,
                    `${connected} de ${required} conexões concluídas.`
                )
            );
        }
    }

    function renderGrade3Do() {

        const panel =
            document.createElement(
                "div"
            );

        panel.className =
            "troubleshootPanel";

        panel.innerHTML = `

            <div class="symptom">

                <strong>
                    ${t(
                        "Quick challenge",
                        "Desafio rápido"
                    )}
                </strong>

                <span>
                    ${t(
                        "Which component stores files long-term?",
                        "Qual componente armazena arquivos a longo prazo?"
                    )}
                </span>

            </div>

            <div
                id="componentQuickChoices"
                class="diagnosisChoices"
            ></div>

            <div
                id="componentQuickFeedback"
                class="hardwareFeedback"
            ></div>
        `;

        els.doArea.appendChild(
            panel
        );

        const choices =
            document.getElementById(
                "componentQuickChoices"
            );

        [
            "CPU",
            "RAM",
            "Storage",
            "GPU"
        ].forEach(
            (name) => {

                const button =
                    makeButton(
                        name,
                        "hardwareChoice",
                        () => {

                            const correct =
                                name ===
                                "Storage";

                            document
                                .querySelectorAll(
                                    "#componentQuickChoices .hardwareChoice"
                                )
                                .forEach(
                                    (node) => {

                                        node.classList.remove(
                                            "correct",
                                            "wrong"
                                        );
                                    }
                                );

                            button.classList.add(
                                correct
                                    ? "correct"
                                    : "wrong"
                            );

                            const feedback =
                                document.getElementById(
                                    "componentQuickFeedback"
                                );

                            feedback.textContent =
                                correct

                                    ? t(
                                        "Correct! Storage keeps files long-term.",
                                        "Correto! O armazenamento mantém arquivos a longo prazo."
                                    )

                                    : t(
                                        "Not this one. Think about where files remain when the power is off.",
                                        "Não é essa. Pense em onde os arquivos continuam quando a energia está desligada."
                                    );

                            if (correct) {

                                state.componentActivityComplete =
                                    true;

                                setStatus(
                                    t(
                                        "Activity complete!",
                                        "Atividade concluída!"
                                    ),
                                    "success"
                                );
                            }
                        }
                    );

                choices.appendChild(
                    button
                );
            }
        );
    }

    function renderTroubleshootActivity() {

        const problem =
            lesson.problems[
                state.problemIndex
            ];

        const panel =
            document.createElement(
                "div"
            );

        panel.className =
            "troubleshootPanel";

        panel.innerHTML = `

            <div class="symptom">

                <strong>
                    ${
                        isPortuguese()
                            ? problem.titlePt
                            : problem.titleEn
                    }
                </strong>

                <span>
                    ${
                        isPortuguese()
                            ? problem.symptomPt
                            : problem.symptomEn
                    }
                </span>

            </div>

            <div
                id="diagnosisChoices"
                class="diagnosisChoices"
            ></div>

            <div
                id="diagnosisFeedback"
                class="hardwareFeedback"
            ></div>

            <div class="hardwareActionRow">

                <button
                    id="nextProblem"
                    type="button"
                    class="hardwareActionButton secondary"
                >
                    ${t(
                        "Next problem",
                        "Próximo problema"
                    )}
                </button>

            </div>
        `;

        els.doArea.appendChild(
            panel
        );

        const choices =
            document.getElementById(
                "diagnosisChoices"
            );

        problem.answers.forEach(
            (answer) => {

                const button =
                    makeButton(
                        answer,
                        "hardwareChoice",
                        () => {

                            const correct =
                                answer ===
                                problem.correct;

                            document
                                .querySelectorAll(
                                    "#diagnosisChoices .hardwareChoice"
                                )
                                .forEach(
                                    (node) => {

                                        node.classList.remove(
                                            "correct",
                                            "wrong"
                                        );
                                    }
                                );

                            button.classList.add(
                                correct
                                    ? "correct"
                                    : "wrong"
                            );

                            const feedback =
                                document.getElementById(
                                    "diagnosisFeedback"
                                );

                            feedback.textContent =
                                correct

                                    ? t(
                                        "Correct diagnosis!",
                                        "Diagnóstico correto!"
                                    )

                                    : t(
                                        "Not quite. Re-read the symptom.",
                                        "Ainda não. Releia o sintoma."
                                    );

                            if (correct) {

                                state.solvedProblems.add(
                                    problem.id
                                );

                                setStatus(
                                    t(
                                        "Problem solved.",
                                        "Problema resolvido."
                                    ),
                                    "success"
                                );
                            }
                        }
                    );

                choices.appendChild(
                    button
                );
            }
        );

        document
            .getElementById(
                "nextProblem"
            )
            .addEventListener(
                "click",
                () => {

                    state.problemIndex =
                        (
                            state.problemIndex +
                            1
                        ) %
                        lesson.problems.length;

                    clearStatus();

                    renderDo();
                }
            );
    }

    function renderBuilderActivity() {

        const panel =
            document.createElement(
                "div"
            );

        panel.className =
            "builderPanel";

        panel.innerHTML = `

            <div class="builderSlots">

                <div class="builderSlot">

                    <label
                        for="builderCpu"
                    >
                        CPU
                    </label>

                    <select
                        id="builderCpu"
                    ></select>

                </div>

                <div class="builderSlot">

                    <label
                        for="builderBoard"
                    >
                        Motherboard
                    </label>

                    <select
                        id="builderBoard"
                    ></select>

                </div>

                <div class="builderSlot">

                    <label
                        for="builderRam"
                    >
                        RAM
                    </label>

                    <select
                        id="builderRam"
                    ></select>

                </div>

                <div class="builderSlot">

                    <label
                        for="builderStorage"
                    >
                        Storage
                    </label>

                    <select
                        id="builderStorage"
                    ></select>

                </div>

                <div class="builderSlot">

                    <label
                        for="builderPsu"
                    >
                        Power Supply
                    </label>

                    <select
                        id="builderPsu"
                    ></select>

                </div>

                <div class="builderSlot">

                    <label
                        for="builderGpu"
                    >
                        Graphics
                    </label>

                    <select
                        id="builderGpu"
                    ></select>

                </div>

                <div class="builderSlot">

                    <label
                        for="builderCooling"
                    >
                        Cooling
                    </label>

                    <select
                        id="builderCooling"
                    ></select>

                </div>

            </div>

            <div
                id="builderResult"
                class="builderResult"
            ></div>

            <div class="hardwareActionRow">

                <button
                    id="checkBuild"
                    type="button"
                    class="hardwareActionButton"
                >
                    ${t(
                        "Check build",
                        "Verificar montagem"
                    )}
                </button>

            </div>
        `;

        els.doArea.appendChild(
            panel
        );

        const options = {

            builderCpu: [
                "Ryzen 5",
                "Core i5"
            ],

            builderBoard: [
                "B550",
                "B660"
            ],

            builderRam: [
                "16 GB DDR4",
                "16 GB DDR5"
            ],

            builderStorage: [
                "1 TB SSD",
                "500 GB SSD"
            ],

            builderPsu: [
                "550 W",
                "650 W"
            ],

            builderGpu: [
                "Integrated graphics",
                "Mid-range GPU"
            ],

            builderCooling: [
                "Stock cooler",
                "Tower cooler"
            ]
        };

        const keyMap = {

            builderCpu:
                "cpu",

            builderBoard:
                "motherboard",

            builderRam:
                "ram",

            builderStorage:
                "storage",

            builderPsu:
                "psu",

            builderGpu:
                "gpu",

            builderCooling:
                "cooling"
        };

        Object.entries(
            options
        ).forEach(
            ([selectId, values]) => {

                const select =
                    document.getElementById(
                        selectId
                    );

                if (!select) {
                    return;
                }

                const stateKey =
                    keyMap[
                        selectId
                    ];

                values.forEach(
                    (value) => {

                        const option =
                            document.createElement(
                                "option"
                            );

                        option.value =
                            value;

                        option.textContent =
                            value;

                        if (
                            state.builder[
                                stateKey
                            ] === value
                        ) {

                            option.selected =
                                true;
                        }

                        select.appendChild(
                            option
                        );
                    }
                );

                select.addEventListener(
                    "change",
                    () => {

                        state.builder[
                            stateKey
                        ] =
                            select.value;
                    }
                );
            }
        );

        document
            .getElementById(
                "checkBuild"
            )
            .addEventListener(
                "click",
                checkBuild
            );
    }

    function checkBuild() {

        const board =
            state.builder.motherboard;

        const ram =
            state.builder.ram;

        const compatible =

            (
                board === "B550" &&
                ram === "16 GB DDR4"
            )

            ||

            (
                board === "B660" &&
                ram === "16 GB DDR5"
            );

        const hasStorage =
            Boolean(
                state.builder.storage
            );

        const hasPower =
            Boolean(
                state.builder.psu
            );

        const result =
            document.getElementById(
                "builderResult"
            );

        if (!result) {
            return;
        }

        if (
            compatible &&
            hasStorage &&
            hasPower
        ) {

            state.buildCorrect =
                true;

            result.textContent =
                t(
                    "Build check passed! The main components are present and the RAM matches the motherboard.",
                    "A montagem passou! Os principais componentes estão presentes e a RAM combina com a placa-mãe."
                );

            result.style.color =
                "#459e59";

            setStatus(
                t(
                    "PC build completed!",
                    "Montagem do PC concluída!"
                ),
                "success"
            );

        } else {

            state.buildCorrect =
                false;

            result.textContent =
                t(
                    "Something does not match. Check the motherboard and RAM pairing.",
                    "Alguma coisa não combina. Confira a combinação entre a placa-mãe e a RAM."
                );

            result.style.color =
                "#c85353";

            setStatus(
                t(
                    "Fix the configuration and check again.",
                    "Corrija a configuração e verifique novamente."
                ),
                "error"
            );
        }
    }

    function renderDo() {

        els.doArea.innerHTML =
            "";

        try {

            if (
                lesson.grade === 1 ||
                lesson.grade === 2
            ) {

                renderConnectionActivity();
                return;
            }

            if (
                lesson.grade === 3
            ) {

                renderGrade3Do();
                return;
            }

            if (
                lesson.grade === 4
            ) {

                renderTroubleshootActivity();
                return;
            }

            if (
                lesson.grade === 5
            ) {

                renderBuilderActivity();
                return;
            }

        } catch (error) {

            console.error(
                "Failed to render Do stage:",
                error
            );

            els.doArea.innerHTML =
                "";

            const panel =
                document.createElement(
                    "div"
                );

            panel.className =
                "hardwareInfoPanel";

            panel.style.boxShadow =
                "none";

            panel.innerHTML = `

                <h3
                    class="hardwarePanelTitle"
                >
                    ${t(
                        "Activity could not be loaded.",
                        "A atividade não pôde ser carregada."
                    )}
                </h3>

                <p
                    class="hardwarePanelText"
                >
                    ${t(
                        "Make sure hardwareData.js and hardwareSimulator.js are in the same folder as hardwareLesson.html.",
                        "Verifique se hardwareData.js e hardwareSimulator.js estão na mesma pasta que hardwareLesson.html."
                    )}
                </p>
            `;

            els.doArea.appendChild(
                panel
            );
        }
    }

    function renderCheck() {

        els.checkArea.innerHTML =
            "";

        try {

            const question =
                lesson.question;

            const panel =
                document.createElement(
                    "div"
                );

            panel.className =
                "hardwareInfoPanel";

            panel.style.boxShadow =
                "none";

            const questionText =
                document.createElement(
                    "p"
                );

            questionText.className =
                "hardwareQuestionText";

            questionText.textContent =
                isPortuguese()
                    ? question.pt
                    : question.en;

            const choices =
                document.createElement(
                    "div"
                );

            choices.className =
                "hardwareOptionGrid";

            const feedback =
                document.createElement(
                    "div"
                );

            feedback.className =
                "hardwareFeedback";

            question.answers.forEach(
                (answer) => {

                    const button =
                        makeButton(
                            answer,
                            "hardwareChoice",
                            () => {

                                if (
                                    state.quizAnswered
                                ) {
                                    return;
                                }

                                state.quizAnswered =
                                    true;

                                const correct =
                                    answer ===
                                    question.correct;

                                state.quizCorrect =
                                    correct;

                                choices
                                    .querySelectorAll(
                                        "button"
                                    )
                                    .forEach(
                                        (node) => {

                                            node.disabled =
                                                true;
                                        }
                                    );

                                button.classList.add(
                                    correct
                                        ? "correct"
                                        : "wrong"
                                );

                                if (
                                    correct
                                ) {

                                    feedback.textContent =
                                        t(
                                            "Correct! Lesson complete.",
                                            "Correto! Lição concluída."
                                        );

                                    feedback.style.color =
                                        "#459e59";

                                    setStatus(
                                        t(
                                            "Lesson complete!",
                                            "Lição concluída!"
                                        ),
                                        "success"
                                    );

                                    if (
                                        els.progressFill
                                    ) {

                                        els.progressFill.style.width =
                                            "100%";
                                    }

                                } else {

                                    feedback.textContent =
                                        t(
                                            `Not quite. The correct answer is ${question.correct}.`,
                                            `Ainda não. A resposta correta é ${question.correct}.`
                                        );

                                    feedback.style.color =
                                        "#c85353";

                                    setStatus(
                                        t(
                                            "Try again after reviewing the lesson.",
                                            "Revise a lição e tente novamente."
                                        ),
                                        "error"
                                    );
                                }
                            }
                        );

                    choices.appendChild(
                        button
                    );
                }
            );

            panel.append(
                questionText,
                choices,
                feedback
            );

            els.checkArea.appendChild(
                panel
            );

        } catch (error) {

            console.error(
                "Failed to render Check stage:",
                error
            );

            els.checkArea.innerHTML = `

                <div
                    class="hardwareInfoPanel"
                >

                    <h3
                        class="hardwarePanelTitle"
                    >
                        ${t(
                            "Question could not be loaded.",
                            "A pergunta não pôde ser carregada."
                        )}
                    </h3>

                </div>
            `;
        }
    }

    function renderAll() {

        renderHeader();

        renderProgress();

        renderLearn();

        renderDo();

        renderCheck();

        setPage(
            state.pageIndex
        );
    }

    window.addEventListener(
        "languageChanged",
        () => {

            state.selectedCable = null;

            state.connections = {};

            state.selectedComponent =
                null;

            state.problemIndex =
                0;

            state.solvedProblems.clear();

            state.quizAnswered =
                false;

            state.quizCorrect =
                false;

            renderAll();
        }
    );

    renderAll();

})();