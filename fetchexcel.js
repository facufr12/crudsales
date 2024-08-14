// Variable global para almacenar los datos
let globalData = [];

// URL del servidor
const apiUrl = "http://127.0.0.1:3000/data";

// Función para obtener los datos y almacenarlos en la variable global
function fetchData() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Almacena los datos en la variable global
      globalData = data;

      // Llama a funciones para mostrar los datos en diferentes partes
      renderDataSection("data-section", globalData);
      distributeData(globalData);
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById(
        "data-section"
      ).innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
    });
}

function renderDataSection(containerId, data) {
  const container = document.getElementById(containerId);
  if (container) {
    if (data.length > 0) {
      container.innerHTML = data
        .map(
          (item) => `
                <div class="card" onclick="showCard('${item.nombre}', ${
            item.Edad
          }, '${item["Tipo de Afiliación"]}', '${item["Grupo Familiar"]}', '${
            item.Celular
          }', '${item.Correo}', '${item.Partido}', '${new Date(
            item.Fecha
          ).toLocaleDateString()}', '${item.Hora}', '${item.vendedor}', '${
            item["Estado del correo Asignación"]
          }', '${item["Fecha de Envío"]}', '${item["Estado Prospecto"]}', '${
            item["Fecha de asignación del estado del prospecto"]
          }', '${item["Envío Prospecto con Estado Aporte por Aporte"]}', '${
            item["Fecha Envío Prospecto con Estado Aporte por Aporte"]
          }', '${item["Envío WA"]}', '${item["Fecha envío WA"]}', '${
            item["ingreso lead"]
          }')">
                    <div class="card-header">
                        <h3>${item.nombre}</h3>
                    </div>
                    <div class="card-body">
                        <p><strong>Edad:</strong> ${item.Edad}</p>
                        <p><strong>Tipo de Afiliación:</strong> ${
                          item["Tipo de Afiliación"]
                        }</p>
                        <p><strong>Grupo Familiar:</strong> ${
                          item["Grupo Familiar"]
                        }</p>
                        <p><strong>Celular:</strong> ${item.Celular}</p>
                        <p><strong>Correo:</strong> ${item.Correo}</p>
                        <p><strong>Partido:</strong> ${item.Partido}</p>
                    </div>
                </div>
            `
        )
        .join("");
    } else {
      container.innerHTML = "<p>No se encontraron datos.</p>";
    }
  } else {
    console.error("Elemento con ID " + containerId + " no encontrado.");
  }
}
// Función para mostrar la tarjeta en otro archivo
function showCard(
  nombre,
  edad,
  tipoAfiliacion,
  grupoFamiliar,
  celular,
  correo,
  partido,
  fecha,
  hora,
  vendedor,
  estadoCorreo,
  fechaEnvio,
  estadoProspecto,
  fechaAsignacion,
  envioEstadoAporte,
  fechaEnvioAporte,
  envioWA,
  fechaEnvioWA,
  ingresoLead
) {
  const cardContainer = document.getElementById("card-container"); // Asegúrate de tener un contenedor en tu HTML para cargar la tarjeta
  fetch("card.html")
    .then((response) => response.text())
    .then((html) => {
      cardContainer.innerHTML = html;

      // Llenar los datos en la tarjeta
      document.getElementById("card-name").innerText = nombre;
      document.getElementById("card-age").innerText = edad;
      document.getElementById("card-affiliation").innerText = tipoAfiliacion;
      document.getElementById("card-family-group").innerText = grupoFamiliar;
      document.getElementById("card-cell").innerText = celular;
      document.getElementById("card-email").innerText = correo;
      document.getElementById("card-party").innerText = partido;
      document.getElementById("card-date").innerText = fecha;
      document.getElementById("card-time").innerText = hora;
      document.getElementById("card-seller").innerText = vendedor;
      document.getElementById("card-email-status").innerText = estadoCorreo;
      document.getElementById("card-send-date").innerText = fechaEnvio;
      document.getElementById("card-prospect-status").innerText =
        estadoProspecto;
      document.getElementById("card-prospect-assignment-date").innerText =
        fechaAsignacion;
      document.getElementById("card-contribution-status").innerText =
        envioEstadoAporte;
      document.getElementById("card-contribution-send-date").innerText =
        fechaEnvioAporte;
      document.getElementById("card-wa-send").innerText = envioWA;
      document.getElementById("card-wa-send-date").innerText = fechaEnvioWA;
      document.getElementById("card-lead-entry").innerText = ingresoLead;
    })
    .catch((error) => {
      console.error("Error al cargar la tarjeta:", error);
    });
}

// Función para distribuir los datos a secciones específicas
function distributeData(data) {
  const sections = document.querySelectorAll(".filtered-data");
  sections.forEach((section) => {
    const filter = section.getAttribute("data-filter");
    const filteredData = data.filter((item) => {
      return (
        (filter === "filter2" && item.Edad >= 30) ||
        (filter === "filter1" && item.Edad < 30)
      );
    });
    
    if (filteredData.length > 0) {
      section.innerHTML = filteredData
        .map(
          (item) => `
                <div class="card" onclick="showCard('${item.nombre}', ${
            item.Edad
          }, '${item["Tipo de Afiliación"]}', '${item["Grupo Familiar"]}', '${
            item.Celular
          }', '${item.Correo}', '${item.Partido}', '${new Date(
            item.Fecha
          ).toLocaleDateString()}', '${item.Hora}', '${item.vendedor}', '${
            item["Estado del correo Asignación"]
          }', '${item["Fecha de Envío"]}', '${item["Estado Prospecto"]}', '${
            item["Fecha de asignación del estado del prospecto"]
          }', '${item["Envío Prospecto con Estado Aporte por Aporte"]}', '${
            item["Fecha Envío Prospecto con Estado Aporte por Aporte"]
          }', '${item["Envío WA"]}', '${item["Fecha envío WA"]}', '${
            item["ingreso lead"]
          }')">
                    <div class="card-header">
                        <h3>${item.nombre}</h3>
                    </div>
                    <div class="card-body">
                        <p><strong>Edad:</strong> ${item.Edad}</p>
                        <p><strong>Tipo de Afiliación:</strong> ${
                          item["Tipo de Afiliación"]
                        }</p>
                        <p><strong>Grupo Familiar:</strong> ${
                          item["Grupo Familiar"]
                        }</p>
                        <p><strong>Celular:</strong> ${item.Celular}</p>
                        <p><strong>Correo:</strong> ${item.Correo}</p>
                        <p><strong>Partido:</strong> ${item.Partido}</p>
                    </div>
                </div>
            `
        )
        .join("");
    } else {
      section.innerHTML = "<p>No se encontraron datos para este filtro.</p>";
    }
  });
}

// Carga los datos cuando la página se carga
window.onload = fetchData;
