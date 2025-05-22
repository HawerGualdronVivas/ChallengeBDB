const express = require('express');
const router = express.Router();
const db = require('../models/initDB');

// Obtener avances de un practicante
router.get('/:practicanteId', (req, res) => {
  db.all(`SELECT * FROM avances WHERE practicante_id = ?`, [req.params.practicanteId], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

// Registrar nuevo avance
router.post('/', (req, res) => {
  const { practicante_id, descripcion, fecha, retroalimentacion } = req.body;
  db.run(`INSERT INTO avances (practicante_id, descripcion, fecha, retroalimentacion)
          VALUES (?, ?, ?, ?)`,
    [practicante_id, descripcion, fecha, retroalimentacion],
    function(err) {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: this.lastID });
    });
});

module.exports = router;
