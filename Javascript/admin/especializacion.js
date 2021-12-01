$(function () {

    if (!rutas.enabled) {
        return;
    }
    const esp_url = rutas.especializacion;
    const vet_url = rutas.veterinaria;

    $("#espButton").click(function () {
        var nombreEsp = $("#nombreEsp").val();
        if (nombreEsp === "" || nombreEsp.length > 60) {
            alert("El nombre de la especialización no puede ser superior a los 60 caracteres!");
            return;
        }

        var especializacion = {
            "cod_esp": null,
            "descripcion": nombreEsp,
            "est_especializacion": "A",
        }
        $.ajax({
            url: esp_url,
            type: "POST",
            data: JSON.stringify(especializacion),
            dataType: "json",
            success: function (data) {
                if ("se ha registrado correctamente" === data) {
                    alert(data);
                    borrarCampos();
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

    function borrarCampos() {
        $("#nombreEsp").val("");
    }

    function llenarTablaEspecializaciones(listaEspecializaciones) {

        if (listaEspecializaciones === "No existen especializaciones") {
            alert("No hay registros de especializaciones!")
            return;
        }
        let table = document.getElementById("especializacionTable");
        if (document.getElementById("tBodyEsp") !== null) {
            $('#especializacionTable').DataTable().destroy();
            table.removeChild(document.getElementById("tBodyEsp"));
        }
        let tBody = document.createElement("tbody");
        let username = $("#vetUsername").val();
        $("#vetUsername").val("")
        tBody.id = "tBodyEsp";

        for (let i = 0; i < listaEspecializaciones.length; i++) {
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.textContent = listaEspecializaciones[i]['descripcion'];
            tr.appendChild(td);

            var deleteTd = document.createElement("td");
            var deleteButton = document.createElement("a");
            tr.className = listaEspecializaciones[i]['cod_esp'];
            deleteButton.className = listaEspecializaciones[i]['cod_esp'];
            deleteButtonConfiguration(deleteButton, username);
            deleteTd.appendChild(deleteButton);
            tr.appendChild(deleteTd);
            tBody.appendChild(tr);

        }
        table.appendChild(tBody);
        $('#especializacionTable').DataTable({"aaSorting": []});
    }

    function deleteButtonConfiguration(button, username) {
        button.type = "button";
        button.textContent = "Eliminar";

        let delUrl = new URL(vet_url + "/" + username)
        delUrl.searchParams.append('cod_esp', button.className);
        button.onclick = function () {
            fetch(delUrl.toString(), {
                method: 'DELETE'
            }).then(response => response.json()).then(response => reloadEspecializacionVet(response));
        }
    }

    function reloadEspecializacionVet(response) {
        if (response === "Se ha removido correctamente la especialización") {
            alert(response + ", vuelva a realizar la busqueda para ver los cambios");
            return;
        }
        alert(response)
    }

    /**
     * Get the pets of the rest in the backend
     */
    $("#butEspVet").click(function () {
        var vetUsername = $("#vetUsername").val();
        if (vetUsername.length === 0) {
            alert("Es necesario llenar el campo")
            return;
        }
        var url = vet_url + "/" + vetUsername
        fetch(url, {
            method: 'GET',
        }).then(response => response.json()).then(response => llenarTablaEspecializaciones(response));
    })

    $("#esp-tab").click(function () {
        fetch(esp_url, {
            method: 'GET',
        }).then(response => response.json()).then(response => llenarSelect(response));
    });

    function llenarSelect(especializaciones) {
        var select = document.getElementById("selectEsp");

        if (especializaciones === "No existen especializaciones") {
            alert("No hay registros de especializaciones!")
            let option = document.createElement("option");
            option.text = especializaciones;
            select.add(option);
            return;
        }
        for (let i = 0; i < especializaciones.length; i++) {
            var option = document.createElement("option");
            option.text = especializaciones[i]['descripcion'];
            option.value = especializaciones[i]['cod_esp']
            select.add(option);
        }
    }

    $("#butRegistroEsp").click(function () {
        var vetUsername = $("#vetUsername").val();
        $("#vetUsername").val("");
        if (vetUsername.length === 0) {
            alert("Es necesario llenar el campo")
            return;
        }
        var url = vet_url + "/" + vetUsername;

        var esp_data = {"cod_esp": $('#selectEsp').val()}
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(esp_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(response => alert(response));
    });

});