const configDB = require('../config_database.js');
const database = new configDB('Hospital');
const db = database.db;

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static addPatient(patient_data, callback){
    const queryCheckDoctor = `SELECT id FROM employees WHERE login = 1 AND position = "Dokter"`;
    const queryInsertPatient = `INSERT INTO patients VALUES (null,?,?)`;

    let patient_name = patient_data[3];
    let diagnosis = getDiagnosis(patient_data);
    let patient = new Patient(null, patient_name, diagnosis);

    db.get(queryCheckDoctor, (err, data)=>{
      if(err || !data){
        callback(true);
        return;
      }
      db.run(queryInsertPatient, patient.name, patient.diagnosis, (err)=>{
        (err) ? callback(true) : callback(false);
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

module.exports = Patient;
