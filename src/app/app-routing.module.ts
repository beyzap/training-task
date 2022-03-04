import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessoryItemComponent } from './accessory-item/accessory-item.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

import { OffersComponent } from './offers/offers.component';
import { PhoneItemComponent } from './phone-item/phone-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'phones', component: PhoneItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accessories', component: AccessoryItemComponent,
    canActivate: [AuthGuard]
  },
  { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
