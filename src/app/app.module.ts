import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { MyAppComponentsModule } from './order-page/my-app-components/my-app-components.module';
import { CurrencyPipe } from "@angular/common";
/** Parent components */
import { OrderPageComponent } from './order-page/order-page.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { SalesAnalyticsComponent } from './sales-analytics/sales-analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderPageComponent,
    PurchaseHistoryComponent,
    SalesAnalyticsComponent,
  ],
  entryComponents: [
    OrderPageComponent,
    PurchaseHistoryComponent,
    SalesAnalyticsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    MyAppComponentsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CurrencyPipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
