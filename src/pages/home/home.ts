import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListaguiasPage } from '../listaguias/listaguias';
import {GuiaPage} from '../guia/guia'
import {DatasharingProvider} from '../../providers/datasharing/datasharing';
import {GeolocationProvider} from '../../providers/geolocation/geolocation';
import { Geo } from '../../app/models/geolocation.model';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  coords={
    lat:0,
    lng:0
  };
  ubi:any;
  constructor(public navCtrl: NavController, private data:DatasharingProvider,private geolocationService:GeolocationProvider,private navParams:NavParams) {
    this.data.currentSomeDataChanges.subscribe(coords=>{
      this.coords=coords;
      console.log(this.coords);
    });

  }
  
  irAGuias(){
    this.geolocationService.obtenerGeocoder(this.coords.lat,this.coords.lng).subscribe(res=>{
      this.ubi=this.geolocationService.tratarGeocoder(res as Geo)
        console.log("aaaaaaa");
        console.log(this.ubi)
        this.navCtrl.push('ListaguiasPage',{
          val:this.ubi,
         
        });
    
    })
  
  }
  irAGuia(){
       
    this.navCtrl.push('GuiaPage');
  }
}
