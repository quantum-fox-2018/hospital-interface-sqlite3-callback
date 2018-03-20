const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize(function(){


  let createTableEmployeeQuery = `CREATE TABLE employees
              (id INTEGER PRIMARY KEY AUTOINCREMENT,
                username VARCHAR,
                password VARCHAR,
                position VARCHAR,
                isLogin INTEGER
              )`

  let createTablePatientQuery = `CREATE TABLE patients
              (id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR,
                diagnosis VARCHAR
              )`


  db.run(createTableEmployeeQuery)
  db.run(createTablePatientQuery)
})
db.close()
