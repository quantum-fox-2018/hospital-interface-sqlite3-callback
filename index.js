var argv = process.argv;
var Controller = require('./controller.js')

var command = argv[2];
var input = argv.slice(3, argv.length)

Controller.processData(command, input);