/**
 * this function find the user and the password in the headers to autorize it
 */
$("#logButton").click(function () {
    let url = 'http://127.0.0.1:8000/usuarios';
    let username = $("#user").val();
    var password = $("#password").val();
    var encryptedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    let headers = new Headers();

    headers.append('Content-Type', 'text/json');
    headers.append('Authorization', "Basic " + btoa(username + ":" + encryptedPassword));

    fetch(url, {
        method: 'GET',
        headers: headers,
    })
        .then(response => response.text())
        .then(response => redirect(username, encryptedPassword, response.toString().replaceAll("\"", "")));

});

/**
 * This function take the role of the login, validates it and if its correct redirects to the tab corresponding to the user
 * @param username
 * @param password
 * @param response user's role
 */
function redirect(username, password, response) {
    if (response != "cliente" && response != "veterinario" && response != "admin") {
        alert(response);
        location.reload();

    } else {

        localStorage.setItem("username", btoa(username))
        localStorage.setItem("password", btoa(password))
        localStorage.setItem("rol", btoa(response))
        window.location.href = response + ".html"
        /*var rolhref = response + ".html";

        let url = 'http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/' + response;

        let username = document.getElementById("user").value;
        let password = document.getElementById("password").value;
        let headers = new Headers();

        headers.append('Content-Type', 'text/json');
        headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

        fetch(url, {
            method: 'GET',
            headers: headers,
        }).then(response => response.ok).then(window.location.href = rolhref + "?" + username);*/
    }
}