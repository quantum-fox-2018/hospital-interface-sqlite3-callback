/*jshint esversion:6*/

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./dataHospital.db');

db.run(`CREATE TABLE IF NOT EXISTS hospitalEmployee (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20)NOT NULL
        ,title VARCHAR(20)NOT NULL,username VARCHAR(20)NOT NULL,password INTEGER,islogin BOOLEAN);`);
db.run(`CREATE TABLE IF NOT EXISTS hospitalPatient (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20)NOT NULL,
        diagnosis VARCHAR(50));`);

db.close();
