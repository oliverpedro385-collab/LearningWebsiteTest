/* =========================================================
   PROJECT
   ========================================================= */

const makerParams =
    new URLSearchParams(
        window.location.search
    );


const projectId =
    makerParams.get("project");


let project =
    makerProjects[projectId];


if (!project) {

    project =
        makerProjects.light;

}





/* =========================================================
   DOM
   ========================================================= */

const breadboard =
    document.getElementById(
        "breadboard"
    );


const breadboardHoles =
    document.getElementById(
        "breadboardHoles"
    );


const breadboardLetters =
    document.getElementById(
        "breadboardLetters"
    );


const breadboardNumbers =
    document.getElementById(
        "breadboardNumbers"
    );


const wireLayer =
    document.getElementById(
        "wireLayer"
    );


const componentLayer =
    document.getElementById(
        "componentLayer"
    );


const makerPalette =
    document.getElementById(
        "makerPalette"
    );


const testButton =
    document.getElementById(
        "testButton"
    );


const wireButton =
    document.getElementById(
        "wireButton"
    );


const deleteButton =
    document.getElementById(
        "deleteButton"
    );


const clearButton =
    document.getElementById(
        "clearButton"
    );


const makerStatus =
    document.getElementById(
        "makerStatus"
    );


const statusDot =
    document.getElementById(
        "statusDot"
    );


const statusText =
    document.getElementById(
        "statusText"
    );





/* =========================================================
   BOARD CONFIG
   ========================================================= */

const boardConfig = {

    startX:
        78,

    startY:
        92,

    columnGap:
        30,

    rowGap:
        20,

    centerGap:
        18,

    rows:
        30,

    columns:
        10

};


const columnLetters = [

    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J"

];


const holePositions =
    new Map();





/* =========================================================
   STATE
   ========================================================= */

let components =
    [];

let wires =
    [];

let selectedComponentId =
    null;

let wireMode =
    false;

let wireStartHole =
    null;

let draggingComponent =
    null;

let testSucceeded =
    false;

let nextComponentId =
    1;





/* =========================================================
   RANDOM LED COLOR
   ========================================================= */

function getRandomLEDColor() {

    const colors = [

        "#ff4f5e",

        "#ff7b35",

        "#ffd23f",

        "#5edb68",

        "#35c9ff",

        "#5d7cff",

        "#a86bff",

        "#ff5fd2"

    ];


    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];

}





/* =========================================================
   LANGUAGE
   ========================================================= */

function getMakerLanguage() {

    return (
        localStorage.getItem(
            "siteLanguage"
        ) ||
        "en"
    );

}





/* =========================================================
   HOLE IDS
   ========================================================= */

function getHoleId(
    row,
    column
) {

    return (
        columnLetters[column] +
        (row + 1)
    );

}





function getHolePosition(
    holeId
) {

    return holePositions.get(
        holeId
    );

}





/* =========================================================
   COLUMN POSITION
   ========================================================= */

function getColumnX(
    column
) {

    let x =
        boardConfig.startX +
        (
            column *
            boardConfig.columnGap
        );


    if (
        column >= 5
    ) {

        x +=
            boardConfig.centerGap;

    }


    return x;

}





/* =========================================================
   CREATE BOARD
   ========================================================= */

function createBoard() {

    breadboardHoles.innerHTML =
        "";

    breadboardLetters.innerHTML =
        "";

    breadboardNumbers.innerHTML =
        "";

    holePositions.clear();



    /* Column labels */

    for (
        let column = 0;
        column < boardConfig.columns;
        column++
    ) {

        const label =
            document.createElement(
                "div"
            );


        label.className =
            "breadboardColumnLabel";


        label.textContent =
            columnLetters[column];


        label.style.left =
            `${getColumnX(column)}px`;


        breadboardLetters.appendChild(
            label
        );

    }



    /* Rows and holes */

    for (
        let row = 0;
        row < boardConfig.rows;
        row++
    ) {


        const number =
            document.createElement(
                "div"
            );


        number.className =
            "breadboardRowLabel";


        number.textContent =
            row + 1;


        number.style.top =
            `${boardConfig.startY + row * boardConfig.rowGap}px`;


        breadboardNumbers.appendChild(
            number
        );



        for (
            let column = 0;
            column < boardConfig.columns;
            column++
        ) {


            const holeId =
                getHoleId(
                    row,
                    column
                );


            const x =
                getColumnX(
                    column
                );


            const y =
                boardConfig.startY +
                (
                    row *
                    boardConfig.rowGap
                );


            holePositions.set(
                holeId,
                {
                    x,
                    y
                }
            );



            const hole =
                document.createElement(
                    "button"
                );


            hole.type =
                "button";


            hole.className =
                "makerHole";


            hole.dataset.hole =
                holeId;


            hole.style.left =
                `${x - 6}px`;


            hole.style.top =
                `${y - 6}px`;



            hole.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    handleHoleConnection(
                        holeId
                    );

                }
            );



            breadboardHoles.appendChild(
                hole
            );

        }

    }

}





