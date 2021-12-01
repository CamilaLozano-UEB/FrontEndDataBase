$(function () {

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
});