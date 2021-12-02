$(function () {

    validarUsuario();

    if (!rutas.enabled) {
        return;
    }
    const especie_url = rutas.especie;

    $("#especieButton").click(function () {
        var nombreEspecie = $("#nombreEspecie").val();
        if (nombreEspecie === "" || nombreEspecie.length > 30) {
            alert("El nombre de la categoria no puede ser superior a los 30 caracteres!");
            return;
        }

        var especie = {
            "cod_especie": null,
            "descripcion": nombreEspecie,
            "est_especie": "A",
        }
        $.ajax({
            url: especie_url,
            type: "POST",
            data: JSON.stringify(especie),
            dataType: "json",
            success: function (data) {
                if ("se ha registrado correctamente" === data) {
                    alert(data);
                    $("#nombreEspecie").val("");
                } else {
                    alert(data);
                    location.reload();
                }
            },
            error: function (err) {
                alert("Ha acurrido un error al registrarse");
            }
        });
    });

    function validarUsuario() {
        var username = atob(localStorage.getItem("username"));
        var password = atob(localStorage.getItem("password"));
        let headers = new Headers();

        headers.append('Content-Type', 'text/json');
        headers.append('Authorization', "Basic " + btoa(username + ":" + password));

        fetch(rutas.usuario, {
            method: 'GET',
            headers: headers,
        })
            .then(response => response.text())
            .then(response => validarRol(response.toString().replaceAll("\"", "")));
    }

    function validarRol(rol) {
        if (rol !== "veterinario") {
            alert("Este usuario no tiene permisos de veterinario!")
            window.location.href = "index.html"
        }
    }
});