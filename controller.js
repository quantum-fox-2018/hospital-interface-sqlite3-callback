const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./hospital.db');
const View = require('./view')
const objModel = require('./model')

let Employee = objModel.Employee
let Patient = objModel.Patient



class Controller{

    static execute(command,input){
      if(command ==='register'){
        Employee.addEmployee(input, function(status) {
          View.showResult(status)
        })
      }else if(command === 'login'){
        Employee.processLogin(input,function(result){
        Employee.LoginTrue(result)
        View.Login(result)
      })
      }else if(command === 'logout'){
        Employee.logout(input,function(result){
          View.logout(result)
        })
      }else if(command === 'addPatient'){
        Patient.cekPosition(input,function(status){
        Patient.addRecord(input,status)
        View.addPatient(status)
        //console.log(status);
        })
      }

    }
}





module.exports = Controller
