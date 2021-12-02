$(function () {

    if (!rutas.enabled) {
        return;
    }
    const cat_url = rutas.categoria;
    const prod_url = rutas.producto;
    $("#producto-tab").click(function () {
        fetch(cat_url, {
            method: 'GET',
        }).then(response => response.json()).then(response => llenarSelect(response));
    });

    function llenarSelect(categorias) {
        var select = document.getElementById("selectCat");

        if (categorias === "No existen categorias") {
            alert("No hay registros de categorias!")
            let option = document.createElement("option");
            option.text = categorias;
            select.add(option);
            return;
        }
        for (let i = 0; i < categorias.length; i++) {
            var option = document.createElement("option");
            option.text = categorias[i]['descripcion'];
            option.value = categorias[i]['cod_categoria']
            select.add(option);
        }
    }

    $("#butRegistroProducto").click(function () {
        var producto = $("#producto").val();
        var descripcion = $("#pDescripcion").val();
        var precio = Number($("#pPrecio").val());
        var iva = Number($("#pIva").val());
        var descuento = Number($("#pDescuento").val());
        var fechaDescontinuado = $("#pDescontinuado").val();

        if (isNaN(precio) || isNaN(iva) || isNaN(descuento)) {
            alert("Solo ingrese números en los campos numéricos")
            return;
        }
        if (iva < 0 || iva > 100 || descuento < 0 || descuento > 100) {
            alert("El iva debe ser ingresado en porcentaje")
            return;
        }
        if (producto.length === 0 || descripcion.length === 0 || fechaDescontinuado.length === 0) {
            alert("Es necesario llenar los campos")
            return;
        }

        var producto_data = {
            "cod_producto": null,
            "cod_categoria": $('#selectCat').val(),
            "nombre": producto,
            "descripcion": descripcion,
            "precio": precio,
            "iva": iva,
            "des_producto": descuento,
            "fecha_inicial": fechaHoy(),
            "fecha_final": fechaDescontinuado,
            "precio_total": Number($("#pTotal").val()),
            "est_producto": "A"
        }

        fetch(prod_url, {
            method: 'POST',
            body: JSON.stringify(producto_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(response => alert(response));
    });

    $("#formProducto").change(function () {
        var precio = Number($("#pPrecio").val());
        var iva = Number($("#pIva").val());
        var descuento = Number($("#pDescuento").val());
        if (!isNaN(precio) && !isNaN(iva) && !isNaN(descuento) && iva >= 0 && iva <= 100 && descuento >= 0
            && descuento <= 100) {
            $("#pTotal").val(precio * (1 + (iva / 100)) * (1 - (descuento / 100)));
        }
    });

    function fechaHoy() {
        /*https://www.freecodecamp.org/news/javascript-date-now-how-to-get-the-current-date-in-javascript/
        Modificado por: Nicolás Peña*/
        let date = new Date();
        let format = 'yyyy-mm-dd'
        const map = {
            mm: date.getMonth() + 1,
            dd: date.getDate(),
            yy: date.getFullYear().toString().slice(-2),
            yyyy: date.getFullYear()
        }
        return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
    }

});
