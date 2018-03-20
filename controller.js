const model = require('./model.js');
const view = require('./view.js');

class Controller{

  static createDB(){
    model.createDatabase((err)=>{
      (!err) ?
      view.showSuccess('createDB') : view.showFail('createDB');
    });
  }

  static registerEmployee(name, password, position){
    model.addEmployeeToDatabase(name, password, position, (err, data) =>{
      (!err) ?
      view.showSuccess('register', data) : view.showFail('register');
    });
  }

  static loginEmployee(username, password){
    model.checkLoginEmployee(username, password, (err, data) =>{
      (!err) ?
      view.showSuccess('login', data) : view.showFail('login');
    });
  }

  static logoutEmployee(){
    model.checkLogoutEmployee((err, data) =>{
      (!err) ?
      view.showSuccess('logout') : view.showFail('logout');
    });
  }

  static registerPatient(data_patient){
    model.addPatient(data_patient, (err, data) =>{
      (!err) ?
      view.showSuccess('addPatient') : view.showFail('addPatient');
    });
  }
}


module.exports = Controller;
