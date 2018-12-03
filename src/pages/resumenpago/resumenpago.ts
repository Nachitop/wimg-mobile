import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LugarProvider} from '../../providers/lugar/lugar';
import { Lugar } from '../../app/models/lugar.model';
import {PayPal,PayPalPayment,PayPalConfiguration} from '@ionic-native/paypal';
import { LoginProvider } from '../../providers/login/login';
import { Persona } from '../../app/models/persona.model';
import { ContratacionProvider } from '../../providers/contratacion/contratacion';
import { Contratacion } from '../../app/models/contratacion.model';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { GuiaProvider } from '../../providers/guia/guia';
import { Guia1 } from '../../app/models/guia.model';

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
  emailTurista:string;
  id_turista:string;
  guia:Guia1;
  constructor(public alertService: AlertsProvider,public navCtrl: NavController, public navParams: NavParams, private lugarService:LugarProvider,private payPal:PayPal,public loginService:LoginProvider,public contratacionService:ContratacionProvider, public guiaService:GuiaProvider) {
    this.ubi=this.navParams.get('ubicacion');
    this.id=this.navParams.get('id');
    this.emailTurista=localStorage.getItem('turista');
    let turista:Persona=new Persona();
    this.loginService.obtenerPerfilTurista(this.emailTurista).subscribe(res=>{
      let resp=JSON.stringify(res);
      let resp2=JSON.parse(resp);
      turista=resp2.email as Persona;
      localStorage.setItem('id_turista',turista.id);
      this.id_turista= turista.id;
    
    })
  }

  ionViewDidLoad() {
   if(this.ubi.length==4){
    this.lugarService.obtenerLugar2(this.ubi).subscribe(res=>{
      this.lugares=res as Lugar
    
    });
   }
   else{
    this.lugarService.obtenerLugar1(this.ubi,this.id).subscribe(res=>{
     this.lugares=res as Lugar
  
      
    });
    
   }
  }


    paypalPayment(){
    

      this.payPal.init({
        PayPalEnvironmentProduction: 'xxxxxxxxxxxx',
        PayPalEnvironmentSandbox: 'ASI03hsOLcHYNP8aqyvEo7Z7I6f3kClaF9gngwJvtDbvyqPhv-toXp83DgXezYs-UT8W3XXt2AEih1UQ'
      }).then(() => {
  
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
  
        })).then(() => {
          let id_contratacion:string;
          let payment = new PayPalPayment(this.lugarM.costo, 'MXN', 'WIMG guide service', 'sale');
          this.payPal.renderSinglePaymentUI(payment).then((success) => {
            console.log(success);
            let contratacion:Contratacion=new Contratacion();
            contratacion.id_turista=this.id_turista;
            contratacion.id_guia=this.id;
            contratacion.id_lugar=this.lugarM.id;
            contratacion.fecha=new Date().toLocaleString();
            contratacion.estado="P";
            this.contratacionService.contratar(contratacion).subscribe(res=>{
              let resp=JSON.stringify(res);
              let resp2=JSON.parse(resp);
              if(resp2.estado==1){
                let detalles={
                  id_contratacion:"", personas:"", horas:"", precio:""
                }
                // let datos_guia={
                //   id:this.id, disponibilidad:"O"
                // }
                // this.contratacionService.editEstadoGuia(datos_guia).subscribe(res=>{

                // });

                detalles.id_contratacion=resp2.resultado.id;
                detalles.personas=this.lugarM.limite_personas;
                detalles.horas=this.lugarM.duracion;
                detalles.precio=this.lugarM.costo;
                id_contratacion=resp2.resultado.id;
                this.contratacionService.detallecontratacion(detalles).subscribe(res=>{
                  let resp=JSON.stringify(res);
                  let resp2=JSON.parse(resp);
                  if(resp2.estado==1){

                 
                    
                    this.navCtrl.push('ViajePage',{
                      id_contratacion: id_contratacion,
                      id_guia: this.id,
                      id_lugar:this.lugarM.id,
                      id_turista:localStorage.getItem('id_turista')
                    });
      
                  }
                  else{
                    this.alertService.showAlert("Error contracting details","Error contracting guide services");
                    this.navCtrl.push('HomePage');
                  }
                });
              }
              else{
                this.alertService.showAlert("Error contracting","Error contracting guide services");
                this.navCtrl.push('HomePage');
              }
            });
          }, () => {
            // Error or render dialog closed without being successful
            console.log('error paypal')
          });
        }, () => {
          // Error in configuration
          console.log('error configuration paypal')
        });
      }, () => {
        // Error in initialization, maybe PayPal isn't supported or something else
        console.log('error last paypal')
      });
     
    }
    
 // }

}
