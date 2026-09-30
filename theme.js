(function () {

    const DARK_MODE_KEY = "darkMode";

    const STAR_COUNT = 70;


    // ==================================================
    // CREATE BACKGROUND EFFECTS
    // ==================================================

    function createBackgroundEffects() {

        // ----------------------------------------------
        // SUN RAYS
        // ----------------------------------------------

        let sunRays =
            document.querySelector(".sunRays");

        if (!sunRays) {

            sunRays =
                document.createElement("div");

            sunRays.className =
                "sunRays";

            document.body.prepend(
                sunRays
            );
        }


        // ----------------------------------------------
        // STARS
        // ----------------------------------------------

        let stars =
            document.querySelector(".stars");

        if (!stars) {

            stars =
                document.createElement("div");

            stars.className =
                "stars";

            document.body.prepend(
                stars
            );
        }


        // Don't create the stars again.
        if (
            stars.querySelector(".star")
        ) {
            return;
        }


        for (
            let i = 0;
            i < STAR_COUNT;
            i++
        ) {

            const star =
                document.createElement(
                    "div"
                );

            star.className =
                "star";


            const size =
                Math.random() * 3 + 1;


            star.style.width =
                `${size}px`;

            star.style.height =
                `${size}px`;


            star.style.left =
                `${Math.random() * 100}%`;

            star.style.top =
                `${Math.random() * 100}%`;


            star.style.opacity =
                `${0.35 + Math.random() * 0.65}`;


            star.style.animationDelay =
                `${Math.random() * 4}s`;


            star.style.animationDuration =
                `${2.5 + Math.random() * 3}s`;


            stars.appendChild(
                star
            );
        }
    }


    // ==================================================
    // READ THE CURRENT THEME
    // ==================================================

    function isDarkMode() {

        return localStorage.getItem(
            DARK_MODE_KEY
        ) === "true";
    }


    // ==================================================
    // APPLY THEME
    // ==================================================

    function applyDarkMode(
        enabled,
        save = true
    ) {

        const html =
            document.documentElement;


        /*
         * IMPORTANT:
         *
         * We intentionally do NOT disable
         * transitions here.
         *
         * The CSS is responsible for the
         * smooth:
         *
         * Sun Rays -> Stars
         *
         * animation.
         */

        html.classList.toggle(
            "darkMode",
            enabled
        );


        if (save) {

            localStorage.setItem(
                DARK_MODE_KEY,
                enabled
                    ? "true"
                    : "false"
            );
        }


        document.dispatchEvent(
            new CustomEvent(
                "themeChanged",
                {
                    detail: {
                        darkMode:
                            enabled
                    }
                }
            )
        );
    }


    // ==================================================
    // TOGGLE
    // ==================================================

    function toggleDarkMode() {

        applyDarkMode(
            !isDarkMode(),
            true
        );
    }


    // ==================================================
    // UPDATE SETTINGS BUTTON
    // ==================================================

    function updateToggleButton() {

        const button =
            document.getElementById(
                "darkModeToggle"
            );

        if (!button) {
            return;
        }


        const dark =
            isDarkMode();


        button.classList.toggle(
            "active",
            dark
        );


        button.setAttribute(
            "aria-pressed",
            dark
                ? "true"
                : "false"
        );


        button.textContent =
            dark
                ? "☀️ Claro"
                : "🌙 Escuro";
    }


    // ==================================================
    // INITIALIZE
    // ==================================================

    function initialize() {

        createBackgroundEffects();


        /*
         * The anti-flash script in the <head>
         * already applied the saved class.
         *
         * We simply make sure everything is
         * synchronized.
         */

        applyDarkMode(
            isDarkMode(),
            false
        );


        updateToggleButton();


        document.addEventListener(
            "themeChanged",
            updateToggleButton
        );


        const button =
            document.getElementById(
                "darkModeToggle"
            );


        if (button) {

            button.addEventListener(
                "click",
                toggleDarkMode
            );
        }
    }


    // ==================================================
    // START
    // ==================================================

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


    window.toggleDarkMode =
        toggleDarkMode;

})();