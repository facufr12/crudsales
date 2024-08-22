// Mostrar/ocultar la sección de hijos según la opción seleccionada
document.getElementById("hijos_si").addEventListener("click", function () {
  document.getElementById("hijos_section").style.display = "block";
  updateHijosEdades();
});

document.getElementById("hijos_no").addEventListener("click", function () {
  document.getElementById("hijos_section").style.display = "none";
  document.getElementById("edades_hijos").innerHTML = "";
});

// Mostrar/ocultar la sección del estado civil y limpiar campos si es necesario
document.getElementById("estado_civil").addEventListener("change", function () {
  const estadoCivilSection = document.getElementById("estado_civil_section");
  const edadEsposa = document.getElementById("edad_esposa");
  const tipoContratacionEsposa = document.getElementById(
    "tipo_contratacion_esposa"
  );
  const categoriaMonotributoEsposaSection = document.getElementById(
    "categoria_monotributo_esposa_section"
  );
  const categoriaMonotributoEsposa = document.getElementById(
    "categoria_monotributo_esposa"
  );

  if (["Casado", "Concubinato"].includes(this.value)) {
    estadoCivilSection.style.display = "block";
  } else {
    estadoCivilSection.style.display = "none";
    edadEsposa.value = "";
    tipoContratacionEsposa.value = "";
    categoriaMonotributoEsposaSection.style.display = "none";
    categoriaMonotributoEsposa.value = "";
  }
});

// Mostrar/ocultar la categoría de Monotributo y sueldo según el tipo de contratación
function updateContratacion() {
  const tipoContratacion = document.getElementById("tipo_contratacion").value;
  document.getElementById("categoria_monotributo_section").style.display =
    tipoContratacion === "Monotributo" ? "block" : "none";
  document.getElementById("sueldo").style.display =
    tipoContratacion === "Recibo de Sueldo" ? "block" : "none";
  if (tipoContratacion !== "Recibo de Sueldo")
    document.getElementById("sueldo_titular").value = 0;
}

document
  .getElementById("tipo_contratacion")
  .addEventListener("change", updateContratacion);

// Actualizar la sección de contratación de la esposa
function updateContratacionEsposa() {
  const tipoContratacionEsposa = document.getElementById(
    "tipo_contratacion_esposa"
  ).value;
  document.getElementById(
    "categoria_monotributo_esposa_section"
  ).style.display = tipoContratacionEsposa === "Monotributo" ? "block" : "none";
  document.getElementById("sueldo_e").style.display =
    tipoContratacionEsposa === "Recibo de Sueldo" ? "block" : "none";
  if (tipoContratacionEsposa !== "Recibo de Sueldo")
    document.getElementById("sueldo_esposa").value = 0;
}

document
  .getElementById("tipo_contratacion_esposa")
  .addEventListener("change", updateContratacionEsposa);

// Actualizar campos de edad de hijos según la cantidad ingresada
function updateHijosEdades() {
  document
    .getElementById("cantidad_hijos")
    .addEventListener("input", function () {
      let cantidad = parseInt(this.value, 10);
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
}

// Enviar datos del formulario al servidor
document.getElementById("cotizar").addEventListener("click", function (event) {
  event.preventDefault();

  const jsonData = {
    age: parseInt(document.getElementById("edad_titular").value, 10),
    maritalStatus: document.getElementById("estado_civil").value,
    wifeAge: parseInt(document.getElementById("edad_esposa").value, 10) || null,
    membershipWife:
      document.getElementById("tipo_contratacion_esposa").value || null,
    salaryWife:
      parseInt(document.getElementById("sueldo_esposa").value, 10) || 0,
    categoryMonotributeWife:
      document.getElementById("categoria_monotributo_esposa").value || null,
    numberSons:
      parseInt(document.getElementById("cantidad_hijos").value, 10) || null,
    membership: document.getElementById("tipo_contratacion").value,
    salary: parseInt(document.getElementById("sueldo_titular").value, 10) || 0,
    categoryMonotribute:
      document.getElementById("categoria_monotributo").value || null
  };

  if (document.getElementById("hijos_si").checked) {
    jsonData.sons = true;
    jsonData.ageSons = [];
    for (
      let i = 1;
      i <= parseInt(document.getElementById("cantidad_hijos").value, 10);
      i++
    ) {
      jsonData.ageSons.push(
        parseInt(document.getElementById(`edad_hijo_${i}`).value, 10)
      );
    }
  } else {
    jsonData.sons = false;
  }
  fetch("https://crudbackend.cober.online/quote/2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonData)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .then(createCardQuote)
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
    });
});

// Crear las tarjetas de cotización
function createCardQuote(quotes) {
  const quotesContainer = document.getElementById("cotizaciones");
  quotesContainer.innerHTML = ""; // Limpiar contenedor antes de agregar nuevas tarjetas
  const estadoCivil = document.getElementById("estado_civil").value;
  const data = {
    cobertura: estadoCivil === "Soltero" ? "Individual" : "Matrimonio",
    edad: document.getElementById("edad_titular").value,
    hijos: document.getElementById("hijos_si").checked
      ? "Con Hijos"
      : "Sin Hijos",
    contratacion: document.getElementById("tipo_contratacion").value
  };

  Object.keys(quotes.WithDs).forEach((key) => {
    const quoteNoDs = parseFloat(quotes.NoDs[key]).toFixed(0);
    const quoteWithDs = parseFloat(quotes.WithDs[key]).toFixed(0);
    const descuentos = quotes.Discounts;
    const descuentoTitular =
      data.contratacion === "Recibo de Sueldo"
        ? `<span>Aportes Titular RelDep</span><span class="text-success fw-semibold"> -$${parseFloat(
            descuentos.Owner
          ).toFixed(0)}</span>`
        : `<span>Aporte/Descuento Monotributo</span><span class="text-success fw-semibold"> -$${parseFloat(
            descuentos.Owner
          ).toFixed(0)}</span>`;

    const descuentoEsposa =
      data.contratacion === "Recibo de Sueldo"
        ? `<span>Aportes Esposa/Conyuge RelDep</span><span class="text-success fw-semibold"> -$${parseFloat(
            descuentos.Wife
          ).toFixed(0)}</span>`
        : `<span>Aporte Monotributo Esposa/Conyuge</span><span class="text-success fw-semibold"> -$${parseFloat(
            descuentos.Wife
          ).toFixed(0)}</span>`;

          const cardHtml = `
          <div class="card mt-2 mt-lg-0">
            <div class="card-body">
              <div class="mb-4 d-flex justify-content-between align-items-center">
                <h4 class="mb-1">Cotización Plan</h4>
              </div>
              <div class="d-md-flex">
                <div><img src="../assets/images/Zipper.PNG" alt="" class="img-4by3-xl rounded" width="120px" /></div>
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
                <li class="d-flex align-items-center list-group-item px-0">
                  <span class="me-2">Descuento</span>
                  <div class="icon-shape icon-lg bg-light-success text-success rounded-circle me-2">
                    <i class="fe fe-pie-chart fs-3"></i>
                  </div>
                  <span class="text-success fw-semibold"> -$${parseFloat(descuentos.Total).toFixed(0)}</span>
                </li>
                <li class="d-flex align-items-center list-group-item px-0">
                  <span class="me-2">Total a Pagar</span>
                  <span class="text-dark fw-semibold me-2">$${quoteWithDs}</span>
                  <div class="icon-shape icon-lg bg-light-danger text-danger rounded-circle">
                    <i class="fe fe-shopping-cart fs-3"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>`;
    
        quotesContainer.insertAdjacentHTML("beforeend", cardHtml);
      });
    }