import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  ubicacion:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaguiasPage');
    this.ubicacion=JSON.parse(localStorage.getItem('ubicacion'))
    console.log(this.ubicacion);
  
  }

}
