class View {
  constructor() {

  }

  static viewRegis(arrlength, candidate) {
     console.log(`save data success ${candidate}. Total employee : ${arrlength}`);
  }

  static viewLogin(user, status) {
    if (status == true) {
      console.log(`user ${user} logged in successfully`);
    } else {
      console.log('username / password is wrong');
    }
  }

  static viewAddPatient(arrlength, status) {
    if (status == true) {
      console.log(`data pasien berhasil ditambahkan. Total data pasien : ${arrlength}`);
    } else {
      console.log('tidak memiliki akses untuk add patient');
    }
  }

  static viewLogout(name) {
    if (name == false) {
      console.log('username / password is wrong');
    } else {
      console.log(`user ${name} logged out successfully`);
    }
  }
}

module.exports = View;
