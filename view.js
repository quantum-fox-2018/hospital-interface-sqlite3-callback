class View {

  static setupDisplay(setupMessage){
    console.log(setupMessage);
  }

  static registerDisplay(totalEmployees){
    console.log(`A new employee has been successfully added to employees database. Total employees : ${totalEmployees[0].TOTAL}`);
  }

  static loginDisplay(loginStatus,username){
    if(loginStatus){
      console.log(`Users ${username} has been successfully logged in`);
    }
    else{
      console.log(`username / password wrong!`);
    }
  }

  static logoutDisplay(logoutStatus,username){
    if(logoutStatus){
      console.log(`Users ${username} has been successfully logged out`);
    }
  }

  static newPatientDisplay(totalData){
    if(totalData != undefined){
      console.log(`Added new patient. Total patients : ${totalData[0].totalPatients}`);
    }
  }

}

module.exports = {View:View};
