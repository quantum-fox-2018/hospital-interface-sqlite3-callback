const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospitals.db');
const {Employee} = require('./employee.js');
const {Patient} = require('./patient.js');

class Model {
  static getData(database, callback) {
    db.all(`SELECT * FROM ${database}`, (err, datas) => {
      callback(datas);
    });
    db.close();
  }

  static checkLogin(data, user, pass, callback) {
    let userLogin = false;
    let userYangLogin;
    for(let i in data) {
      if(data[i].isLogin == 1) {
        userLogin = true;
        userYangLogin = data[i];
      }
    }
    if(userLogin) {
      callback(`user ${userYangLogin.username} sedang login`);
    } else {
      let isFind = false;
      for(let i in data) {
        if(data[i].username == user && data[i].password == pass) {
          Model.findIdByUsername("Employees", data[i].username, (id) => {
            Model.updateData("Employees", "isLogin", 1, id);
          });
          isFind = true;
        }
      }
      if(isFind) {
        callback(`user ${user} logged in successfully`);
      } else {
        callback(`username / password wrong`);
      }
    }
  }

  static logOut(data, callback) {
    let userLogin = false;
    let userYangLogin;
    for(let i in data) {
      if(data[i].isLogin == 1) {
        userLogin = true;
        Model.updateData("Employees", "isLogin", 0, data[i].id);
        callback(`User ${data[i].name} berhasil Logout`);
      }
    }
    if(!userLogin) {
      callback(`Tidak ada user yang sedang login`);
    }
  }

  static insertData(database, obj, callback){
    if(database == "Employees") {
      let newEmp = new Employee(obj);
      db.run(`INSERT INTO ${database} VALUES (NULL, ?, ?, ?, ?, ?)`, newEmp.name, newEmp.position, newEmp.username, newEmp.password, newEmp.isLogin);
    } else if(database == "Patients") {
      let newPat = new Patient(obj);
      db.run(`INSERT INTO ${database} (name) VALUES ('${newPat.name}')`, function(err){
        if(err) {
          console.log(err);
        }
        let idPatient = this.lastID;
        for(let i in newPat.diagnosis) {
          db.run(`INSERT INTO Diagnoses VALUES (NULL, '${newPat.diagnosis[i]}', ${idPatient})`);
        }
      });
      callback("Data berhasil di simpan");
    }
    db.close();
  }

  static deleteData(database, id) {
    db.run(`DELETE ${database} WHERE id = ${id}`);
    db.close();
  }

  static updateData(database, column, data, id) {
    db.run(`UPDATE ${database} SET ${column} = "${data}" WHERE id = ${id}`);
    db.close();
  }

  static findIdByUsername(database, user, callback) {
    db.each(`SELECT id FROM ${database} WHERE username = '${user}'`, (err, username) => {
      callback(username.id);
    });
    db.close();
  }
}

module.exports = {
  Model
}
