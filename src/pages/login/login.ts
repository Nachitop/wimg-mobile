import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:string="";
  password="";
  emailExiste:boolean;
  loginSuccess:boolean;
  constructor( public alertsService:AlertsProvider,public loginService:LoginProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  validarEmail(){
    if(this.email.length>0){
      console.log(this.email)
    this.loginService.validarEmail(this.email).subscribe(res=>{
      let resp= JSON.stringify(res);
      let resp2=JSON.parse(resp);
      console.log(resp2)
      if(resp2.estado==1){
        this.emailExiste=true;
      }
      else{
        this.emailExiste=false;
        console.log(this.emailExiste);
      }
    });
    }
  }

  loguearse(){
    this.loginService.loguearse(this.email,this.password).subscribe(res=>{
      let resp=JSON.stringify(res);
      let resp2=JSON.parse(resp);
      if(resp2.estado==1){
        localStorage.setItem('turista',this.email);
        this.navCtrl.push(HomePage);

      }
      else{
        this.alertsService.showAlert("Failed to sign in","Wrong password or internal server error");
       // this.loginSuccess=false;
      }
    });
  }

  irARegistrarse(){
    this.navCtrl.push('RegistroPage');
  }

}
