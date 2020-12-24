import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OrderPageComponent } from './order-page/order-page.component'
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component'
import { SalesAnalyticsComponent } from './sales-analytics/sales-analytics.component'
import { ServicesComponent} from './services/services.component'
const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/order',
    pathMatch: 'full'
  },
  { path: 'main/order', component : OrderPageComponent },
  { path: 'main/purchases', component : PurchaseHistoryComponent },
  { path: 'main/sales', component : SalesAnalyticsComponent },
  { path: 'main/services', component : ServicesComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
