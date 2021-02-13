const configDB = require('../config_database.js');
const database = new configDB('Hospital');
const db = database.db;

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }

  static addEmployeeToDatabase(name, password, position, callback){
    const queryInsert = 'INSERT INTO employees VALUES (null,?,?,?,?,?,?,?)';
    const queryCount = 'SELECT COUNT(*) AS total FROM employees';
    const name_hospital = 'RS Sehat Jiwa';
    const location_hospital = 'Jln. Lentera, RT09/RW01, Pondok Indah, Jakarta';

    let employeeObj = new Employee(name, position, name, password);

    db.run(queryInsert,name,position,name,password,name_hospital,location_hospital,0,(error)=>{
      if(error){
        callback(true);
        return;
      }
      db.get(queryCount,(error, data)=>{
        if(error || !data){
          callback(true);
          return;
        }
        employeeObj['total'] = data.total;
        callback(false, employeeObj);
      })
    });
  }

  static checkLoginEmployee(username, password, callback){
    const querySearch = `SELECT id, name, password FROM employees WHERE username = ? AND password = ?`;
    const queryUpdate = `UPDATE employees SET login = 1 WHERE id = ?`;

    let userObj;

    db.get(querySearch, username, password, (error, data)=>{
      if(error || !data){
        callback(true);
        return;
      }
      userObj = data;
      db.run(queryUpdate, userObj.id, (error)=>{
        if(error){
          callback(true);
          return;
        }
        callback(false, userObj);
      });
    });
  }

  static checkLogoutEmployee(callback){
    const querylogOut = `UPDATE employees SET login = 0 WHERE login = 1`;

    db.run(querylogOut, (err)=>{
      (err) ? callback(true) : callback(false);
    });
  }
}

module.exports = Employee;
