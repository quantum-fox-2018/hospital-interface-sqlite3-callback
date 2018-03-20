const Employee= require('./employee.js')
const Patient = require('./patient.js');
const View  = require('./view.js')


class Controller {
  constructor() {

  }

  static command(index_argv){
    if(index_argv[2] === 'register'){
      Employee.registerEmployee(index_argv[3], index_argv[4], index_argv[5], function(data){
        View.save_employee_success(data);
      });
    } else if(index_argv[2] === 'login'){
      Employee.loginFeature(index_argv[3], index_argv[4], function(data){
        View.loginFeature(data, index_argv[3]);
      })
    } else if(index_argv[2] === 'addPatient'){
      Patient.registerPatient(index_argv[3], index_argv[4], function(data){
        View.save_patient_success(data);
      });

    }

  }
}

module.exports = Controller;
