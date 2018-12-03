import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController} from 'ionic-angular';
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
  emailTurista:string;
  constructor(public navCtrl: NavController, private data:DatasharingProvider,private geolocationService:GeolocationProvider,private navParams:NavParams, public modalCtrl:ModalController) {
    this.data.currentSomeDataChanges.subscribe(coords=>{
      this.coords=coords;
      console.log(this.coords);
    });

    this.emailTurista=localStorage.getItem('turista');
    //localStorage.setItem('turista',this.emailTurista);

  }
  
  irAGuias(){
    this.geolocationService.obtenerGeocoder(this.coords.lat,this.coords.lng).subscribe(res=>{
      this.ubi=this.geolocationService.tratarGeocoder(res as Geo)
     
        this.navCtrl.push('ListaguiasPage',{
          val:this.ubi
        
         
        });
    
    })
  
  }
  irAGuia(){
       
    this.navCtrl.push('GuiaPage');
  }

  perfilTurista() {
   
    const modal = this.modalCtrl.create('PerfilturistaPage',{email:this.emailTurista});
    modal.present();
  }
}
