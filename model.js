let fs = require('fs');
let Controller = require('./controller.js');
const sqlite3 = require('sqlite3');
const db = sqlite3.Database('data.db');

class Model{
    //Untuk proses selain getList
    static createDB(){
        db.run(`CREATE TABLE IF NOT EXISTS Employees (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), position VARCHAR(20), username VARCHAR(50), password VARCHAR(50), isLogin INTEGER)`);
        db.run(`CREATE TABLE IF NOT EXISTS Patients (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), diagnosis TEXT)`);
    }

    static getDataEmployee(cb){
        db.all(`SELECT * FROM Employees`, function(err, dataEmployee){
            cb(dataEmployee);
        })
    }

    static getDataPatient(cb){
        db.all(`SELECT * FROM Patients`, function(err, dataPatient){
            cb(dataPatient);
        })
    }

    static writeFile(data, file, callback) {
        fs.writeFile(file, JSON.stringify(data), 'utf8', (err) =>{
            if(err){
                console.log(err); 
            }
        });
    }

    static register(input, callback){

        let username = input[0];
        let password = input[1];
        let role = input[2];

        db.run(`INSERT INTO Employees VALUES (NULL, ?, ?, ?, ?, ?)`, username, role, username, password, 0);
    }

    static checkLogin(dataEmployee){
        for(let index =0; index<dataEmployee.length; index++){
            if(dataEmployee[index].isLogin == 0){
                return false;
            }
        }
        return true;
    }

    static login(input, callback){
        
        Model.getDataEmployee(function(dataEmployee){

            if(Model.checkLogin(dataEmployee)){
    
                for(let indexData =0; indexData<dataEmployee.length; indexData++){
                    if(input[0] == dataEmployee[indexData].username && input[1] == dataEmployee[indexData].password){
                        db.run(`UPDATE TABLE Employees SET isLogin = ? WHERE name = ?`, 1, input[0]);
                        callback(`user ${processedDataEmployee[indexData].username} logged in successfully`, cbController);
                    }
                }
    
                callback(`username/password wrong`, cbController);
            }else{
                callback('Someone is already logged in!', cbController);
            }
        })

    }

    static addPatient(input, callback){
        Model.getDataEmployee(function(dataEmployee){
            Model.getDataPatient(function(dataPatient){
                for(let employeeIndex = 0; employeeIndex<dataEmployee.length; employeeIndex++){
                    if(dataEmployee[employeeIndex].isLogin == 1 && dataEmployee[employeeIndex].position == 'dokter'){
                        db.run(`INSERT INTO Patient VALUES (NULL, ?, ?)`, input[1], input[2]);
                    }
                    callback(`data pasien berhasil ditambahkan. total data pasien : ${dataPatient.length}`);
                }
            })
        })
    }

    static logout (input, callback){
        Model.getDataEmployee(function(dataEmployee){
            for(let indexData = 0; indexData<dataEmployee.length; indexData++){
                if(input[0] == dataEmployee[indexData].name && dataEmployee[indexData].isLogin == true){
                    db.run(`UPDATE TABLE Employees SET isLogin = ? WHERE name = ?`, 0, input[0]);                    
                }else if(input[0] == dataEmployee[indexData].name && dataEmployee[indexData].isLogin == false){
                    callback(`user ${input[0]} is not logged in yet`);
                }
            }
        })
    }
}


module.exports = Model;
  