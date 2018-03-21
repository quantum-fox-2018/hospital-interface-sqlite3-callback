
const argv = process.argv
const Controller = require('./controller')

//let newData = new Controller()
//console.log('silahkan register atau login');
Controller.execute(argv[2],argv.slice(3));
//console.log(argv[2],argv.slice(3));
