import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {
   
  }

  validarEmail(email:string){
    return this.http.get("http://35.185.216.89/getEmailUser.php?email="+email);
  }

  loguearse(email:string,password:string){
    return this.http.get("http://35.185.216.89/getLoginUser.php?email="+email+"&password="+password);
  }

  obtenerPerfilTurista(email:string){
    return this.http.get("http://35.185.216.89/getInfoUser.php?email="+email);
  }
}