/* =========================================================
   REQUIRED PART MAP
   ========================================================= */

function getRequiredMap() {

    const map =
        new Map();


    project.required.forEach(
        requirement => {

            map.set(
                requirement.type,
                requirement.count
            );

        }
    );


    return map;

}





/* =========================================================
   PALETTE
   ========================================================= */

function renderPalette() {

    makerPalette.innerHTML =
        "";


    const language =
        getMakerLanguage();


    project.required.forEach(
        requirement => {


            const type =
                requirement.type;


            const component =
                makerComponents[type];


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "makerPalettePart";


            const name =
                document.createElement(
                    "span"
                );


            name.className =
                "makerPaletteName";


            name.textContent =
                component.shortName[
                    language
                ];


            const count =
                document.createElement(
                    "span"
                );


            count.className =
                "makerPaletteCount";


            count.textContent =
                `×${requirement.count}`;


            button.appendChild(
                name
            );


            button.appendChild(
                count
            );


            button.addEventListener(
                "click",
                () => {

                    addComponent(
                        type
                    );

                }
            );


            makerPalette.appendChild(
                button
            );

        }
    );

}





/* =========================================================
   ADD COMPONENT
   ========================================================= */

function addComponent(
    type
) {

    const componentInfo =
        makerComponents[type];


    if (
        !componentInfo
    ) {

        return;

    }


    const placedCount =
        components.filter(
            component =>
                component.type ===
                type
        ).length;


    const row =
        Math.min(
            2 +
            (
                placedCount *
                3
            ),
            boardConfig.rows - 1
        );


    let column =
        0;


    if (
        placedCount % 2 ===
        1
    ) {

        column =
            5;

    }


    const maxStartColumn =
        boardConfig.columns -
        componentInfo.span -
        1;


    column =
        Math.min(
            column,
            maxStartColumn
        );


    const component = {

        id:
            nextComponentId++,

        type,

        row,

        column,

        terminals:
            [],

        switchClosed:
            false,

        powered:
            false,

        ledColor:
            type === "led"
                ? getRandomLEDColor()
                : null

    };


    updateComponentTerminals(
        component
    );


    components.push(
        component
    );


    selectedComponentId =
        component.id;


    renderComponents();

    renderWires();

    updateSelection();


    updateStatus(
        `${componentInfo.name[getMakerLanguage()]} added.`
    );

}





/* =========================================================
   COMPONENT TERMINALS
   ========================================================= */

function updateComponentTerminals(
    component
) {

    const info =
        makerComponents[
            component.type
        ];


    let secondColumn =
        component.column +
        info.span;


    if (
        secondColumn >=
        boardConfig.columns
    ) {

        secondColumn =
            boardConfig.columns -
            1;


        component.column =
            Math.max(
                0,
                secondColumn -
                info.span
            );

    }


    component.terminals = [

        getHoleId(
            component.row,
            component.column
        ),

        getHoleId(
            component.row,
            secondColumn
        )

    ];

}





/* =========================================================
   RENDER COMPONENTS
   ========================================================= */

