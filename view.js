/*jshint esversion:6*/

class View{
  static forRegister(status){
    if(status === null){
      console.log('register success');
    }
    else{
      console.log('register failed try again');
    }
  }

  static forLogin(isLogin, namaEmployee){
    if(isLogin === false){
      console.log('tidak dapat login');
    }
    else{
      console.log(namaEmployee.name + ' login sucess');
    }
  }

  static forAdd(status){
    if(status.islogin == 0){
      console.log('Anda tidak dapat melakukan add pasien');
    }
    else{
      console.log('add pasien sukses');
    }
  }


}




module.exports = View;
