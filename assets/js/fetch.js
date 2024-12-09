// function getCookie(name) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//     }
//     return null;
// }

// function fetchData() {
//     let returnValue = [];

//     fetch("URL", {
//         method: "GET",
//         headers: {
//             'Authorization': 'Bearer ' + getCookie('jwtToken')
//         }
//     }).then(response => response.json())
//     .then(data => {
//         if (data.data !== undefined) {
//             if (Array.isArray(data.data)) {
//                 returnValue = data.data;
//             } else {
//                 console.warn("response.data is not an array. Converting to an array.");
//                 returnValue = [data.data];
//             }
//         }
//         console.log(returnValue);
//     }).catch(error => {
//         console.error('Error:', error);
//     });

//     return returnValue;
// }

// function saveData(data) {
//     fetch("URL", {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + getCookie('jwtToken')
//         },
//         body: JSON.stringify(data)
//     }).then(response => {
//         if (response.ok) {
//             console.log('Data saved successfully');
//         } else {
//             console.error('Error saving data');
//         }
//     }).catch(error => {
//         console.error('Network error:', error);
//     });
// }

function fetchData() {
    let returnValue = [];

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url+"/getAll", false);
    xhr.send();

    let response = JSON.parse(xhr.responseText);

    if (response !== undefined) {
        if (Array.isArray(response)) {
            returnValue = response;
        } else {
            console.warn("response.data is not an array. Converting to an array.");
            returnValue = [response];
        }
    }

    return returnValue;
}

function saveData(data) {
<<<<<<< Updated upstream

    fetch(url+"/MassUpdate", {
=======
    // Daten in den LocalStorage speichern
    // localStorage.setItem("hardwareData", JSON.stringify(data));
    
    // Schickt ein Request an den Server mit den Daten 
    fetch("http://praktikum.diaburo.de/api/test/save", { // Immer asynchrone Anfrage
        // Verwendet die Fetch API, um eine HTTP-Anfrage an die angegebene URL zu senden.
        // In diesem Fall wird eine POST-Anfrage an "http://praktikum.diaburo.de/api/test/save" gesendet.
    
        method: "POST",
        // Legt die HTTP-Methode für die Anfrage fest. Hier ist die Methode "POST",
        // was bedeutet, dass Daten zum Server gesendet werden sollen.
>>>>>>> Stashed changes
    
        method: "Put",

        headers: {

            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    
        body: JSON.stringify(data)

    });   
};
