(function () {

    const DARK_MODE_KEY =
        "darkMode";

    const NAME_KEY =
        "username";

    const LANGUAGE_KEY =
        "siteLanguage";

    const HIGHLIGHT_KEY =
        "highlightColor";


    // ==================================================
    // ELEMENT HELPERS
    // ==================================================

    function makeElement(
        tag,
        className,
        text = ""
    ) {

        const element =
            document.createElement(tag);

        if (className) {
            element.className =
                className;
        }

        if (text) {
            element.textContent =
                text;
        }

        return element;
    }


    // ==================================================
    // SETTINGS BUTTON
    // ==================================================

    function getSettingsButton() {

        let button =
            document.getElementById(
                "settingsButton"
            );

        if (button) {
            return button;
        }


        button =
            makeElement(
                "button",
                "settingsButton"
            );

        button.id =
            "settingsButton";

        button.type =
            "button";

        button.innerHTML =
            '<span id="settingsIcon">⚙</span>';

        document.body.appendChild(
            button
        );

        return button;
    }


    // ==================================================
    // SETTINGS MENU
    // ==================================================

    function getSettingsMenu() {

        let menu =
            document.getElementById(
                "settingsMenu"
            );

        if (menu) {
            return menu;
        }


        menu =
            makeElement(
                "div",
                "settingsMenu"
            );

        menu.id =
            "settingsMenu";

        document.body.appendChild(
            menu
        );


        menu.innerHTML = `
            <div class="settingsHeader">
                <h2>Configurações</h2>

                <button
                    type="button"
                    class="closeSettings"
                    id="closeSettings"
                    aria-label="Fechar configurações"
                >
                    ×
                </button>
            </div>


            <div class="settingsSection">

                <div class="settingRow">

                    <div>
                        <strong>Modo escuro</strong>

                        <span class="settingDescription">
                            Altere a aparência do site.
                        </span>
                    </div>

                    <button
                        type="button"
                        id="darkModeToggle"
                        class="toggleButton"
                        aria-pressed="false"
                    >
                        🌙 Escuro
                    </button>

                </div>

            </div>


            <div class="settingsSection">

                <label for="usernameInput">
                    Seu nome
                </label>

                <input
                    id="usernameInput"
                    type="text"
                    maxlength="30"
                    autocomplete="off"
                    placeholder="Digite seu nome"
                >

                <button
                    type="button"
                    id="saveUsername"
                    class="settingsAction"
                >
                    Salvar Nome
                </button>

                <p
                    id="nameChangeMessage"
                    aria-live="polite"
                ></p>

            </div>


            <div class="settingsSection">

                <label for="highlightColor">
                    Cor do marca-texto
                </label>

                <div class="highlightColorRow">

                    <input
                        id="highlightColor"
                        type="color"
                        value="#ffd56e"
                    >

                    <span id="highlightColorValue">
                        #FFD56E
                    </span>

                </div>

            </div>


            <div class="settingsSection">

                <label for="languageSelect">
                    Idioma
                </label>

                <select
                    id="languageSelect"
                    class="languageSelect"
                >
                    <option value="en">
                        English
                    </option>

                    <option value="pt-BR">
                        Português (Brasil)
                    </option>
                </select>

            </div>
        `;


        return menu;
    }


    // ==================================================
    // DARK MODE
    // ==================================================

    function syncDarkModeButton() {

        const button =
            document.getElementById(
                "darkModeToggle"
            );

        if (!button) {
            return;
        }


        const dark =
            localStorage.getItem(
                DARK_MODE_KEY
            ) === "true";


        button.classList.toggle(
            "active",
            dark
        );


        button.textContent =
            dark
                ? "☀️ Claro"
                : "🌙 Escuro";


        button.setAttribute(
            "aria-pressed",
            dark
                ? "true"
                : "false"
        );
    }


    function toggleDarkMode() {

        const enabled =
            localStorage.getItem(
                DARK_MODE_KEY
            ) !== "true";


        if (
            typeof window.toggleDarkMode ===
            "function"
        ) {

            window.toggleDarkMode();

        } else {

            document.documentElement
                .classList.toggle(
                    "darkMode",
                    enabled
                );

            localStorage.setItem(
                DARK_MODE_KEY,
                enabled
                    ? "true"
                    : "false"
            );
        }


        syncDarkModeButton();
    }


    // ==================================================
    // NAME
    // ==================================================

    function loadName() {

        const input =
            document.getElementById(
                "usernameInput"
            );

        if (!input) {
            return;
        }


        input.value =
            localStorage.getItem(
                NAME_KEY
            ) || "";
    }


    function saveName() {

        const input =
            document.getElementById(
                "usernameInput"
            );

        const message =
            document.getElementById(
                "nameChangeMessage"
            );


        if (!input) {
            return;
        }


        const name =
            input.value
                .trim()
                .slice(0, 30);


        if (!name) {

            localStorage.removeItem(
                NAME_KEY
            );

            if (message) {

                message.textContent =
                    "Nome removido.";
            }

        } else {

            localStorage.setItem(
                NAME_KEY,
                name
            );

            if (message) {

                message.textContent =
                    "Nome salvo!";
            }
        }


        document.dispatchEvent(
            new CustomEvent(
                "usernameChanged",
                {
                    detail: {
                        username: name
                    }
                }
            )
        );


        setTimeout(
            () => {

                if (message) {
                    message.textContent =
                        "";
                }

            },
            1800
        );
    }


    // ==================================================
    // HIGHLIGHTER
    // ==================================================

    function loadHighlightColor() {

        const input =
            document.getElementById(
                "highlightColor"
            );

        const valueElement =
            document.getElementById(
                "highlightColorValue"
            );


        if (!input) {
            return;
        }


        const saved =
            localStorage.getItem(
                HIGHLIGHT_KEY
            ) || "#FFD56E";


        input.value =
            saved;


        if (valueElement) {

            valueElement.textContent =
                saved.toUpperCase();
        }


        document.documentElement.style
            .setProperty(
                "--user-highlight-color",
                saved
            );
    }


    function saveHighlightColor(
        color
    ) {

        localStorage.setItem(
            HIGHLIGHT_KEY,
            color
        );


        document.documentElement.style
            .setProperty(
                "--user-highlight-color",
                color
            );


        const valueElement =
            document.getElementById(
                "highlightColorValue"
            );


        if (valueElement) {

            valueElement.textContent =
                color.toUpperCase();
        }
    }


    // ==================================================
    // LANGUAGE
    // ==================================================

    function loadLanguage() {

        const select =
            document.getElementById(
                "languageSelect"
            );

        if (!select) {
            return;
        }


        select.value =
            localStorage.getItem(
                LANGUAGE_KEY
            ) || "en";
    }


    function changeLanguage(
        language
    ) {

        localStorage.setItem(
            LANGUAGE_KEY,
            language
        );


        document.dispatchEvent(
            new CustomEvent(
                "languageChanged",
                {
                    detail: {
                        language
                    }
                }
            )
        );
    }


    // ==================================================
    // OPEN / CLOSE
    // ==================================================

    function openSettings() {

        const button =
            getSettingsButton();

        const menu =
            getSettingsMenu();


        menu.classList.add(
            "open"
        );

        button.classList.add(
            "open"
        );

        document.documentElement
            .classList.add(
                "settingsOpen"
            );

        document.body.classList.add(
            "settings-open"
        );
    }


    function closeSettings() {

        const button =
            getSettingsButton();

        const menu =
            getSettingsMenu();


        menu.classList.remove(
            "open"
        );

        button.classList.remove(
            "open"
        );

        document.documentElement
            .classList.remove(
                "settingsOpen"
            );

        document.body.classList.remove(
            "settings-open"
        );
    }


    function toggleSettings() {

        const menu =
            getSettingsMenu();

        if (
            menu.classList.contains(
                "open"
            )
        ) {

            closeSettings();

        } else {

            openSettings();
        }
    }


    // ==================================================
    // INITIALIZE
    // ==================================================

    function initialize() {

        const button =
            getSettingsButton();

        const menu =
            getSettingsMenu();


        button.addEventListener(
            "click",
            toggleSettings
        );


        const closeButton =
            document.getElementById(
                "closeSettings"
            );

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeSettings
            );
        }


        document.addEventListener(
            "pointerdown",
            event => {

                if (
                    !menu.classList.contains(
                        "open"
                    )
                ) {
                    return;
                }


                if (
                    menu.contains(
                        event.target
                    )
                ) {
                    return;
                }


                if (
                    button.contains(
                        event.target
                    )
                ) {
                    return;
                }


                closeSettings();
            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeSettings();
                }
            }
        );


        const darkModeButton =
            document.getElementById(
                "darkModeToggle"
            );

        if (darkModeButton) {

            darkModeButton.addEventListener(
                "click",
                toggleDarkMode
            );
        }


        const saveUsername =
            document.getElementById(
                "saveUsername"
            );

        if (saveUsername) {

            saveUsername.addEventListener(
                "click",
                saveName
            );
        }


        const usernameInput =
            document.getElementById(
                "usernameInput"
            );

        if (usernameInput) {

            usernameInput.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        saveName();
                    }
                }
            );
        }


        const colorInput =
            document.getElementById(
                "highlightColor"
            );

        if (colorInput) {

            colorInput.addEventListener(
                "input",
                () => {

                    saveHighlightColor(
                        colorInput.value
                    );
                }
            );
        }


        const languageSelect =
            document.getElementById(
                "languageSelect"
            );

        if (languageSelect) {

            languageSelect.addEventListener(
                "change",
                () => {

                    changeLanguage(
                        languageSelect.value
                    );
                }
            );
        }


        document.addEventListener(
            "themeChanged",
            syncDarkModeButton
        );


        loadName();
        loadHighlightColor();
        loadLanguage();
        syncDarkModeButton();
    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );

    } else {

        initialize();
    }

})();