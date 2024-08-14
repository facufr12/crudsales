# CRUD Sales
 script Appscript
function doGet() {
  // Obtener el Spreadsheet y la hoja activa
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var range = sheet.getDataRange();
  var values = range.getValues();

  // Convertir los datos a JSON
  var json = [];
  var headers = values[0]; // La primera fila como encabezados

  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    json.push(obj);
  }

  // Configurar la respuesta
  return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(ContentService.MimeType.JSON);
}

## Enlaces

- **Despliegue en Render:**
  - [Enlace al Sitio Desplegado](https://crud-sales.onrender.com/)
  - [Enlace al Panel de Render](https://dashboard.render.com/)

- **Diagrama Miro:**
  - [Enlace al Código Site Map](https://miro.com/app/board/uXjVMtMwTMs=/)
  - [Enlace al panel de Miro](https://miro.com/app/board)

- **Libreria de Gráficos del DashBoard:**
  - [Enlace a apexcharts](https://apexcharts.com/)
