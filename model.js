"use strict"
const db = require('./config/database.js');

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(username, name, password, position) {
    this.username = username
    this.name = name
    this.password = password
    this.position = position
  }
}

class Model {
  static createTable(callback) {
    let queryEmployees = `CREATE TABLE IF NOT EXISTS Employees 
                              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                               username VARCHAR,
                               name VARCHAR,
                               password VARCHAR,
                               position VARCHAR,
                               status VARCHAR);`;
    let queryPatients = `CREATE TABLE IF NOT EXISTS Patients 
                              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                               name VARCHAR,
                               diagnosis VARCHAR);`;
    db.run(queryEmployees);
    db.run(queryPatients);
    callback('Table has been created')
  }

  static readFile(tableName, cbData) {
    let sql = `SELECT * FROM '${tableName}';`;
    db.all(sql, (err, data) => {
      if (err) {
        cbData(err.message, true)
      } else {
        cbData(data, false);
      }
    });
  }

  static addEmployee(username, name, password, position, cbEmployee) {
    let employee = new Employee(username, name, password, position);
    let queryEmployee = `INSERT INTO Employees 
                         VALUES (NULL, '${employee.username}', '${employee.name}', '${employee.password}', '${employee.position}', 'unavailable');`;

    db.run(queryEmployee, (err) => {
      if (err) {
        cbEmployee(err.message, true);
      } else {
        Model.readFile('Employees', (data, err) => {
          cbEmployee(`save data success ${JSON.stringify(data[data.length - 1])}. Total employee: ${data.length}`, false);
        });
      }
    });
  }

  static loginEmployee(username, password, cbLogin) {
    db.all(`SELECT username, password FROM Employees WHERE username = '${username}' AND password = '${password}';`, (err, rows) => {
      if (rows.length === 0) {
        cbLogin(false);
      } else {
        let queryLogin = `UPDATE Employees 
                          SET status = 'available' 
                          WHERE username = '${username}' 
                          AND password = '${password}';`;
        db.run(queryLogin, (err) => {
          cbLogin(true);
        });
      }
    });
  }

  static addPatient(name, diagnosis, cbPatient) {
    db.all(`SELECT status, position FROM Employees WHERE status = 'available' AND position = 'doctor';`, (err, rows) => {
      if (rows.length === 0) {
        cbPatient(`Have no access for add patient`);
      } else {
        Model.readFile('Patients', (data, err) => {
          let id = data.length + 1;
          let patient = new Patient(id, name, diagnosis);
          let queryPatient = `INSERT INTO Patients 
                              VALUES (NULL, '${patient.name}', '${patient.diagnosis}');`;
          db.run(queryPatient, (err) => {
            if (err) {
              cbPatient(err.message, true);
            } else {
              cbPatient(`Data patient has been added. Total data patient: ${data.length + 1}`, false);
            }
          });
        });
      }
    });
  }

  static logoutEmployee(cbLogout) {
    db.all(`SELECT status FROM Employees WHERE status = 'available';`, (err, rows) => {
      if (rows.length === 0) {
        cbLogout(false);
      } else {
        let queryLogout = `UPDATE Employees 
                           SET status = 'unavailable' 
                           WHERE status = 'available';`;
        db.run(queryLogout, (err) => {
          cbLogout(true);
        });
      }
    });
  }
}

module.exports = Model;