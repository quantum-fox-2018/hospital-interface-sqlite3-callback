const sqlite = require('sqlite3').verbose();

class Database{
  constructor(database_name){
    this.database_name = database_name;
    this.db = this.initializeDB();
  }

  initializeDB(){
    return (new sqlite.Database('./database.db'))
  }
}

module.exports = Database;
