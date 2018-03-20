const Employee = require('./employee.js')
const fs = require('fs')
const Patient = require('./patient.js')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

class Model {

  static displayEmployee(callback){
    Model.readData("employees", function(data){
      callback(data)
    })
  }

  static displayPatient(callback){
    Model.readData("patients", function(data){
      callback(data)
    })
  }

  static register(command, callback){
    command.push(0)
    Model.insertData("employees", command)
    Model.readData("employees", function(data){
      let str = `Save Data Success, username ${command[0]}, total Employee ${data.length}`
      callback(str)
    })
  }

  static login(command, callback){
    let username = command[0]
    let password = command[1]

    db.serialize(function(){
      db.all('SELECT * FROM employees WHERE isLogin = 1', function(err,data){
        if (data.length > 0) {
          callback("Please Logout First")
        }else{
          db.all(`SELECT id, username FROM employees WHERE username = '${username}' AND password = '${password}'`, function(err, rows){
            if (rows.length === 0) {
              callback("wrong username / password")
            }else{
              db.run(`UPDATE employees SET isLogin = '1' WHERE id = ?`, rows[0].id)
              callback(`user ${rows[0].username} login succesfully`)
            }
          })
        }
      })
    })
  }

  static logout(callback){
    db.serialize(function(){
      db.all(`SELECT * FROM employees WHERE isLogin = 1`, function(err, rows){
        if (rows.length === 0) {
          callback("there is no login user")
        }else{
          db.run(`UPDATE employees SET isLogin = '0' WHERE id = ?`, rows[0].id)
          callback("logout success")
        }
      })
    })
  }

  static addPatient(command, callback){
    let nama = command[3]
    let diagnoses = []
    let patientRecord = []
    for (var i = 4; i < command.length; i++) {
      diagnoses.push(command[i])
    }
    patientRecord.push(nama)
    patientRecord.push(diagnoses.toString())

    db.serialize(function(){
      db.all(`SELECT * FROM employees WHERE isLogin = 1`, function(err, data){
        if (data[0].position.toLowerCase() !== "dokter") {
          callback("Anda tidak memiliki akses untuk add patient")
        }else{
          Model.insertData("patients", patientRecord)
          db.all(`SELECT * FROM patients`, function (err, rows){
            console.log(rows);
            callback(`data pasien berhasil ditambahkan, total data pasien ${rows.length}`)
          })
        }
      })
    })
  }

  static status(callback){

    db.serialize(function(){
      db.all(`SELECT * FROM employees WHERE isLogin = 1`, function(err, rows){
        if (rows.length === 0) {
          callback("belum login, silahkan login terlebih dahulu")
        }else{
          callback(`login account = ${rows[0].username}`)
        }
      })
    })
  }

  static insertData(tableName,dataArray){
    let valueStr = ""
    for (var i = 0; i < dataArray.length; i++) {
      if (i === dataArray.length-1) {
        valueStr += "?"
      }else{
        valueStr += "?,"
      }
    }

    db.serialize(function(){
      let insertQuery = `INSERT INTO ${tableName} VALUES (NULL, ${valueStr})`
      db.run(insertQuery, dataArray)
    })
  }

  static readData(tableName, callback){
    let readQuery = `SELECT * FROM ${tableName}`
    db.all(readQuery, function(err, data){
      callback(data)
    })
  }

  // static readDataWhere(tableName, column, value, callback){
  //   let readQuery = `SELECT * FROM ${tableName} WHERE ${column} = '${value}'`
  //   db.all(readQuery, function(err, data){
  //     callback(data)
  //   })
  // }
};

module.exports = Model
