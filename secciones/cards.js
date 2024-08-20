let globalData = []; // Variable global para almacenar los datos obtenidos

// Fetch al JSON generado del Sheets
const apiUrl =
  "https://script.googleusercontent.com/macros/echo?user_content_key=gIdVyLfZVXlhTXU4uuU2XnPLpnrRfk1hzAl8XVeXlYzMlieUYvq5IGabbou2u0IOGMsVD0EV5clmds2lgJVbW3P1RmrawUZEm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGl29ebRzV5W6uyGQ719j1FkITB3Rt2REr1pZZbDsf3A25jJWAnGi-e7pGUVOMvitr1rG2gmFWXHZjyC-rd-UKymlTLhpyY2jg&lib=MSmCyi5M1QFWbYo20HW2AZnFr3qi2vAlX";

// Función para formatear la fecha
function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Función para obtener los datos y crear las tarjetas
// Función para obtener los datos y crear las tarjetas
function fetchData() {
  console.log("Fetching data...");

  // Mostrar el spinner
  document.getElementById("loading-spinner").classList.remove("d-none");

  const urlWithTimestamp = `${apiUrl}&timestamp=${new Date().getTime()}`;
  fetch(urlWithTimestamp)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched Data:", data); // Verificar los datos obtenidos
      globalData = data; // Almacenar los datos globalmente
      createCards(data); // Crear las tarjetas
      createTable(data); // Crear la tabla
    })
    .catch((error) => console.error("Error fetching data:", error))
    .finally(() => {
      // Ocultar el spinner
      document.getElementById("loading-spinner").classList.add("d-none");
    });
}

