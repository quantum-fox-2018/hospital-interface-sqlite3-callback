const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('hospital.db')

db.serialize(function(){
  db.run(`DROP TABLE IF EXISTS Employees`)

  db.run(`DROP TABLE IF EXISTS Patients`)

  db.run(`CREATE TABLE Employees (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,
    position TEXT,username TEXT UNIQUE,password TEXT,status TEXT)`)

  db.run(`CREATE TABLE Patients (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,
    diagnosis TEXT)`)
})

db.close()
