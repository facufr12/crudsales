document.getElementById("hijos_si").addEventListener("click", function () {
  document.getElementById("hijos_section").style.display = "block";
});

document.getElementById("hijos_no").addEventListener("click", function () {
  document.getElementById("hijos_section").style.display = "none";
});

document.getElementById("estado_civil").addEventListener("change", function () {
  if (this.value === "Casado" || this.value === "Concubinato") {
    document.getElementById("estado_civil_section").style.display = "block";
  } else {
    document.getElementById("estado_civil_section").style.display = "none";
    document.getElementById("edad_esposa").value = "";
    document.getElementById("tipo_contratacion_esposa").value = "";
    document.getElementById(
      "categoria_monotributo_esposa_section"
    ).style.display = "none";
    document.getElementById("categoria_monotributo_esposa").value = "";
  }
});

document
  .getElementById("tipo_contratacion")
  .addEventListener("change", function () {
    if (this.value === "Monotributo") {
      document.getElementById("categoria_monotributo_section").style.display =
        "block";
    } else {
      document.getElementById("categoria_monotributo_section").style.display =
        "none";
      document.getElementById("categoria_monotributo").value = "";
    }

    if (this.value === "Recibo de Sueldo") {
      document.getElementById("sueldo").style.display = "block";
    } else {
      document.getElementById("sueldo").style.display = "none";
      document.getElementById("sueldo_titular").value = 0;
    }
  });

document
  .getElementById("tipo_contratacion_esposa")
  .addEventListener("change", function () {
    if (this.value === "Monotributo") {
      document.getElementById(
        "categoria_monotributo_esposa_section"
      ).style.display = "block";
    } else {
      document.getElementById(
        "categoria_monotributo_esposa_section"
      ).style.display = "none";
      document.getElementById("categoria_monotributo_esposa").value = "";
    }

    if (this.value === "Recibo de Sueldo") {
      document.getElementById("sueldo_e").style.display = "block";
    } else {
      document.getElementById("sueldo_e").style.display = "none";
      document.getElementById("sueldo_esposa").value = 0;
    }
  });

document.getElementById("hijos_si").addEventListener("click", function () {
  document.getElementById("hijos_section").style.display = "block";
  document
    .getElementById("cantidad_hijos")
    .addEventListener("input", function () {
      let cantidad = parseInt(this.value);
      let edadesHtml = "";
      for (let i = 0; i < cantidad; i++) {
        edadesHtml += `<input class="form-control" type="number" id="edad_hijo_${
          i + 1
        }" name="edad_hijo_${i + 1}" placeholder="Edad Hijo ${
          i + 1
        }" required>`;
      }
      document.getElementById("edades_hijos").innerHTML = edadesHtml;
    });
});

