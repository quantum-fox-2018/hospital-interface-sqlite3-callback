const {View} = require('./view.js');
const {Model} = require('./model.js');

class Controller {
  static do(input) {
    let menu = input[2];
    if(menu === "list") {
      let database = 'Employees';
      if(input[3] === "patient") {
        database = 'Patients';
      }
      Model.getData(database, View.viewTable);
    } else if(menu === "register") {
      let objEmp = {
        name: input[3],
        username: input[3],
        password: input[4],
        position: input[5],
        isLogin: 0
      };
      Model.insertData("Employees", objEmp, View.view);
    } else if(menu === "login") {
      Model.getData("Employees", (data) => {
        Model.checkLogin(data, input[3], input[4], View.view);
      });
    } else if(menu === "addPatient") {
      let objPatient = {
        name: input[3],
        diagnosis: input.slice(4)
      }
      Model.insertData("Patients", objPatient, View.view);
    } else if(menu === "logout") {
      Model.getData("Employees", (datas) => {
        Model.logOut(datas, View.view);
      });
    } else {
      View.view("Inputan tidak valid");
    }
  }
}

module.exports = {
  Controller
}
