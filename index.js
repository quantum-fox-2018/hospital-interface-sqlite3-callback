/*jshint esversion:6*/
const Controller = require('./controller.js');
const argv = process.argv;

let request = argv[2];
if(request === 'register'){
    let name = argv[3];
    let title  = argv[4];
    let username = argv[5];
    let password = argv[6];
    Controller.register(name,title,username,password);
}
else if(request === 'login'){
  let username = argv[3];
  let password = argv[4];
  Controller.empLogin(username,password);
}
else if(request === 'add'){
  let patientID = argv[3];
  let patientName = argv[4];
  let diagnosa = argv[5];
  Controller.addPatient(patientID,patientName,diagnosa);
}
else if(request === 'logout'){
  let logout = 'logout';
  Controller.loggedout(logout);
}
