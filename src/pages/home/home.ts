import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListaguiasPage } from '../listaguias/listaguias';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {



  }

  irAGuias(){
       
    this.navCtrl.push('ListaguiasPage');
  }
  irAGuia(){
       
    this.navCtrl.push('guia');
  }
}
