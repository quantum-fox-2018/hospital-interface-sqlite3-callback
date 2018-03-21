/*jshint esversion:6*/

const Obj = require('./model.js');
const Employee = Obj.Employee;
const Patient = Obj.Patient;
const View = require('./view.js');


class Controller {
  static register(name, username, password, position, status) {
    Employee.register(name, username, password, position, status, (dataEmployee) => {
      View.register(username, password, position, dataEmployee);
    });
  }
  static login(username, password) {
    Employee.login(username, password, (loginStatus) => {
      View.loginEmployee(loginStatus, username);
    });
  }
  static addPatient(name, age, gender, address) {
    Patient.addPatient(name, age, gender, address, (dataPatient, loginStatus) => {
      View.dataPatient(dataPatient, loginStatus);
    });
  }
  static deletePatient(patient_id) {
    Patient.deletePatient(patient_id, (display) => {
      View.display(display);
    });
  }
  static logout(username, password) {
    Employee.logout(username, password,(logoutStatus) => {
      View.logoutEmployee(logoutStatus);
    });
  }
}

module.exports = Controller;
