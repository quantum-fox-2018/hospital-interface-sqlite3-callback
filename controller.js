"use strict"
const Model = require('./model.js');
const View = require('./view.js');

class Controller {
    static table() {
        Model.createTable((message) => {
            View.showData(message);
        });    
    }

    static readTable(tableName) {
        Model.readFile(tableName, (data, err) => {
            if (err) {
                View.showErrorMessage(data);
            } else {
                View.showData(data);
            }
        });
    }

    static employee(username, name, password, position) {
        Model.addEmployee(username, name, password, position, (statusMessage, err) => {
            if (err) {
                View.showErrorMessage(statusMessage);
            } else {
                View.employeeRegister(statusMessage);
            }
        });
    }
    
    static login(username, password) {
        Model.loginEmployee(username, password, (boolean) => {
            View.logged(username, boolean);
        });
    }

    static patient(name, diagnosis) {
        Model.addPatient(name, diagnosis, (statusMessage, err) => {
            if (err) {
                View.showErrorMessage(statusMessage);
            } else {
                View.patientAdded(statusMessage);
            }
        });
    }

    static logout() {
        Model.logoutEmployee((boolean) => {
            View.loggedOut(boolean);
        });
    }
}

module.exports = Controller;