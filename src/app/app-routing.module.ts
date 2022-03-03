import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessoryItemComponent } from './accessory-item/accessory-item.component';
import { AuthComponent } from './auth/auth.component';

import { OffersComponent } from './offers/offers.component';
import { PhoneItemComponent } from './phone-item/phone-item.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'phones', component: PhoneItemComponent },
  { path: 'accessories', component: AccessoryItemComponent },
  { path: 'offers', component: OffersComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
