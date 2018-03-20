const controller = require('./controller.js');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hospital.db');

 // db.close(); db.close(); db.close(); db.close(); db.close(); db.close(); db.close(); db.close(); db.close();
class Model {
  constructor() {

  }
  static register(candidate, cb) {
    db.serialize(function() {
      db.run("create table if not exists Employees (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(30), role varchar(30), username varchar(30), password varchar(30), isloggedin INTEGER);")

      db.run("INSERT INTO Employees VALUES (NULL, ?, ?, ?, ?, ?)", [candidate.name, candidate.role, candidate.username, candidate.password, candidate.isloggedin])

      db.all("select * from Employees;", function(err, row) {
        cb(row.length, candidate);
      });
    });
    db.close()
  }

  static login(username, password, cb) {
    db.serialize(function() {
      db.all("select username, password, isloggedin from Employees where username = ? and password = ?;", [username, password], function(err, row) {
        if (row.length === 0) {
          cb(statusLogin, false)
        } else {
          db.run("update or replace Employees set isloggedin = ? where username = ? and password = ?", [1, username, password])
          cb(username, true)
        }
      });
    });
    // db.close()
  }

  static addPatient(namaPasien, keluhan, cb) {
    db.serialize(function() {
      db.run("create table if not exists Patients (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(30), diagnosis varchar(100));")

      db.all("select * from Employees where isloggedin = 1 and role = 'dokter';", function(err, row) {
        if (row.length == 0) {
          cb(false, false)
        } else {
          let patient = new Patient(namaPasien, keluhan)
          db.run("INSERT INTO Patients VALUES (NULL, ?, ?)", [patient.name, patient.diagnosis])
          db.all("SELECT * from Patients;", function(err, row) {
            cb(row.length, true)
          });
        }
      });
    });
  }

  static logout(username, password, cb) {
    db.serialize(function() {
      db.all("select username, password, isloggedin from Employees where username = ? and password = ?;", [username, password], function(err, row) {
        if (row.length === 0) {
          cb(false)
        } else {
          db.run("update or replace Employees set isloggedin = ? where username = ? and password = ?", [0, username, password])
          cb(username)
        }
      });
    });
  }
}


class Patient {
  constructor(name, diagnosis) {
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.role = position
    this.username = username
    this.password = password
    this.isloggedin = 0
  }
}

class Admin extends Employee {
  constructor(name, role, username, password) {
    super(name, role, username, password)
  }
}
class OfficeBoy extends Employee {
  constructor(name, role, username, password) {
    super(name, role, username, password)
  }
}

class Receptionist extends Employee {
  constructor(name, role, username, password) {
    super(name, role, username, password)
  }
}

class Dokter extends Employee {
  constructor(name, role, username, password) {
    super(name, role, username, password)
  }
}

module.exports = {Model, Admin, OfficeBoy, Receptionist, Dokter}
