const fs = require('fs');
const {Employee} = require('./employee.js');
const {Patient} = require('./patient.js');

class Model {
  static readData(path, callback) {
    fs.readFile(path, (err, data) => {
      callback(JSON.parse(data));
    });
  }

  static register(path, data, objEmp, callback) {
    let newEmp = new Employee(objEmp);
    data.push(newEmp);
    fs.writeFile(path, JSON.stringify(data), (err) => {
      callback("Data berhasil di simpan");
    });
  }

  static addPatient(pathPatient, dataEmp, dataPatient, objPatient, callback) {
    for(let i in dataEmp) {
      if(dataEmp[i].isLogin == true) {
        if(dataEmp[i].position == "dokter") {
          let newPat = new Patient(objPatient);
          newPat.id = dataPatient.length+1;
          dataPatient.push(newPat);
          fs.writeFile(pathPatient, JSON.stringify(dataPatient), (err) => {
            callback("Data pasien berhasil ditambahkan.");
          });
        } else {
          callback("tidak memiliki akses untuk add patient");
        }
      }
    }
  }

  static logout(path, data, callback) {
    let isFind = false;
    let userLogin;
    for(let i in data) {
      if(data[i].isLogin == true) {
        data[i].isLogin = false;
        isFind = true;
        userLogin = data[i];
      }
    }
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if(isFind) {
        callback(`user ${userLogin.username} logged out`);
      } else {
        callback(`no user is log in`);
      }
    });
  }

  static login(path, data, user, pass, callback) {
    let userLogin = false;
    let userYangLogin;
    for(let i in data) {
      if(data[i].isLogin === true) {
        userLogin = true;
        userYangLogin = data[i];
      }
    }
    if(userLogin) {
      callback(`user ${userYangLogin.username} sedang login`);
    } else {
      let isFind = false;
      for(let i in data) {
        if(data[i].username === user && data[i].password === pass) {
          data[i].isLogin = true;
          isFind = true;
        }
      }
      fs.writeFile(path, JSON.stringify(data), (err) => {
        if(isFind) {
          callback(`user ${user} logged in successfully`);
        } else {
          callback(`username / password wrong`);
        }
      });
    }
  }

}

module.exports = {
  Model
}
