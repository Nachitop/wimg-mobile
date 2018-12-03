import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the GuiaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GuiaProvider {

  constructor(public http: HttpClient) {
    
    
  }

  getGuiaById(id:string){
    return this.http.get("http://35.185.216.89/getPerfil.php?idGuia="+id);
  }

  getByLugar(ubicacion:any){
    console.log(ubicacion)
    return this.http.get("http://35.185.216.89/getPerfilByLugar.php?idPais="+ubicacion[2]+"&idEstado="+ubicacion[1]+"&idCiudad="+ubicacion[0]);
  }

  getByLugar2(ubicacion:any){

    return this.http.get("http://35.185.216.89/getPerfilByLugar2.php?lugar="+ubicacion[3]+"&idPais="+ubicacion[2]+"&idEstado="+ubicacion[1]+"&idCiudad="+ubicacion[0]);
  }
  

}
