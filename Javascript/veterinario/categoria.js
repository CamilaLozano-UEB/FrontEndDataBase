$(function () {

    if (!rutas.enabled) {
        return;
    }
    const categoria_url = rutas.categoria;

    $("#categoriaButton").click(function () {
        var nombreCategoria = $("#nombreCategoria").val();
        if (nombreCategoria === "" || nombreCategoria.length > 30) {
            alert("El nombre de la categoria no puede ser superior a los 30 caracteres!");
            return;
        }

        var categoria = {
            "cod_categoria": null,
            "descripcion": nombreCategoria,
            "est_categoria": "A",
        }
        $.ajax({
            url: categoria_url,
            type: "POST",
            data: JSON.stringify(categoria),
            dataType: "json",
            success: function (data) {
                if ("se ha registrado correctamente" === data) {
                    alert(data);
                    $("#nombreCategoria").val("");
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