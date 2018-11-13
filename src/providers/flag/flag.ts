import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flag } from '../../app/models/flag.model';

/*
  Generated class for the FlagProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FlagProvider {

  constructor(public http: HttpClient) {
   
  }
  flags:Flag=new Flag;
  obtenerFlags(){
    return this.http.get("http://flag-icon-css.lip.is/api/v1/country/");
  }

  obtenerFlag(pais:string){
    return this.flags.result.find(val=>val.name===pais.trim());
  }
}
