class View{

  static showSuccess(function_name, data){
    switch(function_name){
      case 'createDB':
        console.log(`database successfully created`);
        break;
      case 'register' :
        console.log(`save data success { username: ${data.name}, password: ${data.password}, position: ${data.position}}, Total employee ${data.total}`)
        break;
      case 'login' :
        console.log(`user ${data.name} dengan password ${data.password} telah berhasil login`)
        break;
      case 'logout' :
        console.log(`user telah berhasil logout`)
        break;
      case 'addPatient' :
        console.log(`pasien telah berhasil register`)
        break;
    }
  }

  static showFail(function_name,data){
    switch(function_name){
      case 'createDB':
        console.log(`database is fail to create`);
        break;
      case 'register' :
        console.log(`register fail`)
        break;
      case 'login' :
        console.log(`user gagal login, ada kesalahan password atau username`)
        break;
      case 'logout' :
        console.log(`user gagal berhasil logout`)
        break;
      case 'addPatient' :
        console.log(`pasien gagal register`)
        break;
    }
  }
}


module.exports = View;
