"use strict"
const Controller = require('./controller.js');

class View {
    static showErrorMessage(statusMessage) {
        console.log(statusMessage);
    }

    static showData(data) {
        console.log(data);
    }

    static employeeRegister(statusMessage) {
        console.log(`${statusMessage}`);
    }

    static logged(username, boolean) {
        if (boolean === true) {
            console.log(`user ${username} logged in successfully`)
        } else {
            console.log(`username / password wrong`);
        }
    }

    static patientAdded(statusMessage) {
        console.log(statusMessage);
    }

    static loggedOut(boolean) {
        if (boolean === true) {
            console.log(`you have been logged out`);
        } else {
            console.log(`please login`);
        }
    }
}

module.exports = View;