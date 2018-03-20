let Model = require('./model.js');
let View = require('./view.js');

class Controller{
    static processData(command, input){
        Model.createDB();

        if(command == 'register'){
            Model.register(input, function(status) {
                View.showConfirmation(status)
            })
        }else if(command == 'login'){
            Model.Login(input, function(str){
                View.showConfirmation(str)
            });
        }else if(command == 'addPatient'){
            Model.addPatient(input,function(str){
                View.showConfirmation(str)
            });
        }else if(command == 'listOfEmployees'){
            Model.getDataEmployee(function(objData){
                View.showTable(objData);
            });
        }else if(command == 'logout'){
            Model.logout(input, function(str){
                View.showConfirmation(str)   
            });
        }
    }

    static sendToView(str, cbController){
        cbController(str);
    }

    //Sending to view
    static getTable(data, cbController){
        cbController(data);
    }
}

module.exports = Controller;