// Función para crear las tarjetas
function createCards(data) {
  console.log("Creating Cards with Data:", data); // Verificar los datos utilizados para crear tarjetas
  const row = document.getElementById("prospecto-container"); // Contenedor para las tarjetas
  row.innerHTML = ""; // Limpiar el contenedor antes de añadir nuevas tarjetas

  data.forEach((person) => {
    // Generar las iniciales del nombre
    const initials = person.nombre
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    // Definir el color de fondo del avatar
    const avatarBackgroundColor = "#754ffe";

    // Asegúrate de que person.evolución esté en el formato correcto
    let evolution = person.evolución || "0%";

    // Convertir el valor de evolución a una cadena
    evolution = String(evolution);

    // Convertir el valor de evolución a un porcentaje entero para el ancho de la barra de progreso
    let evolutionValue;
    if (evolution.endsWith("%")) {
      // Si el valor ya está en porcentaje, eliminar el signo '%' y convertir a número
      evolutionValue = parseInt(evolution, 10);
    } else {
      // Convertir valores decimales a porcentaje entero
      evolutionValue = Math.round(parseFloat(evolution) * 100);
    }
    // Asegurarse de que el valor está dentro del rango de 0 a 100
    evolutionValue = Math.max(0, Math.min(100, evolutionValue));

    // Definir el color de la barra y el texto en función del valor de evolución
   // Determina el color de la barra y el color del texto basado en el valor de evolución
let barColor;
let textColor;

switch (evolutionValue) {
    case 0:
        barColor = "red";
        textColor = "white"; // Asegúrate de que el texto sea blanco
        break;
    case 25:
        barColor = "yellow";
        textColor = "white"; // Asegúrate de que el texto sea blanco
        break;
    case 50:
        barColor = "green";
        textColor = "white"; // Asegúrate de que el texto sea blanco
        break;
    case 75:
        barColor = "blue";
        textColor = "white"; // Asegúrate de que el texto sea blanco
        break;
    case 100:
        barColor = "#754ffe";
        textColor = "white"; // Asegúrate de que el texto sea blanco
        break;
    default:
        barColor = "grey"; // Color por defecto
        textColor = "grey"; // Ajuste del color del texto para contraste
        break;
}

// Crear HTML para la tarjeta con los estilos de la barra de progreso
const cardHtml = `
  <div class="col-xl-4 col-lg-6 col-md-6 col-12">
      <div class="card mb-4">
          <div class="card-body">
              <div class="text-start">
                  <div class="position-relative">
                      <!-- Aquí se inserta el avatar generado en lugar de la imagen -->
                      <div class="avatar" style="background-color: ${avatarBackgroundColor}; color: white; width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 24px; font-weight: bold; margin-bottom: 15px;">
                          ${initials}
                      </div>
                      <a href="#" class="position-absolute mb-5 mt-8 ms-n5">
                          <span class="status bg-success"></span>
                      </a>
                  </div>
                  <h6 class="text-uppercase mb-1" style="color: #754ffe;">${
                    person.Partido || "SIN PARTIDO"
                  }</h6> <!-- Aquí se añade el Partido en mayúsculas con el color deseado -->
                  <h4 class="mb-0">${person.nombre}</h4>
              </div>
            <div class="mt-4 p-0">
  <div class="d-flex justify-content-between">
    <div class="w-100 py-2 px-3 border-top border-bottom">
      <h6 class="mb-0">Fecha de Ingreso:</h6>
      <p class="text-dark fs-6 fw-semibold mb-0">${formatDate(person.Fecha)}</p>
    </div>
    <div class="w-100 py-2 px-3 border-top border-bottom">
      <h6 class="mb-0">Hora de Ingreso:</h6>
      <p class="text-dark fs-6 fw-semibold mb-0">${person.Hora}</p>
    </div>
  </div>
</div>
              <div class="d-flex justify-content-between border-bottom py-2">
                  <span>Edad</span>
                  <span class="text-dark">${person.Edad}</span>
              </div>
              <div class="d-flex justify-content-between border-bottom py-2 mt-3">
                  <span>Tipo de Afiliación</span>
                  <span class="text-dark">${person.tipoafiliacion}</span>
              </div>
              <div class="d-flex justify-content-between border-bottom py-2 mt-3">
                  <span>Grupo Familiar</span>
                  <span class="text-dark">${person.grupofamiliar}</span>
              </div>
         <div class="d-flex justify-content-between border-bottom py-2 mt-3">
  <span>Celular</span>
  <span class="text-dark d-flex align-items-center">
    <a href="https://wa.me/${person.Celular}" target="_blank" rel="noopener noreferrer">
      <img src="/icons/wpicon.png" alt="WhatsApp" class="icon-img" />
    </a>
  </span>
</div>
              <div class="d-flex justify-content-between pt-2">
                  <div class="pt-2">
                      <span>Estado</span>
                  </div>
                  <select class="form-select w-65 d-flex text-center" id="category">
                      <option value="">${
                        person.estado || "Seleccionar Estado"
                      }</option>
                      <option value="Venta Cerrada">Venta Cerrada</option>
                      <option value="Pago Pendiente">Pago Pendiente</option>
                      <option value="En Espera">En Espera</option>
                      <option value="Pasa de Vigencia">Pasa de Vigencia</option>
                      <option value="Es Afiliado">Es Afiliado</option>
                      <option value="Duplicado">Duplicado</option>
                      <option value="Desestimado Por Cober">Desestimado Por Cober</option>
                      <option value="No Le Interesa">No Le Interesa</option>
                      <option value="Rechazado">Rechazado</option>
                  </select>
              </div>
              <div class="progress progress-tooltip mt-5">
                  <div class="progress-bar" role="progressbar" style="width: ${evolutionValue}%; background-color: ${barColor};" aria-valuenow="${evolutionValue}" aria-valuemin="0" aria-valuemax="100">
                      <span style="color: ${textColor};">${evolutionValue}%</span>
                  </div>
              </div>
              
              
            <div class="d-flex justify-content-end mt-5">
              <!--  Button Cotizar Ocultado
              <a href="cotizador2.html" class="btn btn-secondary me-2">
                  Cotizar
                  <i class="fe fe-credit-card ms-2"></i>
              </a>
              -->
              <a href="detalle-prospecto.html" class="btn btn-primary">
                  Detalles del Prospecto
              </a>
          </div>
          </div>
      </div>
  </div>`;


    // Insertar el HTML en el contenedor
    row.insertAdjacentHTML("beforeend", cardHtml);
  });
}

// Llamar a fetchData de forma periódica cada 30 minutos (1800000 ms)
setInterval(fetchData, 1800000);
// Inicializar la primera carga de datos
fetchData();

