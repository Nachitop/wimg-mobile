import { Component, ViewChild } from '@angular/core';




import { Geolocation } from '@ionic-native/geolocation';
import {Location,Places, Result} from '../../providers/services-google-places/googlePlaces.model';
//import {ServicesGooglePlacesProvider} from '../../providers/services-google-places/services-google-places';
import { HttpClient } from '@angular/common/http';

import {} from 'google-maps';

import { NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';
import {obtenerProvincia} from '../../app/funciones/funcion';
import {DatasharingProvider} from '../../providers/datasharing/datasharing';
import { Geo } from '../../app/models/geolocation.model';
import { NavController } from 'ionic-angular';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';


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
  cadenLugar:string;
  ubicacion:any=[]
  geo:Geo;

 
 

  constructor(private geolocation:Geolocation, private http:HttpClient,private data:DatasharingProvider,public navCtrl: NavController,private geolocationService:GeolocationProvider) {
  
  }

  
  ngOnInit(){
   
    this.initMap();
    this.obtenerLocalizacion();
    
  
    
  
  }

  sharedService(value:any){
    this.data.someDataChanges(value);
  }

  

  obtenerLocalizacion=async()=>{
    await this.geolocation.getCurrentPosition({enableHighAccuracy:true}).then(resp=>{
      
       this.latitude=  resp.coords.latitude;
       this.longitud= resp.coords.longitude;
      
      let coords={
        lat:this.latitude,
        lng:this.longitud
      }
      this.sharedService(coords);
     //  localStorage.setItem('ubicacion',JSON.stringify( this.lugarGeo));
  
    }, error => console.log('Error getting location', error))
    this.mapOptions= this.crearOpciones();
   
    this.map.setOptions(this.mapOptions);
    this.pintarMarcador(this.coordsG,this.map,"I'm just right here!","http://maps.google.com/mapfiles/ms/icons/red-dot.png");
    this.obtenerLugares();
    
  
     
       
     
  
    
   
     
     
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
   
  
   
   this.mapOptions=this.crearOpciones();
    this.map=new google.maps.Map(this.mapElement.nativeElement,this.mapOptions);
  
   
  
      }

     

      pintarMarcador(coords: any, map:any, tit:string,ico:any){
      
         const marker: google.maps.Marker= new google.maps.Marker({
          map:map,
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
      
       
        marker.addListener('click',function() {
          this.clickMarker(coords,tit);
          
         
        
       
        }.bind(this)) ;
       
       
    }
    

    clickMarker(coords: any,tit:any){
      console.log("Entré");
      let ubi=[]
     
        this.geolocationService.obtenerGeocoder(coords.lat,coords.lng).subscribe(res=>{
          ubi=this.geolocationService.tratarGeocoder(res as Geo)
          ubi.push(tit);
           
            
            this.navCtrl.push('ListaguiasPage',{
              val: ubi
             
            });
        
        })
        
       
    }
     
      obtenerLugares=async()=>{
       
      await this.http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+this.latitude+"%2C"+this.longitud+"&radius=5000&type=point_of_interest&keyword=cruise&key=AIzaSyBSKNno0k2uTLczSQL08pRkCYN_Q419-hg")
        .subscribe(res=>{
          
          this.places= res as Places;
          console.log(this.places.results);
          for(let lugar of this.places.results){
         
          
           
            this.pintarMarcador(lugar.geometry.location,this.map,lugar.name,"http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
          }
        })
        
      }

    

    }
     
   
   
      

    
  
    
  
