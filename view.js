var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hospital.db');

class View {
  constructor(){

  }

  static save_employee_success(){
    db.each(`SELECT count(*) AS totalEmployees FROM employees`, function(err, row){
      let totalEmployees = JSON.stringify(row);
      console.log(`save data sukses.${totalEmployees}`);
    })
  }

  static save_patient_success(){
    db.each(`SELECT count(*) AS totalPatients FROM patients`, function(err, row){
      let totalPatients = JSON.stringify(row);
      console.log(`data patient berhasil ditambahkan.${totalPatients}`);
    })
  }

  static loginFeature(boolean, username){
    if(boolean == true){
      console.log(`user ${username} logged in successfully`);
    } else {
      console.log(`username / password wrong`);
    }
  }
}

module.exports = View;
