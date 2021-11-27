$(function () {

    console.log(atob(localStorage.getItem("username")))
    $("#titulo1").innerHTML = atob(localStorage.getItem("username"))
    $("#titulo2").innerHTML = atob(localStorage.getItem("password"))
    $("#titulo3").innerHTML = atob(localStorage.getItem("rol"))


})