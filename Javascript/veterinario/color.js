$(function () {

    if (!rutas.enabled) {
        return;
    }
    const color_url = rutas.color;

    $("#colorButton").click(function () {
        var nombreColor = $("#nombreColor").val();
        if (nombreColor === "" || nombreColor.length > 15) {
            alert("El nombre del color no puede ser superior a los 15 caracteres!");
            return;
        }

        var color = {
            "cod_color": null,
            "descripcion": nombreColor,
            "est_color": "A",
        }
        $.ajax({
            url: color_url,
            type: "POST",
            data: JSON.stringify(color),
            dataType: "json",
            success: function (data) {
                if ("se ha registrado correctamente" === data) {
                    alert(data);
                    $("#nombreColor").val("");
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