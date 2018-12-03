import { Component } from '@angular/core';
import {PayPal,PayPalPayment,PayPalConfiguration} from '@ionic-native/paypal';


@Component({
  selector: 'pago-paypal',
  templateUrl: 'pago-paypal.html'
})
export class PagoPaypalComponent {

 

  constructor(private payPal:PayPal) { this.paypalPayment();}
 
  paypalPayment(){
    this.payPal.init({
      PayPalEnvironmentProduction: 'xxxxxxxxxxxx',
      PayPalEnvironmentSandbox: 'ASI03hsOLcHYNP8aqyvEo7Z7I6f3kClaF9gngwJvtDbvyqPhv-toXp83DgXezYs-UT8W3XXt2AEih1UQ'
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
