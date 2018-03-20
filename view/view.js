const Table = require('cli-table');

var tableEmployee = new Table({
    head: ['Nama', 'Position', 'Username', 'Password']
  , colWidths: [15, 15, 15, 15]
});

var tablePatient = new Table({
    head: ['Nama', 'Diagnosis']
  , colWidths: [15, 20]
});

class View {
  static setupSuccess(result) {
    console.log(result);
  }

  static registerSuccess(data) {
    tableEmployee.push([
      data.name,
      data.position,
      data.username,
      data.password
    ]);
    console.log(`Register Success!`);
    console.log(tableEmployee.toString());
  }

  static loginSuccess(data) {
    console.log(data);
  }

  static logoutSuccess(data) {
    console.log(data);
  }

  static addPatientSuccess(data) {
    tablePatient.push([
      data.name,
      data.diagnosis
    ]);
    console.log('Add Patient Success!');
    console.log(tablePatient.toString());
  }

  static showEmployees(data) {
    for (let i in data) {
      tableEmployee.push([
        data[i].name,
        data[i].position,
        data[i].username,
        data[i].password
      ]);
    }
    console.log('Data Employees:');
    console.log(tableEmployee.toString());
  }

  static showPatients(data) {
    for (let i in data) {
      tablePatient.push([
        data[i].name,
        data[i].diagnosis
      ]);
    }
    console.log('Data Patients:');
    console.log(data);
    // console.log(tablePatient.toString());
  }
}

module.exports = View;