document.getElementById("hijos_no").addEventListener("click", function () {
  document.getElementById("hijos_section").style.display = "none";
  document.getElementById("edades_hijos").innerHTML = "";
});
const botonEnviar = document.getElementById("cotizar");
botonEnviar.addEventListener("click", function (event) {
  event.preventDefault();

  // Crear el objeto JSON según el formato deseado
  const jsonData = {
    //name: document.getElementById("nombre").value,
    //location: document.getElementById("localidad").value,
    age: parseInt(document.getElementById("edad_titular").value),
    maritalStatus: document.getElementById("estado_civil").value,
    wifeAge: parseInt(document.getElementById("edad_esposa").value) || null,
    membershipWife:
      document.getElementById("tipo_contratacion_esposa").value || null,
    salaryWife: parseInt(document.getElementById("sueldo_esposa").value) || 0,
    categoryMonotributeWife:
      document.getElementById("categoria_monotributo_esposa").value || null,
    numberSons:
      parseInt(document.getElementById("cantidad_hijos").value) || null,
    membership: document.getElementById("tipo_contratacion").value,
    salary: parseInt(document.getElementById("sueldo_titular").value) || 0,
    categoryMonotribute:
      document.getElementById("categoria_monotributo").value || null,
    //email: document.getElementById("email").value,
    //cel: document.getElementById("celular").value,
  };
  var opcionSi = document.getElementById("hijos_si");
  var opcionNo = document.getElementById("hijos_no");
  if (opcionSi.checked) {
    jsonData.sons = true;
    jsonData.ageSons = [];
    for (
      let i = 1;
      i <= parseInt(document.getElementById("cantidad_hijos").value);
      i++
    ) {
      jsonData.ageSons.push(
        parseInt(document.getElementById(`edad_hijo_${i}`).value)
      );
    }
  } else if (opcionNo.checked) {
    jsonData.sons = false;
  }
  // Enviar los datos del formulario a la URL deseada
  fetch("https://crudbackend.cober.online/quote/2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      //return response.json();
      response.json().then((quotes) => {
        console.log(quotes);
        /*const quotesContainer = document.getElementById("cotizaciones");
        quotesContainer.innerHTML = "";

        let listNods = document.createElement("ul");
        let listDs = document.createElement("ul");
        let sds = document.createElement("p");
        sds.textContent = "Cotizaciones sin descuento:";
        quotesContainer.appendChild(sds);
        for (let key in quotes.NoDs) {
          if (quotes.WithDs.hasOwnProperty(key)) {
            let value = parseFloat(quotes.NoDs[key]).toFixed(2);

            // Crear elementos para mostrar la clave y el valor
            let element = document.createElement("li");

            // Asignar texto a los elementos
            element.textContent = `${key}: $${value}`;

            // Agregar los elementos al contenedor en el DOM
            listNods.appendChild(element);
          }
        }
        quotesContainer.appendChild(listNods);
        let ds = document.createElement("p");
        ds.textContent = `Cotizaciones con descuento de ${quotes.Ds}% :`;

        quotesContainer.appendChild(ds);
        for (let key in quotes.WithDs) {
          if (quotes.WithDs.hasOwnProperty(key)) {
            let value = parseFloat(quotes.WithDs[key]).toFixed(2);

            // Crear elementos para mostrar la clave y el valor
            let element = document.createElement("li");

            // Asignar texto a los elementos
            element.textContent = `${key}: $${value}`;

            // Agregar los elementos al contenedor en el DOM
            listDs.appendChild(element);
          }
        }
        quotesContainer.appendChild(listDs); */
        createCardQuote(quotes);
      });
    })
    .catch((error) => {
      console.error("Error al enviar los datos:");
      console.log(error);
    });
});

