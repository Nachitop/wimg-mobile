import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatasharingProvider} from '../../providers/datasharing/datasharing';
import {GuiaProvider} from '../../providers/guia/guia';
import { Guia1 } from '../../app/models/guia.model';
import { FlagProvider } from '../../providers/flag/flag';
import { Flag } from '../../app/models/flag.model';
import {round,calculateEdad,sexo,disponibilidad} from '../../app//funciones/funcion';
/**
 * Generated class for the ListaguiasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listaguias',
  templateUrl: 'listaguias.html',
})
export class ListaguiasPage {
 
  ubi=[];
  guias:Guia1
  bandera:any;
  estrellas:any[]=[];
  estrellasVacias:any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private data:DatasharingProvider, private guiaService:GuiaProvider, private flagService:FlagProvider) {
    this.ubi=this.navParams.get('val');
    this.obtenerFlags();
    console.log(this.ubi)
  
  }

  ionViewDidLoad() {
   
    if(this.ubi.length==4){
      this.guiaService.getByLugar2(this.ubi).subscribe(res=>{
       
        this.guias=res as Guia1
        console.log(this.guias);
       
      });
    }
    else{
      this.guiaService.getByLugar(this.ubi).subscribe(res=>{
        
        this.guias=res as Guia1
        console.log(this.guias);
     
      });
    }
    
    
  }

  obtenerFlags(){
    this.flagService.obtenerFlags().subscribe(async(res)=>{
       this.flagService.flags= await res as Flag
       
    });
  
  }
  vaciarEstrellas(){
    this.estrellas=[];
    this.estrellasVacias=[];
  }
  obtenerEstrellas(estrellas:number){
    console.log(estrellas);
      let obj={}
      for(var i=1;i<= round(estrellas,0);i++){
        this.estrellas.push(obj);
      }
      console.log(this.estrellas)
      let estrellita=5-this.estrellas.length;
      if(estrellita>0){
        for(var i=1;i<=estrellita;i++){
      this.estrellasVacias.push(obj);
        }
      }
 
    
  }
  obtenerFlag(pais:string){
    
    return this.flagService.obtenerFlag(pais).flag_4x3;
    
  }
  calculateAge(birthday) { 
    let edad;
      return edad= calculateEdad(birthday);
  }
  convSexo(sexoo:any){
    let sex;
    return sex= sexo(sexoo);
  }
  convDis(dis:any){
    let disp;
    return disp=disponibilidad(dis);
  }

  irAPerfil(id:string){
    this.navCtrl.push('GuiaPage',{
      val:id,
      ubicacion:this.ubi
    });
  }
}
