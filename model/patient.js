const {db} = require('../config/database.js');

class Patient {
  constructor(name, diagnosis) {
    this.name = name
    this.diagnosis = diagnosis
  }
}

module.exports = Patient;
