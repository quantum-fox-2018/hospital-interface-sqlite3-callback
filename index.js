const controller = require('./controller.js');
const argv = process.argv;
const command = process.argv[2];

let name;
let password;
let position;
let username;

switch(command){

  case 'createDB':
    controller.createDB();
    break;

  case 'register':
    name = argv[3];
    password = argv[4];
    position = argv[5];

    controller.registerEmployee(name, password, position);
    break;

  case 'login':
    username = argv[3];
    password = argv[4];

    controller.loginEmployee(username, password);
    break;

  case 'logout':
    controller.logoutEmployee();
    break;

  case 'addPatient':
    controller.registerPatient(argv);
    break;

}
