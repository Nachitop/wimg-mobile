import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LugarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LugarProvider {

  constructor(public http: HttpClient) {
    
  }
  obtenerLugar2(ubicacion:any){
   return this.http.get("http://35.185.216.89/getLugares2.php?lugar="+ubicacion[3]+"&idPais="+ubicacion[2]+"&idEstado="+ubicacion[1]+"&idCiudad="+ubicacion[0]);
  }
  obtenerLugar1(ubicacion:any,id:string){
    return this.http.get("http://35.185.216.89/getLugaresConocidosByGuia.php?idGuia="+id+"&idPais="+ubicacion[2]+"&idEstado="+ubicacion[1]+"&idCiudad="+ubicacion[0]);
  }

  obtenerLugarById(id:string){
    return this.http.get("http://35.185.216.89/getLugarContratacion.php?id_lugar="+id);
  }
}
