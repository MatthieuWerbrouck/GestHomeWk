function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function updateCurrentUserDisplay() {
    var currentUser = getCookie('currentUser');
    var currentUserDisplay = document.getElementById('currentUser');
    var logoutBtn = document.getElementById('logoutBtn');
    if (currentUser) {
        currentUserDisplay.textContent = `Connecté en tant que : ${currentUser}`;
        logoutBtn.style.display = 'inline-block';
    } else {
        currentUserDisplay.textContent = 'Non connecté';
        logoutBtn.style.display = 'none';
    }
}

var modal = document.getElementById("signupModal");
var loginModal = document.getElementById("loginModal");
var span = document.getElementsByClassName("close");
var openModalBtn = document.getElementById("openModalBtn");
var openLoginModalBtn = document.getElementById("openLoginModalBtn");
var logoutBtn = document.getElementById("logoutBtn");
var menuBtn = document.getElementById("menuBtn");
var sideMenu = document.getElementById("sideMenu");
var closeMenuBtn = document.getElementById("closeMenuBtn");

openModalBtn.onclick = function() {
    modal.style.display = "block";
}

openLoginModalBtn.onclick = function() {
    loginModal.style.display = "block";
}

logoutBtn.onclick = function() {
    eraseCookie('currentUser');
    updateCurrentUserDisplay();
    alert('Déconnexion réussie');
}

menuBtn.onclick = function() {
    sideMenu.style.width = "250px";
}

closeMenuBtn.onclick = function() {
    sideMenu.style.width = "0";
}

for (var i = 0; i < span.length; i++) {
    span[i].onclick = function() {
        modal.style.display = "none";
        loginModal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}

document.getElementById('signupForm').onsubmit = function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var users = JSON.parse(getCookie('users') || '[]');
    users.push({ username, email, password });
    setCookie('users', JSON.stringify(users), 7);

    alert('User registered successfully');
    modal.style.display = "none";
}

document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();

    var loginUsername = document.getElementById('loginUsername').value;
    var loginPassword = document.getElementById('loginPassword').value;

    var users = JSON.parse(getCookie('users') || '[]');
    var user = users.find(user => user.username === loginUsername && user.password === loginPassword);

    if (user) {
        setCookie('currentUser', loginUsername, 7);
        updateCurrentUserDisplay();
        alert('Login successful');
        loginModal.style.display = "none";
    } else {
        alert('Invalid username or password');
    }
}

// Mettre à jour l'affichage de l'utilisateur connecté au chargement de la page
updateCurrentUserDisplay();