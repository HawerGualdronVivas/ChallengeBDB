const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Tabla de practicantes
  db.run(`CREATE TABLE IF NOT EXISTS practicantes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    programa TEXT,
    fecha_ingreso TEXT,
    estado TEXT,
    responsable TEXT
  )`);

  // Tabla de avances
  db.run(`CREATE TABLE IF NOT EXISTS avances (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    practicante_id INTEGER,
    descripcion TEXT,
    fecha TEXT,
    retroalimentacion TEXT,
    FOREIGN KEY (practicante_id) REFERENCES practicantes(id)
  )`);

  // Tabla de usuarios para login
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    rol TEXT CHECK (rol IN ('practicante', 'responsable'))
  )`);

  // Inserción de usuarios de prueba si no existen
  db.run(`INSERT OR IGNORE INTO usuarios (email, password, rol) VALUES 
    ('practicante@correo.com', '123456', 'practicante'),
    ('responsable@correo.com', 'admin123', 'responsable')
  `);
});

module.exports = db;
