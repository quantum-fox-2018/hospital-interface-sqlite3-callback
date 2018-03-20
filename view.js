const Controller = require('./controller.js');
var Table = require('cli-table')

class View{
    static showConfirmation(str){
        console.log(str);
    }

    static showConfirmation(str){
        console.log(str);
    }

    static showTable(data){
        let parsedData = JSON.parse(data);
        let keyHeader = Object.keys(parsedData[0]);
        var table = new Table({
            head: keyHeader,
        })
        
        let result =[];
        for(let indexData = 0; indexData<parsedData.length; indexData++){
            result = [];
            result.push(parsedData[indexData].name, parsedData[indexData].position, parsedData[indexData].username, parsedData[indexData].password, parsedData[indexData].isLogin)
            table.push(result);
        }
        console.log(table.toString());
    }
}

module.exports = View;