import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GuiaProvider } from '../../providers/guia/guia';
import { getNonHydratedSegmentIfLinkAndUrlMatch } from 'ionic-angular/umd/navigation/url-serializer';
import { Guia1, Comentario } from '../../app/models/guia.model';
import {round,calculateEdad,sexo} from '../../app//funciones/funcion';
import { FlagProvider } from '../../providers/flag/flag';
import { Flag } from '../../app/models/flag.model';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the GuiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guia',
  templateUrl: 'guia.html',
})
export class GuiaPage {
  
  constructor(private navCtrl: NavController, private navParams: NavParams, private guiaService:GuiaProvider, private flagService:FlagProvider,private alertCtrl: AlertController) {
    this.id=this.navParams.get('val');
    this.ubi=this.navParams.get('ubicacion');
  }
  ubi=[];
  id:string;
  guia:Guia1;
  idiomas:string="";
  titulos:string="";
  lugares:string="";
  estrellas:any[]=[];
  estrellasVacias:any[]=[];
  comentarios:Comentario[]=[];
  bandera:string;
  ionViewDidLoad() {
      this.getGuia();
  }
  
  getGuia(){
    this.guiaService.getGuiaById((this.id).toString()).subscribe(res=>{
      this.guia=res as Guia1;
      this.obtenerFlag();
      this.obtenerIdiomas();
      this.obtenerTitulos();
      this.obtenerLugares();
      this.obtenerEstrellas();
      this.obtenerComentarios();
      console.log(this.guia);
    });
  }
  obtenerFlag(){
    this.flagService.obtenerFlags().subscribe(async(res)=>{
       this.flagService.flags= await res as Flag
      this.bandera= this.flagService.obtenerFlag("Mexico").flag_4x3;
    
    });
  
  }
obtenerIdiomas(){
  this.guia.idiomas.forEach(val=>{
    this.idiomas=val.Idioma+", " + this.idiomas  
  });
   this.idiomas=this.idiomas.slice(0,-2)
}

obtenerTitulos(){
  this.guia.titulos.forEach(val=>{
  this.titulos=val.Titulo+", " + this.titulos 
  });
  this.titulos=this.titulos.slice(0,-2)
}

obtenerLugares(){
  this.guia.lugares.forEach(val=>{
  this.lugares=val.Lugar+", " + this.lugares 
  });
  this.lugares=this.lugares.slice(0,-2)

 
}

obtenerEstrellas(){
  this.guia.valoraciones.forEach(val=>{
    
    for(var i=1;i<= round(val.Valoracion,0);i++){
      this.estrellas.push(i);
    }
    let estrellita=5-this.estrellas.length;
    if(estrellita>0){
    this.estrellasVacias.push(estrellita);
    }
  });
  
}
obtenerComentarios(){
  this.guia.comentarios.forEach(val=>{
    console.log(val);
    this.comentarios.push(val as Comentario);
  });
}
calculateAge(birthday) { 
  let edad;
    return edad= calculateEdad(birthday);
}

convSexo(sexoo:any){
  let sex;
  return sex= sexo(sexoo);
}


showConfirm() {
  const confirm = this.alertCtrl.create({
    title: 'Contratación del guia',
    message: '¿Está usted seguro de solicitar los servicios de este guia?',
    buttons: [
      {
        text: 'Cancelar',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Aceptar',
        handler: () => {
         this.navCtrl.push('ResumenpagoPage',{
           ubicacion:this.ubi,
           id:this.id
         })
        }
      }
    ]
  });
  confirm.present();
}

}


