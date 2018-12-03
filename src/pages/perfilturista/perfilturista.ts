import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { Persona } from '../../app/models/persona.model';
import { FlagProvider } from '../../providers/flag/flag';
import { Flag } from '../../app/models/flag.model';

/**
 * Generated class for the PerfilturistaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfilturista',
  templateUrl: 'perfilturista.html',
})
export class PerfilturistaPage {
  emailTurista:string;
  turista:Persona= new Persona();
  bandera:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loginService:LoginProvider, public flagService:FlagProvider) {
    this.emailTurista=this.navParams.get('email');
  }

  ionViewDidLoad() {
  this.obtenerTurista();
  }

  obtenerTurista(){
    this.loginService.obtenerPerfilTurista(this.emailTurista).subscribe(res=>{
      let resp=JSON.stringify(res);
      let resp2=JSON.parse(resp)
      this.turista=resp2.email as Persona;
      this.obtenerFlag();
    });
  }

  obtenerFlag(){
    this.flagService.obtenerFlags().subscribe(async(res)=>{
       this.flagService.flags= await res as Flag
      this.bandera= this.flagService.obtenerFlag(this.turista.Pais).flag_4x3;
    
    });
  
  }

}
