const Controller = require('./controller.js')

let command = process.argv
Controller.acceptCommand(command)
