import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';



import { Geolocation } from '@ionic-native/geolocation';
import {Location,Places, Result} from '../../providers/services-google-places/googlePlaces.model';
//import {ServicesGooglePlacesProvider} from '../../providers/services-google-places/services-google-places';
import { HttpClient } from '@angular/common/http';

import {} from 'google-maps';

import { NativeGeocoder, NativeGeocoderReverseResult,  NativeGeocoderOptions, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';




@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {
  
  @ViewChild("map") mapElement;
  lugar={
  
  }
  map:google.maps.Map;
  google:any;
  latitude:number;
  longitud:number;
  jsonres:any;
  places:Places;
  resultados:Array<Result>;
  coordendas_lugares:Array<Location>;
  coordsG: google.maps.LatLng;
  mapOptions: google.maps.MapOptions;
  lugarGeo:any;
 
 

 
 //private servicesGooglePlacesProvider:ServicesGooglePlacesProvider 
  constructor(private nativeGeocoder: NativeGeocoder,private geolocation:Geolocation, private http:HttpClient) {
  
  }

  
  ngOnInit(){
   
    this.initMap();
    this.obtenerLocalizacion();
    
  
    
  
  }

 obtenerGeocoder(){

console.log("olvvv")
  this.nativeGeocoder.reverseGeocode(25.793328, -108.98073)
  .then((result: NativeGeocoderReverseResult[]) =>this.lugarGeo=JSON.stringify(result[0]))
  .catch((error: any) => console.log(error));
  console.log(this.lugarGeo);
  localStorage.setItem('ubicacion',JSON.stringify( this.lugarGeo));
  
 }

  

  obtenerLocalizacion=async()=>{
    await this.geolocation.watchPosition({enableHighAccuracy:true}).subscribe((resp)=>{
      
      this.latitude=resp.coords.latitude;
      this.longitud=resp.coords.longitude;
      this.obtenerGeocoder();
      
      
      this.mapOptions=this.crearOpciones();
      this.map.setOptions(this.mapOptions);
     // this.initMap();
    
     this.pintarMarcador(this.coordsG,this.map,"Me encuentro aquí!","http://maps.google.com/mapfiles/ms/icons/red-dot.png");
      this.obtenerLugares();
      
    }, error => console.log('Error getting location', error))
  }
  crearOpciones(){
     this.coordsG= new google.maps.LatLng(this.latitude,this.longitud)
      const mapOptions: google.maps.MapOptions={
        center: this.coordsG,
        zoom:13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
     
      
      return mapOptions;
  }
  initMap(){
   
   //this.obtenerLocalizacion();
   
   this.mapOptions=this.crearOpciones();
    this.map=new google.maps.Map(this.mapElement.nativeElement,this.mapOptions);
    
   //this.pintarMarcador(this.coordsG,this.map,"Me encuentro aquí!");
   
  
      }

      pintarMarcador(coords:any, map:any, tit:any,ico:any){
       
         let marker: google.maps.Marker= new google.maps.Marker({
          map:this.map,
          position:coords,
         
          icon:   {
            labelOrigin: new google.maps.Point(11, 50),
            url: ico,
            size: new google.maps.Size(25, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(11, 45),
          },
          label: {
            color: 'black',
            fontWeight: 'bold',
            text: tit,
          },
          //animation: google.maps.Animation.DROP,
          
          
          
        });
        //marker.setTitle(tit);
        //marker.setMap(this.map);
        marker.addListener('click',function() {
          console.log("hola");
         // map.setZoom(8);
         // map.setCenter(marker.getPosition())
        });
      
      }
    


     
      obtenerLugares=async()=>{
        
      await this.http.get("https:maps.googleapis.com/maps/api/place/nearbysearch/json?location="+this.latitude+"%2C"+this.longitud+"&radius=5000&type=point_of_interest&keyword=cruise&key=AIzaSyBSKNno0k2uTLczSQL08pRkCYN_Q419-hg")
        .subscribe(res=>{
        
          this.places= res as Places;
          console.log(this.places.results);
          for(let lugar of this.places.results){
           // console.log(lugar.plus_code.compound_code);
           
            this.pintarMarcador(lugar.geometry.location,this.map,lugar.name,"http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
          }
        })
        
      }

    

    }
     
   
   
      

    
  
    
  
