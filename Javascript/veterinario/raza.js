$(function () {

    if (!rutas.enabled) {
        return;
    }
    const esp_url = rutas.especie;
    const raza_url = rutas.raza;
    $("#raza-tab").click(function () {
        fetch(esp_url, {
            method: 'GET',
        }).then(response => response.json()).then(response => llenarSelect(response));
    });

    function llenarSelect(especies) {
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

    $("#butRegistroRaza").click(function () {
        var raza = $("#raza").val();
        $("#raza").val("");
        if (raza.length === 0) {
            alert("Es necesario llenar el campo")
            return;
        }

        var raza_data = {
            "cod_raza": null,
            "descripcion": raza,
            "cod_especie": $('#selectEsp').val(),
            "est_raza": "A"
        }

        fetch(raza_url, {
            method: 'POST',
            body: JSON.stringify(raza_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(response => alert(response));
    });

});
