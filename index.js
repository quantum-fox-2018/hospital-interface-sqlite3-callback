/*jshint esversion:6*/
const Controller = require('./controller.js');
const argv = process.argv;

switch (argv[2]) {
  case 'register':
    Controller.register(argv[3], argv[4], argv[5], argv[6]);

    break;
  case 'login':
    Controller.login(argv[3], argv[4]);

    break;
  case 'addPatient':
    Controller.addPatient(argv[3], argv[4], argv[5], argv[6]);

    break;
  case 'deletePatient':
    Controller.deletePatient(argv[3]);

    break;
  case 'logout':
    Controller.logout();

    break;
}
