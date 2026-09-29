function createStars() {

    if (document.querySelector(".stars")) {
        return;
    }


    const starsContainer =
        document.createElement("div");

    starsContainer.className =
        "stars";


    for (let i = 0; i < 80; i++) {

        const star =
            document.createElement("div");

        star.className =
            "star";


        star.style.left =
            Math.random() * 100 + "%";


        star.style.top =
            Math.random() * 100 + "%";


        const size =
            Math.random() * 3 + 1;


        star.style.width =
            size + "px";


        star.style.height =
            size + "px";


        star.style.opacity =
            Math.random() * 0.7 + 0.3;


        starsContainer.appendChild(
            star
        );
    }


    document.body.appendChild(
        starsContainer
    );
}


function createSunRays() {

    if (
        document.querySelector(".sunRays")
    ) {
        return;
    }


    const sunRays =
        document.createElement("div");

    sunRays.className =
        "sunRays";


    document.body.appendChild(
        sunRays
    );
}


function setTheme(dark) {

    if (dark) {

        document.documentElement.classList.add(
            "darkMode"
        );

        document.body.classList.add(
            "darkMode"
        );

        localStorage.setItem(
            "darkMode",
            "true"
        );

    } else {

        document.documentElement.classList.remove(
            "darkMode"
        );

        document.body.classList.remove(
            "darkMode"
        );

        localStorage.setItem(
            "darkMode",
            "false"
        );
    }
}


function isDarkMode() {

    return document.documentElement.classList.contains(
        "darkMode"
    );
}


createStars();
createSunRays();


const savedTheme =
    localStorage.getItem("darkMode");


setTheme(
    savedTheme === "true"
);