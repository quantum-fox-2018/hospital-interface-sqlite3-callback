const Employee = require('./Model/employee.js');
const Patient = require('./Model/patient.js');
const View = require('./view.js');

class Controller{

  static registerEmployee(name, password, position){
    Employee.addEmployeeToDatabase(name, password, position, (err, data) =>{
      (!err) ?
      View.showSuccess('register', data) : View.showFail('register');
    });
  }

  static loginEmployee(username, password){
    Employee.checkLoginEmployee(username, password, (err, data) =>{
      (!err) ?
      View.showSuccess('login', data) : View.showFail('login');
    });
  }

  static logoutEmployee(){
    Employee.checkLogoutEmployee((err, data) =>{
      (!err) ?
      View.showSuccess('logout') : View.showFail('logout');
    });
  }

  static registerPatient(data_patient){
    Patient.addPatient(data_patient, (err, data) =>{
      (!err) ?
      View.showSuccess('addPatient') : View.showFail('addPatient');
    });
  }
}


module.exports = Controller;
