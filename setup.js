const sqlite3 = require('sqlite3').verbose();


class Database {
  static db() {
    return new sqlite3.Database('Hospital.db');
  }

  static setup(){
    let db = this.db();
    db.serialize( () => {
      let queryPatients = `CREATE TABLE IF NOT EXISTS Patients
                           (id INTEGER PRIMARY KEY AUTOINCREMENT,
                           name VARCHAR(30), diagnosis VARCHAR(50));`;

      let queryEmployees = `CREATE TABLE IF NOT EXISTS Employees
                            (id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name VARCHAR(30), position VARCHAR(20),
                            userName VARCHAR(30), password VARCHAR(30),
                            loginStatus INTEGER);`
                            //loginStatus kalo 1 login kalo 0 engga;

      db.run(queryPatients);
      db.run(queryEmployees);

      db.close();

    })
  }
}

module.exports = Database;
