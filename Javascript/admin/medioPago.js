$(function () {

    if (!rutas.enabled) {
        return;
    }
    const medpago_url = rutas.medio_pago;

    $("#medpagoButton").click(function () {
        var nombreMedPago = $("#nombreMedpago").val();
        if (nombreMedPago === "" || nombreMedPago.length > 20) {
            alert("El nombre del medio de pago no puede ser superior a los 20 caracteres!");
            return;
        }

        var especializacion = {
            "cod_medpago": null,
            "descripcion": nombreMedPago,
            "est_mediopago": "A",
        }
        $.ajax({
            url: medpago_url,
            type: "POST",
            data: JSON.stringify(especializacion),
            dataType: "json",
            success: function (data) {
                if ("se ha registrado correctamente" === data) {
                    alert(data);
                    $("#nombreMedpago").val("");
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
});