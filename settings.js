(function () {
    "use strict";

    const DARK_MODE_KEY = "darkMode";
    const LANGUAGE_KEY = "siteLanguage";
    const HIGHLIGHT_KEY = "highlightColor";

    // ==================================================
    // ELEMENT HELPERS
    // ==================================================

    function makeElement(tag, className, text = "") {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text) {
            element.textContent = text;
        }

        return element;
    }

    // ==================================================
    // SETTINGS BUTTON
    // ==================================================

    function getSettingsButton() {
        let button = document.getElementById("settingsButton");

        if (button) {
            return button;
        }

        button = makeElement("button", "settingsButton");
        button.id = "settingsButton";
        button.type = "button";
        button.setAttribute("aria-label", "Abrir configurações");

        button.innerHTML = '<span id="settingsIcon">⚙</span>';

        document.body.appendChild(button);

        return button;
    }

    // ==================================================
    // SETTINGS MENU
    // ==================================================

    function getSettingsMenu() {
        let menu = document.getElementById("settingsMenu");

        if (menu) {
            return menu;
        }

        menu = makeElement("div", "settingsMenu");
        menu.id = "settingsMenu";

        document.body.appendChild(menu);

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
                <label for="settingsUsernameInput">
                    Seu nome
                </label>

                <input
                    id="settingsUsernameInput"
                    type="text"
                    maxlength="20"
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
        const button = document.getElementById("darkModeToggle");

        if (!button) {
            return;
        }

        const dark =
            localStorage.getItem(DARK_MODE_KEY) === "true";

        button.classList.toggle("active", dark);

        button.textContent = dark
            ? "☀️ Claro"
            : "🌙 Escuro";

        button.setAttribute(
            "aria-pressed",
            dark ? "true" : "false"
        );
    }

    function toggleDarkMode() {
        const enabled =
            localStorage.getItem(DARK_MODE_KEY) !== "true";

        if (typeof window.toggleDarkMode === "function") {
            window.toggleDarkMode();
        } else {
            document.documentElement.classList.toggle(
                "darkMode",
                enabled
            );

            localStorage.setItem(
                DARK_MODE_KEY,
                enabled ? "true" : "false"
            );

            document.dispatchEvent(
                new CustomEvent("themeChanged", {
                    detail: {
                        darkMode: enabled
                    }
                })
            );
        }

        syncDarkModeButton();
    }

    // ==================================================
    // NAME
    // ==================================================

    function loadName() {
        const input =
            document.getElementById("settingsUsernameInput");

        if (!input) {
            return;
        }

        let username = "";

        if (typeof window.getUsername === "function") {
            username = window.getUsername();
        } else {
            try {
                username =
                    localStorage.getItem(
                        "learningWebsiteUsername"
                    ) || "";
            } catch (error) {
                console.warn(
                    "[Settings] Could not read username.",
                    error
                );
            }
        }

        input.value = username;
    }

    function saveName() {
        const input =
            document.getElementById("settingsUsernameInput");

        const message =
            document.getElementById("nameChangeMessage");

        if (!input) {
            return;
        }

        const name = input.value.trim().slice(0, 20);

        if (!name) {
            if (message) {
                message.textContent =
                    "Digite um nome primeiro.";
            }

            return;
        }

        let saved = false;

        if (typeof window.setUsername === "function") {
            saved = window.setUsername(name);
        } else {
            try {
                localStorage.setItem(
                    "learningWebsiteUsername",
                    name
                );

                saved = true;

                window.dispatchEvent(
                    new CustomEvent("usernameChanged", {
                        detail: {
                            username: name
                        }
                    })
                );
            } catch (error) {
                console.error(
                    "[Settings] Could not save username.",
                    error
                );
            }
        }

        if (!saved) {
            if (message) {
                message.textContent =
                    "Não foi possível salvar o nome.";
            }

            return;
        }

        input.value = name;

        if (message) {
            message.textContent = "Nome salvo!";
        }

        // Make sure anything using the old event system updates too.
        document.dispatchEvent(
            new CustomEvent("usernameChanged", {
                detail: {
                    username: name
                }
            })
        );

        window.dispatchEvent(
            new CustomEvent("usernameChanged", {
                detail: {
                    username: name
                }
            })
        );

        setTimeout(function () {
            if (message) {
                message.textContent = "";
            }
        }, 1800);
    }

    // ==================================================
    // HIGHLIGHTER
    // ==================================================

    function loadHighlightColor() {
        const input =
            document.getElementById("highlightColor");

        const valueElement =
            document.getElementById("highlightColorValue");

        if (!input) {
            return;
        }

        let saved =
            localStorage.getItem(HIGHLIGHT_KEY) ||
            "#FFD56E";

        if (!/^#[0-9A-Fa-f]{6}$/.test(saved)) {
            saved = "#FFD56E";
        }

        input.value = saved;

        if (valueElement) {
            valueElement.textContent =
                saved.toUpperCase();
        }

        document.documentElement.style.setProperty(
            "--user-highlight-color",
            saved
        );
    }

    function saveHighlightColor(color) {
        if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
            return;
        }

        localStorage.setItem(
            HIGHLIGHT_KEY,
            color
        );

        document.documentElement.style.setProperty(
            "--user-highlight-color",
            color
        );

        const valueElement =
            document.getElementById("highlightColorValue");

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
            document.getElementById("languageSelect");

        if (!select) {
            return;
        }

        const saved =
            localStorage.getItem(
                LANGUAGE_KEY
            ) || "en";

        select.value = saved;
    }

    function changeLanguage(language) {
        if (
            language !== "en" &&
            language !== "pt-BR"
        ) {
            language = "en";
        }

        localStorage.setItem(
            LANGUAGE_KEY,
            language
        );

        document.dispatchEvent(
            new CustomEvent("languageChanged", {
                detail: {
                    language: language
                }
            })
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

        loadName();
        loadHighlightColor();
        loadLanguage();
        syncDarkModeButton();

        menu.classList.add("open");
        button.classList.add("open");

        document.documentElement.classList.add(
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

        menu.classList.remove("open");
        button.classList.remove("open");

        document.documentElement.classList.remove(
            "settingsOpen"
        );

        document.body.classList.remove(
            "settings-open"
        );
    }

    function toggleSettings() {
        const menu =
            getSettingsMenu();

        if (menu.classList.contains("open")) {
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

        // Prevent duplicate initialization.
        if (button.dataset.settingsInitialized === "true") {
            return;
        }

        button.dataset.settingsInitialized = "true";

        button.addEventListener(
            "click",
            toggleSettings
        );

        const closeButton =
            document.getElementById("closeSettings");

        if (closeButton) {
            closeButton.addEventListener(
                "click",
                closeSettings
            );
        }

        document.addEventListener(
            "pointerdown",
            function (event) {
                if (!menu.classList.contains("open")) {
                    return;
                }

                if (menu.contains(event.target)) {
                    return;
                }

                if (button.contains(event.target)) {
                    return;
                }

                closeSettings();
            }
        );

        document.addEventListener(
            "keydown",
            function (event) {
                if (event.key === "Escape") {
                    closeSettings();
                }
            }
        );

        const darkModeButton =
            document.getElementById("darkModeToggle");

        if (darkModeButton) {
            darkModeButton.addEventListener(
                "click",
                toggleDarkMode
            );
        }

        const saveUsernameButton =
            document.getElementById("saveUsername");

        if (saveUsernameButton) {
            saveUsernameButton.addEventListener(
                "click",
                saveName
            );
        }

        const usernameInput =
            document.getElementById(
                "settingsUsernameInput"
            );

        if (usernameInput) {
            usernameInput.addEventListener(
                "keydown",
                function (event) {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        saveName();
                    }
                }
            );

            usernameInput.addEventListener(
                "input",
                function () {
                    const message =
                        document.getElementById(
                            "nameChangeMessage"
                        );

                    if (message) {
                        message.textContent = "";
                    }
                }
            );
        }

        const colorInput =
            document.getElementById("highlightColor");

        if (colorInput) {
            colorInput.addEventListener(
                "input",
                function () {
                    saveHighlightColor(
                        colorInput.value
                    );
                }
            );
        }

        const languageSelect =
            document.getElementById("languageSelect");

        if (languageSelect) {
            languageSelect.addEventListener(
                "change",
                function () {
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

        // Keep settings synchronized if the main username
        // system changes the name elsewhere.
        window.addEventListener(
            "usernameChanged",
            function (event) {
                const input =
                    document.getElementById(
                        "settingsUsernameInput"
                    );

                if (!input) {
                    return;
                }

                const username =
                    event.detail &&
                    typeof event.detail.username === "string"
                        ? event.detail.username
                        : "";

                input.value = username;
            }
        );

        loadName();
        loadHighlightColor();
        loadLanguage();
        syncDarkModeButton();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            { once: true }
        );
    } else {
        initialize();
    }
})();