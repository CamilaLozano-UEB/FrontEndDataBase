$(function () {
    $("#espButton").click(function () {

        var nombreEsp = $("#nombreEsp").val();
        if(nombreEsp ==="" || nombreEsp.length >60){
            alert("El nombre de la especialización no puede ser superior a los 60 caracteres!");
            return;
        }

        var url = 'http://127.0.0.1:8000/especializacion';

        var especializacion = {
            "cod_esp": null,
            "descripcion": nombreEsp,
            "est_especializacion": "A",
        }
        $.ajax({
            url: url,
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
})