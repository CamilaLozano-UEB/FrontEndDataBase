const url = new URL("http://127.0.0.1:8000/admin");

$("#signButton").click(function () {

    var url = 'http://127.0.0.1:8000/usuarios';
    var password = $("#password").val();
    var encryptedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    var tel_fijo = $("#telefono").val();
    var tel_celular = $("#celular").val();

    if (isNaN(Number(tel_celular)) || isNaN(Number(tel_fijo))) {
        alert("Solo ingrese números en los campos de teléfono!")
        return;
    }
    console.log(password)
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
    console.log(usuario);
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(usuario),
        dataType: "json",
        success: function (data) {
            console.log(data)
            if ("se ha registrado correctamente" === data) {
                alert(data);
                window.location.href = "index.html";
            } else {
                alert(data);
                location.reload();
            }
        },
        error: function(err){
            alert("Ha acurrido un error al registrarse");
        }
    });
});


function llenarTablaVeterinarios(listaVeterinarios) {
    console.log(listaVeterinarios[0])
    if(listaVeterinarios === "No existen veterinarios") {
        alert("No hay registros de veterinarios!")
        return;
    }
    let table = document.getElementById("myTableOwner");
    const properties = ['username', 'nombres', "apellidos", "num_identificacion", "email", "direccion", "tel_fijo", "tel_celular"]

    if (document.getElementById("tBodyPets") !== null) {
        $('#myTableOwner').DataTable().destroy();
        table.removeChild(document.getElementById("tBodyPets"));
    }
    let tBody = document.createElement("tbody");
    tBody.id = "tBodyPets";

    for (let i = 0; i < listaVeterinarios.length; i++) {
        var tr = document.createElement("tr");
        for (const property of properties) {
            if (property !== "owner_username") {
                var td = document.createElement("td");
                console.log(listaVeterinarios[i][property])
                td.textContent = listaVeterinarios[i][property];
                tr.appendChild(td);
            }
        }

        var deleteTd = document.createElement("td");
        var deleteButton = document.createElement("a");
        deleteButton.id = listaVeterinarios[i]["username"];
        deleteButtonConfiguration(deleteButton);
        deleteTd.appendChild(deleteButton);
        tr.appendChild(deleteTd);
        tBody.appendChild(tr);

    }
    table.appendChild(tBody);
    $('#myTableOwner').DataTable({ /* Disable initial sort */ "aaSorting": [] });
}

/**
 * Get the pets of the rest in the backend
 */
$("#update-tab").click(function () {
    var username = "admin";
    var url = 'http://127.0.0.1:8000/admin';
    fetch(url, {
        method: 'GET',
    }).then(response => response.json()).then(response => llenarTablaVeterinarios(response));
})

function deleteButtonConfiguration(button) {
    button.type = "button";
    button.textContent = "Eliminar";

    button.onclick = function () {
        var params = [['username', button.id]]
        url.search = new URLSearchParams(params).toString();
        fetch(url.toString(), {
            method: 'DELETE'
        }).then(response => response.json()).then(response => alert(response));
    }
}
