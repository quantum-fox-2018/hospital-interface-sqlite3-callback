const Patient = require('./patient.js');
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

  static readDataPatients(callback) {
    let query = `SELECT * FROM Patients`;
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
          result = `User ${username} login succesful!`;
        } else {
          result = `Login failed! Wrong username/password!`;
        }
        callback(result);
      })
    });
  }

  static logout(username, callback) {
    Employee.readDataEmployees(dataEmp => {
      let result;
      for (let i in dataEmp) {
        if (username == dataEmp[i].username && dataEmp[i].loginStatus == 1) {
          Employee.setLogout(username);
          result = `User ${username} logout successful!`;
        } else {
          result = `User ${username} logout failed!`;
        }
      }
      callback(result);
    })
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
    let queryLogin = `UPDATE Employees SET loginStatus = 1
      WHERE username = ?`;
    let queryLogout = `UPDATE Employees SET loginStatus = 0
      WHERE username != ?`;

    db.run(queryLogin, [username], (err) => {
      if (err) {
        console.log(`Error : ${err}`);
      }
    });
    db.run(queryLogout, [username], (err) => {
      if (err) {
        console.log(`Error : ${err}`);
      }
    });
  }

  static setLogout(username) {
    let query = `UPDATE Employees SET loginStatus = 0
      WHERE username = ?`;

    db.run(query, [username], (err) => {
      if (err) {
        console.log(`Error : ${err}`);
      }
    })
  }

  static addPatient(name, diagnosis, callback) {
    Employee.validateAccess(accessStatus => {
      if (accessStatus == true) {
        let patient = new Patient(name, diagnosis);
        let query = `INSERT INTO Patients VALUES (NULL, ?, ?)`;

        db.run(query, [name, diagnosis], (err) => {
          if (err) {
            console.log(`Error : ${err}`);
          } else {
            callback(patient);
          }
        });
      }
    });
  }

  static validateAccess(callback) {
    Employee.readDataEmployees(dataEmp => {
      let accessStatus = false;
      for (let i in dataEmp) {
        if (dataEmp[i].position == 'doctor' && dataEmp[i].loginStatus == 1) {
          accessStatus = true;
        }
      }
      callback(accessStatus);
    })
  }

  static showEmployees(callback) {
    Employee.validateAccess(accessStatus => {
      if (accessStatus == true) {
        Employees.readDataEmployees(data => {
          callback(data);
        })
      }
    })
  }

  static showEmployees(callback) {
    Employee.validateAccess(accessStatus => {
      if (accessStatus == true) {
        Employees.readDataPatients(data => {
          callback(data);
        })
      }
    })
  }
}

module.exports = Employee;
