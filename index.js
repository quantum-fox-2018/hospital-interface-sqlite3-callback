const argv = process.argv
const controller = require('./controller.js');

let command = argv[2]
let input = argv.slice(3)

controller.processData(command, input)
