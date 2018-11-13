import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LugarProvider} from '../../providers/lugar/lugar';
import { Lugar } from '../../app/models/lugar.model';

/**
 * Generated class for the ResumenpagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resumenpago',
  templateUrl: 'resumenpago.html',
})
export class ResumenpagoPage {
  ubi=[]
  id:string;
  lugarM;
  lugares:Lugar;
  constructor(public navCtrl: NavController, public navParams: NavParams, private lugarService:LugarProvider) {
    this.ubi=this.navParams.get('ubicacion');
    this.id=this.navParams.get('id');
    console.log(this.ubi)
  }

  ionViewDidLoad() {
   if(this.ubi.length==4){
    this.lugarService.obtenerLugar2(this.ubi).subscribe(res=>{
      this.lugares=res as Lugar
      console.log(this.lugares)
    });
   }
   else{
    this.lugarService.obtenerLugar1(this.ubi,this.id).subscribe(res=>{
     this.lugares=res as Lugar
     console.log(this.lugares)
      
    });
    
   }
  }

}
