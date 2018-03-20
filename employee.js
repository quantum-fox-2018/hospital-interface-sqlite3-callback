class Employee {
  constructor(objEmp) {
    this.name = objEmp.name;
    this.position = objEmp.position;
    this.username = objEmp.username;
    this.password = objEmp.password;
    this.isLogin = objEmp.isLogin;
  }
}

module.exports = {
  Employee
}
