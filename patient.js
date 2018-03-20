var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hospital.db');

db.run(`CREATE TABLE IF NOT EXISTS patients (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, diagnosis VARCHAR)`);

class Patient {
  constructor(id, name, diagnosis) {
    this.id         = id
    this.name       = name
    this.diagnosis  = diagnosis
  }

  static registerPatient(name, diagnosis, callback){
    db.run(`INSERT INTO patients (name, diagnosis) VALUES ("${name}", "${diagnosis}")`, function(err, rowPatient){
      callback(rowPatient);
    });
  }

}

module.exports = Patient;
