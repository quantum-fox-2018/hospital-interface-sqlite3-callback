const Database = require('../setup.js');
const Employee = require('./employee.js');
let db = Database.db();

class Patients{
  static show(cbPatients){
      let queryPatients = `SELECT * FROM Patients`
      db.all(queryPatients, (err, patientsData) => {
          if(err){
            console.log(`error: `, err);
          }else {
            cbPatients(patientsData);
          }

          db.close();
      });
  }

  static add(patientName, diagnose, cbResult){
      //Pengecekan kalo patientName dan diagnose kosong belum
      Employee.cekUserLogin((userLoginData) => {
        //apabila user tidak login
        if(userLoginData.length === 0 ){
            cbResult(`U need to Login to add a patient`);
        }else {
            //apabila user login bukan dokter
            let employeePosition = userLoginData[0].position;
            if (employeePosition != 'Dokter') {
              cbResult(`Ony a Doctors can add a Patient`);
            }else{
              // cbResult(`bisa kmau dokter`);
              let queryAddPatient = `INSERT INTO Patients VALUES (null, "${patientName}",
                                     "${diagnose}")`
              db.run(queryAddPatient, (err) => {
                  if(err){
                    cbResult(`error: ${err}`);
                  }else{
                    cbResult(`data patient ${patientName} successfully added.`);
                  }
                  db.close();
              })
            }
        }
      })
  }
}

module.exports = Patients;
