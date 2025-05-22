const express = require('express');
const router = express.Router();
const db = require('../models/initDB');

// Obtener todos los practicantes
router.get('/', (req, res) => {
  db.all("SELECT * FROM practicantes", [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

// Crear nuevo practicante
router.post('/', (req, res) => {
  const { nombre, programa, fecha_ingreso, estado, responsable } = req.body;
  db.run(`INSERT INTO practicantes (nombre, programa, fecha_ingreso, estado, responsable)
          VALUES (?, ?, ?, ?, ?)`,
    [nombre, programa, fecha_ingreso, estado, responsable],
    function(err) {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: this.lastID });
    });
});

// Actualizar practicante
router.put('/:id', (req, res) => {
  const { nombre, programa, fecha_ingreso, estado, responsable } = req.body;
  db.run(`UPDATE practicantes SET nombre=?, programa=?, fecha_ingreso=?, estado=?, responsable=? WHERE id=?`,
    [nombre, programa, fecha_ingreso, estado, responsable, req.params.id],
    function(err) {
      if (err) return res.status(500).send(err);
      res.json({ updated: this.changes });
    });
});

// Eliminar practicante
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM practicantes WHERE id=?`, [req.params.id], function(err) {
    if (err) return res.status(500).send(err);
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
