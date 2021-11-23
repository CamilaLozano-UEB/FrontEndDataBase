$("#signButton").click(function(){
    //Takes and send the data to create a new owner user
    if (document.formSingUp.neighborhood[document.formSingUp.neighborhood.selectedIndex].text === "Seleccione") {
        alert("Es necesario selecionar una localidad");
        return;
    }

    var url = 'http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/owners';
    var person_id = Number(document.getElementById("person_id").value)
    if (isNaN(person_id)) {
        alert("La identificación debe ser numerica");
        return;
    }
    var data = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value,
        "email": document.getElementById("email").value,
        "person_id": person_id,
        "name": document.getElementById("name").value,
        "address": document.getElementById("address").value,
        "neighborhood": document.formSingUp.neighborhood[document.formSingUp.neighborhood.selectedIndex].text
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.text()).then(res => validateResponseOwner(res));
})

/**
 * Function that validates the correct fields to the creation of the owner's user
 * @param res String message
 */
function validateResponseOwner(res) {
    if ("se ha registrado correctamente" === res) {
        alert("Se creo el propietario correctamente");
        window.location.href = "index.html";
    } else {
        alert("Ocurre un problema al crear el propietario, revise los datos ");
        location.reload();
    }
}