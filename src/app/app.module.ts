import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

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


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,GoogleMapComponent,PagoPaypalComponent,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
   
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
    LugarProvider
 
  ]
})
export class AppModule {}
