// proxy-server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000; // Verifica si este es el puerto correcto

// URL de tu Google Apps Script
const apiUrl = 'https://script.google.com/macros/s/AKfycbxsFN5zkc3x5MzDnVgQ5ZN0fXy3AEmoD7EselIyNc3SsNi_9Bd7TV7tMiSVhG2MDPrl/exec';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/data', async (req, res) => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error al obtener datos');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
