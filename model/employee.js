const {db} = require('../config/database.js');

class Employee {
  constructor(name, position, username, password) {
    this.name         = name;
    this.position     = position;
    this.username     = username;
    this.password     = password;
    this.loginStatus  = false;
  }

  static readDataEmployees(callback) {
    let query = `SELECT * FROM Employees`;
    db.all(query, (err, data) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        callback(data);
      }
    })
  }

  static register(name, position, username, password, callback) {
    let employee = new Employee(name, position, username, password);
    let query = `INSERT INTO Employees VALUES (NULL, ?, ?, ?, ?, 0)`;

    db.run(query, [name, position, username, password], (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        callback(employee);
      }
    });
  }

  static login(username, password, callback) {
    Employee.readDataEmployees(dataEmp => {
      Employee.validateLogin(dataEmp, username, password, accValid => {
        let result;
        if (accValid == true) {
          Employee.setLogin(username);
          result = `User ${username} login succesful`;
        } else {
          result = `Login failed! Wrong username/password`;
        }
        callback(result);
      })
    });
  }

  static validateLogin(dataEmp, username, password, callback) {
    let accValid = false;
    for (let i in dataEmp) {
      if (username == dataEmp[i].username && password == dataEmp[i].password) {
        accValid = true;
      }
    }
    callback(accValid);
  }

  static setLogin(username) {
    let query = `UPDATE employees SET loginStatus = 1
      WHERE username = ?`;

    db.run(query, [username], (err) => {
      if (err) {
        console.log(`Error : ${err}`);
      }
    })
  }
}

module.exports = Employee;
