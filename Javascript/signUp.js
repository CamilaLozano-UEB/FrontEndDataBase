/**
 *It takes the parameter of the selected role and from this it shows
 * the form for the creation of a user from the role
 * @constructor
 */
document.getElementById("listSingUp").onchange =
    function () {
        var fieldSetForm = document.getElementById("fieldSetForm");
        var form = document.getElementById("formSingUp");
        var listTitlesVet = ["Usuario: ", "Contraseña:", "Email: ", "Nombre de la Veterinaria: ", "Direccion: "];
        var listTitlesOwner = ["Usuario: ", "Contraseña:", "Email: ", "Documento de identidad: ", "Nombre Completo: ", "Direccion: "];
        var listAtributesVet = ["usernameVet", "passwordVet", "emailVet", "nameVet", "addressVet"];
        var listAtributesOwner = ["username", "password", "email", "person_id", "name", "address"];
        let neighborhoods = ["Seleccione", "Usaquen", "Chapinero", "Santa Fe", "San Cristobal", "Usme", "Tunjuelito", "Bosa", "Kennedy", "Fontibon", "Engativa", "Suba", "Barrios Unidos"
            , "Teusaquillo", "Los Martires", "Antonio Nariño", "Puente Aranda", "La Candelaria", "Uribe", "Ciudad Bolivar", "Sumapaz", "Municipios aledaños"];
        var role = document.getElementById("listSingUp").value;

        if (fieldSetForm.hasChildNodes()) {
            fieldSetForm.removeChild(fieldSetForm.firstChild);
            form.removeChild(document.getElementById("createButton"));
        }

        var div = document.createElement("div");
        div.name = "divForm";

        //Shows the form for a vet
        if (role === "vetSelect") {
            for (var i = 0; i < listTitlesVet.length; i++) {
                var label = document.createElement("label");
                label.setAttribute("for", listAtributesVet[i]);
                label.textContent = listTitlesVet[i];
                div.appendChild(label);
                div.appendChild(document.createElement("br"));

                var input = document.createElement("input");
                if (listAtributesVet[i] === "passwordVet") input.type = "password";
                input.setAttribute("name", listAtributesVet[i]);
                input.setAttribute("id", listAtributesVet[i]);
                div.appendChild(input);
                div.appendChild(document.createElement("br"));
            }
            let inputButton = document.createElement("button");
            inputButton.id = "createButton";
            inputButton.type = "button";
            inputButton.textContent = "Registrar";
            inputButton.addEventListener("click", function createVet() {
                if (document.formSingUp.neighborhoodVet[document.formSingUp.neighborhoodVet.selectedIndex].text === "Seleccione") {
                    alert("Es necesario selecionar una localidad");
                    return;
                }

                //Create the vet's user
                var url = 'http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/vet';
                var data = {
                    "username": document.getElementById("usernameVet").value,
                    "password": document.getElementById("passwordVet").value,
                    "email": document.getElementById("emailVet").value,
                    "name": document.getElementById("nameVet").value,
                    "address": document.getElementById("addressVet").value,
                    "neighborhood": document.formSingUp.neighborhoodVet[document.formSingUp.neighborhoodVet.selectedIndex].text
                };

                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.text()).then(res => validateResponseVet(res));
            })
            let neighborhoodLabel = document.createElement("label");
            neighborhoodLabel.for = "neighborhoodVet";
            neighborhoodLabel.textContent = "Localidad:";
            div.appendChild(neighborhoodLabel);
            div.appendChild(document.createElement("br"));

            let select = document.createElement('select');
            select.id = "neighborhoodVet";
            select.name = "neighborhoodVet";

            for (const neighborhood of neighborhoods) {
                let option = document.createElement("option");
                option.textContent = neighborhood;
                select.appendChild(option);
            }
            div.appendChild(select);

            fieldSetForm.appendChild(div);
            form.appendChild(inputButton);
            //Shows the form for the creation of a owner's user
        } else if (role === "ownerSelect") {

            for (var i = 0; i < listTitlesOwner.length; i++) {
                var label = document.createElement("label");
                label.setAttribute("for", listTitlesOwner[i]);
                label.textContent = listTitlesOwner[i];
                div.appendChild(label);
                div.appendChild(document.createElement("br"));

                var input = document.createElement("input");
                if (listAtributesOwner[i] === "password") input.type = "password";
                input.setAttribute("name", listAtributesOwner[i]);
                input.setAttribute("id", listAtributesOwner[i]);
                div.appendChild(input);
                div.appendChild(document.createElement("br"));
            }
            let inputButton = document.createElement("button");
            inputButton.id = "createButton";
            inputButton.type = "button";
            inputButton.textContent = "Registrar";
            inputButton.addEventListener("click", function createOwner() {
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
            let neighborhoodLabel = document.createElement("label");
            neighborhoodLabel.for = "neighborhood";
            neighborhoodLabel.textContent = "Localidad:";
            div.appendChild(neighborhoodLabel);
            div.appendChild(document.createElement("br"));

            let select = document.createElement('select');
            select.id = "neighborhood";
            select.name = "neighborhood";
            for (const neighborhood of neighborhoods) {
                let option = document.createElement("option");
                option.textContent = neighborhood;
                select.appendChild(option);
            }
            div.appendChild(select);

            fieldSetForm.appendChild(div);
            form.appendChild(inputButton);

        } else {
            alert("Seleccione una opción para continuar");
        }
    }

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

/**
 * Function that validates the correct fields to the creation of the vet's user
 * @param res String message
 */
function validateResponseVet(res) {
    if ("se ha registrado correctamente la veterinaria" === res) {
        alert("Se creo la veterinaria correctamente");
        window.location.href = "index.html";
    } else {
        alert("Ocurre un problema al crear la veterinaria, revise los datos ");
        location.reload();
    }
}