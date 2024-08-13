// proxy-server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000; // Verifica si este es el puerto correcto

// URL de tu Google Apps Script
const apiUrl =
  "https://script.googleusercontent.com/a/macros/grupocober.online/echo?user_content_key=J5R3cd9wY7-9TpdNX8hPDVY-LfPU1beFfDso1v-PHvSOxOVHOiUL5BGGWP-i7fhdl8D_BNPYIYEJHzesiIXJqkBCUbtYatwCOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKAMvgmFF6Zo6ewm7a-wb37p24oBiCXIgg57e7UpQit3gzqLTyZZggD6ZwXMhLey5kacU0YuJvwA-9QNyZk34nLXOmjK0qsn17vY6-ZSd8LBcCMi9-kNHsG7aFx8hY91bYydJoCw8JvXDg&lib=MnJJWfZZA9dvbj3Wwchp_d2QyKQmgjrVn";

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
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error al obtener datos");
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
