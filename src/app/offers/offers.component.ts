import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { PhoneService } from '../phone.service';
import { Phone } from '../phone-item/phone-item.model';

import { Accessory } from '../accessory-item/accessory-item.model';
import { AccessoryService } from '../accessory.service';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {

  form = new FormGroup({
    selectedPhone: new FormControl(''),
    selectedAccessory: new FormControl(''),
  });

  phones: Phone[] = [];
  accessories: Accessory[] = [];

  constructor(private phoneService: PhoneService, private accessoryService: AccessoryService) {
  }

  ngOnInit(): void {
    this.getAccessories();
  }

  getPhones(): void {
    this.phoneService.getPhones();
  }

  getAccessories(): void {
    this.accessoryService.getAccessories()
      .subscribe(accessories => this.accessories = accessories);
  }

  selectedPhonePrice: any;
  selectedAccessoryPrice: any;
  selectedSum: any;
  discount: any;
  newPrice: any;

  changePhone(value: any) {
    this.selectedPhonePrice = value;
  }

  changeAccessory(value: any) {
    this.selectedAccessoryPrice = value;
  }

  onCalculate() {
    this.selectedSum = this.selectedAccessoryPrice + this.selectedPhonePrice;
    this.discount = this.selectedSum * 0.2
    this.newPrice = this.selectedSum - this.discount
  }

}
