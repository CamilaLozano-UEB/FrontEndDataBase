$(function () {

    if (!rutas.enabled) {
        return;
    }
    const url = rutas.usuario;
    $("#signButton").click(function () {
        var username = $("#username").val()
        var password = $("#password").val()
        var encryptedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        var email = $("#email").val()
        var num_identificacion = $("#numIdentificacion").val()
        var nombres = $("#nombres").val()
        var apellidos = $("#apellidos").val()
        var direccion = $("#direccion").val()
        var tel_fijo = $("#telefono").val();
        var tel_celular = $("#celular").val();
        if (password.length === 0 || username.length === 0 || email.length === 0 || num_identificacion === 0 ||
            nombres === 0 || apellidos === 0 || direccion === 0 || tel_fijo === 0 || tel_celular === 0) {
            alert("Es necesario llenar los campos")
            return;
        }
        if (isNaN(Number(tel_celular)) || isNaN(Number(tel_fijo))) {
            alert("Solo ingrese números en los campos de teléfono!")
            return;
        }
        if (password.length >21){
            alert("La contraseña excedio el limite de caracteres")
            return;
        }
        if (username.length > 21 || email.length > 41 || num_identificacion >11 || nombres > 51
            || apellidos > 51 || direccion > 100 || tel_fijo !== 7  || tel_celular !== 10) {
            alert("Ha excedido el limite de caracteres")
            return;
        }
        var usuario = {
            "username": username,
            "clave": encryptedPassword,
            "email": email,
            "num_identificacion": num_identificacion,
            "nombres": nombres,
            "apellidos": apellidos,
            "cod_rol": 1,
            "direccion": direccion,
            "tel_fijo": tel_fijo,
            "tel_celular": tel_celular,
            "est_usuario": "A"
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(usuario), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text()).then(res => validateresponse(res));
    });

    function validateresponse(response) {
        if ("se ha registrado correctamente" === response) {
            alert(response);
            window.location.href = "index.html";
        } else {
            alert(response);
            location.reload();
        }

    }

});
