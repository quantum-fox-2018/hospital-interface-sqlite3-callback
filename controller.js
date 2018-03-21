/*jshint esversion:6*/
const objModel = require('./model');
const Employee = objModel.Employee;
const Patient = objModel.Patient;
const View = require('./view');


class Controller{
  static register(name,title,username,password){
    Employee.registerEmployee(name,title,username,password, function(status) {
      View.forRegister(status);
    });

  }

  static empLogin(username,password){
    Employee.employeeLogin(username,password,function(err, result){
      if(err === null){
        View.forLogin(true, result);
      }
      else{
        View.forLogin(false);
      }
    });
  }

  static addPatient(pasien,diagnosa){
    Patient.forAddPatient(null,pasien,diagnosa,function(status){
      View.forAdd(status);
    });
  }

  static loggedout(status){
    Employee.employeeLogout(status);
  }
}




module.exports = Controller;
