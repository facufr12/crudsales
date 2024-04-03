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
      var cantidad = parseInt(this.value);
      var edadesHtml = "";
      for (var i = 0; i < cantidad; i++) {
        edadesHtml +=
          '<label for="edad_hijo_' +
          (i + 1) +
          '">Edad del hijo ' +
          (i + 1) +
          ":</label><br>";
        edadesHtml +=
          '<input type="number" id="edad_hijo_' +
          (i + 1) +
          '" name="edad_hijo_' +
          (i + 1) +
          '" required><br><br>';
      }
      document.getElementById("edades_hijos").innerHTML = edadesHtml;
    });
});

document.getElementById("hijos_no").addEventListener("click", function () {
  document.getElementById("hijos_section").style.display = "none";
  document.getElementById("edades_hijos").innerHTML = "";
});

document
  .getElementById("formulariooo")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Crear el objeto JSON según el formato deseado
    const jsonData = {
      name: document.getElementById("nombre").value,
      location: document.getElementById("localidad").value,
      age: parseInt(document.getElementById("edad").value),
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
      email: document.getElementById("email").value,
      cel: document.getElementById("celular").value,
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
        console.log(document.getElementById(`edad_hijo_${i}`).value);
        jsonData.ageSons.push(
          parseInt(document.getElementById(`edad_hijo_${i}`).value)
        );
      }
    } else if (opcionNo.checked) {
      jsonData.sons = false;
    }
    console.log(jsonData);
    // Enviar los datos del formulario a la URL deseada
    fetch("https://2be6-190-210-23-53.ngrok-free.app/quote/2", {
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
          const quotesContainer = document.getElementById("cotizaciones");
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
              element.textContent = `$${key}: ${value}`;

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
              element.textContent = `$${key}: ${value}`;

              // Agregar los elementos al contenedor en el DOM
              listDs.appendChild(element);
            }
          }
          quotesContainer.appendChild(listDs);
        });
      })
      .catch((error) => {
        console.error("Error al enviar los datos:");
        console.log(error.message);
      });
  });
