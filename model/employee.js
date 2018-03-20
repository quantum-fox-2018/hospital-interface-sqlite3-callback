const Database = require('../setup.js');
let db = Database.db();

class Employees {
  // constructor() {
  //
  // }

  static show(cbEmployee){
    let queryEmployees = `SELECT * FROM Employees`
    db.all(queryEmployees, (err, employeesData) => {
        if(err){
          console.log(`error: `, err);
        }else {
          cbEmployee(employeesData);
        }

        db.close();
    });
  }

  static add(name, position, userName, password, cbResult){
    if(name != undefined || position != undefined || userName != undefined || password != undefined){
        let queryAddEmployee = `INSERT INTO Employees VALUES
                                 (null, "${name}", "${position}",
                                 "${userName}", "${password}", 0);`
        db.run(queryAddEmployee, (err) => {
          if(err){
            cbResult(err);
          }else{
            cbResult(`Data Employee "${name}" berhasil Ditambah`);
          }
          db.close();
        });
    }else{
        cbResult(`name, position, username and password must not empty!`);
    }
  }

  static login(userName, password, cbResult){
    this.cekUserLogin((EmployeeData) => {
      // cbResult(EmployeeData.length);
      //apabila tidak ada user yang sedang login
      if(EmployeeData.length === 0){

        //cek apabila username dan password ada di tabel Employees
        let queryEmployee = `SELECT * FROM Employees WHERE userName = "${userName}" AND password = "${password}"`;
        db.all(queryEmployee, (err, queryResult) => {
          if(err){
            cbResult(err);
          }else{
            if(queryResult.length !== 0){
              let queryUpdateLoginStatus = `UPDATE Employees SET loginStatus = 1
                                            WHERE userName = "${userName}" AND password = "${password}";`
              // cbResult(queryUpdateLoginStatus);
              db.run(queryUpdateLoginStatus, (err, results) => {
                if(err){
                  cbResult(err);
                }else{
                  cbResult(`user ${userName} logged in successfully`);
                }

                db.close();
              })
            }else{
              cbResult(`Username / Password is wrong`);
            }

          }
        });

      }else{
        //${EmployeeData[0].name} sedang Login..
        cbResult(`${EmployeeData[0].name} still Login..`);
      }
    })
  }

  //User data dari tabel Employees
  //cek apakah ada user yang login
  static cekUserLogin(cbUser){
    let queryCekUser = `SELECT * FROM Employees WHERE loginStatus = 1;`

    db.all(queryCekUser, (err, results) => {
      cbUser(results);
    })
  }

  static logout(userName, cbResult){
    this.cekUserLogin((userLoginData) => {
      let EmployeeId = userLoginData[0].id;
      let EmployeeUsername = userLoginData[0].userName;

      //logout Berdasarkan username
      if(userLoginData.length !== 0){
          if(EmployeeUsername == userName){
              let queryLoginStatus = `UPDATE Employees SET loginStatus = 0
                                      WHERE id = ${EmployeeId}`
              db.run(queryLoginStatus, (err) => {
                if(err){
                  cbResult(err);
                }else{
                  cbResult(`User ${userName} successfully Logout..`);
                }
              })
          }else{
              cbResult(`username ${userName} is not Login..`);
          }
      }else{
          cbResult(`There are no ones that Login..`);
      }

    })
  }

}

module.exports = Employees;
