const model = require('./model.js');
const view = require('./view.js');

class Controller {
  constructor() {

  }

  static processData(command, input){

    switch (command) {

      case 'login': { model.login(input, view.log) ; break;}
      case 'logout': { model.logout(view.log) ; break;}
      case 'register': { model.register(input, view.log) ; break;}
      case 'addPatient': { model.addPatient(input, view.log) ; break;}

      default: {view.log(`Commands : [login, logout, register, addPatient]`);}

    }

  }

}

module.exports = Controller;
