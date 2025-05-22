const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS practicantes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    programa TEXT,
    fecha_ingreso TEXT,
    estado TEXT,
    responsable TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS avances (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    practicante_id INTEGER,
    descripcion TEXT,
    fecha TEXT,
    retroalimentacion TEXT,
    FOREIGN KEY (practicante_id) REFERENCES practicantes(id)
  )`);
});

module.exports = db;
