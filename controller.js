const hospital = require('./model.js').Hospital;
const view = require('./view.js').View;

class Controller {

  static setupDatabase(){

    hospital.setupDatabase(function(setupMessage){
      view.setupDisplay(setupMessage);
    })
  }

  static registerCommand(name, position, username, password){
    hospital.addEmployee(name, position, username, password, function(totalEmployees){
      view.registerDisplay(totalEmployees);
    })
  }

  static loginCommand(username,password){
    hospital.loginEmployees(username,password,loginStatus=>{
      view.loginDisplay(loginStatus,username);
    })
  }

  static logoutCommand(username){
    hospital.logoutEmployees(username,function(logoutStatus){
      view.logoutDisplay(logoutStatus,username);
    })
  }

  static addPatientCommand(patient_name,diagnoses){
    hospital.addPatient(patient_name,diagnoses,function(totalData){
      view.newPatientDisplay(totalData);
    })
  }

}

module.exports = {Controller:Controller};
