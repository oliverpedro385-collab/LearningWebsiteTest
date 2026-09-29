const settingsButton =
    document.getElementById(
        "settingsButton"
    );


if (settingsButton) {

    const settingsMenu =
        document.createElement(
            "div"
        );


    settingsMenu.className =
        "settingsMenu";


    settingsMenu.innerHTML = `

        <div class="settingsHeader">

            <h2 data-i18n="settings">
                Settings
            </h2>

            <button
                class="closeSettings"
                id="closeSettings"
            >
                ×
            </button>

        </div>


        <div class="settingsSection">

            <div class="settingRow">

                <div>

                    <strong data-i18n="darkMode">
                        Dark Mode
                    </strong>

                    <span
                        class="settingDescription"
                        data-i18n="darkModeDescription"
                    >
                        Change between day and night
                    </span>

                </div>

                <button
                    id="darkModeToggle"
                    class="toggleButton"
                >
                    OFF
                </button>

            </div>

        </div>


        <div class="settingsSection">

            <label
                for="newName"
                data-i18n="yourName"
            >
                Your Name
            </label>

            <input
                type="text"
                id="newName"
                data-i18n-placeholder="enterYourName"
                placeholder="Enter your name"
                maxlength="20"
            >

            <button
                id="changeNameButton"
                class="settingsAction"
                data-i18n="changeName"
            >
                Change Name
            </button>

            <p id="nameChangeMessage"></p>

        </div>


        <div class="settingsSection">

            <label
                for="highlightColor"
                data-i18n="highlighterColor"
            >
                Highlighter Color
            </label>

            <div class="highlightColorRow">

                <input
                    type="color"
                    id="highlightColor"
                    value="#ffe066"
                >

                <span id="highlightColorValue">
                    #FFE066
                </span>

            </div>

            <p
                class="settingDescription"
                data-i18n="highlighterDescription"
            >
                Choose the color used for new highlights.
            </p>

        </div>


        <div class="settingsSection">

            <label
                for="languageSelect"
                data-i18n="language"
            >
                Language
            </label>

            <select
                id="languageSelect"
                class="languageSelect"
            >

                <option
                    value="en"
                    data-i18n="englishLanguage"
                >
                    English
                </option>

                <option
                    value="pt-BR"
                    data-i18n="portugueseBrazil"
                >
                    Português (Brasil)
                </option>

            </select>

        </div>

    `;


    document.body.appendChild(
        settingsMenu
    );


    const closeSettings =
        document.getElementById(
            "closeSettings"
        );


    const darkModeToggle =
        document.getElementById(
            "darkModeToggle"
        );


    const newName =
        document.getElementById(
            "newName"
        );


    const changeNameButton =
        document.getElementById(
            "changeNameButton"
        );


    const nameChangeMessage =
        document.getElementById(
            "nameChangeMessage"
        );


    const highlightColor =
        document.getElementById(
            "highlightColor"
        );


    const highlightColorValue =
        document.getElementById(
            "highlightColorValue"
        );


    const languageSelect =
        document.getElementById(
            "languageSelect"
        );


    function updateDarkModeButton() {

        if (isDarkMode()) {

            darkModeToggle.textContent =
                t("on");

            darkModeToggle.classList.add(
                "active"
            );

        } else {

            darkModeToggle.textContent =
                t("off");

            darkModeToggle.classList.remove(
                "active"
            );
        }
    }


    function updateNameDisplay(
        name
    ) {

        const studentName =
            document.getElementById(
                "studentName"
            );


        if (studentName) {

            studentName.textContent =
                name;
        }
    }


    function updateCurrentName() {

        const currentName =
            getUsername();

        newName.value =
            currentName || "";
    }


    function updateHighlightColor() {

        const savedColor =
            localStorage.getItem(
                "highlightColor"
            );


        highlightColor.value =
            savedColor || "#ffe066";


        highlightColorValue.textContent =
            (
                savedColor ||
                "#ffe066"
            ).toUpperCase();
    }


    function updateLanguageSelect() {

        languageSelect.value =
            getLanguage();
    }


    function openSettings() {

        settingsMenu.classList.add(
            "open"
        );

        settingsButton.classList.add(
            "open"
        );

        updateCurrentName();

        updateDarkModeButton();

        updateHighlightColor();

        updateLanguageSelect();
    }


    function closeMenu() {

        settingsMenu.classList.remove(
            "open"
        );

        settingsButton.classList.remove(
            "open"
        );
    }


    settingsButton.addEventListener(
        "click",
        function() {

            const isOpen =
                settingsMenu.classList.contains(
                    "open"
                );


            if (isOpen) {

                closeMenu();

            } else {

                openSettings();
            }
        }
    );


    closeSettings.addEventListener(
        "click",
        function() {

            closeMenu();
        }
    );


    darkModeToggle.addEventListener(
        "click",
        function() {

            setTheme(
                !isDarkMode()
            );

            updateDarkModeButton();
        }
    );


    changeNameButton.addEventListener(
        "click",
        function() {

            const name =
                newName.value.trim();


            if (name === "") {

                nameChangeMessage.textContent =
                    t("pleaseEnterName");

                nameChangeMessage.style.color =
                    "red";

                return;
            }


            setUsername(name);

            updateNameDisplay(
                name
            );


            nameChangeMessage.textContent =
                t("nameChanged");

            nameChangeMessage.style.color =
                "green";
        }
    );


    highlightColor.addEventListener(
        "input",
        function() {

            const color =
                highlightColor.value;


            localStorage.setItem(
                "highlightColor",
                color
            );


            highlightColorValue.textContent =
                color.toUpperCase();
        }
    );


    languageSelect.addEventListener(
        "change",
        function() {

            setLanguage(
                languageSelect.value
            );

            updateDarkModeButton();

            updateLanguageSelect();
        }
    );


    document.addEventListener(
        "languageChanged",
        function() {

            updateDarkModeButton();

            updateLanguageSelect();

            updateCurrentName();
        }
    );


    updateDarkModeButton();

    updateHighlightColor();

    updateLanguageSelect();

    applyLanguage();
}