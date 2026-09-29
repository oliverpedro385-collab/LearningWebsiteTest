const USERNAME_KEY =
    "studentUsername";


function getUsername() {

    return localStorage.getItem(
        USERNAME_KEY
    );
}


function setUsername(username) {

    localStorage.setItem(
        USERNAME_KEY,
        username
    );
}


function hasUsername() {

    return !!getUsername();
}


function removeUsername() {

    localStorage.removeItem(
        USERNAME_KEY
    );
}