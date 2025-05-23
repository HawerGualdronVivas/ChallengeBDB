const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const practicantesRoutes = require('./routes/practicantes');
const avancesRoutes = require('./routes/avances');
const authRoutes = require('./routes/auth');

require('./models/initDB'); // Inicializa la DB

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/practicantes', practicantesRoutes);
app.use('/api/avances', avancesRoutes);
app.use('/api/login', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
