(function () {
    "use strict";

    /*
        ========================================================
        LIBRARY DATA
        ========================================================
    */

    const books = {
        math: {
            icon: "📐",
            title: "Matemática",
            description: "Aprenda matemática de forma simples.",
            pages: [
                {
                    title: "Números",
                    text:
                        "Os números são usados para contar, medir e comparar.\n\n" +
                        "Exemplo:\n" +
                        "3 + 2 = 5."
                },
                {
                    title: "Adição",
                    text:
                        "A adição junta quantidades.\n\n" +
                        "Exemplo:\n" +
                        "7 + 5 = 12."
                },
                {
                    title: "Subtração",
                    text:
                        "A subtração retira uma quantidade de outra.\n\n" +
                        "Exemplo:\n" +
                        "12 - 5 = 7."
                },
                {
                    title: "Geometria",
                    text:
                        "A geometria estuda formas, tamanhos e posições.\n\n" +
                        "Exemplos: círculo, triângulo, quadrado e retângulo."
                },
                {
                    title: "Frações",
                    text:
                        "Uma fração representa partes iguais de um todo.\n\n" +
                        "1/2 significa uma de duas partes iguais."
                }
            ]
        },

        english: {
            icon: "🔤",
            title: "Inglês",
            description: "Aprenda palavras e frases em inglês.",
            pages: [
                {
                    title: "Saudações",
                    text:
                        "Hello = Olá\n" +
                        "Hi = Oi\n" +
                        "Good morning = Bom dia\n" +
                        "Good evening = Boa noite."
                },
                {
                    title: "Pronomes",
                    text:
                        "I = eu\n" +
                        "You = você\n" +
                        "He = ele\n" +
                        "She = ela\n" +
                        "We = nós\n" +
                        "They = eles/elas."
                },
                {
                    title: "Verbo to be",
                    text:
                        "O verbo to be pode significar ser ou estar.\n\n" +
                        "I am\n" +
                        "You are\n" +
                        "He is\n" +
                        "She is\n" +
                        "We are\n" +
                        "They are."
                },
                {
                    title: "Vocabulário",
                    text:
                        "House = casa\n" +
                        "Book = livro\n" +
                        "School = escola\n" +
                        "Water = água."
                },
                {
                    title: "Frases",
                    text:
                        "Uma frase simples pode ter sujeito + verbo + complemento.\n\n" +
                        "Exemplo:\n" +
                        "I like music."
                }
            ]
        },

        history: {
            icon: "🏛️",
            title: "História",
            description: "Conheça diferentes períodos e fontes históricas.",
            pages: [
                {
                    title: "O que é História?",
                    text:
                        "História é o estudo das sociedades humanas e de suas mudanças ao longo do tempo."
                },
                {
                    title: "Fontes históricas",
                    text:
                        "Fontes históricas são vestígios usados para estudar o passado.\n\n" +
                        "Elas podem ser escritas, materiais, orais ou visuais."
                },
                {
                    title: "Antigo Egito",
                    text:
                        "A civilização egípcia se desenvolveu às margens do rio Nilo.\n\n" +
                        "Os egípcios também desenvolveram os hieróglifos."
                },
                {
                    title: "Grécia Antiga",
                    text:
                        "A Grécia Antiga possuía várias cidades-Estado.\n\n" +
                        "Atenas ficou conhecida por sua participação no desenvolvimento da democracia."
                },
                {
                    title: "Brasil",
                    text:
                        "A história do Brasil envolve povos indígenas, colonização portuguesa, africanos e seus descendentes, além de muitos outros grupos.\n\n" +
                        "A Independência ocorreu em 1822."
                }
            ]
        },

        science: {
            icon: "🔬",
            title: "Ciências",
            description: "Descubra como o mundo funciona.",
            pages: [
                {
                    title: "Seres vivos",
                    text:
                        "Seres vivos realizam processos como alimentação, crescimento e reprodução."
                },
                {
                    title: "Células",
                    text:
                        "A célula é uma unidade básica dos seres vivos."
                },
                {
                    title: "Sistema Solar",
                    text:
                        "O Sistema Solar é formado pelo Sol e pelos corpos que orbitam ao seu redor."
                },
                {
                    title: "Matéria",
                    text:
                        "Os três estados mais conhecidos da matéria são sólido, líquido e gasoso."
                },
                {
                    title: "Energia",
                    text:
                        "A energia pode aparecer de diferentes formas, como térmica, elétrica, luminosa e mecânica."
                }
            ]
        }
    };

    const bookOrder = [
        "math",
        "english",
        "history",
        "science"
    ];

    /*
        ========================================================
        STATE
        ========================================================
    */

    let currentBook = null;
    let currentPage = 0;

    let bodyOverflowBeforeLibrary = "";

    let pendingSelection = null;
    let selectionTimer = null;

    const HIGHLIGHTS_STORAGE_KEY =
        "learningWebsiteLibraryHighlights";

    const DEFAULT_HIGHLIGHT_COLOR =
        "#ffd54f";

    /*
        ========================================================
        HELPERS
        ========================================================
    */

    function getElement(id) {
        return document.getElementById(id);
    }

    function createElement(tagName, options) {
        const element =
            document.createElement(tagName);

        if (!options) {
            return element;
        }

        if (options.id) {
            element.id = options.id;
        }

        if (options.className) {
            element.className =
                options.className;
        }

        if (options.text !== undefined) {
            element.textContent =
                options.text;
        }

        if (options.type) {
            element.type =
                options.type;
        }

        if (options.ariaLabel) {
            element.setAttribute(
                "aria-label",
                options.ariaLabel
            );
        }

        return element;
    }

    /*
        ========================================================
        HIGHLIGHT STORAGE
        ========================================================
    */

    function loadHighlights() {
        try {
            const saved =
                localStorage.getItem(
                    HIGHLIGHTS_STORAGE_KEY
                );

            if (!saved) {
                return {};
            }

            const parsed =
                JSON.parse(saved);

            if (
                !parsed ||
                typeof parsed !== "object"
            ) {
                return {};
            }

            return parsed;
        } catch (error) {
            console.warn(
                "[Library] Could not load highlights.",
                error
            );

            return {};
        }
    }

    function saveHighlights(data) {
        try {
            localStorage.setItem(
                HIGHLIGHTS_STORAGE_KEY,
                JSON.stringify(data)
            );
        } catch (error) {
            console.warn(
                "[Library] Could not save highlights.",
                error
            );
        }
    }

    function getPageKey() {
        if (!currentBook) {
            return "";
        }

        return (
            currentBook +
            ":" +
            currentPage
        );
    }

    function getCurrentPageHighlights() {
        const allHighlights =
            loadHighlights();

        const pageKey =
            getPageKey();

        if (
            !Array.isArray(
                allHighlights[pageKey]
            )
        ) {
            return [];
        }

        return allHighlights[pageKey];
    }

    /*
        ========================================================
        HIGHLIGHT COLOR
        ========================================================
    */

    function getHighlightColor() {
        const colorInput =
            getElement("highlightColor");

        if (
            colorInput &&
            colorInput.value
        ) {
            return colorInput.value;
        }

        try {
            const saved =
                localStorage.getItem(
                    "highlightColor"
                );

            if (
                saved &&
                /^#[0-9a-fA-F]{6}$/.test(saved)
            ) {
                return saved;
            }
        } catch (error) {
            /*
                Ignore localStorage errors.
            */
        }

        return DEFAULT_HIGHLIGHT_COLOR;
    }

    function updateHighlightColorDisplay() {
        const valueElement =
            getElement(
                "highlightColorValue"
            );

        const color =
            getHighlightColor();

        if (valueElement) {
            valueElement.textContent =
                color.toUpperCase();
        }

        document
            .querySelectorAll(
                ".textHighlight"
            )
            .forEach(function (highlight) {
                highlight.style.backgroundColor =
                    color;
            });
    }

    /*
        ========================================================
        CREATE BOOK CARDS
        ========================================================
    */

    function createBookCards() {
        const container =
            getElement("libraryBooks");

        if (!container) {
            console.error(
                "[Library] #libraryBooks was not found."
            );

            return;
        }

        container.innerHTML = "";

        bookOrder.forEach(function (bookId) {
            const book =
                books[bookId];

            if (!book) {
                return;
            }

            const card =
                createElement(
                    "button",
                    {
                        className:
                            "libraryBookCard",
                        type:
                            "button",
                        ariaLabel:
                            "Abrir livro de " +
                            book.title
                    }
                );

            card.dataset.book =
                bookId;

            const icon =
                createElement(
                    "div",
                    {
                        className:
                            "libraryBookIcon",
                        text:
                            book.icon
                    }
                );

            const title =
                createElement(
                    "div",
                    {
                        className:
                            "libraryBookTitle",
                        text:
                            book.title
                    }
                );

            const description =
                createElement(
                    "div",
                    {
                        className:
                            "libraryBookDescription",
                        text:
                            book.description
                    }
                );

            card.appendChild(icon);
            card.appendChild(title);
            card.appendChild(
                description
            );

            card.addEventListener(
                "click",
                function () {
                    openBook(bookId);
                }
            );

            container.appendChild(card);
        });
    }

    /*
        ========================================================
        OVERLAY
        ========================================================
    */

    function getOverlay() {
        const overlay =
            getElement(
                "libraryOverlay"
            );

        if (!overlay) {
            console.error(
                "[Library] #libraryOverlay was not found."
            );

            return null;
        }

        return overlay;
    }

    /*
        ========================================================
        PAGE CONTROLS
        ========================================================
    */

    function setupPageControls() {
        const overlay =
            getOverlay();

        if (!overlay) {
            return;
        }

        const rightPage =
            overlay.querySelector(
                ".bookRight"
            );

        if (!rightPage) {
            return;
        }

        if (
            getElement(
                "libraryPageControls"
            )
        ) {
            return;
        }

        const controls =
            createElement(
                "div",
                {
                    id:
                        "libraryPageControls"
                }
            );

        const previousButton =
            createElement(
                "button",
                {
                    id:
                        "libraryPrevious",
                    type:
                        "button",
                    text:
                        "← Anterior"
                }
            );

        const counter =
            createElement(
                "span",
                {
                    id:
                        "libraryPageCounter",
                    text:
                        "Página 1 de 1"
                }
            );

        const nextButton =
            createElement(
                "button",
                {
                    id:
                        "libraryNext",
                    type:
                        "button",
                    text:
                        "Próxima →"
                }
            );

        controls.appendChild(
            previousButton
        );

        controls.appendChild(
            counter
        );

        controls.appendChild(
            nextButton
        );

        rightPage.appendChild(
            controls
        );

        previousButton.addEventListener(
            "click",
            previousPage
        );

        nextButton.addEventListener(
            "click",
            nextPage
        );
    }

    /*
        ========================================================
        MOBILE / HIGHLIGHTER UI
        ========================================================
    */

    function addRuntimeStyles() {
        if (
            getElement(
                "libraryRuntimeStyles"
            )
        ) {
            return;
        }

        const style =
            document.createElement(
                "style"
            );

        style.id =
            "libraryRuntimeStyles";

        style.textContent = `
            #libraryPageControls {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                margin-top: 30px;
                padding-top: 18px;
                border-top: 1px solid rgba(80, 50, 30, 0.15);
            }

            #libraryPageControls button {
                border: none;
                border-radius: 10px;
                padding: 10px 14px;
                min-height: 44px;
                background: rgba(80, 50, 30, 0.09);
                color: inherit;
                font: inherit;
                font-weight: bold;
                cursor: pointer;
                touch-action: manipulation;
                transition:
                    background-color 0.2s ease,
                    transform 0.15s ease,
                    opacity 0.2s ease;
            }

            #libraryPageControls button:hover:not(:disabled) {
                background: rgba(80, 50, 30, 0.16);
                transform: translateY(-2px);
            }

            #libraryPageControls button:active:not(:disabled) {
                transform: translateY(1px);
            }

            #libraryPageControls button:disabled {
                opacity: 0.35;
                cursor: default;
            }

            #libraryPageCounter {
                font-weight: bold;
                opacity: 0.75;
                text-align: center;
                white-space: nowrap;
            }

            .libraryPageTitle {
                display: block;
                margin-bottom: 14px;
                font-size: 24px;
                font-weight: 800;
                line-height: 1.25;
            }

            .libraryPageText {
                display: block;
                white-space: pre-wrap;
                line-height: 1.8;
                font-size: 18px;
                user-select: text;
                -webkit-user-select: text;
                -webkit-touch-callout: default;
            }

            .textHighlight {
                background-color: #ffd54f;
                color: inherit;
                padding: 0 2px;
                border-radius: 3px;
                box-shadow: 0 1px 2px rgba(80, 60, 20, 0.15);
                transition: background-color 0.2s ease;
            }

            html.darkMode body .textHighlight {
                color: #ffffff;
            }

            #mobileHighlightButton {
                position: fixed;
                right: 18px;
                bottom: 18px;
                z-index: 6000;

                min-width: 52px;
                min-height: 52px;
                padding: 11px 15px;

                display: flex;
                align-items: center;
                justify-content: center;
                gap: 7px;

                border: none;
                border-radius: 999px;

                background: #e99b32;
                color: #ffffff;

                font: inherit;
                font-weight: 800;
                font-size: 14px;

                box-shadow:
                    0 8px 22px rgba(50, 30, 20, 0.22);

                cursor: pointer;
                touch-action: manipulation;

                opacity: 0;
                visibility: hidden;
                pointer-events: none;

                transform: translateY(12px) scale(0.92);

                transition:
                    opacity 0.2s ease,
                    transform 0.2s ease,
                    visibility 0s linear 0.2s;
            }

            #mobileHighlightButton.visible {
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
                transform: translateY(0) scale(1);

                transition:
                    opacity 0.2s ease,
                    transform 0.2s ease,
                    visibility 0s linear 0s;
            }

            #mobileHighlightButton:active {
                transform: scale(0.95);
            }

            html.darkMode body #mobileHighlightButton {
                background: #69569d;
            }

            @media (max-width: 600px) {
                #libraryPageControls {
                    flex-wrap: wrap;
                    justify-content: center;
                }

                #libraryPageCounter {
                    width: 100%;
                    order: -1;
                    margin-bottom: 2px;
                }

                #libraryPageControls button {
                    min-width: 120px;
                }

                #mobileHighlightButton {
                    right: 14px;
                    bottom: 14px;
                }

                .libraryPageText {
                    font-size: 17px;
                    line-height: 1.75;
                }
            }
        `;

        document.head.appendChild(
            style
        );
    }

    function createMobileHighlightButton() {
        if (
            getElement(
                "mobileHighlightButton"
            )
        ) {
            return;
        }

        const button =
            createElement(
                "button",
                {
                    id:
                        "mobileHighlightButton",
                    type:
                        "button",
                    ariaLabel:
                        "Destacar texto"
                }
            );

        button.textContent =
            "🖍️ Destacar";

        document.body.appendChild(
            button
        );

        /*
            pointerdown is intentional.

            On mobile browsers, using click can cause the
            text selection to disappear before the handler
            runs.
        */
        button.addEventListener(
            "pointerdown",
            function (event) {
                event.preventDefault();

                applyPendingHighlight();
            }
        );
    }

    function showMobileHighlightButton() {
        const button =
            getElement(
                "mobileHighlightButton"
            );

        if (!button) {
            return;
        }

        button.classList.add(
            "visible"
        );
    }

    function hideMobileHighlightButton() {
        const button =
            getElement(
                "mobileHighlightButton"
            );

        if (!button) {
            return;
        }

        button.classList.remove(
            "visible"
        );
    }

    /*
        ========================================================
        TEXT OFFSET HELPERS
        ========================================================
    */

    function getTextOffset(
        container,
        targetNode,
        targetOffset
    ) {
        const walker =
            document.createTreeWalker(
                container,
                NodeFilter.SHOW_TEXT
            );

        let total = 0;

        while (walker.nextNode()) {
            const node =
                walker.currentNode;

            if (
                node === targetNode
            ) {
                return (
                    total +
                    targetOffset
                );
            }

            total +=
                node.textContent.length;
        }

        return total;
    }

    function findNodeAtOffset(
        container,
        targetOffset
    ) {
        const walker =
            document.createTreeWalker(
                container,
                NodeFilter.SHOW_TEXT
            );

        let total = 0;

        while (walker.nextNode()) {
            const node =
                walker.currentNode;

            const length =
                node.textContent.length;

            if (
                targetOffset >= total &&
                targetOffset <=
                    total + length
            ) {
                return {
                    node: node,
                    offset:
                        targetOffset - total
                };
            }

            total += length;
        }

        return null;
    }

    function getSelectionInfo() {
        const selection =
            window.getSelection();

        if (!selection) {
            return null;
        }

        if (
            selection.rangeCount === 0
        ) {
            return null;
        }

        if (
            selection.isCollapsed
        ) {
            return null;
        }

        const range =
            selection.getRangeAt(0);

        const pageText =
            document.querySelector(
                ".libraryPageText"
            );

        if (!pageText) {
            return null;
        }

        const startContainer =
            range.startContainer;

        const endContainer =
            range.endContainer;

        if (
            !pageText.contains(
                startContainer
            ) ||
            !pageText.contains(
                endContainer
            )
        ) {
            return null;
        }

        let start =
            getTextOffset(
                pageText,
                startContainer,
                range.startOffset
            );

        let end =
            getTextOffset(
                pageText,
                endContainer,
                range.endOffset
            );

        if (start > end) {
            const swap =
                start;

            start = end;
            end = swap;
        }

        if (
            end <= start
        ) {
            return null;
        }

        return {
            start: start,
            end: end
        };
    }

    /*
        ========================================================
        APPLY SAVED HIGHLIGHTS
        ========================================================
    */

    function renderHighlightedText(
        container,
        text,
        highlights
    ) {
        container.innerHTML = "";

        if (
            !Array.isArray(highlights) ||
            highlights.length === 0
        ) {
            container.textContent =
                text;

            return;
        }

        const validHighlights =
            highlights
                .filter(function (item) {
                    return (
                        item &&
                        Number.isFinite(
                            item.start
                        ) &&
                        Number.isFinite(
                            item.end
                        ) &&
                        item.end >
                            item.start &&
                        item.start >= 0 &&
                        item.end <=
                            text.length
                    );
                })
                .map(function (item) {
                    return {
                        start:
                            Math.floor(
                                item.start
                            ),
                        end:
                            Math.floor(
                                item.end
                            )
                    };
                })
                .sort(function (a, b) {
                    return (
                        a.start - b.start
                    );
                });

        /*
            Remove overlaps so highlights
            never create broken nested spans.
        */
        const cleaned = [];

        validHighlights.forEach(
            function (item) {
                if (
                    cleaned.length === 0
                ) {
                    cleaned.push(item);
                    return;
                }

                const last =
                    cleaned[
                        cleaned.length - 1
                    ];

                if (
                    item.start >=
                    last.end
                ) {
                    cleaned.push(item);
                }
            }
        );

        let cursor = 0;

        cleaned.forEach(
            function (item) {
                if (
                    item.start >
                    cursor
                ) {
                    container.appendChild(
                        document.createTextNode(
                            text.slice(
                                cursor,
                                item.start
                            )
                        )
                    );
                }

                const highlight =
                    document.createElement(
                        "span"
                    );

                highlight.className =
                    "textHighlight";

                highlight.textContent =
                    text.slice(
                        item.start,
                        item.end
                    );

                highlight.style.backgroundColor =
                    getHighlightColor();

                /*
                    Tapping an existing highlight
                    will select it naturally, just
                    like normal text.
                */
                container.appendChild(
                    highlight
                );

                cursor =
                    item.end;
            }
        );

        if (
            cursor <
            text.length
        ) {
            container.appendChild(
                document.createTextNode(
                    text.slice(cursor)
                )
            );
        }
    }

    /*
        ========================================================
        ADD HIGHLIGHT
        ========================================================
    */

    function addHighlight(
        start,
        end
    ) {
        if (!currentBook) {
            return false;
        }

        const book =
            books[currentBook];

        if (!book) {
            return false;
        }

        const page =
            book.pages[
                currentPage
            ];

        if (!page) {
            return false;
        }

        if (
            !Number.isFinite(start) ||
            !Number.isFinite(end)
        ) {
            return false;
        }

        start =
            Math.max(
                0,
                Math.floor(start)
            );

        end =
            Math.min(
                page.text.length,
                Math.floor(end)
            );

        if (
            end <= start
        ) {
            return false;
        }

        const allHighlights =
            loadHighlights();

        const pageKey =
            getPageKey();

        if (
            !Array.isArray(
                allHighlights[pageKey]
            )
        ) {
            allHighlights[pageKey] = [];
        }

        const existing =
            allHighlights[pageKey];

        /*
            Do not create duplicate or
            completely contained highlights.
        */
        const alreadyExists =
            existing.some(
                function (item) {
                    return (
                        item &&
                        item.start ===
                            start &&
                        item.end ===
                            end
                    );
                }
            );

        if (alreadyExists) {
            return false;
        }

        /*
            Ignore highlights which are
            completely inside an existing one.
        */
        const insideExisting =
            existing.some(
                function (item) {
                    return (
                        item &&
                        item.start <= start &&
                        item.end >= end
                    );
                }
            );

        if (insideExisting) {
            return false;
        }

        /*
            Merge overlapping highlights.
        */
        let mergedStart =
            start;

        let mergedEnd =
            end;

        const remaining = [];

        existing.forEach(
            function (item) {
                if (
                    !item ||
                    !Number.isFinite(
                        item.start
                    ) ||
                    !Number.isFinite(
                        item.end
                    )
                ) {
                    return;
                }

                const overlaps =
                    item.end >=
                        mergedStart &&
                    item.start <=
                        mergedEnd;

                if (overlaps) {
                    mergedStart =
                        Math.min(
                            mergedStart,
                            item.start
                        );

                    mergedEnd =
                        Math.max(
                            mergedEnd,
                            item.end
                        );
                } else {
                    remaining.push(
                        item
                    );
                }
            }
        );

        remaining.push({
            start:
                mergedStart,
            end:
                mergedEnd
        });

        remaining.sort(
            function (a, b) {
                return (
                    a.start - b.start
                );
            }
        );

        allHighlights[pageKey] =
            remaining;

        saveHighlights(
            allHighlights
        );

        updateBook();

        return true;
    }

    /*
        ========================================================
        APPLY PENDING MOBILE HIGHLIGHT
        ========================================================
    */

    function applyPendingHighlight() {
        if (!pendingSelection) {
            hideMobileHighlightButton();

            return;
        }

        const selection =
            pendingSelection;

        pendingSelection = null;

        hideMobileHighlightButton();

        addHighlight(
            selection.start,
            selection.end
        );

        const browserSelection =
            window.getSelection();

        if (
            browserSelection
        ) {
            browserSelection.removeAllRanges();
        }
    }

    /*
        ========================================================
        SELECTION HANDLING
        ========================================================
    */

    function processSelection() {
        if (!currentBook) {
            return;
        }

        const info =
            getSelectionInfo();

        if (!info) {
            return;
        }

        pendingSelection =
            info;

        showMobileHighlightButton();

        /*
            Keep the selection alive long enough
            for the mobile button to be tapped.
        */
        if (selectionTimer) {
            clearTimeout(
                selectionTimer
            );
        }

        selectionTimer =
            setTimeout(
                function () {
                    const selection =
                        window.getSelection();

                    if (
                        !selection ||
                        selection.isCollapsed
                    ) {
                        pendingSelection = null;

                        hideMobileHighlightButton();
                    }
                },
                5000
            );
    }

    function setupSelectionHandling() {
        /*
            Desktop and mobile browsers
            both fire selectionchange.
        */
        document.addEventListener(
            "selectionchange",
            function () {
                processSelection();
            }
        );

        /*
            Mobile browsers can update their
            selection after touchend.
        */
        document.addEventListener(
            "touchend",
            function () {
                setTimeout(
                    processSelection,
                    50
                );
            },
            {
                passive: true
            }
        );

        /*
            Also handle mouseup on desktop.
        */
        document.addEventListener(
            "mouseup",
            function () {
                setTimeout(
                    processSelection,
                    0
                );
            }
        );
    }

    /*
        ========================================================
        H KEY
        ========================================================
    */

    function setupHighlightKey() {
        if (
            window.__libraryHighlightKeyConnected
        ) {
            return;
        }

        window.__libraryHighlightKeyConnected =
            true;

        document.addEventListener(
            "keydown",
            function (event) {
                if (!currentBook) {
                    return;
                }

                /*
                    H or h.
                */
                if (
                    event.key !== "h" &&
                    event.key !== "H"
                ) {
                    return;
                }

                /*
                    Don't trigger while typing
                    in an input or textarea.
                */
                const active =
                    document.activeElement;

                if (
                    active &&
                    (
                        active.tagName ===
                            "INPUT" ||
                        active.tagName ===
                            "TEXTAREA" ||
                        active.isContentEditable
                    )
                ) {
                    return;
                }

                const info =
                    getSelectionInfo();

                if (!info) {
                    return;
                }

                event.preventDefault();

                pendingSelection =
                    info;

                addHighlight(
                    info.start,
                    info.end
                );

                const selection =
                    window.getSelection();

                if (selection) {
                    selection.removeAllRanges();
                }

                pendingSelection = null;

                hideMobileHighlightButton();
            }
        );
    }

    /*
        ========================================================
        UPDATE BOOK
        ========================================================
    */

    function updateBook() {
        if (!currentBook) {
            return;
        }

        const book =
            books[currentBook];

        if (!book) {
            return;
        }

        if (
            !Array.isArray(
                book.pages
            ) ||
            book.pages.length === 0
        ) {
            return;
        }

        if (currentPage < 0) {
            currentPage = 0;
        }

        if (
            currentPage >=
            book.pages.length
        ) {
            currentPage =
                book.pages.length - 1;
        }

        const page =
            book.pages[
                currentPage
            ];

        const icon =
            getElement(
                "libraryIcon"
            );

        const title =
            getElement(
                "libraryTitle"
            );

        const content =
            getElement(
                "libraryContent"
            );

        const counter =
            getElement(
                "libraryPageCounter"
            );

        const previousButton =
            getElement(
                "libraryPrevious"
            );

        const nextButton =
            getElement(
                "libraryNext"
            );

        if (icon) {
            icon.textContent =
                book.icon;
        }

        if (title) {
            title.textContent =
                book.title;
        }

        if (content) {
            content.innerHTML = "";

            const pageTitle =
                createElement(
                    "span",
                    {
                        className:
                            "libraryPageTitle",
                        text:
                            page.title
                    }
                );

            const pageText =
                createElement(
                    "span",
                    {
                        className:
                            "libraryPageText"
                    }
                );

            renderHighlightedText(
                pageText,
                page.text,
                getCurrentPageHighlights()
            );

            content.appendChild(
                pageTitle
            );

            content.appendChild(
                pageText
            );
        }

        if (counter) {
            counter.textContent =
                "Página " +
                (currentPage + 1) +
                " de " +
                book.pages.length;
        }

        if (previousButton) {
            previousButton.disabled =
                currentPage === 0;
        }

        if (nextButton) {
            nextButton.disabled =
                currentPage ===
                book.pages.length - 1;
        }

        updateHighlightColorDisplay();

        pendingSelection = null;

        hideMobileHighlightButton();
    }

    /*
        ========================================================
        OPEN
        ========================================================
    */

    function openBook(bookId) {
        if (!books[bookId]) {
            console.error(
                "[Library] Unknown book:",
                bookId
            );

            return;
        }

        const overlay =
            getOverlay();

        if (!overlay) {
            return;
        }

        const bookElement =
            overlay.querySelector(
                ".libraryBook"
            );

        if (!bookElement) {
            return;
        }

        currentBook =
            bookId;

        currentPage = 0;

        updateBook();

        overlay.classList.add(
            "open"
        );

        bookElement.classList.remove(
            "opening"
        );

        void bookElement.offsetWidth;

        bookElement.classList.add(
            "opening"
        );

        bodyOverflowBeforeLibrary =
            document.body.style.overflow;

        document.body.style.overflow =
            "hidden";

        hideMobileHighlightButton();

        setTimeout(
            function () {
                const closeButton =
                    getElement(
                        "closeLibrary"
                    );

                if (
                    closeButton &&
                    overlay.classList.contains(
                        "open"
                    )
                ) {
                    closeButton.focus();
                }
            },
            50
        );
    }

    /*
        ========================================================
        CLOSE
        ========================================================
    */

    function closeBook() {
        const overlay =
            getOverlay();

        if (!overlay) {
            return;
        }

        overlay.classList.remove(
            "open"
        );

        const bookElement =
            overlay.querySelector(
                ".libraryBook"
            );

        if (bookElement) {
            bookElement.classList.remove(
                "opening"
            );
        }

        currentBook = null;
        currentPage = 0;
        pendingSelection = null;

        hideMobileHighlightButton();

        document.body.style.overflow =
            bodyOverflowBeforeLibrary;

        const selection =
            window.getSelection();

        if (selection) {
            selection.removeAllRanges();
        }
    }

    /*
        ========================================================
        NEXT PAGE
        ========================================================
    */

    function nextPage() {
        if (!currentBook) {
            return;
        }

        const book =
            books[currentBook];

        if (!book) {
            return;
        }

        if (
            currentPage <
            book.pages.length - 1
        ) {
            currentPage += 1;

            updateBook();
        }
    }

    /*
        ========================================================
        PREVIOUS PAGE
        ========================================================
    */

    function previousPage() {
        if (!currentBook) {
            return;
        }

        if (
            currentPage > 0
        ) {
            currentPage -= 1;

            updateBook();
        }
    }

    /*
        ========================================================
        CLOSE BUTTON
        ========================================================
    */

    function setupCloseButton() {
        const closeButton =
            getElement(
                "closeLibrary"
            );

        if (!closeButton) {
            return;
        }

        if (
            closeButton.dataset
                .libraryConnected ===
            "true"
        ) {
            return;
        }

        closeButton.dataset
            .libraryConnected =
            "true";

        closeButton.addEventListener(
            "click",
            closeBook
        );
    }

    /*
        ========================================================
        CLICK OUTSIDE
        ========================================================
    */

    function setupOverlayClick() {
        const overlay =
            getOverlay();

        if (!overlay) {
            return;
        }

        if (
            overlay.dataset
                .libraryBackdropConnected ===
            "true"
        ) {
            return;
        }

        overlay.dataset
            .libraryBackdropConnected =
            "true";

        overlay.addEventListener(
            "click",
            function (event) {
                if (
                    event.target ===
                    overlay
                ) {
                    closeBook();
                }
            }
        );
    }

    /*
        ========================================================
        KEYBOARD
        ========================================================
    */

    function setupKeyboard() {
        if (
            window.__libraryKeyboardConnected
        ) {
            return;
        }

        window.__libraryKeyboardConnected =
            true;

        document.addEventListener(
            "keydown",
            function (event) {
                const overlay =
                    getOverlay();

                if (!overlay) {
                    return;
                }

                if (
                    !overlay.classList.contains(
                        "open"
                    )
                ) {
                    return;
                }

                /*
                    H is handled separately by
                    setupHighlightKey().
                */
                if (
                    event.key === "h" ||
                    event.key === "H"
                ) {
                    return;
                }

                const active =
                    document.activeElement;

                const isTyping =
                    active &&
                    (
                        active.tagName ===
                            "INPUT" ||
                        active.tagName ===
                            "TEXTAREA" ||
                        active.isContentEditable
                    );

                if (isTyping) {
                    return;
                }

                if (
                    event.key ===
                    "Escape"
                ) {
                    event.preventDefault();

                    closeBook();

                    return;
                }

                if (
                    event.key ===
                    "ArrowRight"
                ) {
                    event.preventDefault();

                    nextPage();

                    return;
                }

                if (
                    event.key ===
                    "ArrowLeft"
                ) {
                    event.preventDefault();

                    previousPage();
                }
            }
        );
    }

    /*
        ========================================================
        HIGHLIGHT COLOR SETTING
        ========================================================
    */

    function setupHighlightColor() {
        const input =
            getElement(
                "highlightColor"
            );

        if (!input) {
            return;
        }

        if (
            input.dataset
                .libraryColorConnected ===
            "true"
        ) {
            updateHighlightColorDisplay();

            return;
        }

        input.dataset
            .libraryColorConnected =
            "true";

        input.addEventListener(
            "input",
            function () {
                try {
                    localStorage.setItem(
                        "highlightColor",
                        input.value
                    );
                } catch (error) {
                    /*
                        Ignore storage problems.
                    */
                }

                updateHighlightColorDisplay();
            }
        );

        input.addEventListener(
            "change",
            function () {
                try {
                    localStorage.setItem(
                        "highlightColor",
                        input.value
                    );
                } catch (error) {
                    /*
                        Ignore storage problems.
                    */
                }

                updateHighlightColorDisplay();
            }
        );

        /*
            Load the saved color into
            the existing settings control.
        */
        try {
            const saved =
                localStorage.getItem(
                    "highlightColor"
                );

            if (
                saved &&
                /^#[0-9a-fA-F]{6}$/.test(saved)
            ) {
                input.value =
                    saved;
            }
        } catch (error) {
            /*
                Ignore storage problems.
            */
        }

        updateHighlightColorDisplay();
    }

    /*
        ========================================================
        STORAGE LISTENER
        ========================================================
    */

    function setupStorageListener() {
        window.addEventListener(
            "storage",
            function (event) {
                if (
                    event.key ===
                    "highlightColor"
                ) {
                    updateHighlightColorDisplay();
                }

                if (
                    event.key ===
                    HIGHLIGHTS_STORAGE_KEY
                ) {
                    if (currentBook) {
                        updateBook();
                    }
                }
            }
        );
    }

    /*
        ========================================================
        START
        ========================================================
    */

    function startLibrary() {
        addRuntimeStyles();

        createMobileHighlightButton();

        createBookCards();

        setupPageControls();

        setupCloseButton();

        setupOverlayClick();

        setupKeyboard();

        setupHighlightKey();

        setupSelectionHandling();

        setupHighlightColor();

        setupStorageListener();

        console.log(
            "[Library] Ready with highlighter."
        );
    }

    /*
        ========================================================
        START WHEN DOM IS READY
        ========================================================
    */

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            startLibrary,
            {
                once: true
            }
        );
    } else {
        startLibrary();
    }
})();