const Database = require('./setup.js');
const Employee = require('./model/employee.js');
const Patient = require('./model/patient.js');
let db = Database.db();
// console.log(db);

class Model {
  constructor() {

  }

  commandCheck(param_command, cbResult){
    let command = param_command[2];

    switch (command) {
      case undefined:
        //sementara
        return cbResult(`Isi Nama Commands!`);
        break;

      case 'login':
        let userName_login = param_command[3];
        let password_login = param_command[4];
        // return this.validateLogin(userName_login, password_login, cbResult);
        return Employee.login(userName_login, password_login, cbResult);

      case 'logout':
        let userName_logout = param_command[3];
        // return this.userLogout(userName_logout, cbResult);
        return Employee.logout(userName_logout, cbResult);

      case 'setup':
        //masih salah kayanya
        Database.setup();
        return cbResult(`Table Berhasil / sudah di buat!`);
        break;

      case 'addEmployee':
        let name = param_command[3];
        let position = param_command[4];
        let userName = param_command[5];
        let password = param_command[6];
        return Employee.add(name, position, userName, password, cbResult)
        break;

      case 'addPatient':
        let patientName = param_command[3];
        let diagnose = param_command.slice(4);

        return Patient.add(patientName, diagnose, cbResult)
        break;

      case 'showEmployees':
        // Employee.all(cb)
        return Employee.show(cbResult);
        break;

      case 'showPatients':
      // Patient.all(cb)
        return Patient.show(cbResult)
        break;

      default:
        return cbResult(`Command ${command} belum ada!`);
    }
  }

}


module.exports = Model;
