import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contratacion } from '../../app/models/contratacion.model';

/*
  Generated class for the ContratacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContratacionProvider {

  constructor(public http: HttpClient) {
  
  }

  contratar(contratacion:Contratacion){
    return this.http.post("http://35.185.216.89/setContratacion.php",contratacion);
  }

  detallecontratacion(detalles:any){
    return this.http.post("http://35.185.216.89/setDetalleContratacion.php",detalles)
  }

  escuchaTurista(id_contratacion:string){
    return this.http.get("http://35.185.216.89/getEstadoContratacion.php?id="+id_contratacion);
  }

  valorarGuia(valoracion:any){
    return this.http.post("http://35.185.216.89/setValoraciones.php",valoracion);
  }
  ComentarGuia(comentario:any){
    return this.http.post("http://35.185.216.89/setComentarios.php",comentario);
  }

  editEstadoGuia(guia:any){
    
    return this.http.post("http://35.185.216.89/updateEstadoGuia.php",guia);
  }
}
