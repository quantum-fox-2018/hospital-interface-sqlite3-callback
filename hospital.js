const controller = require('./controller.js');

let argv = process.argv

if (argv[2] == 'register') {
  controller.register(argv[3], argv[5], argv[3], argv[4], argv[5])
} else if (argv[2] == 'login') {
  controller.login(argv[3], argv[4])
} else if (argv[2] == 'addPatient') {
  let keluhan = ''
  for (var i = 4; i < argv.length; i++) {
    keluhan += argv[i]
    if (i !== argv.length-1) {
      keluhan += ' '
    }
  }
  controller.addPatient(argv[3], keluhan)
} else if (argv[2] == 'logout') {
  controller.logout(argv[3], argv[4])
}
