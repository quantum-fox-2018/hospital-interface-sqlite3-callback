//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospitals.db');

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS Employees
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(50),
          position VARCHAR(10),
          username VARCHAR(10),
          password VARCHAR(50),
          isLogin INTEGER(1))`);

  db.run(`CREATE TABLE IF NOT EXISTS Patients
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(50))`);

  db.run(`CREATE TABLE IF NOT EXISTS Diagnoses
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          diagnosis VARCHAR(50),
          patientId INTEGER REFERENCES Patients(id))`);
});

db.close();
