/*call the buttons in owner.html*/
$(function () {
    var Cbutton = document.getElementById("Cpets");
    var Ubutton = document.getElementById("Upets");
    var Casebutton = document.getElementById("caseB");
    var Userbutton = document.getElementById("Uuser");


    $("#Cpets")


    /**
     * Get the parameters of the form and send it to the rest in backend for create a pet
     * @param fileD the name of the photo
     */
    function createPet(fileD) {
        if (fileD === "No es una imagen") {
            alert("El archivo adjuntado no es una image")
            return;
        }
        if (fileD === "unknown") {
            fileD = "unknown.jpg"
        }
        var username = findUsername();
        var microchip
        var url = 'http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/owners/' + username + '/pets';
        if (document.getElementById("microchip").value.trim() === "") {
            microchip = null;
        } else {
            microchip = Number(document.getElementById("microchip").value.trim())
        }
        if (isNaN(microchip) || document.formC.species[document.formC.species.selectedIndex].text === "Seleccione"
            || document.formC.size[document.formC.size.selectedIndex].text === "Seleccione" || document.formC.sex[document.formC.sex.selectedIndex].text === "Seleccione") {
            alert("Los datos ingresados son incorrectos");
            return;
        }
        if (document.getElementById("name").value.trim() === "" || document.getElementById("race").value.trim() === "") {
            alert("Es necesario llenar los campos de nombre, especie, tamaño y raza");
            return;
        }
        var data = {
            "microchip": microchip,
            "name": document.getElementById("name").value.trim(),
            "species": document.formC.species[document.formC.species.selectedIndex].text,
            "race": document.getElementById("race").value.trim(),
            "size": document.formC.size[document.formC.size.selectedIndex].text,
            "sex": document.formC.sex[document.formC.sex.selectedIndex].text,
            "picture": fileD
        };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text())
            .then(res => validateNewPet(res));
    }





    /**
     * Find the username in the url
     * @returns {string}
     */

    /**
     *Send the file image to the rest in backend of create pet
     */
    Cbutton.onclick = function () {
        var photo = document.getElementById("imagePet");
        var url = 'http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/upload';

        const formData = new FormData();
        formData.append('file', photo.files[0]);

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.text())
            .then(res => createPet(res));
    }


    /**
     * Validate the register of a pet
     * @param res string message
     */
    function validateNewPet(res) {
        if (res === "se ha registrado correctamente") {
            alert("Se creo la mascota correctamente");
        } else {
            alert(res.toString());
        }
        location.reload();
    }

    /**
     * Send the file image to the rest in backend of update
     */
    Ubutton.onclick = function () {
        var photo = document.getElementById("imagePetU");
        var url = 'http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/upload';

        const formData = new FormData();
        formData.append('file', photo.files[0]);

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.text())
            .then(res => updatePet(res));
    }

    /**
     *  Get the parameters of the form and send it to the rest in backend for update a pet
     * @param fileD the name of the photo
     */
    function updatePet(fileD) {
        if (fileD === "No es una imagen") {
            alert("El archivo adjuntado no es una image")
            return;
        }
        if (fileD === "unknown") {
            fileD = "unknown.jpg"
        }
        var username = findUsername();
        var pet_id = Number(document.getElementById("petid").value.trim());
        var microchip
        var url = 'http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/owners/' + username + '/pets/' + pet_id;
        if (document.getElementById("microchipU").value.trim() === "") {
            microchip = null;
        } else {
            microchip = Number(document.getElementById("microchipU").value.trim())
        }
        if (isNaN(microchip) || isNaN(pet_id) || document.formU.speciesU[document.formU.speciesU.selectedIndex].text === "Seleccione"
            || document.formU.sizeU[document.formU.sizeU.selectedIndex].text === "Seleccione" || document.formU.sexU[document.formU.sexU.selectedIndex].text === "Seleccione") {
            alert("Los datos ingresados son incorrectos");
            return;
        }
        if (document.getElementById("nameU").value.trim() === "" || document.getElementById("raceU").value.trim() === "") {
            alert("Es necesario llenar los campos de nombre, especie, tamaño y raza");
            return;
        }
        var data = {
            "microchip": microchip,
            "name": document.getElementById("nameU").value.trim(),
            "species": document.formU.speciesU[document.formU.speciesU.selectedIndex].text,
            "race": document.getElementById("raceU").value.trim(),
            "size": document.formU.sizeU[document.formU.sizeU.selectedIndex].text,
            "sex": document.formU.sexU[document.formU.sexU.selectedIndex].text,
            "picture": fileD
        };

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text())
            .then(res => validateUpPet(res));
    }

    /**
     *Valid the response message
     * @param res the response message
     */
    function validateUpPet(res) {
        if (res === "Se ha modificado exitosamente!") {
            alert("Se ha modificado la mascota exitosamente!");
        } else {
            alert(res.toString());
        }
        location.reload();
    }

    /**
     * Get the parameters of the form and send it to the rest in backend for create a case
     */

    Casebutton.onclick = function () {
        var username = findUsername();
        var pet_id = Number(document.getElementById("petidC").value.trim());
        var create_at = document.getElementById("caseDate").value;
        var url = 'http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/owner/' + username + '/pet/' + pet_id + '/petCases';
        if (document.formCase.typeCase[document.formCase.typeCase.selectedIndex].text === "Seleccione" || isNaN(pet_id) || create_at === "") {
            alert("Los datos ingresados son incorrectos");
            return;
        }
        if (document.formCase.typeCase[document.formCase.typeCase.selectedIndex].text === "Seleccione" || isNaN(pet_id) || create_at === "" || document.getElementById("description").value.trim() === "") {
            alert("Es necesario llenar todos los campos");
            return;
        }
        var data = {
            "created_at": create_at.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1'),
            "type": document.formCase.typeCase[document.formCase.typeCase.selectedIndex].text,
            "description": document.getElementById("description").value.trim()
        };

        //Send and create a post method in the rest backend
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text())
            .then(res => validateMessage(res));
    }

    /**
     *Valid the response message
     * @param res the response message
     */
    function validateMessage(res) {
        if (res === "se ha registrado correctamente") {
            alert("Se creo el caso correctamente");
        } else {
            alert(res.toString());
        }
        location.reload();
    }

    /**
     * Get the parameter of the form and send it to rest in the backend to update the owner's data
     */
    Userbutton.onclick = function () {
        var username = findUsername();
        var url = 'http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/owner/' + username;
        if (document.formUser.neighborhoodUser[document.formUser.neighborhoodUser.selectedIndex].text === "Seleccione" || document.getElementById("addressUser").value.trim() === "") {
            alert("Es necesario selecionar una localidad y dirección");
            return;
        }
        var data = {
            "username": username,
            "password": null,
            "email": null,
            "person_id": 0,
            "name": null,
            "address": document.getElementById("addressUser").value.trim(),
            "neighborhood": document.formUser.neighborhoodUser[document.formUser.neighborhoodUser.selectedIndex].text
        };

        //Send and create a put method in the rest backend
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text())
            .then(response => console.log('Success:', response));
        alert("Se actualizaron los datos ");
        location.reload();
    }
    /**
     * Get the pets of the rest in the backend
     */
    document.getElementById("find-tab").addEventListener("click", function () {

        var username = findUsername();
        var url = 'http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/owner/' + username;
        fetch(url, {
            method: 'GET'
        }).then(response => response.json()).then(response => fillPetsTable(response));
    });

    /**
     * Paint the table of the pets
     * @param petList, list of the pets
     */
    function fillPetsTable(petList) {
        let table = document.getElementById("myTableOwner");
        if (document.getElementById("tBodyPets") !== null) {
            $('#myTableOwner').DataTable().destroy();
            table.removeChild(document.getElementById("tBodyPets"));
        }
        let tBody = document.createElement("tbody");
        tBody.id = "tBodyPets";

        for (let i = 0; i < petList.length; i++) {
            var tr = document.createElement("tr");
            //Configure the update button
            var updateTd = document.createElement("td");
            var updateButton = document.createElement("a");
            updateButton.id = petList[i]["pet_id"];
            updateButtonConfiguration(updateButton);
            updateTd.appendChild(updateButton);
            tr.appendChild(updateTd);
            //Configure the create case button
            var caseButton = document.createElement("a");
            var caseTd = document.createElement("td");
            caseButton.id = petList[i]["pet_id"];
            caseButtonConfiguration(caseButton);
            caseTd.appendChild(caseButton);
            tr.appendChild(caseTd);
            //Configure the case and visit button
            var caseVisitButton = document.createElement("a");
            var caseVisitTd = document.createElement("td");
            caseVisitButton.id = petList[i]["pet_id"];
            caseVisitButtonConfiguration(caseVisitButton);
            caseVisitTd.appendChild(caseVisitButton);
            tr.appendChild(caseVisitTd);
            //Fill the table
            for (const property in petList[i]) {
                if (property !== "owner_username") {
                    var td = document.createElement("td");
                    td.textContent = petList[i][property];
                    if (property === "picture") {
                        var image = document.createElement("img");
                        if (petList[i][property] === 'http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/image/unknown.jpg') {
                            image.src = "imgs/unknown.jpg";
                            image.width = document.body.clientWidth / 6;
                            td.textContent = "";
                            td.appendChild(image);
                        } else {
                            image.src = td.textContent;
                            image.width = document.body.clientWidth / 6;
                            td.textContent = "";
                            td.appendChild(image);
                        }

                    }
                    tr.appendChild(td);
                }
            }
            tBody.appendChild(tr);

        }
        table.appendChild(tBody);
        $('#myTableOwner').DataTable();
    }

    /**
     * The button is configured anf add the listener
     * @param button the button of update
     */
    function updateButtonConfiguration(button) {
        button.type = "button";
        button.textContent = "Actualizar";
        button.href = "#update";
        button.setAttribute("data-toggle", "tab");
        button.addEventListener("click", function () {
            document.getElementById("find-tab").className = "nav-link";
            document.getElementById("update-tab").className = "nav-link active";
            document.getElementById("petid").value = button.id;
        })
    }

    /**
     * The button is configured anf add the listener
     * @param button the button of update
     */
    function caseButtonConfiguration(button) {
        button.type = "button";
        button.textContent = "Crear caso";
        button.href = "#petCase";
        button.setAttribute("data-toggle", "tab");
        button.addEventListener("click", function () {
            document.getElementById("find-tab").className = "nav-link";
            document.getElementById("petCase-tab").className = "nav-link active";
            document.getElementById("petidC").value = button.id;
        })
    }

    /**
     * The button is configured anf add the listener
     * @param button the button of update
     */
    function caseVisitButtonConfiguration(button) {
        button.type = "button";
        button.textContent = "Ver casos y visitas";
        button.textContent = "Ver casos y visitas";
        button.href = "#CaseAndVisits";
        button.setAttribute("data-toggle", "tab");

        button.addEventListener("click", function () {
            document.getElementById("find-tab").className = "nav-link";
            document.getElementById("CaseAndVisits-tab").className = "nav-link active";
            document.getElementById("petIdCV").value = button.id;
            dotableVisitCase();
        })
    }

    /**
     * Get all visits and cases of the owner
     */
    function dotableVisitCase() {
        var username = findUsername();
        var url = new URL('http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/owners/' +
            username + "/pets/" + document.getElementById("petIdCV").value + "/visitsCasesAll")

        fetch(url, {
            method: 'GET'
        }).then(response => response.json()).then(response => fillCasesAndVisitTable(response));
    }

    /**
     * Get the visits and cases between dates of the owner
     */
    document.getElementById("filter").addEventListener("click", function () {
        var username = findUsername();
        var url = new URL('http://35.206.97.221:8080/FourPawsCitizens-FootprintsSystem-1.0-SNAPSHOT/api/owners/' +
            username + "/pets/" + document.getElementById("petIdCV").value + "/visitsCases")

        var date1 = document.getElementById("Date1").value;
        var date2 = document.getElementById("Date2").value;
        if (date1 === "" || date2 === "") {
            alert("Para filtar es necesario ingresar las fechas");
            return;
        }
        //Take the dates to the filter
        var params = [
            ['initialDate', document.getElementById("Date1").value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1')],
            ['finalDate', document.getElementById("Date2").value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1')]]

        url.search = new URLSearchParams(params).toString();

        fetch(url, {
            method: 'GET'
        }).then(response => response.json()).then(response => fillCasesAndVisitTable(response));
    });

    /**
     * Paint the table of visits and cases
     * @param visitCaseList the list of visits and cases
     */
    function fillCasesAndVisitTable(visitCaseList) {
        let table = document.getElementById("myTableCaseVisitOwner");
        if (document.getElementById("tBodyCaseVisit") !== null) {
            $('#myTableCaseVisitOwner').DataTable().destroy();
            table.removeChild(document.getElementById("tBodyCaseVisit"));
        }
        let tBody = document.createElement("tbody");
        tBody.id = "tBodyCaseVisit";
        if (visitCaseList.length === 0)
            alert("No se encontró información");
        var cont = 1;
        //Create the cells
        for (let i = 0; i < visitCaseList.length; i++) {
            const tr = document.createElement("tr");
            let td = document.createElement("td");
            td.textContent = cont;
            tr.appendChild(td);
            cont++;
            //assigns the cells and fill the table
            for (const property in visitCaseList[i]) {
                if (property === "createdAt") {
                    var d = new Date(visitCaseList[i][property]);
                    var date = +d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                    let td = document.createElement("td");
                    td.textContent = date;
                    tr.appendChild(td);
                } else {
                    let td = document.createElement("td");
                    td.textContent = visitCaseList[i][property];
                    tr.appendChild(td);
                }

            }
            tBody.appendChild(tr);

        }
        table.appendChild(tBody);
        $('#myTableCaseVisitOwner').DataTable();
    }
})
