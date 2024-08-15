const express = require("express");
const fetch = require("node-fetch"); // Asegúrate de instalar esta dependencia con `npm install node-fetch`
const app = express();
const port = 3000; // Verifica si este es el puerto correcto
// URL de tu Google Apps Script
const apiUrl =
  "https://script.google.com/macros/s/AKfycbzpYoYeg-qF0NM7Gc55eDaJAqkWksr4DEhSlboheZJQNZ6zTHIhy1wq3411oy4ugRnM/exec";
// Configurar CORS para permitir acceso desde cualquier origen
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/data", async (req, res) => {
  try {
    // Realizar la solicitud a la API del Google Apps Script
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(1
        `Error fetching data: ${response.status} ${response.statusText}`
      );
      res.status(500).send("Error al obtener datos");
      return;
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error al obtener datos");
  }
});
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
