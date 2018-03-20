const sqlite = require('sqlite3').verbose();

class Database{
  constructor(database_name){
    this.database_name = database_name;
    this.db = this.initializeDB();
    this.createDatabase();
  }

  initializeDB(){
    return (new sqlite.Database('./database.db'))
  }

  createDatabase(callback){
    const queryCreateEmplyees = `CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), position VARCHAR(50), username VARCHAR(100), password VARCHAR(100), hospital_name VARCHAR(50), hospital_location VARCHAR(50), login INTEGER)`;
    const queryCreatePatients = `CREATE TABLE IF NOT EXISTS patients (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), diagnosis VARCHAR(150))`;

    this.db.serialize(()=>{
      let err;
      this.db.run(queryCreateEmplyees,(error)=>{
        if(error) console.log(error);
        this.db.run(queryCreatePatients,(error)=>{
          if(error) console.log(error);
        });
      });
    });
  }
}

module.exports = Database;
