(function () {
    "use strict";

    const USERNAME_KEY = "learningWebsiteUsername";

    /*
        ========================================================
        GET USERNAME
        ========================================================
    */

    function getUsername() {
        try {
            const username =
                localStorage.getItem(
                    USERNAME_KEY
                );

            if (
                typeof username !== "string"
            ) {
                return "";
            }

            return username.trim();
        } catch (error) {
            console.warn(
                "[User] Could not read username.",
                error
            );

            return "";
        }
    }

    /*
        ========================================================
        SET USERNAME
        ========================================================
    */

    function setUsername(username) {
        if (
            typeof username !== "string"
        ) {
            return false;
        }

        const cleaned =
            username.trim();

        if (
            cleaned.length === 0
        ) {
            return false;
        }

        /*
            Keep the name within the same
            20-character limit as the input.
        */
        const finalName =
            cleaned.slice(0, 20);

        try {
            localStorage.setItem(
                USERNAME_KEY,
                finalName
            );

            /*
                Tell any page components
                that the username changed.
            */
            window.dispatchEvent(
                new CustomEvent(
                    "usernameChanged",
                    {
                        detail: {
                            username:
                                finalName
                        }
                    }
                )
            );

            return true;
        } catch (error) {
            console.error(
                "[User] Could not save username.",
                error
            );

            return false;
        }
    }

    /*
        ========================================================
        CLEAR USERNAME
        ========================================================
    */

    function clearUsername() {
        try {
            localStorage.removeItem(
                USERNAME_KEY
            );

            window.dispatchEvent(
                new CustomEvent(
                    "usernameChanged",
                    {
                        detail: {
                            username: ""
                        }
                    }
                )
            );

            return true;
        } catch (error) {
            console.error(
                "[User] Could not clear username.",
                error
            );

            return false;
        }
    }

    /*
        ========================================================
        MAKE FUNCTIONS AVAILABLE
        ========================================================
    */

    window.getUsername =
        getUsername;

    window.setUsername =
        setUsername;

    window.clearUsername =
        clearUsername;

    /*
        ========================================================
        DEBUG
        ========================================================
    */

    console.log(
        "[User] Username system ready."
    );
})();