const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db');

class Database {
  static setup(callback) {
    let queryTableEmployees = `CREATE TABLE IF NOT EXISTS Employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50),
      position VARCHAR(30),
      username VARCHAR(30),
      password VARCHAR(30),
      loginStatus BOOLEAN
    )`;
    let queryTablePatients = `CREATE TABLE IF NOT EXISTS Patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50),
      diagnose TEXT
    )`;

    db.run(queryTableEmployees, (err) => {
      if (err) {
        console.log('Error:', err);
      } else {
        console.log('Create table employees success!');
      }
    })

    db.run(queryTablePatients, (err) => {
      if (err) {
        console.log('Error:', err);
      } else {
        console.log('Create table patients success!');
      }
    })

    callback('Creating table...')
  }
}

module.exports = {
  db,
  Database
}
