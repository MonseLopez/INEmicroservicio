const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/persona', (req, res) => {
  const data = req.body;
  const query = `
    INSERT INTO personas
    (nombre, apellido_paterno, apellido_materno, curp, clave_elector, anio_registro, seccion, estado, municipio, domicilio)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    data.nombre,
    data.apellido_paterno,
    data.apellido_materno,
    data.curp,
    data.clave_elector,
    data.anio_registro,
    data.seccion,
    data.estado,
    data.municipio,
    data.domicilio
  ], (err, results) => {
    if (err) {
      console.error('Error al guardar datos:', err);
      res.status(500).json({ message: 'Error en el servidor' });
    } else {
      res.status(201).json({ message: 'Datos guardados correctamente' });
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
 