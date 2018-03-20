const View = require('./view.js');
const Model = require('./model.js');
let model = new Model();

class Controller {
  static cekCommands(param_command){
    model.commandCheck(param_command, (cbResult) => {
      View.show(cbResult);
    })
  }
}

module.exports = Controller;
