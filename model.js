/*jshint esversion:6*/

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

class Employee {
  static register(name, username, password, position, status, cb) {
    db.run(`INSERT INTO employees (employee_id, name, username, password, position, status) VALUES (
           null, '${name}', '${username}', '${password}', '${position}', 'no access')`, (err) => {
      if (err) throw err;
      else {
        db.all(`SELECT COUNT (employee_id) FROM employees;`, (err, dataRows) => {
          if (err) throw err;
          else {
            let dataEmployee = (dataRows[0]['COUNT (employee_id)']);
            cb(`${dataEmployee}`, `Table employees added successfully`);
          }
        });
      }
    });

    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }

  static login(username, password, cb) {
    let logintStatus = false;
    db.get(`SELECT status FROM employees WHERE username = '${username}' AND password = '${password}'`, (err, data) => {
      if (data.status == 'access') {
        logintStatus = true;
        db.run(`UPDATE employees SET status = 'access' WHERE username = '${username}'`);
        cb(logintStatus);
      } else {
        cb(err);
      }
    });

    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }

  static logout(username, password, cb) {
    let logoutStatus = false;
    db.get(`SELECT name FROM employees WHERE username = '${username}' AND password = '${password}'`, (err, data) => {
      if (!err) {
        logoutStatus = true;
        cb(logoutStatus);
        db.run(`UPDATE employees SET status = 'no access' WHERE username = '${username}'`);
      } else {
        cb(err);
      }
    });

    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }
}

class Patient {
  static addPatient(name, age, gender, address, cb) {
    db.get(`SELECT status FROM employees WHERE position = 'dokter'`, (err, data) => {
      let loginStatus = data.status;
      if (err) throw (err);
      if (data.status == 'access') {
        db.run(`INSERT INTO patients (patient_id, name, age, gender, address) VALUES (null, '${name}','${age}', '${gender}', '${address}')`, (err) => {
          if (err) throw (err);
          else {
            db.all(`SELECT COUNT (patient_id) FROM patients;`, (err, dataRows) => {
              if (err) throw (err);
              else {
                let dataPatient = (dataRows[0]['COUNT (patient_id)']);
                cb(`${dataPatient}`, `${loginStatus}`, `Table employees added successfully`);
              }
            });
          }
        });
      }
    });
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }
  static deletePatient(patient_id, cb){
      db.run(`DELETE FROM patients WHERE patient_id = ${patient_id};`, (err) => {
        if (err) throw err;
        else {
          cb('Table patients deleted successfully');
        }
      });
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });
    }

}

module.exports = {Employee, Patient};
