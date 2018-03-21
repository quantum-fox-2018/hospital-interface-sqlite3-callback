/*jshint esversion:6*/

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hospital.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

class Database {
  static setup() {
    db.serialize(() => {
      let createTableEmployee = `CREATE TABLE IF NOT EXISTS employees (
            employee_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            position TEXT NOT NULL,
            username VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            status VARCHAR NOT NULL
          )`;

      let createTablePatient = `CREATE TABLE IF NOT EXISTS patients (
            patient_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            gender VARCHAR NOT NULL,
            address VARCHAR NOT NULL
          )`;

      let createTableRecordMedis = `CREATE TABLE IF NOT EXISTS record_medis (
            recordMedis_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            patient_id INTEGER NOT NULL,
            employee_id INTEGER NOT NULL,
            tanggal NUMERIC NOT NULL,
            diagnosis TEXT NOT NULL,
            medicine TEXT NOT NULL,
            name_docter TEXT NOT NULL,
            FOREIGN KEY (patient_id) REFERENCES Voters(patient_id),
            FOREIGN KEY (employee_id) REFERENCES Candidates(employee_id)
          )`;

      db.run(createTableEmployee, (err) => {
        if (err) throw err;
        else {
          console.log('Table employees created successfully');
        }
      });

      db.run(createTablePatient, (err) => {
        if (err) throw err;
        else {
          console.log('Table patients created successfully');
        }
      });

      db.run(createTableRecordMedis, (err) => {
        if (err) throw err;
        else {
          console.log('Table record_medis created successfully');
        }
      });
    });
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }
}

Database.setup();
