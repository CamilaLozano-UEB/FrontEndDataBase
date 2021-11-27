$(function () {
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
            "cod_rol": 1,
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
});