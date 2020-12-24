import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { CurrencyPipe } from "@angular/common";
/** Child components */
import { FormsComponent } from '../forms/forms.component'


@NgModule({
  declarations: [
    FormsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule
  ],
  exports:[
    FormsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CurrencyPipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
})
export class MyAppComponentsModule { }
