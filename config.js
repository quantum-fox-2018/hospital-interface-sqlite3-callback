const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db');

db.serialize(function() {
// db.run("CREATE TABLE employees (employees_id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(20), position VARCHAR(10),username VARCHAR(10),password VARCHAR(10))");
// })

db.run("CREATE TABLE Patient (patient_id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(20), penyakit VARCHAR(100))");
})

db.close()
