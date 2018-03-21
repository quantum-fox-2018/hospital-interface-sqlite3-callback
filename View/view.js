class Views {
  static ifUndefined(){
    console.log(`type 'node index.js help' for help`);
  }

  static help(){
    console.log(`type 'node index.js help' for help`);
    console.log(`type 'node index.js register <name> <position> <username> <password>'
      for register employee`);
    console.log(`type 'node index.js login <username> <password>'
      for login`);
    console.log(`type 'node index.js addPatient <patient name> <diagnosis>'
      for login`);
    console.log(`type 'node index.js logout'
      for logout`);
  }

  static register(input){
    console.log(`User ${input} has saved!`);
  }

  static login(status,name){
    if(status==true){
      console.log(`username ${name} login successfully`);
    } else {
      console.log(`wrong username/password`);
    }
  }

  static addPatient(status,name){
    if(status==true){
      console.log(`patient data has saved!`);
    } else {
      console.log(`doctor is not login now`);
    }
  }

  static logout(){
    console.log(`user logout`);
  }
}

module.exports = Views;
