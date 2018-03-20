const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.status = "Unavailable"
  }
}

class Hospital {

  static setupDatabase(cbMessageInfo){

    db.serialize(function() {

      let createQueryEmployees = "CREATE TABLE employees (id INTEGER PRIMARY KEY AUTOINCREMENT,employees_name VARCHAR (20), employees_position VARCHAR(20), employees_username VARCHAR (20), employees_password VARCHAR(20), employees_status VARCHAR(20))";
      let createQueryPatients = "CREATE TABLE patients (id INTEGER PRIMARY KEY AUTOINCREMENT, patients_name VARCHAR(20), diagnoses VARCHAR(50))";
      db.run(createQueryEmployees);
      db.run(createQueryPatients);
    });

    db.close();
    let message = "Tables have been generated already!"
    cbMessageInfo(message)
  }

  static addEmployee(name, position, username, password, cbNewEmployees){

    let newEmployee = new Employee(name,position,username,password);
    let insertQuery = `INSERT INTO employees (id, employees_name, employees_position, employees_username, employees_password, employees_status)
    VALUES (NULL, '${newEmployee.name}','${newEmployee.position}','${newEmployee.username}','${newEmployee.password}','${newEmployee.status}')`;

    let countQuery = 'SELECT COUNT(*) AS TOTAL FROM employees';
    db.run(insertQuery);
    db.all(countQuery,function(err,totalEmployees){
      cbNewEmployees(totalEmployees);
    })
    db.close();
  }

  static loginEmployees(username,password,cbLoginStatus){

    let updateQuery = `UPDATE employees SET employees_status = "Available" WHERE employees_username = '${username}' AND employees_password = '${password}'`;
    db.run(updateQuery,function(err,loginInfo){
      let loginData = true;
      if(err) {
        loginData =false
      }
      cbLoginStatus(loginData)
    })
    db.close();
  }

  static logoutEmployees(username,cbLogoutStatus){
    let logoutQuery = `UPDATE employees SET employees_status = "Unavailable" WHERE employees_username = '${username}'`;
    db.run(logoutQuery,function (err,logoutInfo) {
      let logoutData = true;
      if(err){
        logoutData = false
      }
      cbLogoutStatus(logoutData)
    })
  }

  static addPatient(patient_name,diagnoses,cbNewPatient){

    let addPatientQuery = `INSERT INTO patients (id,patients_name,diagnoses) VALUES (NULL, '${patient_name}' , '${diagnoses}')`
    db.run(addPatientQuery);
    let totalPatientsQuery = `SELECT COUNT (*) AS totalPatients FROM patients`;
    db.all(totalPatientsQuery,function (err,totalData) {
      cbNewPatient(totalData);
    })
    db.close();
  }

}

module.exports = {Hospital:Hospital};