function renderComponents() {

    componentLayer.innerHTML =
        "";


    const language =
        getMakerLanguage();


    components.forEach(
        component => {


            updateComponentTerminals(
                component
            );


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "makerComponent";


            element.dataset.id =
                component.id;


            element.dataset.type =
                component.type;



            if (
                component.id ===
                selectedComponentId
            ) {

                element.classList.add(
                    "selected"
                );

            }


            if (
                component.powered
            ) {

                element.classList.add(
                    "powered"
                );

            }


            if (
                component.type ===
                "switch"
            ) {

                element.classList.toggle(
                    "switchClosed",
                    component.switchClosed
                );

            }



            const firstHole =
                getHolePosition(
                    component.terminals[0]
                );


            const secondHole =
                getHolePosition(
                    component.terminals[1]
                );


            const width =
                (
                    secondHole.x -
                    firstHole.x
                ) + 30;


            element.style.left =
                `${firstHole.x - 15}px`;


            element.style.top =
                `${firstHole.y - 24}px`;


            element.style.width =
                `${width}px`;



            /*
                Keep the randomly selected
                LED color attached to the LED.
            */

            if (
                component.type ===
                "led"
            ) {

                element.style.setProperty(
                    "--led-color",
                    component.ledColor ||
                    "#777777"
                );

            }



            /*
                White component label.
            */

            const paper =
                document.createElement(
                    "div"
                );


            paper.className =
                "makerPaperCut";



            /*
                Small LED light.
            */

            if (
                component.type ===
                "led"
            ) {

                const ledLight =
                    document.createElement(
                        "span"
                    );


                ledLight.className =
                    "makerLEDLight";


                paper.appendChild(
                    ledLight
                );

            }



            /*
                Component name.
            */

            const name =
                document.createElement(
                    "div"
                );


            name.className =
                "makerSimplePartName";


            name.textContent =
                makerComponents[
                    component.type
                ].shortName[
                    language
                ];


            paper.appendChild(
                name
            );



            /*
                Switch OPEN / CLOSED indicator.
            */

            if (
                component.type ===
                "switch"
            ) {

                const switchIndicator =
                    document.createElement(
                        "span"
                    );


                switchIndicator.className =
                    "makerSwitchIndicator";


                switchIndicator.textContent =
                    component.switchClosed
                        ? "CLOSED"
                        : "OPEN";


                paper.appendChild(
                    switchIndicator
                );

            }



            /*
                Terminal A.
            */

            const terminalA =
                document.createElement(
                    "button"
                );


            terminalA.type =
                "button";


            terminalA.className =
                "makerTerminal terminalA";


            terminalA.dataset.hole =
                component.terminals[0];


            terminalA.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    handleHoleConnection(
                        component.terminals[0]
                    );

                }
            );



            /*
                Terminal B.
            */

            const terminalB =
                document.createElement(
                    "button"
                );


            terminalB.type =
                "button";


            terminalB.className =
                "makerTerminal terminalB";


            terminalB.dataset.hole =
                component.terminals[1];


            terminalB.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    handleHoleConnection(
                        component.terminals[1]
                    );

                }
            );



            element.appendChild(
                terminalA
            );


            element.appendChild(
                terminalB
            );


            element.appendChild(
                paper
            );



            element.addEventListener(
                "pointerdown",
                event => {

                    handleComponentPointerDown(
                        event,
                        component
                    );

                }
            );


            element.addEventListener(
                "pointerup",
                event => {

                    handleComponentPointerUp(
                        event,
                        component
                    );

                }
            );


            componentLayer.appendChild(
                element
            );

        }
    );

}





/* =========================================================
   COMPONENT DRAGGING
   ========================================================= */

function handleComponentPointerDown(
    event,
    component
) {

    if (
        wireMode
    ) {

        return;

    }


    if (
        event.target.classList.contains(
            "makerTerminal"
        )
    ) {

        return;

    }


    event.preventDefault();


    selectedComponentId =
        component.id;


    const element =
        event.currentTarget;


    const boardRect =
        breadboard.getBoundingClientRect();


    const elementRect =
        element.getBoundingClientRect();


    draggingComponent = {

        component,

        element,

        pointerId:
            event.pointerId,

        offsetX:
            event.clientX -
            elementRect.left,

        offsetY:
            event.clientY -
            elementRect.top,

        startX:
            event.clientX,

        startY:
            event.clientY,

        moved:
            false

    };


    element.setPointerCapture(
        event.pointerId
    );


    const moveHandler =
        moveEvent => {


            if (
                !draggingComponent ||
                moveEvent.pointerId !==
                    draggingComponent.pointerId
            ) {

                return;

            }


            const dx =
                moveEvent.clientX -
                draggingComponent.startX;


            const dy =
                moveEvent.clientY -
                draggingComponent.startY;


            if (
                Math.abs(dx) > 4 ||
                Math.abs(dy) > 4
            ) {

                draggingComponent.moved =
                    true;

            }


            if (
                !draggingComponent.moved
            ) {

                return;

            }


            const x =
                moveEvent.clientX -
                boardRect.left -
                draggingComponent.offsetX;


            const y =
                moveEvent.clientY -
                boardRect.top -
                draggingComponent.offsetY;


            element.style.left =
                `${x}px`;


            element.style.top =
                `${y}px`;

        };



    const endHandler =
        endEvent => {


            if (
                !draggingComponent ||
                endEvent.pointerId !==
                    draggingComponent.pointerId
            ) {

                return;

            }


            element.removeEventListener(
                "pointermove",
                moveHandler
            );


            element.removeEventListener(
                "pointerup",
                endHandler
            );


            if (
                draggingComponent.moved
            ) {

                snapComponentToBoard(
                    component,
                    element
                );

            }


            draggingComponent =
                null;


            renderComponents();

            renderWires();

            updateSelection();

        };



    element.addEventListener(
        "pointermove",
        moveHandler
    );


    element.addEventListener(
        "pointerup",
        endHandler
    );

}





