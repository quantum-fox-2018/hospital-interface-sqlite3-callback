var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hospital.db');

db.run(`CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR, position VARCHAR, password VARCHAR)`);

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.position = position
    this.password = password
  }

  static registerEmployee(username, password, position, callback){
    db.run(`INSERT INTO employees (username, position, password) VALUES ("${username}", "${position}", "${password}")`, function(err, rowEmployee){
      callback(rowEmployee)
    });
  }

  static loginFeature(username, password, callback){
    db.all(`SELECT * FROM employees WHERE username = "${username}" AND password = "${password}"`, (err, rowEmployee)=>{
      let rowEmployeeTmp = false;
      if(rowEmployee.length !== 0){
        rowEmployeeTmp = true;
      }
      callback(rowEmployeeTmp);
    })
  }

}

module.exports = Employee;
