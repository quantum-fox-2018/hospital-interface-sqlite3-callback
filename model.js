const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('hospital.db');

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, username, password, position) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password

  }

  static register(input, callback){

    db.run(`INSERT INTO employee(name, username, password, position, isLogin)
            VALUES('${input[0]}', '${input[1]}', '${input[2]}', '${input[3]}', 'false')`,

          function (err, row) {

            if (err) {

              callback('error ====> ' + err);

            }

              callback(`save data ${input[0]} success`);

          })

  }

  static login(input, callback){

    db.get(`SELECT * FROM employee WHERE username = '${input[0]}' AND password = '${input[1]}'`, function(err, row) {

      if (!row) {

        callback(`username / password wrong`)

      } else {

        db.run(`UPDATE employee SET isLogin = "true" WHERE id = ${row.id}`, function (err) {

          callback(`${input[0]} is logged in`);

        })

      }


    })

  }

  static addPatient(input, callback){

    db.get(`SELECT * FROM employee WHERE isLogin = 'true' AND position = 'Dokter'`, function(err, rows) {

      if (!rows) {

        callback(`tidak memiliki akses untuk add patient`);

      } else {

        db.run(`INSERT INTO patients(name, diagnosis) VALUES('${input[0]}', '${input[1]}')`, function (err, rows) {

          callback(`data pasien berhasil ditambahkan`);

        })

      }

    })

  }

  static logout(callback){

    db.each(`SELECT * FROM employee WHERE isLogin = true`, function (err, rows) {

      db.run(`UPDATE employee SET isLogin = "false" WHERE isLogin = "true"`, function (err) {

        callback(`logged out`);

      })

    })

  }

}

module.exports = Employee;