function createCardQuote(quotes) {
  const quotesContainer = document.getElementById("cotizaciones");
  //quotesContainer.innerHTML = "";
  let estadoCivil = document.getElementById("estado_civil").value;
  let data = {
    cobertura: "",
    edad: document.getElementById("edad_titular").value,
    hijos: "",
    contratacion: document.getElementById("tipo_contratacion").value,
  };
  if (estadoCivil === "Soltero") {
    data.cobertura = "Individual";
  } else {
    data.cobertura = "Matrimonio";
  }
  let hijos_si = document.getElementById("hijos_si");
  let hijos_no = document.getElementById("hijos_no");
  if (hijos_si.checked) {
    data.hijos = "Con Hijos";
  }
  if (hijos_no.checked) {
    data.hijos = "Sin Hijos";
  }
  for (let key in quotes.WithDs) {
    let quoteNoDs = parseFloat(quotes.NoDs[key]).toFixed(0);
    let quoteWithDs = parseFloat(quotes.WithDs[key]).toFixed(0);
    let card = document.createElement("div");
    card.classList.add("col-xl-4", "col-lg-5");
    let descuentoTitular = "";
    switch (data.contratacion) {
      case "Recibo de Sueldo":
        descuentoTitular = `
      <span>Aportes Titular RelDep</span>
      <span class="text-success fw-semibold"> -$${quotes.Discounts.Owner}</span>`;
        break;
      case "Monotributo":
        descuentoTitular = `
        <span>Aporte/Descuento Monotributo</span>
        <span class="text-success fw-semibold"> -$${quotes.Discounts.Owner}</span>`;
        break;
    }
    let cardHtml = "";
    if (
      estadoCivil === "Soltero" &&
      parseInt(document.getElementById("edad_titular").value) <= 60
    ) {
      cardHtml = `
        <div class="card mt-4 mt-lg-0">
          <div class="card-body">
            <div class="mb-4 d-flex justify-content-between align-items-center">
              <h4 class="mb-1">Cotización Plan</h4>
            </div>
            <div class="d-md-flex">
              <div>
                <img src="../assets/images/Zipper.PNG" alt="" class="+img-4by3-xl rounded" width="120px" />
              </div>
              <div class="ms-md-4 mt-2">
                <h4 class="mb-1 text-primary-hover">${key}</h4>
                  <h5>${data.cobertura}. ${data.edad}. ${data.hijos}</h5>
              </div>
            </div>
          </div>
          <div class="card-body border-top pt-2">
            <ul class="list-group list-group-flush mb-0">
              <li class="d-flex justify-content-between list-group-item px-0">
                <span>Subtotal</span>
                <span class="text-dark fw-semibold"><del>$${quoteNoDs}</del></span>
              </li>
              <li class="d-flex justify-content-between list-group-item px-0">
                <span>Bonif. Af. online %${quotes.Discounts.Promo}</span>
                <span class="text-success fw-semibold"> -$${parseFloat(
                  quoteNoDs * (quotes.Discounts.Promo / 100)
                ).toFixed(0)}</span>
              </li>
              <li class="d-flex justify-content-between list-group-item px-0">
                ${descuentoTitular}
              </li>
              <li class="d-flex justify-content-between list-group-item px-0 pb-0">
                <span class="fs-3 fw-semibold text-dark">Cuota Mensual</span>
                <span class="fs-3 fw-semibold text-dark">$${quoteWithDs}</span>
              </li>
            </ul>
          </div>
        </div>`;
    }

    if (
      estadoCivil === "Soltero" &&
      parseInt(document.getElementById("edad_titular").value) > 60
    ) {
      cardHtml = `
        <div class="card mt-4 mt-lg-0">
          <div class="card-body">
            <div class="mb-4 d-flex justify-content-between align-items-center">
              <h4 class="mb-1">Cotización Plan</h4>
            </div>
            <div class="d-md-flex">
              <div>
                <img src="../assets/images/Zipper.PNG" alt="" class="+img-4by3-xl rounded" width="120px" />
              </div>
              <div class="ms-md-4 mt-2">
                <h4 class="mb-1 text-primary-hover">${key}</h4>
                  <h5>${data.cobertura}. ${data.edad}. ${data.hijos}</h5>
              </div>
            </div>
          </div>
          <div class="card-body border-top pt-2">
            <ul class="list-group list-group-flush mb-0">
              <li class="d-flex justify-content-between list-group-item px-0">
                <span>Subtotal</span>
                <span class="text-dark fw-semibold"><del>$${quoteNoDs}</del></span>
              </li>
              <li class="d-flex justify-content-between list-group-item px-0">
                ${descuentoTitular}
              </li>
              <li class="d-flex justify-content-between list-group-item px-0 pb-0">
                <span class="fs-3 fw-semibold text-dark">Cuota Mensual</span>
                <span class="fs-3 fw-semibold text-dark">$${quoteWithDs}</span>
              </li>
            </ul>
          </div>
        </div>`;
    }
    if (estadoCivil === "Casado" || estadoCivil === "Concubinato") {
      if (parseInt(document.getElementById("edad_titular").value) <= 60) {
        let descuentoEsposa = "";
        if (
          document.getElementById("tipo_contratacion_esposa").value ===
          "Recibo de Sueldo"
        ) {
          descuentoEsposa = `<span>Aportes Esposa/Conyuge RelDep</span>
        <span class="text-success fw-semibold"> -$${quotes.Discounts.Wife.toFixed(0)}</span>`;
        } else if (
          document.getElementById("tipo_contratacion_esposa").value ===
          "Monotributo"
        ) {
          descuentoEsposa = `<span>Aporte Monotributo Esposa/Conyuge</span>
        <span class="text-success fw-semibold"> -$${quotes.Discounts.Wife.toFixed(0)}</span>`;
        }

        cardHtml = `
        <div class="card mt-4 mt-lg-0">
          <div class="card-body">
            <div class="mb-4 d-flex justify-content-between align-items-center">
              <h4 class="mb-1">Cotización Plan</h4>
            </div>
            <div class="d-md-flex">
              <div>
                <img src="../assets/images/Zipper.PNG" alt="" class="+img-4by3-xl rounded" width="120px" />
              </div>
              <div class="ms-md-4 mt-2">
                <h4 class="mb-1 text-primary-hover">${key}</h4>
                  <h5>${data.cobertura}. ${data.edad}. ${data.hijos}</h5>
              </div>
            </div>
          </div>
          <div class="card-body border-top pt-2">
            <ul class="list-group list-group-flush mb-0">
              <li class="d-flex justify-content-between list-group-item px-0">
                <span>Subtotal</span>
                <span class="text-dark fw-semibold"><del>$${quoteNoDs}</del></span>
              </li>
              <li class="d-flex justify-content-between list-group-item px-0">
                <span>Bonif. Af. online %${quotes.Discounts.Promo}</span>
                <span class="text-success fw-semibold"> -$${parseFloat(
                  quoteNoDs * (quotes.Discounts.Promo / 100)
                ).toFixed(0)}</span>
              </li>
              <li class="d-flex justify-content-between list-group-item px-0">
                ${descuentoTitular}
              </li>
              <li class="d-flex justify-content-between list-group-item px-0">
                ${descuentoEsposa}
              </li>
              <li class="d-flex justify-content-between list-group-item px-0 pb-0">
                <span class="fs-3 fw-semibold text-dark">Cuota Mensual</span>
                <span class="fs-3 fw-semibold text-dark">$${quoteWithDs}</span>
              </li>
            </ul>
          </div>
        </div>`;
      }
      if (parseInt(document.getElementById("edad_titular").value) > 60) {
        let descuentoEsposa = "";
        if (
          document.getElementById("tipo_contratacion_esposa").value ===
          "Recibo de Sueldo"
        ) {
          descuentoEsposa = `<span>Aportes Esposa/Conyuge RelDep</span>
        <span class="text-success fw-semibold"> -$${quotes.Discounts.Wife.toFixed(0)}</span>`;
        } else if (
          document.getElementById("tipo_contratacion_esposa").value ===
          "Monotributo"
        ) {
          descuentoEsposa = `<span>Aporte/Descuento Monotributo Esposa/Conyuge</span>
        <span class="text-success fw-semibold"> -$${quotes.Discounts.Wife.toFixed(0)}</span>`;
        }
        cardHtml = `
        <div class="card mt-4 mt-lg-0">
          <div class="card-body">
            <div class="mb-4 d-flex justify-content-between align-items-center">
              <h4 class="mb-1">Cotización Plan</h4>
            </div>
            <div class="d-md-flex">
              <div>
                <img src="../assets/images/Zipper.PNG" alt="" class="+img-4by3-xl rounded" width="120px" />
              </div>
              <div class="ms-md-4 mt-2">
                <h4 class="mb-1 text-primary-hover">${key}</h4>
                  <h5>${data.cobertura}. ${data.edad}. ${data.hijos}</h5>
              </div>
            </div>
          </div>
          <div class="card-body border-top pt-2">
            <ul class="list-group list-group-flush mb-0">
              <li class="d-flex justify-content-between list-group-item px-0">
                <span>Subtotal</span>
                <span class="text-dark fw-semibold"><del>$${quoteNoDs}</del></span>
              </li>
              <li class="d-flex justify-content-between list-group-item px-0">
                ${descuentoTitular}
              </li>
              <li class="d-flex justify-content-between list-group-item px-0">
                ${descuentoEsposa}
              </li>
              <li class="d-flex justify-content-between list-group-item px-0 pb-0">
                <span class="fs-3 fw-semibold text-dark">Cuota Mensual</span>
                <span class="fs-3 fw-semibold text-dark">$${quoteWithDs}</span>
              </li>
            </ul>
          </div>
        </div>`;
      }
    }
    card.innerHTML = cardHtml;
    quotesContainer.appendChild(card);
  }
}

/* document
  .getElementById("formulariooo")
  .addEventListener("submit", ); */
