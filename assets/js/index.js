// document.addEventListener("DOMContentLoaded", function() {
//     var loginForm = document.getElementById("loginForm");
//     var errorMessage = document.getElementById("errorMessage");

//     loginForm.addEventListener("submit", function(event) {
//         event.preventDefault();
        
//         var username = document.getElementById("username").value;
//         var password = document.getElementById("password").value;

//         login(username, password);
//     });

//     function login(username, password) {
//         fetch("URL", {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username: username, password: password })
//         }).then(response => response.json())
//         .then(data => {
//             if (data.token) {
//                 setCookie('jwtToken', data.token, 8);
//                 window.location.href = "overview.html";
//             } else {
//                 errorMessage.textContent = "Invalid username or password.";
//             }
//         }).catch(error => {
//             console.error('Error:', error);
//         });
//     }

//     function setCookie(name, value, hours) {
//         var d = new Date();
//         d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
//         var expires = "expires=" + d.toUTCString();
//         document.cookie = name + "=" + value + ";" + expires + ";path=/";
//     }
// });

document.addEventListener("DOMContentLoaded", function() {
<<<<<<< Updated upstream
    var loginForm = document.getElementById("loginForm");
    var errorMessage = document.getElementById("errorMessage");
=======

    var authToken = localStorage.getItem("authToken");
    if (!authToken) {
        window.location.href = "login.html";
    }
    
    var devicesTable = document.getElementById("devicesTable").getElementsByTagName('tbody')[0];
    var searchInput = document.getElementById("searchInput"); 
    var deviceDetails = document.getElementById("deviceDetails");
    var deviceNameElem = document.getElementById("deviceName");
    var detailList = document.getElementById("detailList");
>>>>>>> Stashed changes

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        var token = mockLogin(username, password);
        if (token) {
            localStorage.setItem("authToken", token);
            window.location.href = "overview.html";
        } else {
            errorMessage.textContent = "Invalid username or password.";
        };
    });

    function mockLogin(username, password) {

        if (username === "admin" && password === "adminpass") {
            return "mock-admin-token";
        } else if (username === "user" && password === "userpass") {
            return "mock-user-token";
        };
        return null;
    };
});
