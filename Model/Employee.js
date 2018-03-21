const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('hospital.db')

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.status = 'false'
  }

  register(callback){
    db.run(`INSERT INTO Employees (name,position,username,password,status)
      VALUES ($name,$position,$username,$password,$status)`,{
        $name: this.name,
        $position: this.position,
        $username: this.username,
        $password: this.password,
        $status: this.status
      },function(err,data){
        if (err) throw err
      })
    callback(this.username)
  }

  static login(input,callback){
    let status = false
    db.get(`SELECT id FROM Employees WHERE username = '${input[0]}' AND password = '${input[1]}'`,
      function(err,data){
        if(data!==undefined){
          db.run(`UPDATE Employees SET status = ? WHERE id = ?`,'true',data.id)
          status = true
          callback(status,input[0])
        }
      })
  }

  static logout(callback){
    db.all(`UPDATE Employees SET status = 'false'`,
      function(err,data){
        if (err) throw err
      }
    )
    callback()
  }
}

module.exports = Employee
