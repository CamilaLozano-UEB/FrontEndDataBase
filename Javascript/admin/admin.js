$(function () {
    if (!rutas.enabled) {
        return;
    }
    const admin_url = rutas.admin;
    const usuario_url = rutas.usuario;

    $("#signButton").click(function () {

        var password = $("#password").val();
        var encryptedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        var tel_fijo = $("#telefono").val();
        var tel_celular = $("#celular").val();

        if (isNaN(Number(tel_celular)) || isNaN(Number(tel_fijo))) {
            alert("Solo ingrese números en los campos de teléfono!")
            return;
        }
        var usuario = {
            "username": $("#username").val(),
            "clave": encryptedPassword,
            "email": $("#email").val(),
            "num_identificacion": $("#numIdentificacion").val(),
            "nombres": $("#nombres").val(),
            "apellidos": $("#apellidos").val(),
            "cod_rol": 3,
            "direccion": $("#direccion").val(),
            "tel_fijo": tel_fijo,
            "tel_celular": tel_celular,
            "est_usuario": "A"
        }
        $.ajax({
            url: usuario_url,
            type: "POST",
            data: JSON.stringify(usuario),
            dataType: "json",
            success: function (data) {
                if ("se ha registrado correctamente" === data) {
                    alert(data);
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


    function llenarTablaVeterinarios(listaVeterinarios) {
        if (listaVeterinarios === "No existen veterinarios") {
            alert("No hay registros de veterinarios!")
            return;
        }
        let table = document.getElementById("vetTable");
        const properties = ['username', 'nombres', "apellidos", "num_identificacion", "email", "direccion", "tel_fijo", "tel_celular"]

        if (document.getElementById("tBodyVets") !== null) {
            $('#vetTable').DataTable().destroy();
            table.removeChild(document.getElementById("tBodyVets"));
        }
        let tBody = document.createElement("tbody");
        tBody.id = "tBodyVets";

        for (let i = 0; i < listaVeterinarios.length; i++) {
            var tr = document.createElement("tr");
            for (const property of properties) {
                var td = document.createElement("td");
                td.textContent = listaVeterinarios[i][property];
                tr.appendChild(td);
            }

            var deleteTd = document.createElement("td");
            var deleteButton = document.createElement("a");
            deleteButton.id = listaVeterinarios[i]["username"];
            deleteButtonConfiguration(deleteButton, listaVeterinarios[i]["num_identificacion"], listaVeterinarios[i]["cod_rol"]["cod_rol"]);
            deleteTd.appendChild(deleteButton);
            tr.appendChild(deleteTd);
            tBody.appendChild(tr);

        }
        table.appendChild(tBody);
        $('#vetTable').DataTable({ /* Disable initial sort */ "aaSorting": []});
    }

    /**
     * Get the pets of the rest in the backend
     */
    $("#vet_tab").click(function () {
        fetch(admin_url, {
            method: 'GET',
        }).then(response => response.json()).then(response => llenarTablaVeterinarios(response));
    })

    function deleteButtonConfiguration(button, identificacion, codRol) {
        button.type = "button";
        button.textContent = "Eliminar";
        var data = {
            "username": button.id,
            "num_identificacion": identificacion,
            "cod_rol": codRol,
            "est_usuario": "I"
        }
        button.onclick = function () {
            fetch(admin_url, {
                method: 'PUT',
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(response => alert(response));
        }
    }

})
