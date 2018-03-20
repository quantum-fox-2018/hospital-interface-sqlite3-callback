const View = require('../view/view.js');
const Employee = require('../model/employee.js');
const Patient = require('../model/patient.js');
const {Database} = require('../config/database.js');

class Controller {
  static menu(input) {
    let command = input[2];

    switch (command) {
      case 'setup':
        Database.setup(result => {
          View.setupSuccess(result);
        });
        break;

      case 'register':
        Employee.register(input[3], input[4], input[5], input[6], data => {
          View.registerSuccess(data);
        })
        break;

      case 'login':
        Employee.login(input[3], input[4], data => {
          View.loginSuccess(data);
        })
        break;

      case 'logout':
        Employee.logout(input[3], data => {
          View.logoutSuccess(data);
        })
        break;
      default:

    }

  }
}

module.exports = Controller;
