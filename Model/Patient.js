const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('hospital.db')

class Patient {
  constructor(name, diagnosis) {
    this.name = name
    this.diagnosis = diagnosis
  }

  addPatient(callback){
    let status = false
    db.all(`SELECT position FROM Employees WHERE status = 'true'`,(err,data)=>{
      for(let i=0; i<data.length; i++){
        if(data[i].position=='Dokter'){
          db.run(`INSERT INTO Patients (name,diagnosis) VALUES ($name,$diagnosis)`,{
            $name:this.name,
            $diagnosis:this.diagnosis
          },function(err,data){
            if (err) throw err
          })
          status = true
        }
      }
      callback(status,this.name)
    })
  }
}

module.exports = Patient