function handleComponentPointerUp(
    event,
    component
) {

    if (
        draggingComponent &&
        draggingComponent.component.id ===
            component.id
    ) {


        if (
            !draggingComponent.moved &&
            component.type ===
                "switch"
        ) {


            component.switchClosed =
                !component.switchClosed;


            resetPowerState();


            renderComponents();


            updateStatus(
                component.switchClosed
                    ? (
                        getMakerLanguage() === "pt-BR"
                            ? "Interruptor fechado."
                            : "Switch closed."
                    )
                    : (
                        getMakerLanguage() === "pt-BR"
                            ? "Interruptor aberto."
                            : "Switch open."
                    )
            );

        }

    }

}





function snapComponentToBoard(
    component,
    element
) {

    const left =
        parseFloat(
            element.style.left
        ) || 0;


    const top =
        parseFloat(
            element.style.top
        ) || 0;


    const desiredX =
        left + 15;


    const desiredY =
        top + 24;


    let closestColumn =
        0;


    let closestDistance =
        Infinity;


    for (
        let column = 0;
        column < boardConfig.columns;
        column++
    ) {


        const x =
            getColumnX(
                column
            );


        const distance =
            Math.abs(
                x -
                desiredX
            );


        if (
            distance <
            closestDistance
        ) {

            closestDistance =
                distance;


            closestColumn =
                column;

        }

    }



    let closestRow =
        0;


    closestDistance =
        Infinity;



    for (
        let row = 0;
        row < boardConfig.rows;
        row++
    ) {


        const y =
            boardConfig.startY +
            (
                row *
                boardConfig.rowGap
            );


        const distance =
            Math.abs(
                y -
                desiredY
            );


        if (
            distance <
            closestDistance
        ) {

            closestDistance =
                distance;


            closestRow =
                row;

        }

    }



    component.column =
        Math.min(
            closestColumn,
            boardConfig.columns -
            makerComponents[
                component.type
            ].span -
            1
        );


    component.column =
        Math.max(
            0,
            component.column
        );


    component.row =
        Math.max(
            0,
            Math.min(
                closestRow,
                boardConfig.rows - 1
            )
        );


    updateComponentTerminals(
        component
    );

}





/* =========================================================
   WIRE CONNECTIONS
   ========================================================= */

function handleHoleConnection(
    holeId
) {

    if (
        !wireMode
    ) {

        return;

    }


    if (
        !wireStartHole
    ) {

        wireStartHole =
            holeId;


        highlightWireStart();


        updateStatus(
            makerUI[
                getMakerLanguage()
            ].clickHole
        );


        return;

    }


    if (
        wireStartHole ===
        holeId
    ) {

        wireStartHole =
            null;


        clearWireStart();


        updateStatus(
            getMakerLanguage() === "pt-BR"
                ? "Conexão cancelada."
                : "Connection cancelled."
        );


        return;

    }


    const alreadyExists =
        wires.some(
            wire =>
                (
                    wire.a ===
                    wireStartHole &&
                    wire.b ===
                    holeId
                ) ||
                (
                    wire.a ===
                    holeId &&
                    wire.b ===
                    wireStartHole
                )
        );


    if (
        !alreadyExists
    ) {

        wires.push({

            a:
                wireStartHole,

            b:
                holeId

        });

    }


    wireStartHole =
        null;


    clearWireStart();


    renderWires();


    updateStatus(
        getMakerLanguage() === "pt-BR"
            ? "Fio conectado."
            : "Wire connected."
    );

}





/* =========================================================
   WIRE MODE
   ========================================================= */

wireButton.addEventListener(
    "click",
    () => {


        wireMode =
            !wireMode;


        wireStartHole =
            null;


        clearWireStart();


        const language =
            getMakerLanguage();


        wireButton.textContent =
            wireMode
                ? makerUI[
                    language
                ].wireModeOn
                : makerUI[
                    language
                ].wireMode;


        wireButton.classList.toggle(
            "active",
            wireMode
        );


        updateStatus(
            wireMode
                ? makerUI[
                    language
                ].clickHole
                : (
                    language === "pt-BR"
                        ? "Modo Fio desativado."
                        : "Wire Mode turned off."
                )
        );

    }
);





function highlightWireStart() {

    document
        .querySelectorAll(
            ".makerHole"
        )
        .forEach(
            hole => {

                hole.classList.toggle(
                    "wireStart",
                    hole.dataset.hole ===
                        wireStartHole
                );

            }
        );


    document
        .querySelectorAll(
            ".makerTerminal"
        )
        .forEach(
            terminal => {

                terminal.classList.toggle(
                    "wireStart",
                    terminal.dataset.hole ===
                        wireStartHole
                );

            }
        );

}





