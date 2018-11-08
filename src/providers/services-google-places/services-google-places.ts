import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Places,Result, Location} from './googlePlaces.model';


/*
  Generated class for the ServicesGooglePlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesGooglePlacesProvider {

  constructor(public http: HttpClient) {
    
  }

  places:Places;
  places_clean:Result[]=[];
  latitud:any;
  longitud:any;
  coords:Location;
  coords_array:Array<Location>;
  array_latitud:any[];
  array_longitud:any[];
  
  obtenerLugares=async()=>{
    await  this.http.get("https:maps.googleapis.com/maps/api/place/nearbysearch/json?location=25.7667%2C-108.9667&radius=50000&type=point_of_interest&keyword=cruise&key=AIzaSyBSKNno0k2uTLczSQL08pRkCYN_Q419-hg")
      .subscribe(res=>{
        this.places= res as Places
        //console.log(this.places);
        for (let lugar of this.places.results){
          //console.log(lugar.geometry.location.lat)
        console.log(lugar);
         this.coords=lugar.geometry.location;
        // console.log(this.coords.lat)
       //this.longitud.lng=lugar.geometry.location.lng;
         //console.log(this.coords.lng)
        this.coords_array.push(this.coords);
         //this.array_latitud.push(this.latitud);
         //this.array_latitud.push(this.longitud);
          
        }
        
        //console.log(this.coords_array)
      
   
      });
      
    }

    
   
   
}
