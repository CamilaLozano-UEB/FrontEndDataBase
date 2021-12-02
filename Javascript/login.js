$(function (){
    if (!rutas.enabled) {
        return;
    }
    const url = rutas.usuario;

    $("#logButton").click(function () {
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

    function redirect(username, password, response) {
        if (response != "cliente" && response != "veterinario" && response != "admin") {
            alert(response);
            location.reload();

        } else {
            localStorage.setItem("username", btoa(username))
            localStorage.setItem("password", btoa(password))
            localStorage.setItem("rol", btoa(response))
            window.location.href = response + ".html"
        }
    }
});
