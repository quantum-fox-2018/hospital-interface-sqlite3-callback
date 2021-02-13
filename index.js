const Controller = require('./controller.js');
const argv = process.argv;
const command = process.argv[2];

let name;
let password;
let position;
let username;

switch(command){

  case 'register':
    name = argv[3];
    password = argv[4];
    position = argv[5];

    Controller.registerEmployee(name, password, position);
    break;

  case 'login':
    username = argv[3];
    password = argv[4];

    Controller.loginEmployee(username, password);
    break;

  case 'logout':
    Controller.logoutEmployee();
    break;

  case 'addPatient':
    Controller.registerPatient(argv);
    break;

}