function clearWireStart() {

    document
        .querySelectorAll(
            ".wireStart"
        )
        .forEach(
            element => {

                element.classList.remove(
                    "wireStart"
                );

            }
        );

}





/* =========================================================
   SELECTION
   ========================================================= */

function updateSelection() {

    document
        .querySelectorAll(
            ".makerComponent"
        )
        .forEach(
            element => {


                const id =
                    Number(
                        element.dataset.id
                    );


                element.classList.toggle(
                    "selected",
                    id ===
                        selectedComponentId
                );

            }
        );

}





/* =========================================================
   DELETE COMPONENT
   ========================================================= */

deleteButton.addEventListener(
    "click",
    () => {


        if (
            selectedComponentId ===
            null
        ) {

            updateStatus(
                makerUI[
                    getMakerLanguage()
                ].removeHint
            );


            return;

        }


        components =
            components.filter(
                component =>
                    component.id !==
                    selectedComponentId
            );


        selectedComponentId =
            null;


        resetPowerState();


        renderComponents();

        renderWires();


        updateStatus(
            getMakerLanguage() === "pt-BR"
                ? "Peça removida."
                : "Component removed."
        );

    }
);





/* =========================================================
   CLEAR BOARD
   ========================================================= */

clearButton.addEventListener(
    "click",
    () => {


        components =
            [];


        wires =
            [];


        selectedComponentId =
            null;


        wireStartHole =
            null;


        testSucceeded =
            false;


        clearWireStart();


        renderComponents();

        renderWires();


        updateStatus(
            getMakerLanguage() === "pt-BR"
                ? "Placa limpa."
                : "Board cleared."
        );

    }
);





/* =========================================================
   UNION FIND
   ========================================================= */

class UnionFind {

    constructor(
        size
    ) {

        this.parent =
            Array.from(
                {
                    length:
                        size
                },
                (
                    _,
                    index
                ) =>
                    index
            );


        this.rank =
            new Array(
                size
            ).fill(
                0
            );

    }



    find(
        x
    ) {

        if (
            this.parent[x] !==
            x
        ) {

            this.parent[x] =
                this.find(
                    this.parent[x]
                );

        }


        return this.parent[x];

    }



    union(
        a,
        b
    ) {

        const rootA =
            this.find(
                a
            );


        const rootB =
            this.find(
                b
            );


        if (
            rootA ===
            rootB
        ) {

            return;

        }


        if (
            this.rank[rootA] <
            this.rank[rootB]
        ) {

            this.parent[rootA] =
                rootB;

        }

        else if (
            this.rank[rootA] >
            this.rank[rootB]
        ) {

            this.parent[rootB] =
                rootA;

        }

        else {

            this.parent[rootB] =
                rootA;


            this.rank[rootA]++;

        }

    }

}





/* =========================================================
   HOLE INDEX
   ========================================================= */

function holeToIndex(
    holeId
) {

    const letter =
        holeId.charAt(
            0
        );


    const row =
        Number(
            holeId.slice(
                1
            )
        ) - 1;


    const column =
        columnLetters.indexOf(
            letter
        );


    return (
        row *
        boardConfig.columns +
        column
    );

}





/* =========================================================
   BREADBOARD NETWORK
   ========================================================= */

function buildNetwork() {

    const totalHoles =
        boardConfig.rows *
        boardConfig.columns;


    const unionFind =
        new UnionFind(
            totalHoles
        );


    /*
        A-E are connected per row.
        F-J are connected per row.
    */

    for (
        let row = 0;
        row < boardConfig.rows;
        row++
    ) {


        for (
            let column = 1;
            column < 5;
            column++
        ) {

            unionFind.union(
                holeToIndex(
                    getHoleId(
                        row,
                        0
                    )
                ),
                holeToIndex(
                    getHoleId(
                        row,
                        column
                    )
                )
            );

        }


        for (
            let column = 6;
            column < 10;
            column++
        ) {

            unionFind.union(
                holeToIndex(
                    getHoleId(
                        row,
                        5
                    )
                ),
                holeToIndex(
                    getHoleId(
                        row,
                        column
                    )
                )
            );

        }

    }


    /*
        User-created wires.
    */

    wires.forEach(
        wire => {

            unionFind.union(
                holeToIndex(
                    wire.a
                ),
                holeToIndex(
                    wire.b
                )
            );

        }
    );


    return unionFind;

}





/* =========================================================
   COMPONENT COUNTS
   ========================================================= */

