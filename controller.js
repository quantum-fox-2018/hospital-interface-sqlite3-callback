const {Model, Admin, OfficeBoy, Receptionist, Dokter} = require('./model.js');
const view = require('./view.js');



class Controller {
  constructor() {

  }
  static register(name, role, username, password) {
    if (role == 'admin') {
      let candidateAdmin = new Admin(name, role, username, password)
      Model.register(candidateAdmin, (arrlength, candidate) => {
        view.viewRegis(arrlength, candidate)
      })
    } else if (role == 'officeboy') {
      let candidateOB = new OfficeBoy(name, role, username, password)
      Model.register(candidateOB, (arrlength, candidate) => {
        view.viewRegis(arrlength, candidate)
      })
    } else if (role == 'receptionist') {
      let candidateRec = new Receptionist(name, role, username, password)
      Model.register(candidateRec, (arrlength, candidate) => {
        view.viewRegis(arrlength, candidate)
      })
    } else if (role == 'dokter') {
      let candidateDok = new Dokter(name, role, username, password)
      Model.register(candidateDok, (arrlength, candidate) => {
        view.viewRegis(arrlength, candidate)
      })
    }
  }

  static login(username, password) {
    Model.login(username, password, (user, status) => {
      view.viewLogin(user, status)
    })
  }

  static addPatient(namaPasien, keluhan) {
    Model.addPatient(namaPasien, keluhan, (arrlength, status) => {
      view.viewAddPatient(arrlength, status)
    })
  }

  static logout(username, password) {
    Model.logout(username, password, (name) => {
      view.viewLogout(name)
    })
  }
}
module.exports = Controller;
