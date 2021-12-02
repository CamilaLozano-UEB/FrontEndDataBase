$(function () {
    validarUsuario();

    if (!rutas.enabled) {
        return;
    }
    const esp_url = rutas.especie;
    const raza_url = rutas.raza;
    const color_url = rutas.color;
    const mascota_url = rutas.mascotas;

    fetch(esp_url, {
        method: 'GET',
    }).then(response => response.json()).then(response => llenarSelectEspecies(response));

    function llenarSelectEspecies(especies) {
        var select = document.getElementById("selectEsp");

        if (especies === "No existen especies") {
            alert("No hay registros de especies!")
            let option = document.createElement("option");
            option.text = especies;
            select.add(option);
            return;
        }
        for (let i = 0; i < especies.length; i++) {
            var option = document.createElement("option");
            option.text = especies[i]['descripcion'];
            option.value = especies[i]['cod_especie']
            select.add(option);
        }
    }

    $("#selectEsp").click(function () {
        let url = new URL(raza_url)
        url.searchParams.append('cod_especie', $("#selectEsp").val().toString());
        fetch(url.toString(), {
            method: 'GET',
        }).then(response => response.json()).then(response => llenarSelectRazas(response));
    })

    function llenarSelectRazas(razas) {
        var select = document.getElementById("selectRaza");

        if (razas === "No existen razas") {
            alert("No hay registros de razas!")
            let option = document.createElement("option");
            option.text = razas;
            select.add(option);
            return;
        }
        for (let i = 0; i < razas.length; i++) {
            var option = document.createElement("option");
            option.text = razas[i]['descripcion'];
            option.value = razas[i]['cod_raza']
            select.add(option);
        }
    }


    fetch(color_url, {
        method: 'GET',
    }).then(response => response.json()).then(response => llenarSelectColor(response));

    function llenarSelectColor(colores) {
        var select = document.getElementById("selectColor");

        if (colores === "No existen colores") {
            alert("No hay registros de colores!")
            let option = document.createElement("option");
            option.text = colores;
            select.add(option);
            return;
        }
        for (let i = 0; i < colores.length; i++) {
            var option = document.createElement("option");
            option.text = colores[i]['descripcion'];
            option.value = colores[i]['cod_color']
            select.add(option);
        }
    }


    $("#Cpets").click(function () {
        var nombre = $("#nombreMascota").val();
        var cod_raza = $("#selectRaza").val();
        var peso = $("#mPeso").val();
        var fec_nacimiento = $("#mFecha").val();
        var currentYear = new Date().getFullYear();
        var edad = currentYear - (new Date(fec_nacimiento).getFullYear());
        var cod_color = $("#selectColor").val();

        if (nombre.length === 0 || edad.length === 0 || peso.length === 0 || fec_nacimiento.length === 0
            || cod_color.length === 0) {
            alert("Es necesario llenar los campos");
            return;
        }
        if (isNaN(Number(edad)) || isNaN(Number(peso))) {
            alert("Solo ingrese números en los campos de numéricos!");
            return;
        }

        if (parseInt(edad) < 0 || parseInt(edad) > 30 || parseInt(peso) < 0 || parseInt(peso) > 100) {
            alert("Los campo numéricos están en kilogramos");
            return;
        }

        if (nombre.length > 30) {
            alert("El nombre tiene una longitud máxima de 30 caracteres");
            return;
        }
        var mascota_data = {
            "cod_mascota": null,
            "cod_usuario": atob(localStorage.getItem("username")),
            "nombre": nombre,
            "cod_raza": cod_raza,
            "edad": edad,
            "peso": parseInt(peso),
            "fec_nacimiento": fec_nacimiento,
            "cod_color": cod_color,
            "est_mascota": "A"
        }

        fetch(mascota_url, {
            method: 'POST',
            body: JSON.stringify(mascota_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(response => alert(response));
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
        if (rol !== "cliente") {
            alert("Este usuario no tiene permisos de cliente!")
            window.location.href = "index.html"
        }
    }

});
