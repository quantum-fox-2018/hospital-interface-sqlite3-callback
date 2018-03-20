"use strict"
const Controller = require('./controller.js');

const argv = process.argv
const input = {
    argv1: argv[3],
    argv2: argv[4],
    argv3: argv[5],
    argv4: argv[6]
};

switch(argv[2]) {
    case 'createTable':
    Controller.table();
    break;
    case 'showData':
    Controller.readTable(input.argv1);
    break;
    case 'register':
    Controller.employee(input.argv1, input.argv2, input.argv3, input.argv4);
    break;
    case 'login':
    Controller.login(input.argv1, input.argv2);
    break;
    case 'addPatient':
    let temp = []
    for (let i = 4; i < argv.length; i++) {
        temp.push(argv[i]);
    }
    let diagnosis = temp.join(', ')
    Controller.patient(input.argv1, diagnosis);
    break;
    case 'logout':
    Controller.logout();
    break;
}