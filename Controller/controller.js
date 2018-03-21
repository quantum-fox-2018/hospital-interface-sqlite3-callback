const Employee = require('../Model/Employee.js')
const Patient = require('../Model/Patient.js')
const Views = require('../View/view.js')

class Controller {
  constructor(command,content) {
    this.command = command
    this.content = content
  }

  execute(){
    if(this.command==undefined){
      Views.ifUndefined()
    } else if(this.command=='help'){
      Views.help()
    } else if(this.command=='register'){
      let employee = new Employee(this.content[0],this.content[1],this.content[2],this.content[3])
      employee.register(Views.register)
    } else if(this.command=='login'){
      Employee.login(this.content,Views.login)
    } else if(this.command=='addPatient'){
      let disease = this.content.slice(1).join(', ')
      let patient = new Patient(this.content[0],disease)
      patient.addPatient(Views.addPatient)
    } else if(this.command=='logout'){
      Employee.logout(Views.logout)
    }
  }
}

module.exports = Controller
