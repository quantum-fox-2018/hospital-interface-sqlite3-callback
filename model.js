const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db');
const View = require('./view')

class Employee {

    static addEmployee(input, callback){
      if(input.length < 4 || input.length >4){
          callback('dataKOsong');
      }else{
        db.run('INSERT INTO employees VALUES (NULL, ?, ?, ?, ?,0)', input[0], input[1], input[2], input[3], function(err) {
          if(err) {
            console.log(err);//(err)
          } else {
            callback(input)
          }
        });
      }
    }

    static processLogin(input,callback){
      db.all(`SELECT name FROM employees WHERE username = '${input[0]}' AND password = '${input[1]}' `, function(err, input){
          if(err){
            callback(err);
          }else{
            callback(input);
          }
      });
    }

    static LoginTrue(result){
      if(result.length==0){
        result = 0
      }else{
        db.all(` UPDATE employees SET login = 1 WHERE name = '${result[0].name}'; `)
      }
    }

    static logout(input,callback){
      //db.all(` UPDATE employees SET login = 0 WHERE name = '${input}'; `)
      db.get(`SELECT name FROM employees WHERE username ='${input}'`,(err, Result) => {
        if(err){
          callback(err);
        }else{
          //console.log(Result,input);
          db.all(` UPDATE employees SET login = 0 WHERE username = '${input}'`,(err, Result) =>{
            if (err){
              callback(err);
            }else{
              //console.log(Result);
              callback(Result);
            }
          })
        }
        // process the row here
      });
      //console.log(Result);
    }
}

class Patient{

  static cekPosition(input,callback){
    db.get(`SELECT name, position FROM employees WHERE position ='dokter' AND login = 1`,(err,result)=>{
      if(err){
        callback(err)
      }else{
        callback(result);
      }
    })
        // View.addpatient(input)
  }

  static addRecord(input,status){
    //console.log(status,input);
    if(status == undefined){
      status = 0
    }else{
       db.run('INSERT INTO Patient VALUES (NULL, ?, ?)', input[0], input[1])
    }
  }

}





module.exports = {Employee,
Patient}
