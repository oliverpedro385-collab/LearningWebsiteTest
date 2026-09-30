/* =========================================================
   PROGRAMMING SIMULATOR
   A safe, small interpreter for the website's teaching subset.

   Supported concepts:
   - comments
   - variables and math
   - movement commands
   - if / else
   - for / while loops
   - functions
   - print / console output
   - a few virtual-world sensors

   This intentionally does NOT execute JavaScript or arbitrary code.
   ========================================================= */

(() => {
    "use strict";

    const state = {
        language: "python",
        grade: 1,
        challenge: null,
        world: null,
        player: { x: 0, y: 0 },
        defaultCode: "",
        running: false,
        hintVisible: false,
        highlightedLines: [],
        lastProgram: null,
        maxOperations: 400,
        operations: 0,
        consoleLines: [],
        runtime: null
    };

    const els = {};

    const TEXT = {
        en: {
            running: "Running your code...",
            complete: "Nice! Challenge complete!",
            failed: "The code stopped before reaching the goal.",
            empty: "Write some code first!",
            syntax: "Syntax error",
            runtime: "Runtime error",
            wall: "The square hit a wall.",
            board: "The square tried to leave the board.",
            tooMany: "Your program used too many steps. Check for an infinite loop.",
            commentNeeded: "Add at least one comment to explain your code.",
            variableNeeded: "Create a variable named steps and make its value 6.",
            ifNeeded: "Use an if statement to make a decision.",
            loopNeeded: "Use a loop instead of repeating the same movement command.",
            functionNeeded: "Define a function named go and call it.",
            checkCode: "Check your code and run it again.",
            consoleReady: "Console ready."
        },
        pt: {
            running: "Executando seu código...",
            complete: "Boa! Desafio concluído!",
            failed: "O código parou antes de chegar ao objetivo.",
            empty: "Escreva algum código primeiro!",
            syntax: "Erro de sintaxe",
            runtime: "Erro durante a execução",
            wall: "O quadrado bateu em uma parede.",
            board: "O quadrado tentou sair do tabuleiro.",
            tooMany: "Seu programa usou passos demais. Verifique se existe um laço infinito.",
            commentNeeded: "Adicione pelo menos um comentário explicando seu código.",
            variableNeeded: "Crie uma variável chamada steps e faça seu valor ser 6.",
            ifNeeded: "Use uma condição if para tomar uma decisão.",
            loopNeeded: "Use um laço em vez de repetir o mesmo comando de movimento.",
            functionNeeded: "Defina uma função chamada go e chame-a.",
            checkCode: "Confira seu código e execute novamente.",
            consoleReady: "Console pronto."
        }
    };

    class CodeError extends Error {
        constructor(message, line = null) {
            super(message);
            this.name = "CodeError";
            this.line = line;
        }
    }

    function getSiteLanguage() {
        return localStorage.getItem("siteLanguage") === "pt" ? "pt" : "en";
    }

    function t(key) {
        const lang = getSiteLanguage();
        return TEXT[lang][key] || TEXT.en[key] || key;
    }

    function challengeText(value) {
        if (!value) return "";
        const lang = getSiteLanguage();
        if (typeof value === "string") return value;
        return value[lang] || value.en || value.pt || "";
    }

    function cacheElements() {
        els.languageName = document.getElementById("languageName");
        els.gradeName = document.getElementById("gradeName");
        els.objective = document.getElementById("programmingObjective");
        els.codeEditor = document.getElementById("codeEditor");
        els.console = document.getElementById("consoleOutput");
        els.world = document.getElementById("programmingWorld");
        els.helperFace = document.getElementById("helperFace");
        els.helperText = document.getElementById("helperText");
        els.challengeTitle = document.getElementById("programmingChallengeTitle");
        els.status = document.getElementById("programmingStatus");

        // Support the IDs used by the different versions of the page.
        els.runButton =
            document.getElementById("runCodeButton") ||
            document.getElementById("runButton") ||
            document.getElementById("runCode");

        els.resetButton =
            document.getElementById("resetCodeButton") ||
            document.getElementById("resetButton") ||
            document.getElementById("resetCode");

        els.hintButton =
            document.getElementById("hintButton") ||
            document.getElementById("showHintButton") ||
            document.getElementById("hint");
    }

    function getQueryValue(names, fallback) {
        const params = new URLSearchParams(window.location.search);
        for (const name of names) {
            const value = params.get(name);
            if (value !== null && value !== "") return value;
        }
        return fallback;
    }

    function normalizeLanguage(value) {
        const raw = String(value || "python").toLowerCase();
        if (raw === "py" || raw === "python") return "python";
        if (raw === "java") return "java";
        if (raw === "lua" || raw === "luau") return "luau";
        return "python";
    }

    function languageLabel() {
        return state.language === "python"
            ? "Python"
            : state.language === "java"
                ? "Java"
                : "Luau";
    }

    function gradeLabel() {
        return `${state.grade}`;
    }

    function setConsole(lines) {
        state.consoleLines = lines.slice();

        if (!els.console) return;

        els.console.textContent =
            state.consoleLines.join("\n");

        els.console.scrollTop =
            els.console.scrollHeight;
    }

    function clearConsole() {
        setConsole([
            t("consoleReady")
        ]);
    }

    function consoleLog(message) {
        state.consoleLines.push(
            String(message)
        );

        setConsole(
            state.consoleLines
        );
    }

    function setHelper(
        face,
        text,
        talking = false
    ) {
        if (els.helperFace) {
            els.helperFace.textContent =
                face;

            els.helperFace.classList.toggle(
                "talking",
                talking
            );
        }

        if (els.helperText) {
            els.helperText.textContent =
                text;
        }
    }

    function updateObjective() {
        if (
            !state.challenge ||
            !els.objective
        ) {
            return;
        }

        const concept =
            getSiteLanguage() === "pt"
                ? state.challenge.conceptPt
                : state.challenge.concept;

        els.objective.innerHTML =
            `<strong>${escapeHtml(
                concept
            )}</strong><br>${escapeHtml(
                challengeText(
                    state.challenge.objective
                )
            )}`;

        if (els.challengeTitle) {
            els.challengeTitle.textContent =
                getSiteLanguage() === "pt"
                    ? state.challenge.titlePt
                    : state.challenge.title;
        }

        if (els.languageName) {
            els.languageName.textContent =
                languageLabel();
        }

        if (els.gradeName) {
            els.gradeName.textContent =
                `Grade ${gradeLabel()}`;
        }
    }

    function escapeHtml(value) {
        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );
    }

    function cellKey(x, y) {
        return `${x},${y}`;
    }

    function isObstacle(x, y) {
        return state.world.obstacles.some(
            ob =>
                ob.x === x &&
                ob.y === y
        );
    }

    function isInside(x, y) {
        return (
            x >= 0 &&
            y >= 0 &&
            x < state.world.width &&
            y < state.world.height
        );
    }

    function getCell(x, y) {
        return (
            els.world?.querySelector(
                `.programmingCell[data-x="${x}"][data-y="${y}"]`
            ) ||
            null
        );
    }

    function renderWorld() {
        if (
            !els.world ||
            !state.challenge
        ) {
            return;
        }

        const world =
            state.challenge.world;

        state.world = world;

        state.player = {
            ...world.start
        };

        els.world.innerHTML = "";

        els.world.style.gridTemplateColumns =
            `repeat(${world.width}, minmax(0, 1fr))`;

        els.world.style.gridTemplateRows =
            `repeat(${world.height}, minmax(0, 1fr))`;

        const obstacleSet =
            new Set(
                world.obstacles.map(
                    ob =>
                        cellKey(
                            ob.x,
                            ob.y
                        )
                )
            );

        for (
            let y = 0;
            y < world.height;
            y++
        ) {
            for (
                let x = 0;
                x < world.width;
                x++
            ) {
                const cell =
                    document.createElement(
                        "div"
                    );

                cell.className =
                    "programmingCell";

                cell.dataset.x =
                    String(x);

                cell.dataset.y =
                    String(y);

                if (
                    obstacleSet.has(
                        cellKey(x, y)
                    )
                ) {
                    cell.classList.add(
                        "programmingObstacle"
                    );
                }

                if (
                    x === world.finish.x &&
                    y === world.finish.y
                ) {
                    cell.classList.add(
                        "programmingFinish"
                    );

                    cell.textContent =
                        "★";
                }

                els.world.appendChild(
                    cell
                );
            }
        }

        const player =
            document.createElement(
                "div"
            );

        player.id =
            "happySquare";

        player.className =
            "happySquare";

        player.textContent =
            ":)";

        els.world.appendChild(
            player
        );

        requestAnimationFrame(
            updatePlayerPosition
        );
    }

    function updatePlayerPosition() {
        const player =
            document.getElementById(
                "happySquare"
            );

        if (
            !player ||
            !els.world
        ) {
            return;
        }

        const cell =
            getCell(
                state.player.x,
                state.player.y
            );

        if (!cell) {
            return;
        }

        const left =
            cell.offsetLeft;

        const top =
            cell.offsetTop;

        const width =
            cell.offsetWidth;

        const height =
            cell.offsetHeight;

        const padding =
            Math.max(
                4,
                Math.min(
                    width,
                    height
                ) * 0.10
            );

        player.style.width =
            `${Math.max(
                10,
                width - padding * 2
            )}px`;

        player.style.height =
            `${Math.max(
                10,
                height - padding * 2
            )}px`;

        player.style.left =
            `${left + padding}px`;

        player.style.top =
            `${top + padding}px`;
    }

    function isAtGoal() {
        return (
            state.player.x ===
                state.world.finish.x &&
            state.player.y ===
                state.world.finish.y
        );
    }

    function targetCell(dx, dy) {
        return {
            x:
                state.player.x +
                dx,

            y:
                state.player.y +
                dy
        };
    }

    function canEnter(x, y) {
        return (
            isInside(x, y) &&
            !isObstacle(x, y)
        );
    }

    function moveOne(direction) {
        const directions = {
            up: {
                x: 0,
                y: -1
            },

            down: {
                x: 0,
                y: 1
            },

            left: {
                x: -1,
                y: 0
            },

            right: {
                x: 1,
                y: 0
            }
        };

        const delta =
            directions[direction];

        if (!delta) {
            throw new CodeError(
                `Unknown direction: ${direction}`
            );
        }

        const next =
            targetCell(
                delta.x,
                delta.y
            );

        if (
            !isInside(
                next.x,
                next.y
            )
        ) {
            throw new CodeError(
                t("board")
            );
        }

        if (
            isObstacle(
                next.x,
                next.y
            )
        ) {
            throw new CodeError(
                t("wall")
            );
        }

        state.player.x =
            next.x;

        state.player.y =
            next.y;

        state.operations++;

        updatePlayerPosition();

        const player =
            document.getElementById(
                "happySquare"
            );

        if (player) {
            player.textContent =
                isAtGoal()
                    ? ":D"
                    : ":)";
        }

        if (
            state.operations >
            state.maxOperations
        ) {
            throw new CodeError(
                t("tooMany")
            );
        }
    }

    function movementCount(value) {
        if (
            value === undefined
        ) {
            return 1;
        }

        const numeric =
            Number(value);

        if (
            !Number.isFinite(
                numeric
            )
        ) {
            throw new CodeError(
                "Movement count must be a number."
            );
        }

        if (numeric < 0) {
            throw new CodeError(
                "Movement count cannot be negative."
            );
        }

        return Math.floor(
            numeric
        );
    }

    function moveMany(
        direction,
        countValue
    ) {
        const count =
            movementCount(
                countValue
            );

        for (
            let i = 0;
            i < count;
            i++
        ) {
            moveOne(
                direction
            );
        }
    }

    function sensor(name) {
        const normalized =
            String(name)
                .replace(
                    /_/g,
                    ""
                )
                .toLowerCase();

        const checks = {
            up: [0, -1],
            down: [0, 1],
            left: [-1, 0],
            right: [1, 0]
        };

        if (
            normalized ===
                "iswallahead" ||
            normalized ===
                "iswallup" ||
            normalized ===
                "iswallabove"
        ) {
            const next =
                targetCell(
                    0,
                    -1
                );

            return !canEnter(
                next.x,
                next.y
            );
        }

        if (
            normalized ===
                "iswalldown" ||
            normalized ===
                "iswallbelow"
        ) {
            const next =
                targetCell(
                    0,
                    1
                );

            return !canEnter(
                next.x,
                next.y
            );
        }

        if (
            normalized ===
                "iswallleft"
        ) {
            const next =
                targetCell(
                    -1,
                    0
                );

            return !canEnter(
                next.x,
                next.y
            );
        }

        if (
            normalized ===
                "iswallright"
        ) {
            const next =
                targetCell(
                    1,
                    0
                );

            return !canEnter(
                next.x,
                next.y
            );
        }

        if (
            normalized ===
                "atgoal" ||
            normalized ===
                "isatgoal"
        ) {
            return isAtGoal();
        }

        if (
            normalized ===
                "distancefromgoal" ||
            normalized ===
                "distancetogoal"
        ) {
            return (
                Math.abs(
                    state.world.finish.x -
                    state.player.x
                ) +
                Math.abs(
                    state.world.finish.y -
                    state.player.y
                )
            );
        }

        for (
            const [
                direction,
                delta
            ]
            of Object.entries(
                checks
            )
        ) {
            if (
                normalized ===
                `iswall${direction}`
            ) {
                const next =
                    targetCell(
                        delta.x,
                        delta.y
                    );

                return !canEnter(
                    next.x,
                    next.y
                );
            }
        }

        throw new CodeError(
            `Unknown sensor: ${name}`
        );
    }

    function tokenizeExpression(
        source
    ) {
        const tokens = [];

        let i = 0;

        while (
            i < source.length
        ) {
            const ch =
                source[i];

            if (
                /\s/.test(ch)
            ) {
                i++;
                continue;
            }

            if (
                ch === '"' ||
                ch === "'"
            ) {
                const quote =
                    ch;

                let value = "";

                i++;

                let closed =
                    false;

                while (
                    i <
                    source.length
                ) {
                    if (
                        source[i] ===
                            "\\" &&
                        i + 1 <
                            source.length
                    ) {
                        value +=
                            source[i + 1];

                        i += 2;

                        continue;
                    }

                    if (
                        source[i] ===
                            quote
                    ) {
                        i++;

                        closed =
                            true;

                        break;
                    }

                    value +=
                        source[i++];
                }

                if (!closed) {
                    throw new CodeError(
                        "Unclosed string."
                    );
                }

                tokens.push({
                    type: "string",
                    value
                });

                continue;
            }

            const numberMatch =
                source
                    .slice(i)
                    .match(
                        /^(?:\d+(?:\.\d+)?|\.\d+)/
                    );

            if (
                numberMatch
            ) {
                tokens.push({
                    type: "number",
                    value:
                        Number(
                            numberMatch[0]
                        )
                });

                i +=
                    numberMatch[0].length;

                continue;
            }

            const identifierMatch =
                source
                    .slice(i)
                    .match(
                        /^[A-Za-z_][A-Za-z0-9_]*/
                    );

            if (
                identifierMatch
            ) {
                const word =
                    identifierMatch[0];

                tokens.push({
                    type:
                        "identifier",
                    value:
                        word
                });

                i +=
                    word.length;

                continue;
            }

            const two =
                source.slice(
                    i,
                    i + 2
                );

            if (
                [
                    "==",
                    "!=",
                    "<=",
                    ">=",
                    "~=",
                    "+=",
                    "-=",
                    "*=",
                    "/="
                ].includes(two)
            ) {
                tokens.push({
                    type:
                        "operator",
                    value:
                        two
                });

                i += 2;

                continue;
            }

            if (
                "+-*/%<>()!,"
                    .includes(ch)
            ) {
                tokens.push({
                    type:
                        ch === ","
                            ? "comma"
                            : "operator",

                    value:
                        ch
                });

                i++;

                continue;
            }

            throw new CodeError(
                `Unexpected character '${ch}'.`
            );
        }

        tokens.push({
            type: "eof",
            value: ""
        });

        return tokens;
    }

    class ExpressionParser {
        constructor(
            source,
            variables
        ) {
            this.source =
                source.trim();

            this.variables =
                variables;

            this.tokens =
                tokenizeExpression(
                    this.source
                );

            this.index = 0;
        }

        current() {
            return this.tokens[
                this.index
            ];
        }

        eat(value = null) {
            const token =
                this.current();

            if (
                value !== null &&
                token.value !== value
            ) {
                throw new CodeError(
                    `Expected '${value}'.`
                );
            }

            this.index++;

            return token;
        }

        parse() {
            if (!this.source) {
                throw new CodeError(
                    "Expression cannot be empty."
                );
            }

            const result =
                this.parseOr();

            if (
                this.current().type !==
                "eof"
            ) {
                throw new CodeError(
                    `Unexpected '${this.current().value}'.`
                );
            }

            return result;
        }

        parseOr() {
            let value =
                this.parseAnd();

            while (
                this.current().value ===
                "or"
            ) {
                this.eat("or");

                const right =
                    this.parseAnd();

                value =
                    Boolean(value) ||
                    Boolean(right);
            }

            return value;
        }

        parseAnd() {
            let value =
                this.parseEquality();

            while (
                this.current().value ===
                "and"
            ) {
                this.eat("and");

                const right =
                    this.parseEquality();

                value =
                    Boolean(value) &&
                    Boolean(right);
            }

            return value;
        }

        parseEquality() {
            let value =
                this.parseComparison();

            while (
                [
                    "==",
                    "!=",
                    "~="
                ].includes(
                    this.current().value
                )
            ) {
                const op =
                    this.eat().value;

                const right =
                    this.parseComparison();

                if (
                    op === "=="
                ) {
                    value =
                        value ===
                        right;
                } else {
                    value =
                        value !==
                        right;
                }
            }

            return value;
        }

        parseComparison() {
            let value =
                this.parseTerm();

            while (
                [
                    "<",
                    ">",
                    "<=",
                    ">="
                ].includes(
                    this.current().value
                )
            ) {
                const op =
                    this.eat().value;

                const right =
                    this.parseTerm();

                if (op === "<") {
                    value =
                        value <
                        right;
                }

                if (op === ">") {
                    value =
                        value >
                        right;
                }

                if (op === "<=") {
                    value =
                        value <=
                        right;
                }

                if (op === ">=") {
                    value =
                        value >=
                        right;
                }
            }

            return value;
        }

        parseTerm() {
            let value =
                this.parseFactor();

            while (
                [
                    "+",
                    "-"
                ].includes(
                    this.current().value
                )
            ) {
                const op =
                    this.eat().value;

                const right =
                    this.parseFactor();

                if (
                    op === "+"
                ) {
                    value =
                        Number(value) +
                        Number(right);
                } else {
                    value =
                        Number(value) -
                        Number(right);
                }
            }

            return value;
        }

        parseFactor() {
            let value =
                this.parseUnary();

            while (
                [
                    "*",
                    "/",
                    "%"
                ].includes(
                    this.current().value
                )
            ) {
                const op =
                    this.eat().value;

                const right =
                    this.parseUnary();

                if (
                    op === "*"
                ) {
                    value =
                        Number(value) *
                        Number(right);
                }

                if (
                    op === "/"
                ) {
                    value =
                        Number(value) /
                        Number(right);
                }

                if (
                    op === "%"
                ) {
                    value =
                        Number(value) %
                        Number(right);
                }
            }

            return value;
        }

        parseUnary() {
            if (
                this.current().value ===
                "-"
            ) {
                this.eat("-");

                return -
                    Number(
                        this.parseUnary()
                    );
            }

            if (
                this.current().value ===
                "not"
            ) {
                this.eat("not");

                return !Boolean(
                    this.parseUnary()
                );
            }

            if (
                this.current().value ===
                "!"
            ) {
                this.eat("!");

                return !Boolean(
                    this.parseUnary()
                );
            }

            return this.parsePrimary();
        }

        parsePrimary() {
            const token =
                this.current();

            if (
                token.value ===
                "("
            ) {
                this.eat("(");

                const value =
                    this.parseOr();

                this.eat(")");

                return value;
            }

            if (
                token.type ===
                    "number" ||
                token.type ===
                    "string"
            ) {
                this.eat();

                return token.value;
            }

            if (
                token.type ===
                "identifier"
            ) {
                const name =
                    this.eat().value;

                const lowered =
                    name.toLowerCase();

                if (
                    this.current().value ===
                    "("
                ) {
                    this.eat("(");

                    const args = [];

                    if (
                        this.current().value !==
                        ")"
                    ) {
                        do {
                            args.push(
                                this.parseOr()
                            );

                            if (
                                this.current().value !==
                                ","
                            ) {
                                break;
                            }

                            this.eat(",");

                        } while (
                            this.current().value !==
                            ")"
                        );
                    }

                    this.eat(")");

                    return this.callExpression(
                        name,
                        args
                    );
                }

                if (
                    [
                        "true",
                        "t",
                        "yes"
                    ].includes(
                        lowered
                    )
                ) {
                    return true;
                }

                if (
                    [
                        "false",
                        "f",
                        "no"
                    ].includes(
                        lowered
                    )
                ) {
                    return false;
                }

                if (
                    [
                        "null",
                        "nil"
                    ].includes(
                        lowered
                    )
                ) {
                    return null;
                }

                if (
                    Object.prototype.hasOwnProperty.call(
                        this.variables,
                        name
                    )
                ) {
                    return this.variables[
                        name
                    ];
                }

                throw new CodeError(
                    `Unknown variable '${name}'.`
                );
            }

            throw new CodeError(
                `Unexpected token '${token.value}'.`
            );
        }

        callExpression(
            name,
            args
        ) {
            const normalized =
                name
                    .replace(
                        /_/g,
                        ""
                    )
                    .toLowerCase();

            if (
                normalized ===
                    "iswallahead" ||
                normalized.startsWith(
                    "iswall"
                ) ||
                normalized ===
                    "atgoal" ||
                normalized ===
                    "isatgoal" ||
                normalized ===
                    "distancefromgoal" ||
                normalized ===
                    "distancetogoal"
            ) {
                if (
                    args.length >
                    0
                ) {
                    throw new CodeError(
                        `${name} does not take arguments.`
                    );
                }

                return sensor(
                    name
                );
            }

            if (
                normalized ===
                "print"
            ) {
                consoleLog(
                    args
                        .map(String)
                        .join(" ")
                );

                return null;
            }

            if (
                normalized ===
                "abs"
            ) {
                if (
                    args.length !==
                    1
                ) {
                    throw new CodeError(
                        "abs() needs one argument."
                    );
                }

                return Math.abs(
                    Number(
                        args[0]
                    )
                );
            }

            if (
                normalized ===
                "min"
            ) {
                return Math.min(
                    ...args.map(
                        Number
                    )
                );
            }

            if (
                normalized ===
                "max"
            ) {
                return Math.max(
                    ...args.map(
                        Number
                    )
                );
            }

            throw new CodeError(
                `Unknown function '${name}'.`
            );
        }
    }

    function evaluateExpression(
        source,
        variables
    ) {
        return new ExpressionParser(
            source,
            variables
        ).parse();
    }

    function stripInlineComment(
        text,
        language
    ) {
        const marker =
            language === "python"
                ? "#"
                : language === "java"
                    ? "//"
                    : "--";

        let quote = null;

        for (
            let i = 0;
            i < text.length;
            i++
        ) {
            const ch =
                text[i];

            if (
                ch === '"' ||
                ch === "'"
            ) {
                if (
                    quote === null
                ) {
                    quote = ch;
                } else if (
                    quote === ch &&
                    text[i - 1] !==
                        "\\"
                ) {
                    quote = null;
                }

                continue;
            }

            if (
                !quote &&
                text.startsWith(
                    marker,
                    i
                )
            ) {
                return {
                    code:
                        text
                            .slice(
                                0,
                                i
                            )
                            .trim(),

                    comment:
                        text
                            .slice(i)
                            .trim()
                };
            }
        }

        return {
            code:
                text.trim(),

            comment:
                ""
        };
    }

    function addNodeLine(
        node,
        line
    ) {
        node.line =
            line;

        return node;
    }

    function parseSimpleStatement(
        text,
        language,
        lineNumber
    ) {
        let source =
            text
                .trim()
                .replace(
                    /;\s*$/,
                    ""
                )
                .trim();

        if (!source) {
            return null;
        }

        const movePatterns =
            language === "python"
                ? {
                    up:
                        /^move_up\s*(?:\((.*)\))?$/,

                    down:
                        /^move_down\s*(?:\((.*)\))?$/,

                    left:
                        /^move_left\s*(?:\((.*)\))?$/,

                    right:
                        /^move_right\s*(?:\((.*)\))?$/
                }
                : {
                    up:
                        /^moveUp\s*(?:\((.*)\))?$/,

                    down:
                        /^moveDown\s*(?:\((.*)\))?$/,

                    left:
                        /^moveLeft\s*(?:\((.*)\))?$/,

                    right:
                        /^moveRight\s*(?:\((.*)\))?$/
                };

        for (
            const [
                direction,
                regex
            ]
            of Object.entries(
                movePatterns
            )
        ) {
            const match =
                source.match(
                    regex
                );

            if (match) {
                return addNodeLine(
                    {
                        type:
                            "move",

                        direction:
                            direction,

                        count:
                            match[1]
                                ? match[1].trim()
                                : null
                    },
                    lineNumber
                );
            }
        }

        const printMatch =
            language === "java"
                ? source.match(
                    /^System\.out\.println\s*\((.*)\)$/
                )
                : source.match(
                    /^print\s*\((.*)\)$/
                );

        if (printMatch) {
            return addNodeLine(
                {
                    type:
                        "print",

                    expression:
                        printMatch[1]
                },
                lineNumber
            );
        }

        let assignment =
            source.match(
                /^(?:local\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*(=|\+=|-=|\*=|\/=)\s*(.*)$/
            );

        if (
            language === "java"
        ) {
            assignment =
                source.match(
                    /^(?:(?:int|double|float|boolean|String|long)\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*(=|\+=|-=|\*=|\/=)\s*(.*)$/
                );
        }

        if (assignment) {
            return addNodeLine(
                {
                    type:
                        "assign",

                    name:
                        assignment[1],

                    operator:
                        assignment[2],

                    expression:
                        assignment[3].trim()
                },
                lineNumber
            );
        }

        const callMatch =
            source.match(
                /^([A-Za-z_][A-Za-z0-9_]*)\s*\((.*)\)$/
            );

        if (callMatch) {
            return addNodeLine(
                {
                    type:
                        "call",

                    name:
                        callMatch[1],

                    argsSource:
                        callMatch[2].trim()
                },
                lineNumber
            );
        }

        throw new CodeError(
            `Unknown command '${source}'.`,
            lineNumber
        );
    }

    function parsePython(
        source
    ) {
        const rawLines =
            source
                .replace(
                    /\r/g,
                    ""
                )
                .split("\n");

        const lines = [];

        let hasComment =
            false;

        rawLines.forEach(
            (
                raw,
                index
            ) => {
                const lineNumber =
                    index + 1;

                const expanded =
                    raw.replace(
                        /\t/g,
                        "    "
                    );

                const indent =
                    expanded.match(
                        /^\s*/
                    )[0].length;

                const stripped =
                    expanded.slice(
                        indent
                    );

                const result =
                    stripInlineComment(
                        stripped,
                        "python"
                    );

                if (
                    result.comment
                ) {
                    hasComment =
                        true;
                }

                if (!result.code) {
                    return;
                }

                lines.push({
                    indent,
                    text:
                        result.code,
                    line:
                        lineNumber
                });
            }
        );

        function parseBlock(
            index,
            indent
        ) {
            const nodes = [];

            while (
                index <
                lines.length
            ) {
                const line =
                    lines[index];

                if (
                    line.indent <
                    indent
                ) {
                    break;
                }

                if (
                    line.indent >
                    indent
                ) {
                    throw new CodeError(
                        "Unexpected indentation.",
                        line.line
                    );
                }

                const text =
                    line.text;

                if (
                    /^else\s*:$/
                        .test(text) ||
                    /^elif\s+/.test(text)
                ) {
                    break;
                }

                const ifMatch =
                    text.match(
                        /^if\s+(.+):$/
                    );

                const elifMatch =
                    text.match(
                        /^elif\s+(.+):$/
                    );

                const elseMatch =
                    text.match(
                        /^else\s*:\s*$/
                    );

                const forMatch =
                    text.match(
                        /^for\s+([A-Za-z_][A-Za-z0-9_]*)\s+in\s+range\s*\((.*)\):$/
                    );

                const whileMatch =
                    text.match(
                        /^while\s+(.+):$/
                    );

                const defMatch =
                    text.match(
                        /^def\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\):$/
                    );

                if (ifMatch) {
                    const bodyInfo =
                        parseChildBlock(
                            index + 1,
                            line.indent,
                            line.line
                        );

                    const node =
                        addNodeLine(
                            {
                                type:
                                    "if",

                                branches: [
                                    {
                                        condition:
                                            ifMatch[1],

                                        body:
                                            bodyInfo.nodes
                                    }
                                ],

                                elseBody:
                                    []
                            },

                            line.line
                        );

                    index =
                        bodyInfo.index;

                    while (
                        index <
                            lines.length &&
                        lines[index]
                            .indent ===
                            indent &&
                        /^elif\s+/
                            .test(
                                lines[index]
                                    .text
                            )
                    ) {
                        const branchLine =
                            lines[index];

                        const match =
                            branchLine
                                .text
                                .match(
                                    /^elif\s+(.+):$/
                                );

                        if (!match) {
                            break;
                        }

                        const branchInfo =
                            parseChildBlock(
                                index + 1,
                                indent,
                                branchLine.line
                            );

                        node.branches.push({
                            condition:
                                match[1],

                            body:
                                branchInfo.nodes,

                            line:
                                branchLine.line
                        });

                        index =
                            branchInfo.index;
                    }

                    if (
                        index <
                            lines.length &&
                        lines[index]
                            .indent ===
                            indent &&
                        /^else\s*:\s*$/
                            .test(
                                lines[index]
                                    .text
                            )
                    ) {
                        const elseInfo =
                            parseChildBlock(
                                index + 1,
                                indent,
                                lines[index]
                                    .line
                            );

                        node.elseBody =
                            elseInfo.nodes;

                        index =
                            elseInfo.index;
                    }

                    nodes.push(
                        node
                    );

                    continue;
                }

                if (forMatch) {
                    const bodyInfo =
                        parseChildBlock(
                            index + 1,
                            line.indent,
                            line.line
                        );

                    nodes.push(
                        addNodeLine(
                            {
                                type:
                                    "for",

                                variable:
                                    forMatch[1],

                                header:
                                    forMatch[2],

                                body:
                                    bodyInfo.nodes,

                                language:
                                    "python"
                            },

                            line.line
                        )
                    );

                    index =
                        bodyInfo.index;

                    continue;
                }

                if (whileMatch) {
                    const bodyInfo =
                        parseChildBlock(
                            index + 1,
                            line.indent,
                            line.line
                        );

                    nodes.push(
                        addNodeLine(
                            {
                                type:
                                    "while",

                                condition:
                                    whileMatch[1],

                                body:
                                    bodyInfo.nodes
                            },

                            line.line
                        )
                    );

                    index =
                        bodyInfo.index;

                    continue;
                }

                if (defMatch) {
                    const args =
                        defMatch[2]
                            .split(",")
                            .map(
                                s =>
                                    s.trim()
                            )
                            .filter(
                                Boolean
                            );

                    const bodyInfo =
                        parseChildBlock(
                            index + 1,
                            line.indent,
                            line.line
                        );

                    nodes.push(
                        addNodeLine(
                            {
                                type:
                                    "function",

                                name:
                                    defMatch[1],

                                args:
                                    args,

                                body:
                                    bodyInfo.nodes
                            },

                            line.line
                        )
                    );

                    index =
                        bodyInfo.index;

                    continue;
                }

                nodes.push(
                    parseSimpleStatement(
                        text,
                        "python",
                        line.line
                    )
                );

                index++;
            }

            return {
                nodes,
                index
            };
        }

        function parseChildBlock(
            index,
            parentIndent,
            parentLine
        ) {
            if (
                index >=
                    lines.length ||
                lines[index]
                    .indent <=
                    parentIndent
            ) {
                throw new CodeError(
                    "Expected an indented block.",
                    parentLine
                );
            }

            return parseBlock(
                index,
                lines[index]
                    .indent
            );
        }

        const result =
            parseBlock(
                0,
                lines[0]?.indent || 0
            );

        return {
            ast:
                result.nodes,

            hasComment
        };
    }

    function tokenizeJava(
        source
    ) {
        let cleaned =
            source.replace(
                /\/\*[\s\S]*?\*\//g,
                ""
            );

        let hasComment =
            /\/\//.test(
                cleaned
            );

        cleaned =
            cleaned
                .split("\n")
                .map(
                    line =>
                        line.replace(
                            /\/\/.*$/,
                            ""
                        )
                )
                .join("\n");

        const tokens = [];

        let buffer =
            "";

        let parenDepth =
            0;

        let quote =
            null;

        function flush() {
            const text =
                buffer.trim();

            if (text) {
                tokens.push(
                    text
                );
            }

            buffer = "";
        }

        for (
            let i = 0;
            i < cleaned.length;
            i++
        ) {
            const ch =
                cleaned[i];

            if (quote) {
                buffer +=
                    ch;

                if (
                    ch === quote &&
                    cleaned[i - 1] !==
                        "\\"
                ) {
                    quote =
                        null;
                }

                continue;
            }

            if (
                ch === '"' ||
                ch === "'"
            ) {
                quote =
                    ch;

                buffer +=
                    ch;

                continue;
            }

            if (ch === "(") {
                parenDepth++;

                buffer +=
                    ch;

                continue;
            }

            if (ch === ")") {
                parenDepth--;

                buffer +=
                    ch;

                continue;
            }

            if (
                parenDepth === 0 &&
                (
                    ch === "{" ||
                    ch === "}"
                )
            ) {
                flush();

                tokens.push(
                    ch
                );

                continue;
            }

            if (
                parenDepth === 0 &&
                ch === ";"
            ) {
                flush();

                continue;
            }

            if (
                parenDepth === 0 &&
                ch === "\n"
            ) {
                flush();

                continue;
            }

            buffer +=
                ch;
        }

        flush();

        return {
            tokens,
            hasComment
        };
    }

    function parseJava(
        source
    ) {
        const {
            tokens,
            hasComment
        } =
            tokenizeJava(
                source
            );

        function parseBlock(
            index
        ) {
            const nodes = [];

            while (
                index <
                tokens.length
            ) {
                const token =
                    tokens[index];

                if (token === "}") {
                    return {
                        nodes,
                        index:
                            index + 1
                    };
                }

                const ifMatch =
                    token.match(
                        /^if\s*\((.*)\)$/
                    );

                const elseIfMatch =
                    token.match(
                        /^else\s+if\s*\((.*)\)$/
                    );

                const forMatch =
                    token.match(
                        /^for\s*\((.*)\)$/
                    );

                const whileMatch =
                    token.match(
                        /^while\s*\((.*)\)$/
                    );

                const functionMatch =
                    token.match(
                        /^(?:public\s+|private\s+|protected\s+|static\s+)*(?:void|int|double|float|boolean|String)\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)$/
                    );

                if (
                    ifMatch ||
                    elseIfMatch
                ) {
                    const condition =
                        (
                            ifMatch ||
                            elseIfMatch
                        )[1];

                    if (
                        tokens[
                            index + 1
                        ] !== "{"
                    ) {
                        throw new CodeError(
                            "Expected '{' after if."
                        );
                    }

                    const bodyInfo =
                        parseBlock(
                            index + 2
                        );

                    const node = {
                        type:
                            "if",

                        branches: [
                            {
                                condition,
                                body:
                                    bodyInfo
                                        .nodes
                            }
                        ],

                        elseBody:
                            [],

                        line:
                            1
                    };

                    index =
                        bodyInfo.index;

                    if (
                        tokens[index] &&
                        /^else\s+if\s*\((.*)\)$/
                            .test(
                                tokens[index]
                            )
                    ) {
                        while (
                            tokens[index] &&
                            /^else\s+if\s*\((.*)\)$/
                                .test(
                                    tokens[index]
                                )
                        ) {
                            const branchToken =
                                tokens[index];

                            const branchMatch =
                                branchToken.match(
                                    /^else\s+if\s*\((.*)\)$/
                                );

                            if (
                                tokens[
                                    index + 1
                                ] !== "{"
                            ) {
                                throw new CodeError(
                                    "Expected '{' after else if."
                                );
                            }

                            const branchInfo =
                                parseBlock(
                                    index + 2
                                );

                            node.branches.push({
                                condition:
                                    branchMatch[1],

                                body:
                                    branchInfo.nodes,

                                line:
                                    1
                            });

                            index =
                                branchInfo.index;
                        }
                    }

                    if (
                        tokens[index] ===
                        "else"
                    ) {
                        if (
                            tokens[
                                index + 1
                            ] !== "{"
                        ) {
                            throw new CodeError(
                                "Expected '{' after else."
                            );
                        }

                        const elseInfo =
                            parseBlock(
                                index + 2
                            );

                        node.elseBody =
                            elseInfo.nodes;

                        index =
                            elseInfo.index;
                    }

                    nodes.push(
                        node
                    );

                    continue;
                }

                if (forMatch) {
                    if (
                        tokens[
                            index + 1
                        ] !== "{"
                    ) {
                        throw new CodeError(
                            "Expected '{' after for."
                        );
                    }

                    const bodyInfo =
                        parseBlock(
                            index + 2
                        );

                    nodes.push({
                        type:
                            "for",

                        header:
                            forMatch[1],

                        body:
                            bodyInfo.nodes,

                        language:
                            "java",

                        line:
                            1
                    });

                    index =
                        bodyInfo.index;

                    continue;
                }

                if (whileMatch) {
                    if (
                        tokens[
                            index + 1
                        ] !== "{"
                    ) {
                        throw new CodeError(
                            "Expected '{' after while."
                        );
                    }

                    const bodyInfo =
                        parseBlock(
                            index + 2
                        );

                    nodes.push({
                        type:
                            "while",

                        condition:
                            whileMatch[1],

                        body:
                            bodyInfo.nodes,

                        line:
                            1
                    });

                    index =
                        bodyInfo.index;

                    continue;
                }

                if (
                    functionMatch &&
                    tokens[
                        index + 1
                    ] === "{"
                ) {
                    const args =
                        functionMatch[2]
                            .split(",")
                            .map(
                                s =>
                                    s.trim()
                            )
                            .filter(
                                Boolean
                            )
                            .map(
                                arg =>
                                    arg
                                        .split(
                                            /\s+/
                                        )
                                        .pop()
                            );

                    const bodyInfo =
                        parseBlock(
                            index + 2
                        );

                    nodes.push({
                        type:
                            "function",

                        name:
                            functionMatch[1],

                        args,

                        body:
                            bodyInfo.nodes,

                        line:
                            1
                    });

                    index =
                        bodyInfo.index;

                    continue;
                }

                if (
                    token === "else"
                ) {
                    throw new CodeError(
                        "Unexpected else."
                    );
                }

                const simple =
                    parseSimpleStatement(
                        token,
                        "java",
                        1
                    );

                if (simple) {
                    nodes.push(
                        simple
                    );
                }

                index++;
            }

            return {
                nodes,
                index
            };
        }

        return {
            ast:
                parseBlock(
                    0
                ).nodes,

            hasComment
        };
    }

    function parseLuau(
        source
    ) {
        const rawLines =
            source
                .replace(
                    /\r/g,
                    ""
                )
                .split("\n");

        const lines = [];

        let hasComment =
            false;

        rawLines.forEach(
            (
                raw,
                index
            ) => {
                const lineNumber =
                    index + 1;

                const result =
                    stripInlineComment(
                        raw,
                        "luau"
                    );

                if (
                    result.comment
                ) {
                    hasComment =
                        true;
                }

                if (!result.code) {
                    return;
                }

                lines.push({
                    text:
                        result.code
                            .trim(),

                    line:
                        lineNumber
                });
            }
        );

        function parseBlock(
            index,
            stopWords = [
                "end",
                "else",
                "elseif"
            ]
        ) {
            const nodes = [];

            while (
                index <
                lines.length
            ) {
                const line =
                    lines[index];

                const text =
                    line.text;

                if (
                    stopWords.includes(
                        text
                    ) ||
                    text.startsWith(
                        "elseif "
                    )
                ) {
                    break;
                }

                const ifMatch =
                    text.match(
                        /^if\s+(.+)\s+then$/
                    );

                const forMatch =
                    text.match(
                        /^for\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+?)\s*,\s*(.+?)(?:\s*,\s*(.+?))?\s+do$/
                    );

                const whileMatch =
                    text.match(
                        /^while\s+(.+)\s+do$/
                    );

                const functionMatch =
                    text.match(
                        /^function\s+([A-Za-z_][A-Za-z0-9_\.]*)\s*\(([^)]*)\)$/
                    );

                if (ifMatch) {
                    const bodyInfo =
                        parseBlock(
                            index + 1
                        );

                    const node = {
                        type:
                            "if",

                        branches: [
                            {
                                condition:
                                    ifMatch[1],

                                body:
                                    bodyInfo.nodes,

                                line:
                                    line.line
                            }
                        ],

                        elseBody:
                            [],

                        line:
                            line.line
                    };

                    index =
                        bodyInfo.index;

                    while (
                        index <
                            lines.length &&
                        lines[index]
                            .text
                            .startsWith(
                                "elseif "
                            )
                    ) {
                        const branchLine =
                            lines[index];

                        const branchMatch =
                            branchLine.text.match(
                                /^elseif\s+(.+)\s+then$/
                            );

                        const branchInfo =
                            parseBlock(
                                index + 1
                            );

                        node.branches.push({
                            condition:
                                branchMatch[1],

                            body:
                                branchInfo.nodes,

                            line:
                                branchLine.line
                        });

                        index =
                            branchInfo.index;
                    }

                    if (
                        index <
                            lines.length &&
                        lines[index]
                            .text ===
                            "else"
                    ) {
                        const elseInfo =
                            parseBlock(
                                index + 1
                            );

                        node.elseBody =
                            elseInfo.nodes;

                        index =
                            elseInfo.index;
                    }

                    if (
                        lines[index]?.text !==
                        "end"
                    ) {
                        throw new CodeError(
                            "Missing end for if.",
                            line.line
                        );
                    }

                    index++;

                    nodes.push(
                        node
                    );

                    continue;
                }

                if (forMatch) {
                    const bodyInfo =
                        parseBlock(
                            index + 1
                        );

                    if (
                        lines[
                            bodyInfo.index
                        ]?.text !==
                        "end"
                    ) {
                        throw new CodeError(
                            "Missing end for loop.",
                            line.line
                        );
                    }

                    nodes.push({
                        type:
                            "for",

                        variable:
                            forMatch[1],

                        start:
                            forMatch[2],

                        finish:
                            forMatch[3],

                        step:
                            forMatch[4] ||
                            "1",

                        body:
                            bodyInfo.nodes,

                        language:
                            "luau",

                        line:
                            line.line
                    });

                    index =
                        bodyInfo.index +
                        1;

                    continue;
                }

                if (whileMatch) {
                    const bodyInfo =
                        parseBlock(
                            index + 1
                        );

                    if (
                        lines[
                            bodyInfo.index
                        ]?.text !==
                        "end"
                    ) {
                        throw new CodeError(
                            "Missing end for while.",
                            line.line
                        );
                    }

                    nodes.push({
                        type:
                            "while",

                        condition:
                            whileMatch[1],

                        body:
                            bodyInfo.nodes,

                        line:
                            line.line
                    });

                    index =
                        bodyInfo.index +
                        1;

                    continue;
                }

                if (functionMatch) {
                    const args =
                        functionMatch[2]
                            .split(",")
                            .map(
                                s =>
                                    s.trim()
                            )
                            .filter(
                                Boolean
                            );

                    const bodyInfo =
                        parseBlock(
                            index + 1
                        );

                    if (
                        lines[
                            bodyInfo.index
                        ]?.text !==
                        "end"
                    ) {
                        throw new CodeError(
                            "Missing end for function.",
                            line.line
                        );
                    }

                    nodes.push({
                        type:
                            "function",

                        name:
                            functionMatch[1]
                                .split(".")
                                .pop(),

                        args,

                        body:
                            bodyInfo.nodes,

                        line:
                            line.line
                    });

                    index =
                        bodyInfo.index +
                        1;

                    continue;
                }

                if (
                    text === "end" ||
                    text === "else"
                ) {
                    break;
                }

                nodes.push(
                    parseSimpleStatement(
                        text,
                        "luau",
                        line.line
                    )
                );

                index++;
            }

            return {
                nodes,
                index
            };
        }

        return {
            ast:
                parseBlock(
                    0
                ).nodes,

            hasComment
        };
    }

    function parseSource(source) {
        if (
            state.language ===
            "python"
        ) {
            return parsePython(
                source
            );
        }

        if (
            state.language ===
            "java"
        ) {
            return parseJava(
                source
            );
        }

        return parseLuau(
            source
        );
    }

    function splitArguments(
        source
    ) {
        if (
            !source.trim()
        ) {
            return [];
        }

        const parts = [];

        let depth = 0;
        let quote = null;
        let buffer = "";

        for (
            let i = 0;
            i < source.length;
            i++
        ) {
            const ch =
                source[i];

            if (quote) {
                buffer += ch;

                if (
                    ch === quote &&
                    source[i - 1] !==
                        "\\"
                ) {
                    quote = null;
                }

                continue;
            }

            if (
                ch === '"' ||
                ch === "'"
            ) {
                quote = ch;
                buffer += ch;
                continue;
            }

            if (ch === "(") {
                depth++;
            }

            if (ch === ")") {
                depth--;
            }

            if (
                ch === "," &&
                depth === 0
            ) {
                parts.push(
                    buffer.trim()
                );

                buffer = "";

                continue;
            }

            buffer += ch;
        }

        if (
            buffer.trim()
        ) {
            parts.push(
                buffer.trim()
            );
        }

        return parts;
    }

    function executeNodes(
        nodes,
        runtime
    ) {
        for (
            const node
            of nodes
        ) {
            runtime.currentLine =
                node.line ||
                null;

            switch (
                node.type
            ) {
                case "assign": {
                    const value =
                        evaluateExpression(
                            node.expression,
                            runtime.variables
                        );

                    if (
                        node.operator ===
                        "="
                    ) {
                        runtime.variables[
                            node.name
                        ] = value;

                    } else if (
                        node.operator ===
                        "+="
                    ) {
                        runtime.variables[
                            node.name
                        ] =
                            Number(
                                runtime.variables[
                                    node.name
                                ] || 0
                            ) +
                            Number(
                                value
                            );

                    } else if (
                        node.operator ===
                        "-="
                    ) {
                        runtime.variables[
                            node.name
                        ] =
                            Number(
                                runtime.variables[
                                    node.name
                                ] || 0
                            ) -
                            Number(
                                value
                            );

                    } else if (
                        node.operator ===
                        "*="
                    ) {
                        runtime.variables[
                            node.name
                        ] =
                            Number(
                                runtime.variables[
                                    node.name
                                ] || 0
                            ) *
                            Number(
                                value
                            );

                    } else if (
                        node.operator ===
                        "/="
                    ) {
                        runtime.variables[
                            node.name
                        ] =
                            Number(
                                runtime.variables[
                                    node.name
                                ] || 0
                            ) /
                            Number(
                                value
                            );
                    }

                    break;
                }

                case "move": {
                    const count =
                        node.count
                            ? evaluateExpression(
                                node.count,
                                runtime.variables
                            )
                            : 1;

                    moveMany(
                        node.direction,
                        count
                    );

                    break;
                }

                case "print": {
                    const value =
                        evaluateExpression(
                            node.expression,
                            runtime.variables
                        );

                    consoleLog(
                        value
                    );

                    break;
                }

                case "call": {
                    executeFunctionCall(
                        node.name,
                        node.argsSource,
                        runtime
                    );

                    break;
                }

                case "if": {
                    let executed =
                        false;

                    for (
                        const branch
                        of node.branches
                    ) {
                        if (
                            Boolean(
                                evaluateExpression(
                                    branch.condition,
                                    runtime.variables
                                )
                            )
                        ) {
                            executeNodes(
                                branch.body,
                                runtime
                            );

                            executed =
                                true;

                            break;
                        }
                    }

                    if (
                        !executed &&
                        node.elseBody?.length
                    ) {
                        executeNodes(
                            node.elseBody,
                            runtime
                        );
                    }

                    break;
                }

                case "for": {
                    executeFor(
                        node,
                        runtime
                    );

                    break;
                }

                case "while": {
                    let guard = 0;

                    while (
                        Boolean(
                            evaluateExpression(
                                node.condition,
                                runtime.variables
                            )
                        )
                    ) {
                        executeNodes(
                            node.body,
                            runtime
                        );

                        guard++;

                        if (
                            guard >
                            100
                        ) {
                            throw new CodeError(
                                t("tooMany"),
                                node.line
                            );
                        }

                        if (
                            isAtGoal()
                        ) {
                            return;
                        }
                    }

                    break;
                }

                case "function": {
                    runtime.functions[
                        node.name
                    ] = node;

                    break;
                }

                default:
                    throw new CodeError(
                        `Unsupported statement '${node.type}'.`,
                        node.line
                    );
            }

            if (
                isAtGoal()
            ) {
                return;
            }

            if (
                state.operations >
                state.maxOperations
            ) {
                throw new CodeError(
                    t("tooMany"),
                    runtime.currentLine
                );
            }
        }
    }

    function executeFor(
        node,
        runtime
    ) {
        if (
            node.language ===
            "python"
        ) {
            const pieces =
                splitArguments(
                    node.header
                );

            if (
                pieces.length === 0
            ) {
                throw new CodeError(
                    "range() needs a value.",
                    node.line
                );
            }

            let start = 0;

            let stop =
                null;

            let step = 1;

            if (
                pieces.length === 1
            ) {
                stop =
                    evaluateExpression(
                        pieces[0],
                        runtime.variables
                    );

            } else if (
                pieces.length ===
                2
            ) {
                start =
                    evaluateExpression(
                        pieces[0],
                        runtime.variables
                    );

                stop =
                    evaluateExpression(
                        pieces[1],
                        runtime.variables
                    );

            } else {
                start =
                    evaluateExpression(
                        pieces[0],
                        runtime.variables
                    );

                stop =
                    evaluateExpression(
                        pieces[1],
                        runtime.variables
                    );

                step =
                    evaluateExpression(
                        pieces[2],
                        runtime.variables
                    );
            }

            if (
                step === 0
            ) {
                throw new CodeError(
                    "range() step cannot be zero.",
                    node.line
                );
            }

            let guard = 0;

            for (
                let value = start;

                step > 0
                    ? value < stop
                    : value > stop;

                value += step
            ) {
                runtime.variables[
                    node.variable
                ] = value;

                executeNodes(
                    node.body,
                    runtime
                );

                guard++;

                if (
                    guard > 100
                ) {
                    throw new CodeError(
                        t("tooMany"),
                        node.line
                    );
                }

                if (
                    isAtGoal()
                ) {
                    break;
                }
            }

            return;
        }

        if (
            node.language ===
            "java"
        ) {
            const parts =
                node.header
                    .split(";")
                    .map(
                        s =>
                            s.trim()
                    );

            if (
                parts.length !==
                3
            ) {
                throw new CodeError(
                    "Java for loops need initializer; condition; update.",
                    node.line
                );
            }

            const init =
                parts[0].replace(
                    /^(int|double|float|long)\s+/,
                    ""
                );

            const initMatch =
                init.match(
                    /^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/
                );

            if (!initMatch) {
                throw new CodeError(
                    "Could not read the for-loop initializer.",
                    node.line
                );
            }

            runtime.variables[
                initMatch[1]
            ] =
                evaluateExpression(
                    initMatch[2],
                    runtime.variables
                );

            let guard = 0;

            while (
                Boolean(
                    evaluateExpression(
                        parts[1],
                        runtime.variables
                    )
                )
            ) {
                executeNodes(
                    node.body,
                    runtime
                );

                applyJavaLoopUpdate(
                    parts[2],
                    runtime.variables
                );

                guard++;

                if (
                    guard > 100
                ) {
                    throw new CodeError(
                        t("tooMany"),
                        node.line
                    );
                }

                if (
                    isAtGoal()
                ) {
                    break;
                }
            }

            return;
        }

        const start =
            Number(
                evaluateExpression(
                    node.start,
                    runtime.variables
                )
            );

        const finish =
            Number(
                evaluateExpression(
                    node.finish,
                    runtime.variables
                )
            );

        const step =
            Number(
                evaluateExpression(
                    node.step,
                    runtime.variables
                )
            );

        if (
            !Number.isFinite(
                start
            ) ||
            !Number.isFinite(
                finish
            ) ||
            !Number.isFinite(
                step
            ) ||
            step === 0
        ) {
            throw new CodeError(
                "Invalid numeric for loop.",
                node.line
            );
        }

        let guard = 0;

        for (
            let value = start;

            step > 0
                ? value <= finish
                : value >= finish;

            value += step
        ) {
            runtime.variables[
                node.variable
            ] = value;

            executeNodes(
                node.body,
                runtime
            );

            guard++;

            if (
                guard > 100
            ) {
                throw new CodeError(
                    t("tooMany"),
                    node.line
                );
            }

            if (
                isAtGoal()
            ) {
                break;
            }
        }
    }

    function applyJavaLoopUpdate(
        update,
        variables
    ) {
        const plusPlus =
            update.match(
                /^([A-Za-z_][A-Za-z0-9_]*)\+\+$/
            );

        const minusMinus =
            update.match(
                /^([A-Za-z_][A-Za-z0-9_]*)--$/
            );

        const add =
            update.match(
                /^([A-Za-z_][A-Za-z0-9_]*)\s*\+=\s*(.*)$/
            );

        const subtract =
            update.match(
                /^([A-Za-z_][A-Za-z0-9_]*)\s*-\=\s*(.*)$/
            );

        const assign =
            update.match(
                /^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/
            );

        if (plusPlus) {
            variables[
                plusPlus[1]
            ] =
                Number(
                    variables[
                        plusPlus[1]
                    ] || 0
                ) + 1;

        } else if (
            minusMinus
        ) {
            variables[
                minusMinus[1]
            ] =
                Number(
                    variables[
                        minusMinus[1]
                    ] || 0
                ) - 1;

        } else if (
            add
        ) {
            variables[
                add[1]
            ] =
                Number(
                    variables[
                        add[1]
                    ] || 0
                ) +
                Number(
                    evaluateExpression(
                        add[2],
                        variables
                    )
                );

        } else if (
            subtract
        ) {
            variables[
                subtract[1]
            ] =
                Number(
                    variables[
                        subtract[1]
                    ] || 0
                ) -
                Number(
                    evaluateExpression(
                        subtract[2],
                        variables
                    )
                );

        } else if (
            assign
        ) {
            variables[
                assign[1]
            ] =
                evaluateExpression(
                    assign[2],
                    variables
                );

        } else {
            throw new CodeError(
                `Unknown loop update '${update}'.`
            );
        }
    }

    function executeFunctionCall(
        name,
        argsSource,
        runtime
    ) {
        const args =
            splitArguments(
                argsSource
            ).map(
                expr =>
                    evaluateExpression(
                        expr,
                        runtime.variables
                    )
            );

        if (
            [
                "print",
                "println"
            ].includes(
                name
            )
        ) {
            consoleLog(
                args
                    .map(String)
                    .join(" ")
            );

            return;
        }

        const target =
            runtime.functions[name] ||
            runtime.functions[
                name.split(".").pop()
            ];

        if (!target) {
            throw new CodeError(
                `Unknown function '${name}'.`
            );
        }

        const childVariables =
            {
                ...runtime.variables
            };

        target.args.forEach(
            (
                argName,
                index
            ) => {
                childVariables[
                    argName.replace(
                        /^(int|double|float|boolean|String)\s+/,
                        ""
                    )
                ] =
                    args[index];
            }
        );

        const childRuntime = {
            ...runtime,

            variables:
                childVariables,

            currentLine:
                target.line
        };

        executeNodes(
            target.body,
            childRuntime
        );

        Object.assign(
            runtime.variables,
            childVariables
        );
    }

    function collectFeatures(
        nodes,
        features
    ) {
        for (
            const node
            of nodes
        ) {
            if (
                node.type ===
                "if"
            ) {
                features.ifStatement =
                    true;

                node.branches.forEach(
                    branch =>
                        collectFeatures(
                            branch.body,
                            features
                        )
                );

                collectFeatures(
                    node.elseBody ||
                        [],
                    features
                );
            }

            if (
                node.type ===
                    "for" ||
                node.type ===
                    "while"
            ) {
                features.loop =
                    true;

                collectFeatures(
                    node.body,
                    features
                );
            }

            if (
                node.type ===
                "function"
            ) {
                features.functions.add(
                    node.name
                );

                collectFeatures(
                    node.body,
                    features
                );
            }

            if (
                node.type ===
                "call"
            ) {
                features.calls.add(
                    node.name
                        .split(".")
                        .pop()
                );
            }

            if (
                node.type ===
                "assign"
            ) {
                features.variables.add(
                    node.name
                );
            }

            if (
                node.type === "move" ||
                node.type === "print"
            ) {
                // Nothing else needed.
            }
        }
    }

    function validateRequirements(
        ast,
        parsed
    ) {
        const req =
            state.challenge
                .requirements ||
            {};

        const features = {
            ifStatement:
                false,

            loop:
                false,

            functions:
                new Set(),

            calls:
                new Set(),

            variables:
                new Set()
        };

        collectFeatures(
            ast,
            features
        );

        if (
            req.comment &&
            !parsed.hasComment
        ) {
            return t(
                "commentNeeded"
            );
        }

        if (req.variable) {
            if (
                !features.variables.has(
                    req.variable
                )
            ) {
                return t(
                    "variableNeeded"
                );
            }

            const value =
                state.lastProgram
                    ?.variables?.[
                        req.variable
                    ];

            if (
                value !==
                req.variableValue
            ) {
                return t(
                    "variableNeeded"
                );
            }
        }

        if (
            req.ifStatement &&
            !features.ifStatement
        ) {
            return t(
                "ifNeeded"
            );
        }

        if (
            req.loop &&
            !features.loop
        ) {
            return t(
                "loopNeeded"
            );
        }

        if (
            req.functionDefinition
        ) {
            if (
                !features.functions.has(
                    req.functionDefinition
                ) ||
                !features.calls.has(
                    req.functionCall
                )
            ) {
                return t(
                    "functionNeeded"
                );
            }
        }

        return null;
    }

    function highlightErrorLine(
        line
    ) {
        state.highlightedLines =
            line
                ? [line]
                : [];

        if (
            !els.codeEditor ||
            line == null
        ) {
            return;
        }

        // The textarea itself cannot style individual lines,
        // so we show the line in the console.
    }

    function runProgram() {
        if (state.running) {
            return;
        }

        state.running =
            true;

        state.operations =
            0;

        state.player = {
            ...state.challenge.world.start
        };

        state.runtime =
            null;

        updatePlayerPosition();

        setHelper(
            ":)",
            t("running"),
            true
        );

        setConsole([
            t("running")
        ]);

        const code =
            String(
                els.codeEditor?.value ||
                ""
            ).trim();

        if (!code) {
            finishRun(
                false,
                t("empty")
            );

            return;
        }

        try {
            const parsed =
                parseSource(
                    code
                );

            const runtime = {
                variables:
                    {},

                functions:
                    {},

                currentLine:
                    null
            };

            state.runtime =
                runtime;

            state.lastProgram = {
                ast:
                    parsed.ast,

                variables:
                    runtime.variables
            };

            // Register function definitions before running the top-level code.
            for (
                const node
                of parsed.ast
            ) {
                if (
                    node.type ===
                    "function"
                ) {
                    runtime.functions[
                        node.name
                    ] =
                        node;
                }
            }

            executeNodes(
                parsed.ast.filter(
                    node =>
                        node.type !==
                        "function"
                ),
                runtime
            );

            state.lastProgram.variables =
                {
                    ...runtime.variables
                };

            const requirementMessage =
                validateRequirements(
                    parsed.ast,
                    parsed
                );

            if (
                requirementMessage
            ) {
                finishRun(
                    false,
                    requirementMessage
                );

                return;
            }

            if (
                !isAtGoal()
            ) {
                finishRun(
                    false,
                    t("failed")
                );

                return;
            }

            const successMessage =
                `${t(
                    "complete"
                )} ${challengeText(
                    state.challenge
                        .postSuccess
                )}`;

            finishRun(
                true,
                successMessage
            );

        } catch (
            error
        ) {
            const prefix =
                error.name ===
                "CodeError"
                    ? t("syntax")
                    : t("runtime");

            const lineText =
                error.line
                    ? ` (line ${error.line})`
                    : "";

            finishRun(
                false,
                `${prefix}${lineText}: ${error.message}`
            );

            highlightErrorLine(
                error.line
            );
        }
    }

    function finishRun(
        success,
        message
    ) {
        if (success) {
            const player =
                document.getElementById(
                    "happySquare"
                );

            if (player) {
                player.textContent =
                    ":D";

                player.classList.add(
                    "happySquareComplete"
                );
            }

            setHelper(
                ":D",
                message,
                true
            );

        } else {
            setHelper(
                ":)",
                message,
                true
            );
        }

        consoleLog(
            message
        );

        if (els.status) {
            els.status.textContent =
                success
                    ? "COMPLETE"
                    : "TRY AGAIN";

            els.status.classList.toggle(
                "success",
                success
            );

            els.status.classList.toggle(
                "error",
                !success
            );
        }

        setTimeout(
            () => {
                if (
                    !state.running
                ) {
                    return;
                }

                state.running =
                    false;

                if (
                    els.helperFace
                ) {
                    els.helperFace.classList.remove(
                        "talking"
                    );
                }
            },
            400
        );
    }

    function resetProgram() {
        state.running =
            false;

        state.operations =
            0;

        state.player = {
            ...state.challenge.world.start
        };

        state.runtime =
            null;

        state.lastProgram =
            null;

        if (
            els.codeEditor
        ) {
            els.codeEditor.value =
                state.defaultCode;
        }

        const player =
            document.getElementById(
                "happySquare"
            );

        if (player) {
            player.classList.remove(
                "happySquareComplete"
            );
        }

        updatePlayerPosition();

        setHelper(
            ":)",
            defaultHelperText(),
            false
        );

        clearConsole();

        if (els.status) {
            els.status.textContent =
                "READY";

            els.status.classList.remove(
                "success",
                "error"
            );
        }
    }

    function defaultHelperText() {
        const lang =
            state.language;

        const movement =
            lang === "python"
                ? "move_up(), move_down(), move_left(), move_right()"
                : lang === "java"
                    ? "moveUp(), moveDown(), moveLeft(), moveRight()"
                    : "moveUp(), moveDown(), moveLeft(), moveRight()";

        return `Movement: ${movement}`;
    }

    function showHint() {
        if (
            !state.challenge
        ) {
            return;
        }

        state.hintVisible =
            true;

        const hint =
            state.challenge.hint[
                state.language
            ] ||
            "Try changing the starter code.";

        setHelper(
            ":D",
            hint,
            true
        );

        if (
            els.hintButton
        ) {
            els.hintButton.textContent =
                getSiteLanguage() ===
                "pt"
                    ? "Esconder Dica"
                    : "Hide Hint";
        }
    }

    function hideHint() {
        state.hintVisible =
            false;

        setHelper(
            ":)",
            defaultHelperText(),
            false
        );

        if (
            els.hintButton
        ) {
            els.hintButton.textContent =
                getSiteLanguage() ===
                "pt"
                    ? "Mostrar Dica"
                    : "Show Hint";
        }
    }

    function toggleHint() {
        if (
            state.hintVisible
        ) {
            hideHint();
        } else {
            showHint();
        }
    }

    function loadChallenge() {
        state.language =
            normalizeLanguage(
                getQueryValue(
                    [
                        "language",
                        "lang"
                    ],
                    "python"
                )
            );

        state.grade =
            Math.max(
                1,
                Math.min(
                    5,
                    Number(
                        getQueryValue(
                            [
                                "grade"
                            ],
                            "1"
                        )
                    ) || 1
                )
            );

        state.challenge =
            typeof getProgrammingChallenge ===
            "function"
                ? getProgrammingChallenge(
                    state.grade
                )
                : programmingChallenges[
                    state.grade
                ];

        updateObjective();

        renderWorld();

        state.defaultCode =
            state.challenge
                .starterCode[
                    state.language
                ] || "";

        if (
            els.codeEditor
        ) {
            els.codeEditor.value =
                state.defaultCode;
        }

        hideHint();

        clearConsole();

        if (els.status) {
            els.status.textContent =
                "READY";

            els.status.classList.remove(
                "success",
                "error"
            );
        }
    }

    function hookEvents() {
        if (els.runButton) {
            els.runButton.addEventListener(
                "click",
                event => {
                    event.preventDefault();
                    runProgram();
                }
            );
        }

        if (els.resetButton) {
            els.resetButton.addEventListener(
                "click",
                event => {
                    event.preventDefault();
                    resetProgram();
                }
            );
        }

        if (els.hintButton) {
            els.hintButton.addEventListener(
                "click",
                event => {
                    event.preventDefault();
                    toggleHint();
                }
            );
        }

        window.addEventListener(
            "resize",
            updatePlayerPosition
        );

        window.addEventListener(
            "languageChanged",
            () => {
                updateObjective();

                if (
                    state.hintVisible
                ) {
                    showHint();
                } else {
                    setHelper(
                        ":)",
                        defaultHelperText(),
                        false
                    );
                }
            }
        );

        document.addEventListener(
            "keydown",
            event => {
                if (
                    (
                        event.ctrlKey ||
                        event.metaKey
                    ) &&
                    event.key ===
                        "Enter"
                ) {
                    event.preventDefault();

                    runProgram();
                }
            }
        );

        // Fallback for buttons whose IDs are different from the expected ones.
        document.addEventListener(
            "click",
            event => {
                const button =
                    event.target.closest(
                        "button"
                    );

                if (!button) {
                    return;
                }

                // Don't run the same action twice when one of the direct listeners above handled it.
                if (
                    button ===
                        els.runButton ||
                    button ===
                        els.resetButton ||
                    button ===
                        els.hintButton
                ) {
                    return;
                }

                const action =
                    button.dataset.action;

                if (
                    action ===
                    "run"
                ) {
                    event.preventDefault();
                    runProgram();
                    return;
                }

                if (
                    action ===
                    "reset"
                ) {
                    event.preventDefault();
                    resetProgram();
                    return;
                }

                if (
                    action ===
                    "hint"
                ) {
                    event.preventDefault();
                    toggleHint();
                    return;
                }

                const buttonText =
                    button.textContent
                        .trim()
                        .toLowerCase();

                if (
                    buttonText ===
                        "run code" ||
                    buttonText ===
                        "executar código"
                ) {
                    event.preventDefault();
                    runProgram();
                    return;
                }

                if (
                    buttonText ===
                        "reset" ||
                    buttonText ===
                        "redefinir"
                ) {
                    event.preventDefault();
                    resetProgram();
                    return;
                }

                if (
                    buttonText ===
                        "show hint" ||
                    buttonText ===
                        "hide hint" ||
                    buttonText ===
                        "mostrar dica" ||
                    buttonText ===
                        "esconder dica"
                ) {
                    event.preventDefault();
                    toggleHint();
                }
            }
        );
    }

    function start() {
        cacheElements();

        if (
            !els.world ||
            !els.codeEditor
        ) {
            return;
        }

        hookEvents();

        loadChallenge();
    }

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            start
        );
    } else {
        start();
    }
})();