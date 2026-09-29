const libraryBooks = [

    {
        id: "math",
        titleKey: "math",
        icon: "📐",
        descriptionKey: "learnMath",
        content:
            "Write your mathematics notes here."
    },


    {
        id: "english",
        titleKey: "english",
        icon: "📖",
        descriptionKey: "learnEnglish",
        content:
            "Write your English notes here."
    },


    {
        id: "science",
        titleKey: "science",
        icon: "🔬",
        descriptionKey: "learnScience",
        content:
            "Write your science notes here."
    },


    {
        id: "history",
        titleKey: "history",
        icon: "🏛️",
        descriptionKey: "learnHistory",
        content:
            "Write your history notes here."
    }

];


const libraryContainer =
    document.getElementById(
        "libraryBooks"
    );


const libraryOverlay =
    document.getElementById(
        "libraryOverlay"
    );


const libraryBook =
    document.getElementById(
        "libraryBook"
    );


const libraryTitle =
    document.getElementById(
        "libraryTitle"
    );


const libraryIcon =
    document.getElementById(
        "libraryIcon"
    );


const libraryContent =
    document.getElementById(
        "libraryContent"
    );


const closeLibrary =
    document.getElementById(
        "closeLibrary"
    );


let currentBook = null;


/* ========================================
   CREATE BOOKS
   ======================================== */

function createLibraryBooks() {

    libraryContainer.innerHTML =
        "";


    libraryBooks.forEach(
        function(book) {

            const bookElement =
                document.createElement(
                    "button"
                );


            bookElement.className =
                "libraryBookCard";


            bookElement.innerHTML = `

                <span
                    class="libraryBookIcon"
                >
                    ${book.icon}
                </span>


                <span
                    class="libraryBookTitle"
                >
                    ${t(book.titleKey)}
                </span>


                <span
                    class="libraryBookDescription"
                >
                    ${t(book.descriptionKey)}
                </span>

            `;


            bookElement.addEventListener(
                "click",
                function() {

                    openBook(book);
                }
            );


            libraryContainer.appendChild(
                bookElement
            );
        }
    );
}


createLibraryBooks();


document.addEventListener(
    "languageChanged",
    function() {

        createLibraryBooks();
    }
);


/* ========================================
   LOAD BOOK CONTENT
   ======================================== */

function loadBookContent(book) {

    const savedContent =
        localStorage.getItem(
            "libraryHighlights_"
            + book.id
        );


    libraryContent.innerHTML =
        "";


    if (savedContent) {

        libraryContent.innerHTML =
            savedContent;

    } else {

        libraryContent.textContent =
            book.content;
    }
}


/* ========================================
   SAVE HIGHLIGHTS
   ======================================== */

function saveBookHighlights() {

    if (!currentBook) {
        return;
    }


    localStorage.setItem(
        "libraryHighlights_"
        + currentBook.id,

        libraryContent.innerHTML
    );
}


/* ========================================
   OPEN BOOK
   ======================================== */

function openBook(book) {

    currentBook =
        book;


    libraryTitle.textContent =
        t(book.titleKey);


    libraryIcon.textContent =
        book.icon;


    loadBookContent(
        book
    );


    libraryOverlay.classList.add(
        "open"
    );


    libraryBook.classList.remove(
        "opening"
    );


    void libraryBook.offsetWidth;


    libraryBook.classList.add(
        "opening"
    );
}


/* ========================================
   CLOSE BOOK
   ======================================== */

function closeBook() {

    saveBookHighlights();


    libraryOverlay.classList.remove(
        "open"
    );
}


closeLibrary.addEventListener(
    "click",
    closeBook
);


libraryOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            libraryOverlay
        ) {

            closeBook();
        }
    }
);


/* ========================================
   REMOVE HIGHLIGHT
   ======================================== */

function removeHighlight(mark) {

    const parent =
        mark.parentNode;


    while (
        mark.firstChild
    ) {

        parent.insertBefore(
            mark.firstChild,
            mark
        );
    }


    parent.removeChild(
        mark
    );


    parent.normalize();
}


/* ========================================
   CHECK FOR EXISTING HIGHLIGHT
   ======================================== */

function getSelectedHighlight(
    selection
) {

    let node =
        selection.anchorNode;


    if (
        node &&
        node.nodeType ===
            Node.TEXT_NODE
    ) {

        node =
            node.parentElement;
    }


    if (
        node &&
        node.closest
    ) {

        const highlight =
            node.closest(
                ".textHighlight"
            );


        if (
            highlight &&
            libraryContent.contains(
                highlight
            )
        ) {

            return highlight;
        }
    }


    node =
        selection.focusNode;


    if (
        node &&
        node.nodeType ===
            Node.TEXT_NODE
    ) {

        node =
            node.parentElement;
    }


    if (
        node &&
        node.closest
    ) {

        const highlight =
            node.closest(
                ".textHighlight"
            );


        if (
            highlight &&
            libraryContent.contains(
                highlight
            )
        ) {

            return highlight;
        }
    }


    return null;
}


/* ========================================
   HIGHLIGHT SELECTION
   ======================================== */

function highlightSelection(
    selection
) {

    if (
        !selection ||
        selection.isCollapsed ||
        selection.rangeCount === 0
    ) {

        return;
    }


    const range =
        selection.getRangeAt(0);


    if (
        !libraryContent.contains(
            range.commonAncestorContainer
        )
    ) {

        return;
    }


    const selectedHighlight =
        getSelectedHighlight(
            selection
        );


    if (
        selectedHighlight
    ) {

        removeHighlight(
            selectedHighlight
        );


        saveBookHighlights();


        selection.removeAllRanges();


        return;
    }


    const highlight =
        document.createElement(
            "mark"
        );


    highlight.className =
        "textHighlight";


    const savedColor =
        localStorage.getItem(
            "highlightColor"
        );


    highlight.style.backgroundColor =
        savedColor
        || "#ffe066";


    try {

        const contents =
            range.extractContents();


        highlight.appendChild(
            contents
        );


        range.insertNode(
            highlight
        );


        saveBookHighlights();


        selection.removeAllRanges();

    } catch (error) {

        console.log(
            "Could not highlight this selection."
        );
    }
}


/* ========================================
   KEYBOARD
   ======================================== */

document.addEventListener(
    "keydown",
    function(event) {


        if (
            event.key === "Escape" &&
            libraryOverlay.classList.contains(
                "open"
            )
        ) {

            closeBook();

            return;
        }


        if (
            event.key.toLowerCase() === "h" &&
            libraryOverlay.classList.contains(
                "open"
            )
        ) {


            const activeElement =
                document.activeElement;


            if (
                activeElement &&
                (
                    activeElement.tagName ===
                        "INPUT"

                    ||

                    activeElement.tagName ===
                        "TEXTAREA"
                )
            ) {

                return;
            }


            const selection =
                window.getSelection();


            highlightSelection(
                selection
            );
        }

    }
);