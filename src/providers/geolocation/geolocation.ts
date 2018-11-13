import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geo } from '../../app/models/geolocation.model';
import { obtenerProvincia } from '../../app/funciones/funcion';

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocationProvider {

  constructor(public http: HttpClient) {
  
  }
 obtenerGeocoder(lat, long){
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&sensor=false&key=AIzaSyBSKNno0k2uTLczSQL08pRkCYN_Q419-hg")
  
   }

  tratarGeocoder(geo:Geo){

    let arrayUbicacion;
    arrayUbicacion=geo.plus_code.compound_code.substring(8).split(",");
    arrayUbicacion[1]=obtenerProvincia( arrayUbicacion[1].trim());
    arrayUbicacion[2]=  arrayUbicacion[2].trim();
  
  
    return arrayUbicacion;
   }


}
