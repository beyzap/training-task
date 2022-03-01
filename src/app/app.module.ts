import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PhoneItemComponent } from './phone-item/phone-item.component';
import { HeaderComponent } from './header/header.component';
import { AccessoryItemComponent } from './accessory-item/accessory-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { OffersComponent } from './offers/offers.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PhoneItemComponent,
    HeaderComponent,
    AccessoryItemComponent,
    OffersComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
