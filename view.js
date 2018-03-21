/*jshint esversion:6*/

class View {
  static register(username, password,position, dataEmployee) {
    console.log(`save data success ${username} ${password} ${position} . Total Employee adalah ${dataEmployee}`);
  }
  static loginEmployee(loginStatus, username) {
    if (loginStatus == true) {
      console.log(`${username} logged in successfully`);
    } else {
      console.log(`username/ password wrong`);
    }
  }
  static dataPatient(dataPatient, loginStatus) {
    if (loginStatus == 'access') {
      console.log(`data pasien berhasil ditambahkan. Total data pasien : ${dataPatient}`);
    } else {
      console.log(`tidak memiliki akses untuk add patient`);
    }
  }
  static display(display){
    console.log(display);
  }
  static logoutEmployee(logoutStatus) {
    if (logoutStatus == true) {
      console.log(`logged out successfully`);
    }
  }
}

module.exports = View;
