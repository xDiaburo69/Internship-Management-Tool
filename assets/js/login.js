document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");
    var errorMessage = document.getElementById("errorMessage");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        var token = mockLogin(username, password);
        if (token) {
            localStorage.setItem("authToken", token);
            window.location.href = "/index.html";
        } else {
            errorMessage.textContent = "Invalid username or password.";
        }
    });

    function mockLogin(username, password) {
        if (username === "admin" && password === "adminpass") {
            return "mock-admin-token";
        } else if (username === "user" && password === "userpass") {
            return "mock-user-token";
        }
        return null;
    }
});
