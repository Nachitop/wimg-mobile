import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {GoogleMapComponent} from '../components/google-map/google-map';
import {PagoPaypalComponent} from '../components/pago-paypal/pago-paypal';
import { Geolocation } from '@ionic-native/geolocation';
import {HttpClientModule} from '@angular/common/http'
import { ServicesGooglePlacesProvider } from '../providers/services-google-places/services-google-places';
import { PayPal } from '@ionic-native/paypal';

import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { GuiaProvider } from '../providers/guia/guia';
import { FlagProvider } from '../providers/flag/flag';
import { DatasharingProvider } from '../providers/datasharing/datasharing';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { LugarProvider } from '../providers/lugar/lugar';

import { LoginProvider } from '../providers/login/login';
import { RegistroProvider } from '../providers/registro/registro';
import { AlertsProvider } from '../providers/alerts/alerts';
import { ContratacionProvider } from '../providers/contratacion/contratacion';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
 GoogleMapComponent,PagoPaypalComponent,//LoginPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    //LoginPage,RegistroPage,
   
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, Geolocation,
    ServicesGooglePlacesProvider,PayPal,
    NativeGeocoder,
    GuiaProvider,
    FlagProvider,
    DatasharingProvider,
    GeolocationProvider,
    LugarProvider,
    LoginProvider,
    RegistroProvider,
    AlertsProvider,
    ContratacionProvider
 
  ]
})
export class AppModule {}
