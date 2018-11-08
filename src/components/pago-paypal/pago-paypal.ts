import { Component } from '@angular/core';
import {PayPal,PayPalPayment,PayPalConfiguration} from '@ionic-native/paypal';

/**
 * Generated class for the PagoPaypalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pago-paypal',
  templateUrl: 'pago-paypal.html'
})
export class PagoPaypalComponent {

 

  constructor(private payPal:PayPal) { this.paypalPayment();}
 
  paypalPayment(){
    this.payPal.init({
      PayPalEnvironmentProduction: 'xxxxxxxxxxxx',
      PayPalEnvironmentSandbox: 'AB9VOTBKEpsS0eYPlqU1tEkAaFQrAHJIwPRkn4udZcJxVFLopRf9t2tQ'
    }).then(() => {

      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({

      })).then(() => {
        let payment = new PayPalPayment('3.33', 'MXN', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((success) => {
          console.log(success);
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
}