// Función para crear la tabla
function createTable(data) {
  console.log("Creating Table with Data:", data); // Verificar los datos utilizados para crear la tabla
  const tableContainer = document.getElementById("prospecto-table");

  tableContainer.innerHTML = `
      <table class="table mb-0 text-nowrap table-hover table-centered table-custom">
        <thead>
          <tr>
            <th>Nombre y Apellido</th>
            <th>Celular</th>
            <th>Correo</th>
            <th>Fecha Ingreso</th>
            <th>Edad</th>
            <th>Localidad</th>
            <th>N° de Póliza</th>
            <th>Estado</th>
            <th>Modificar Estado</th>
            <th>Detalles del Prospecto</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map((person) => {
              // Generar las iniciales del nombre
              const initials = person.nombre
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();

              // Establecer el color de fondo del avatar
              const backgroundColor = "#754ffe"; // Puedes personalizar esto si deseas un color diferente por persona

              return `
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="avatar" style="background-color: ${backgroundColor};margin-right:10px; color: white; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 24px; font-weight: bold;">
                      ${initials}
                    </div>
                    <h5 class="mb-0 ms-2">${person.nombre}</h5>
                  </div>
                </td>
                <td>${person.Celular}</td>
                <td>${person.Correo}</td>
                <td>${formatDate(person.Fecha)}</td>
                <td>${person.Edad}</td>
                <td>${person.Partido}</td>
                <td>${person.NumeroPoliza || "N/A"}</td>
                <td>
                  <div class="d-flex">
                    <div class="d-flex text-center h-50">
                      <span class="badge bg-${getBadgeClass(person.Estado)}">${
                person.Estado || "N/A"
              }</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex">
                    <select class="form-select d-flex text-start" id="category-${
                      person.id
                    }">
                      <option value="">${
                        person.Estado || "Seleccionar Estado"
                      }</option>
                      <option value="Venta Cerrada">Venta Cerrada</option>
                      <option value="Pago Pendiente">Pago Pendiente</option>
                      <option value="En Espera">En Espera</option>
                      <option value="Pasa de Vigencia">Pasa de Vigencia</option>
                      <option value="Es Afiliado">Es Afiliado</option>
                      <option value="Duplicado">Duplicado</option>
                      <option value="Desestimado Por Cober">Desestimado Por Cober</option>
                      <option value="No Le Interesa">No Le Interesa</option>
                      <option value="Rechazado">Rechazado</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-content-center">
                    <a href="detalle-prospecto.html" class="btn btn-primary me-2">Ver Detalles del Prospecto</a>
                  </div>
                </td>
              </tr>
            `;
            })
            .join("")}
        </tbody>
      </table>
    `;
}

// Función para filtrar las tarjetas y la tabla
function filterCards(searchTerm) {
  console.log("Filtering Data with Search Term:", searchTerm); // Verificar el término de búsqueda
  const filteredData = globalData.filter((person) => {
    return (
      person.nombre.toLowerCase().includes(searchTerm) ||
      person.Partido.toLowerCase().includes(searchTerm)
    );
  });
  console.log("Filtered Data:", filteredData); // Verificar los datos filtrados
  createCards(filteredData); // Crear las tarjetas filtradas
  createTable(filteredData); // Crear la tabla filtrada
}

// Función para obtener la clase del badge basado en el estado
function getBadgeClass(estado) {
  switch (estado) {
    case "Venta Cerrada":
      return "success-soft";
    case "Pago Pendiente":
      return "info-soft";
    case "No Le Interesa":
      return "danger-soft";
    default:
      return "secondary-soft";
  }
}

// Función para manejar el cambio de vista
function toggleView(view) {
  const cardContainer = document.getElementById("prospecto-container");
  const tableContainer = document.getElementById("prospecto-table");

  if (view === "cards") {
    cardContainer.classList.remove("d-none");
    tableContainer.classList.add("d-none");
  } else {
    cardContainer.classList.add("d-none");
    tableContainer.classList.remove("d-none");
  }
}

// Agregar los eventos de los botones de vista
document.getElementById("viewCards").addEventListener("click", () => {
  toggleView("cards");
});
document.getElementById("viewTable").addEventListener("click", () => {
  toggleView("table");
});

// Agregar el evento de búsqueda
document.getElementById("search").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  filterCards(searchTerm); // Filtrar tarjetas y tabla en función del término de búsqueda
});

// Llamar a la función para obtener y mostrar los datos al cargar la página
window.onload = fetchData;
