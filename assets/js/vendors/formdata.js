document.addEventListener("DOMContentLoaded", function () {

    const paymentMethodSelect = document.getElementById("paymentMethod");
    const cardDetailsDiv = document.getElementById("cardDetails");
    const selectAge = document.getElementById("edad_titular")
    const selectAgeWife = document.getElementById("edad_esposa")
    for (let i = 18; i <= 65; i++) {
        let option = document.createElement("option");
        option.text = i;
        option.value = i;
        selectAge.appendChild(option)
    }
    for (let i = 18; i <= 65; i++) {
        let option = document.createElement("option");
        option.text = i;
        option.value = i;
        selectAgeWife.appendChild(option)
    }

});