function getComponentCounts() {

    const counts =
        new Map();


    components.forEach(
        component => {

            counts.set(
                component.type,
                (
                    counts.get(
                        component.type
                    ) ||
                    0
                ) + 1
            );

        }
    );


    return counts;

}





/* =========================================================
   TEST CIRCUIT
   ========================================================= */

testButton.addEventListener(
    "click",
    testCircuit
);





function testCircuit() {

    testSucceeded =
        false;


    resetPowerState();


    const language =
        getMakerLanguage();


    const requiredMap =
        getRequiredMap();


    const counts =
        getComponentCounts();



    /*
        Check required part counts.
    */

    for (
        const [
            type,
            requiredCount
        ] of requiredMap
    ) {


        const actualCount =
            counts.get(
                type
            ) ||
            0;


        if (
            actualCount <
            requiredCount
        ) {

            updateStatus(
                makerUI[
                    language
                ].missingParts,
                "error"
            );


            return;

        }


        if (
            actualCount >
            requiredCount
        ) {

            updateStatus(
                makerUI[
                    language
                ].tooManyParts,
                "error"
            );


            return;

        }

    }



    /*
        Find battery.
    */

    const battery =
        components.find(
            component =>
                component.type ===
                "battery"
        );


    if (!battery) {

        updateStatus(
            makerUI[
                language
            ].missingParts,
            "error"
        );


        return;

    }



    /*
        Open switches block the circuit.
    */

    const switches =
        components.filter(
            component =>
                component.type ===
                "switch"
        );


    if (
        switches.some(
            component =>
                !component.switchClosed
        )
    ) {

        updateStatus(
            language === "pt-BR"
                ? "Feche o interruptor primeiro."
                : "Close the switch first.",
            "error"
        );


        return;

    }



    /*
        Build electrical network.
    */

    const unionFind =
        buildNetwork();


    const positiveNode =
        unionFind.find(
            holeToIndex(
                battery.terminals[0]
            )
        );


    const negativeNode =
        unionFind.find(
            holeToIndex(
                battery.terminals[1]
            )
        );



    /*
        All non-battery components.
    */

    const circuitComponents =
        components.filter(
            component =>
                component.type !==
                "battery"
        );


    const componentIndex =
        new Map();


    circuitComponents.forEach(
        (
            component,
            index
        ) => {

            componentIndex.set(
                component.id,
                index
            );

        }
    );


    const requiredMask =
        (
            1 <<
            circuitComponents.length
        ) - 1;


    const adjacency =
        new Map();



    function addEdge(
        from,
        to,
        componentIndexValue
    ) {

        if (
            !adjacency.has(
                from
            )
        ) {

            adjacency.set(
                from,
                []
            );

        }


        adjacency.get(
            from
        ).push({

            to,

            componentIndex:
                componentIndexValue

        });

    }



    /*
        Add each component.
    */

    circuitComponents.forEach(
        component => {


            const a =
                unionFind.find(
                    holeToIndex(
                        component.terminals[0]
                    )
                );


            const b =
                unionFind.find(
                    holeToIndex(
                        component.terminals[1]
                    )
                );


            const index =
                componentIndex.get(
                    component.id
                );



            /*
                LED is directional.
            */

            if (
                component.type ===
                "led"
            ) {

                addEdge(
                    a,
                    b,
                    index
                );


                return;

            }



            /*
                Open switch.
            */

            if (
                component.type ===
                    "switch" &&
                !component.switchClosed
            ) {

                return;

            }



            /*
                Other components.
            */

            addEdge(
                a,
                b,
                index
            );


            addEdge(
                b,
                a,
                index
            );

        }
    );



    /*
        Search for a complete path.
    */

    const queue = [

        {
            node:
                positiveNode,

            mask:
                0
        }

    ];


    const visited =
        new Set();


    visited.add(
        `${positiveNode}|0`
    );


    let success =
        false;


    while (
        queue.length > 0
    ) {


        const state =
            queue.shift();


        if (
            state.node ===
                negativeNode &&
            state.mask ===
                requiredMask
        ) {

            success =
                true;


            break;

        }



        const edges =
            adjacency.get(
                state.node
            ) ||
            [];


        for (
            const edge of edges
        ) {


            const nextMask =
                state.mask |
                (
                    1 <<
                    edge.componentIndex
                );


            const key =
                `${edge.to}|${nextMask}`;


            if (
                visited.has(
                    key
                )
            ) {

                continue;

            }


            visited.add(
                key
            );


            queue.push({

                node:
                    edge.to,

                mask:
                    nextMask

            });

        }

    }



    /*
        Circuit doesn't work.
    */

    if (
        !success
    ) {

        updateStatus(
            makerUI[
                language
            ].circuitNotWorking,
            "error"
        );


        return;

    }



    /*
        Circuit works.
    */

    testSucceeded =
        true;


    components.forEach(
        component => {


            if (
                component.type ===
                    "led" ||
                component.type ===
                    "buzzer"
            ) {

                component.powered =
                    true;

            }

        }
    );


    renderComponents();

    renderWires();


    updateStatus(
        makerUI[
            language
        ].circuitWorking,
        "success"
    );

}





