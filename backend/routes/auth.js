const express = require('express');
const router = express.Router();
const db = require('../models/initDB');

// POST /api/login
router.post('/', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT id, email, rol FROM usuarios WHERE email = ? AND password = ?`, [email, password], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.status(200).json({ message: 'Login exitoso', user });
  });
});

module.exports = router;
