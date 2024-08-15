const apiUrl = "https://script.googleusercontent.com/a/macros/grupocober.online/echo?user_content_key=p5VIUw817A3ruGqccmKb7Vl_togX4_FkW5wODZPa9oNVsyyVvWNVy7npqQmOED3AOO2Pw2qtkR4jfX6JUFweAoYTP8WfJECMOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKAMvgmFF6Zo6ewm7a-wb37p24oBiCXIgg4Vf-dR8dyPOSygQuMMGugn56ZkmZNBt5Xw8kC4BatO2onnV50Jl2yu5dj4m6L6dblcdwgRrRA4aoFrAiSvR_bN448sI_il3PVcy6pr-Oj0FQ&lib=MSmCyi5M1QFWbYo20HW2AZnFr3qi2vAlX ";

// Función para formatear la fecha
function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Función para obtener los datos y crear las tarjetas
function fetchData() {
    console.log('Fetching data...');
    const urlWithTimestamp = `${apiUrl}&timestamp=${new Date().getTime()}`;
    fetch(urlWithTimestamp)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched Data:", data); // Verificar los datos obtenidos
            createCards(data); // Crea las tarjetas
        })
        .catch(error => console.error("Error fetching data:", error));
}

function createCards(data) {
    console.log("Creating Cards with Data:", data); // Verificar los datos utilizados para crear tarjetas
    const row = document.getElementById("prospecto-container"); // Contenedor para las tarjetas
    row.innerHTML = ""; // Limpiar el contenedor antes de añadir nuevas tarjetas

    data.forEach(person => {
        // Asegúrate de que person.evolución esté en el formato correcto (p.ej., "25%", "50%", "75%", "100%")
        const evolution = person.evolución || '0%';

        const cardHtml = `
            <div class="col-xl-4 col-lg-6 col-md-6 col-12">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="text-start">
                            <div class="position-relative">
                                <img src="../../assets/images/avatar/avatar-12.jpg" class="rounded-circle avatar-md mb-3" alt="">
                                <a href="#" class="position-absolute mt-8 ms-n5">
                                    <span class="status bg-success"></span>
                                </a>
                            </div>
                            <h4 class="mb-0">${person.nombre}</h4>
                        </div>
                        <div class="mt-4 p-0">
                            <div class="d-flex justify-content-between">
                                <div class="w-100 py-2 px-3 border-top border-bottom">
                                    <h6 class="mb-0">Fecha de Ingreso:</h6>
                                    <p class="text-dark fs-6 fw-semibold mb-0">${formatDate(person.Fecha)}</p>
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
                            <span class="text-dark">${person.Celular}</span>
                        </div>
                        <div class="d-flex justify-content-between border-bottom py-2">
                            <span>Estado Prospecto</span>
                            <span class="text-dark">${person.estado}</span>
                        </div>
                        <div class="d-flex justify-content-between pt-2">
                            <div class="pt-2">
                                <span>Estado</span>
                            </div>
                            <select class="form-select w-65 d-flex text-center" id="category">
                                <option value="">${person.estado || "Seleccionar Estado"}</option>
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
                            <div class="progress-bar bg-success" role="progressbar" style="width: ${evolution};" aria-valuenow="${parseInt(evolution, 10)}" aria-valuemin="0" aria-valuemax="100">
                                <span>${evolution}</span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end mt-5">
                            <a href="detalle-prospecto.html" class="btn btn-primary me-2">Detalles del Prospecto</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        row.insertAdjacentHTML("beforeend", cardHtml);
    });
}
// Llamar a fetchData de forma periódica
setInterval(fetchData, 6000); // Actualizar cada 60 segundos (60000 ms)

// Inicializar la primera carga de datos
fetchData();

// Función para crear la tabla
function createTable(data) {
  console.log("Creating Table with Data:", data); // Verificar los datos utilizados para crear la tabla
  const tableContainer = document.getElementById("prospecto-table");
  tableContainer.innerHTML = `
        <table class="table mb-0 text-nowrap table-hover table-centered">
            <thead class="table-light">
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
                  .map(
                    (person) => `
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <div class="position-relative">
                                    <img src="../../assets/images/avatar/avatar-12.jpg" alt="" class="rounded-circle avatar-md me-2">
                                    <a href="#" class="position-absolute mt-5 ms-n4">
                                        <span class="status bg-success"></span>
                                    </a>
                                </div>
                                <h5 class="mb-0">${person.nombre}</h5>
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
                                    <span class="badge bg-${getBadgeClass(
                                      person.Estado
                                    )}">${person.Estado || "N/A"}</span>
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
                `
                  )
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
