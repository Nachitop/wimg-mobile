import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../app/models/usuario.model';
import { Persona } from '../../app/models/persona.model';

/*
  Generated class for the RegistroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegistroProvider {

  constructor(public http: HttpClient) {

  }

  obtenerPaises(){
    return this.http.get("http://35.185.216.89/getAllPaises.php");
  }

  registrarUsuario(turista:Usuario){
    return this.http.post("http://35.185.216.89/setLoginTurista.php",turista);
  }
  
  registrarInfoTurista(turista:Persona){
    return this.http.post("http://35.185.216.89/setTurista.php",turista);
  }

}
