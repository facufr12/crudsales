const apiUrl = 'http://127.0.0.1:3000/data'; // Asegúrate de que este puerto sea el correcto

function fetchData() {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Filtra los datos según tus criterios
      const section1Data = data.filter(item => item.Edad < 30); // Ejemplo: Edad menor a 30 para la Sección 1
      const section2Data = data.filter(item => item.Edad >= 30); // Ejemplo: Edad 30 o más para la Sección 2

      // Renderiza los datos en las secciones correspondientes
      renderSection('data-section1', section1Data);
      renderSection('data-section2', section2Data);
    })
    .catch(error => console.error('Error:', error));
}

function renderSection(containerId, data) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = data.map(item => `
      <div class="data-item">
        <p><strong>Nombre:</strong> ${item.nombre}</p>
        <p><strong>Edad:</strong> ${item.Edad}</p>
        <p><strong>Tipo de Afiliación:</strong> ${item["Tipo de Afiliación"]}</p>
        <p><strong>Grupo Familiar:</strong> ${item["Grupo Familiar"]}</p>
        <p><strong>Celular:</strong> ${item.Celular}</p>
        <p><strong>Correo:</strong> ${item.Correo}</p>
        <p><strong>Partido:</strong> ${item.Partido}</p>
        <p><strong>Fecha:</strong> ${new Date(item.Fecha).toLocaleDateString()}</p>
        <p><strong>Hora:</strong> ${item.Hora}</p>
        <p><strong>Vendedor:</strong> ${item.vendedor}</p>
        <p><strong>Estado del correo Asignación:</strong> ${item["Estado del correo Asignación"]}</p>
        <p><strong>Fecha de Envío:</strong> ${item["Fecha de Envío"]}</p>
        <p><strong>Estado Prospecto:</strong> ${item["Estado Prospecto"]}</p>
        <p><strong>Fecha de asignación del estado del prospecto:</strong> ${item["Fecha de asignación del estado del prospecto"]}</p>
        <p><strong>Envío Prospecto con Estado Aporte por Aporte:</strong> ${item["Envío Prospecto con Estado Aporte por Aporte"]}</p>
        <p><strong>Fecha Envío Prospecto con Estado Aporte por Aporte:</strong> ${item["Fecha Envío Prospecto con Estado Aporte por Aporte"]}</p>
        <p><strong>Envío WA:</strong> ${item["Envío WA"]}</p>
        <p><strong>Fecha envío WA:</strong> ${item["Fecha envío WA"]}</p>
        <p><strong>Ingreso Lead:</strong> ${item["ingreso lead"]}</p>
      </div>
    `).join('');
  } else {
    console.error('Elemento con ID ' + containerId + ' no encontrado.');
  }
}

// Carga los datos cuando la página se carga
window.onload = fetchData;
