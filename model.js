/*jshint esversion:6*/
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./dataHospital.db');


class Patient {
  static forAddPatient(id,pasienName,diagnosa,callback){
    db.get(`SELECT islogin FROM hospitalEmployee WHERE title = 'dokter'`,function(err,result){
        if(err){
          throw(err);
        }
        if(result.islogin == 1){
          db.run(`INSERT INTO hospitalPatient (name,diagnosis) VALUES ('${pasienName}','${diagnosa}')`,function(err){
            if(err){
              callback(err);
            } else{
              callback('insertSuccess');
            }
          });
        }
        else{
          callback(result);
        }

      });
  }
}

class Employee {

  static registerEmployee(nameReg,titleReg,usernameReg,passwordReg,callback){
      db.run(`INSERT INTO hospitalEmployee
        (name,title,username,password, isLogin)VALUES('${nameReg}','${titleReg}','${usernameReg}','${passwordReg}', 0)`,function(err) {
        if(err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }

    static employeeLogin(usernameLog,passwordLog,callback){
      var query = `SELECT name FROM hospitalEmployee WHERE username = '${usernameLog}' AND password = '${passwordLog}'`;
      db.get(query, function(err,result){
        if(!err){
          callback(null,result);
          db.run(`UPDATE hospitalEmployee SET islogin = 1 WHERE username = '${usernameLog}'`);
        } else{
          callback(err,null);
        }
      });
    }

    static employeeLogout(logout){
      db.get(`UPDATE hospitalEmployee SET islogin = 0;`);
    }


}

module.exports = {Patient,Employee};
