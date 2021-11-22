/**
 * this function find the user and the password in the headers to autorize it
 */
$("#logButton").click(function () {
    let url = 'http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/userApp';
    let username = $("#user").val();
    let password = $("#password").val();

    let headers = new Headers();

    headers.append('Content-Type', 'text/json');
    headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

    fetch(url, {
        method: 'GET',
        headers: headers,
    })
        .then(response => response.text())
        .then(response => redirect(response.toString()));

});

/**
 * This function take the role of the login, validates it and if its correct redirects to the tab corresponding to the user
 * @param role user's role
 */
function redirect(role) {
    if (role != "owner" && role != "vet" && role != "official") {
        alert("Contraseña o usuario erroneos. Intente de nuevo");
        location.reload();

    } else {
        var rolhref = role + ".html";
        if (role === "owner")
            role = "owners";
        let url = 'http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/' + role;

        let username = document.getElementById("user").value;
        let password = document.getElementById("password").value;
        let headers = new Headers();

        headers.append('Content-Type', 'text/json');
        headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

        fetch(url, {
            method: 'GET',
            headers: headers,
        }).then(response => response.ok).then(window.location.href = rolhref + "?" + username);
    }
}