/* =========================================================
   RESET POWER
   ========================================================= */

function resetPowerState() {

    testSucceeded =
        false;


    components.forEach(
        component => {

            component.powered =
                false;

        }
    );


    renderComponents();

    renderWires();

}





/* =========================================================
   WIRE VISUALS
   ========================================================= */

function renderWires() {

    wireLayer.innerHTML =
        "";


    const boardWidth =
        breadboard.clientWidth;


    const boardHeight =
        breadboard.clientHeight;


    wireLayer.setAttribute(
        "viewBox",
        `0 0 ${boardWidth} ${boardHeight}`
    );


    wires.forEach(
        wire => {


            const start =
                getHolePosition(
                    wire.a
                );


            const end =
                getHolePosition(
                    wire.b
                );


            if (
                !start ||
                !end
            ) {

                return;

            }



            const dx =
                end.x -
                start.x;


            const dy =
                end.y -
                start.y;


            const curveAmount =
                Math.max(
                    25,
                    Math.min(
                        85,
                        Math.abs(dx) *
                        0.20
                    )
                );


            const control1X =
                start.x +
                (
                    dx *
                    0.30
                );


            const control1Y =
                start.y +
                (
                    dy >= 0
                        ? curveAmount
                        : -curveAmount
                );


            const control2X =
                end.x -
                (
                    dx *
                    0.30
                );


            const control2Y =
                end.y -
                (
                    dy >= 0
                        ? curveAmount
                        : -curveAmount
                );


            const pathData =
                `
                    M ${start.x} ${start.y}

                    C
                    ${control1X}
                    ${control1Y},

                    ${control2X}
                    ${control2Y},

                    ${end.x}
                    ${end.y}
                `;



            /*
                Outer cable.
            */

            const outer =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );


            outer.setAttribute(
                "d",
                pathData
            );


            outer.setAttribute(
                "fill",
                "none"
            );


            outer.setAttribute(
                "stroke",
                "rgba(55,45,40,0.22)"
            );


            outer.setAttribute(
                "stroke-width",
                "9"
            );


            outer.setAttribute(
                "stroke-linecap",
                "round"
            );



            /*
                Main wire.
            */

            const inner =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );


            inner.setAttribute(
                "d",
                pathData
            );


            inner.setAttribute(
                "fill",
                "none"
            );


            inner.setAttribute(
                "stroke-width",
                "5.5"
            );


            inner.setAttribute(
                "stroke-linecap",
                "round"
            );


            inner.classList.add(
                "makerWire"
            );


            if (
                testSucceeded
            ) {

                inner.classList.add(
                    "poweredWire"
                );

            }


            wireLayer.appendChild(
                outer
            );


            wireLayer.appendChild(
                inner
            );



            /*
                Connector tips.
            */

            createWireConnector(
                start.x,
                start.y
            );


            createWireConnector(
                end.x,
                end.y
            );



            /*
                ON / OFF indicator.

                This is intentionally placed
                higher above the wire.
            */

            const centerX =
                (
                    start.x +
                    end.x
                ) / 2;


            const centerY =
                (
                    start.y +
                    end.y
                ) / 2;


            const indicatorGroup =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "g"
                );


            indicatorGroup.setAttribute(
                "class",
                "makerWireIndicator"
            );


            const indicatorCircle =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );


            indicatorCircle.setAttribute(
                "cx",
                centerX
            );


            indicatorCircle.setAttribute(
                "cy",
                centerY - 30
            );


            indicatorCircle.setAttribute(
                "r",
                "8"
            );


            indicatorCircle.classList.add(
                testSucceeded
                    ? "on"
                    : "off"
            );


            const indicatorText =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "text"
                );


            indicatorText.setAttribute(
                "x",
                centerX
            );


            indicatorText.setAttribute(
                "y",
                centerY - 27
            );


            indicatorText.setAttribute(
                "text-anchor",
                "middle"
            );


            indicatorText.classList.add(
                "makerWireIndicatorText"
            );


            indicatorText.textContent =
                testSucceeded
                    ? "ON"
                    : "OFF";


            indicatorGroup.appendChild(
                indicatorCircle
            );


            indicatorGroup.appendChild(
                indicatorText
            );


            wireLayer.appendChild(
                indicatorGroup
            );

        }
    );

}





