const configDB = require('./config_database.js');


class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}

class Model{

  static createDatabase(callback){
    const database = new configDB('Hospital');
    const db = database.db;

    const queryCreateEmplyees = `CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), position VARCHAR(50), username VARCHAR(100), password VARCHAR(100), hospital_name VARCHAR(50), hospital_location VARCHAR(50), login INTEGER)`;
    const queryCreatePatients = `CREATE TABLE IF NOT EXISTS patients (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), diagnosis VARCHAR(150))`;

    db.serialize(()=>{
      let err;
      db.run(queryCreateEmplyees,(error)=>{
        if(error) err = error;
        db.run(queryCreatePatients,(error)=>{
          db.close();
          (err) ? callback(true) : callback(false);
        });
      });
    });
  }

  static addEmployeeToDatabase(name, password, position, callback){
    const database = new configDB('Hospital');
    const db = database.db;

    const queryInsert = 'INSERT INTO employees VALUES (null,?,?,?,?,?,?,?)';
    const queryCount = 'SELECT COUNT(*) AS total FROM employees';
    const name_hospital = 'RS Sehat Jiwa';
    const location_hospital = 'Jln. Lentera, RT09/RW01, Pondok Indah, Jakarta';

    let employeeObj = new Employee(name, position, name, password);

    db.serialize(()=>{
      db.run(queryInsert,name,position,name,password,name_hospital,location_hospital,0,(error)=>{
        if(error){
          callback(true);
          return;
        }
        db.get(queryCount,(error, data)=>{
          db.close();
          if(error || !data){
            callback(true);
            return;
          }
          employeeObj['total'] = data.total;
          callback(false, employeeObj);
        })
      });
    });
  }

  static checkLoginEmployee(username, password, callback){
    const database = new configDB('Hospital');
    const db = database.db;

    const querySearch = `SELECT id, name, password FROM employees WHERE username = ? AND password = ?`;
    const queryUpdate = `UPDATE employees SET login = 1 WHERE id = ?`;

    let userObj;

    db.serialize(()=>{
      db.get(querySearch, username, password, (error, data)=>{
        if(error || !data){
          callback(true);
          return;
        }
        userObj = data;
        db.run(queryUpdate, userObj.id, (error)=>{
          db.close();
          if(error){
            callback(true);
            return;
          }
          callback(false, userObj);
        });
      });
    });
  }

  static checkLogoutEmployee(callback){
    const database = new configDB('Hospital');
    const db = database.db;

    const querylogOut = `UPDATE employees SET login = 0 WHERE login = 1`;

    db.serialize(()=>{
      db.run(querylogOut, (err)=>{
        (err) ? callback(true) : callback(false);
      });
    });
  }

  static addPatient(patient_data, callback){
    const database = new configDB('Hospital');
    const db = database.db;

    const queryCheckDoctor = `SELECT id FROM employees WHERE login = 1 AND position = "Dokter"`;
    const queryInsertPatient = `INSERT INTO patients VALUES (null,?,?)`;

    let patient_name = patient_data[3];
    let diagnosis = getDiagnosis(patient_data);
    let patient = new Patient(null, patient_name, diagnosis);

    db.serialize(()=>{
      db.get(queryCheckDoctor, (err, data)=>{
        if(err || !data){
          callback(true);
          return;
        }
        db.run(queryInsertPatient, patient.name, patient.diagnosis, (err)=>{
          (err) ? callback(true) : callback(false);
        });
      });
    });
  }
}

// di luar kelas

function getDiagnosis(data){
  let diagnosis = '';

  for(let index = 4; index < data.length; index++){
    (index === data.length-1) ? diagnosis = diagnosis + data[index] : diagnosis = diagnosis + data[index] + ', ';
  }

  return diagnosis;
}


module.exports = Model;
