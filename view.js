
class View{

  static showResult(Result){
    if(Result=='dataKOsong'){
    console.log(`data salah input`);
    }else {
      console.log(`${Result[0]} berhasil di input`);
    }
  }

  static wrongRegister(input){
    console.log('input data harus 4 kata yang dipisah dengan spasi ');
  }

  static correctRegister(input){
    console.log(`Registration ${input[0]} success`);
  }
   static Login(result){
     if(result==0){
       console.log('username/password salah');
     }else{
       let login = true;
       console.log(`sukses login`);
     }
   }

   static failedLogin(){
     console.log();
   }

   static logout(input){
     console.log(`${input} success logout`);
    }

   static addPatient(input){
     if(input == undefined){
        console.log('akun tidak boleh input data');
     }else{
       console.log('input data berhasil');
     }
   }
}
module.exports = View
