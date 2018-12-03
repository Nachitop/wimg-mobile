import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ContratacionProvider } from '../../providers/contratacion/contratacion';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { GuiaProvider } from '../../providers/guia/guia';
import { Guia1, Guia2 } from '../../app/models/guia.model';
import { LugarProvider } from '../../providers/lugar/lugar';
import { HomePage } from '../home/home';


/**
 * Generated class for the ViajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viaje',
  templateUrl: 'viaje.html',
})
export class ViajePage {
  id_contratacion:string;
  id_turista:string;
  loader:any;
  estado:string="P";
  id_lugar: string;
  id_guia: string;
  guia:Guia1;
  lugar:any;
  habilitarCom: boolean;
  valoracion:string="";
  comentario:string="";
  comentado:boolean=false;
 
  constructor(public lugarService:LugarProvider , public guiaService:GuiaProvider, public alertService:AlertsProvider,public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public contratacionService:ContratacionProvider) {
    this.id_contratacion=this.navParams.get('id_contratacion');
    this.id_guia=this.navParams.get('id_guia');
    this.id_lugar=this.navParams.get('id_lugar');
    this.id_turista=this.navParams.get('id_turista');
  

    this.loader = this.loadingCtrl.create({
      content: "Waiting for guide response, thank you",
    
    });
    
  }

  ionViewDidLoad() {
 
    this.obtenerestado();
    }
  
    obtenerestado(){
      
     

     var interv= setInterval( () => {
         if(this.estado=="P"){ this.loader.present();}
         else{this.loader.dismiss();}
       
        this.contratacionService.escuchaTurista(this.id_contratacion).subscribe(res=>{
          let resp=JSON.stringify(res);
         
          let resp2=JSON.parse(resp);
           if(resp2.estado==1){
            this.estado=resp2.Guia.estado;
             if(this.estado=="A"){
            this.loader.dismiss();
            this.alertService.showAlert("Success","The guide has accepted your travel, enjoy it!")
            clearInterval(interv);
            this.guiaService.getGuiaById(this.id_guia).subscribe(res=>{
              this.guia=res as Guia1;
            
              if(this.guia.estado==1){
                  this.lugarService.obtenerLugarById(this.id_lugar).subscribe(res=>{
                    let resp=JSON.stringify(res);
                    let resp2=JSON.parse(resp);
                    this.lugar=resp2.Lugar;
                    this.iniciarViaje();
                   //this.habilitarComentarios();
                  });
              }else{
                this.alertService.showAlert("Error","Guide not found");
              }
            });
            
            }
            else{
              if(this.estado==="C"){
                this.alertService.showAlert("Error","Guide has canceled your hiring!");
                clearInterval(interv);
                this.loader.dismiss();
                this.navCtrl.push(HomePage);
              }
            }
           }else{
           
           }
          
        });

    
   }, 5000);
  
  }


  habilitarComentarios(){
    var interv= setInterval( () => {
      this.contratacionService.escuchaTurista(this.id_contratacion).subscribe(res=>{
        let resp=JSON.stringify(res);
       
        let resp2=JSON.parse(resp);
        if(resp2.estado==1){
          this.estado=resp2.Guia.estado;
           if(this.estado==="F"){
            this.alertService.showAlert("Success","The travel has ended! Please tell us what do you think about our guide :)")
            this.habilitarCom=true;
            clearInterval(interv);
           }
           }else{
              
           }
      });
    },5000);
  }

  iniciarViaje(){
    var interv= setInterval( () => {
      this.contratacionService.escuchaTurista(this.id_contratacion).subscribe(res=>{
        let resp=JSON.stringify(res);
       
        let resp2=JSON.parse(resp);
        if(resp2.estado==1){
          this.estado=resp2.Guia.estado;
           if(this.estado==="I"){
            this.alertService.showAlert("Success","Guide has started the travel")
            this.habilitarComentarios();
            clearInterval(interv);
           }
           else{
          
           }
           }else{
            
              
             
           }
      });
    },5000);
  }
  retroalimentar(){
    let comentario={
      id_turista:this.id_turista, id_guia:this.id_guia, comentario:this.comentario
    }

    let valoracion={
      id_turista:this.id_turista, id_guia:this.id_guia, valoracion:this.valoracion
    }

    this.contratacionService.ComentarGuia(comentario).subscribe(res=>{


      this.contratacionService.valorarGuia(valoracion).subscribe(res=>{
        this.alertService.showAlert("Succes","Thanks for giving us your opinion :)!")
        this.navCtrl.push(HomePage);
      });

    });

  
    this.comentado=true;
  }
  
}
