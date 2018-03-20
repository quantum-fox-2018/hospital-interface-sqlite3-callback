const argv = process.argv;
const controller = require('./controller.js').Controller;

if(argv[2] == "addPatient"){
  var diagnoses = '';
  for(let i=4;i<argv.length;i++){
    diagnoses = diagnoses + argv[i] + ' ';
  }
  diagnoses.substr(0,diagnoses.length-1);
}
 
switch (argv[2]) {
  case "setup": controller.setupDatabase();break;
  case "register": controller.registerCommand(argv[3],argv[4],argv[5],argv[6]);break; //name,position,username,password
  case "login":controller.loginCommand(argv[3],argv[4]);break; // username, password
  case "logout":controller.logoutCommand(argv[3]);break; //password
  case "addPatient":controller.addPatientCommand(argv[3],diagnoses);break; // patient name
  default: return "wrong command"
}
