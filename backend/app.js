
const express = require('express');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  })
);

app.use(express.json({ limit: '50kb' }));

// Ruta de prueba
app.get('/api', (req, res) => {
  res.status(200).json({
    ok: true,
    proyecto: 'Taller de Arquitectura AVV',
    mensaje: 'Backend funcionando correctamente',
  });
});

// Rutas inexistentes
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: 'Ruta no encontrada',
  });
});

module.exports = app;