function createWireConnector(
    x,
    y
) {

    const outer =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );


    outer.setAttribute(
        "cx",
        x
    );


    outer.setAttribute(
        "cy",
        y
    );


    outer.setAttribute(
        "r",
        "7"
    );


    outer.setAttribute(
        "class",
        "makerWireConnectorOuter"
    );


    const inner =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );


    inner.setAttribute(
        "cx",
        x
    );


    inner.setAttribute(
        "cy",
        y
    );


    inner.setAttribute(
        "r",
        "3.5"
    );


    inner.setAttribute(
        "class",
        "makerWireConnector"
    );


    wireLayer.appendChild(
        outer
    );


    wireLayer.appendChild(
        inner
    );

}





/* =========================================================
   STATUS
   ========================================================= */

function updateStatus(
    message,
    type = "normal"
) {

    statusText.textContent =
        message;


    makerStatus.classList.remove(
        "statusSuccess",
        "statusError"
    );


    statusDot.className =
        "";


    if (
        type === "success"
    ) {

        makerStatus.classList.add(
            "statusSuccess"
        );


        statusDot.classList.add(
            "success"
        );

    }


    if (
        type === "error"
    ) {

        makerStatus.classList.add(
            "statusError"
        );


        statusDot.classList.add(
            "error"
        );

    }

}





/* =========================================================
   PROJECT INFORMATION
   ========================================================= */

function renderProjectInfo() {

    const language =
        getMakerLanguage();


    document.getElementById(
        "projectGrade"
    ).textContent =
        language === "pt-BR"
            ? `Ano ${project.grade}`
            : `Grade ${project.grade}`;


    document.getElementById(
        "projectTitle"
    ).textContent =
        project.title[
            language
        ];


    document.getElementById(
        "projectDescription"
    ).textContent =
        project.description[
            language
        ];


    document.getElementById(
        "instructionsTitle"
    ).textContent =
        makerUI[
            language
        ].instructions;


    document.getElementById(
        "requiredPartsTitle"
    ).textContent =
        makerUI[
            language
        ].requiredParts;


    document.getElementById(
        "testButton"
    ).textContent =
        makerUI[
            language
        ].testCircuit;


    document.getElementById(
        "wireButton"
    ).textContent =
        wireMode
            ? makerUI[
                language
            ].wireModeOn
            : makerUI[
                language
            ].wireMode;


    document.getElementById(
        "deleteButton"
    ).textContent =
        makerUI[
            language
        ].deleteSelected;


    document.getElementById(
        "clearButton"
    ).textContent =
        makerUI[
            language
        ].clearBoard;


    document.getElementById(
        "dragHint"
    ).textContent =
        makerUI[
            language
        ].dragHint;



    /*
        Back button.
    */

    document.getElementById(
        "projectBackButton"
    ).href =
        `makerProjects.html?grade=${project.grade}`;



    /*
        Instructions.
    */

    const instructionList =
        document.getElementById(
            "instructionList"
        );


    instructionList.innerHTML =
        "";


    project.instructions[
        language
    ].forEach(
        instruction => {


            const li =
                document.createElement(
                    "li"
                );


            li.textContent =
                instruction;


            instructionList.appendChild(
                li
            );

        }
    );



    /*
        Tip.
    */

    document.getElementById(
        "projectTip"
    ).textContent =
        project.tip[
            language
        ];



    /*
        Required parts.
    */

    const partsContainer =
        document.getElementById(
            "requiredParts"
        );


    partsContainer.innerHTML =
        "";


    project.required.forEach(
        requirement => {


            const component =
                makerComponents[
                    requirement.type
                ];


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "makerRequiredPart";


            const name =
                document.createElement(
                    "span"
                );


            name.textContent =
                component.shortName[
                    language
                ];


            const amount =
                document.createElement(
                    "strong"
                );


            amount.textContent =
                `×${requirement.count}`;


            card.appendChild(
                name
            );


            card.appendChild(
                amount
            );


            partsContainer.appendChild(
                card
            );

        }
    );



    document.documentElement.lang =
        language === "pt-BR"
            ? "pt-BR"
            : "en";

}





/* =========================================================
   LANGUAGE CHANGE
   ========================================================= */

window.addEventListener(
    "languageChanged",
    () => {

        renderProjectInfo();

        renderPalette();

        renderComponents();

        renderWires();

        updateSelection();

    }
);





/* =========================================================
   START
   ========================================================= */

renderProjectInfo();

createBoard();

renderPalette();

renderComponents();

renderWires();

updateStatus(
    makerUI[
        getMakerLanguage()
    ].dragHint
);