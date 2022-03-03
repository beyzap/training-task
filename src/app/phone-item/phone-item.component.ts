import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { PhoneService } from 'src/app/phone.service';
import { Phone } from './phone-item.model';

@Component({
  selector: 'phone-item',
  templateUrl: './phone-item.component.html',
  styleUrls: ['./phone-item.component.css']
})
export class PhoneItemComponent implements OnInit {

  phones: Phone[] = [];

  addForm: boolean = false;
  editForm: boolean = false;
  editIndex: any;

  phoneForm = new FormGroup({
    phoneName: new FormControl(''),
    phonePrice: new FormControl(''),
    phoneImage: new FormControl(''),
    phoneModel: new FormControl(''),
    phoneColor: new FormControl(''),
    phoneScreenSize: new FormControl(''),
    phoneDescription: new FormControl(''),
    phoneSKU: new FormControl('')
  });

  editPhoneForm = new FormGroup({
    phoneNameEdit: new FormControl(''),
    phonePriceEdit: new FormControl(''),
    phoneImageEdit: new FormControl(''),
    phoneModelEdit: new FormControl(''),
    phoneColorEdit: new FormControl(''),
    phoneScreenSizeEdit: new FormControl(''),
    phoneDescriptionEdit: new FormControl(''),
    phoneSKUEdit: new FormControl('')
  });

  constructor(private phoneService: PhoneService) { }

  ngOnInit() {
    this.getPhones();
  }

  onSubmit() {
    let postData = {
      name:  this.phoneForm.value.phoneName, 
      price: this.phoneForm.value.phonePrice,
      image: this.phoneForm.value.phoneImage,
      model: this.phoneForm.value.phoneModel,
      color: this.phoneForm.value.phoneColor, 
      screenSize: this.phoneForm.value.phoneScreenSize,
      description: this.phoneForm.value.phoneDescription, 
      sku: this.phoneForm.value.phoneSKU
    }
    this.phoneService.onAddPhone(postData).subscribe()
    this.phoneForm.reset();
  }

  getPhones() {
    this.phoneService.getPhones()
      .subscribe(phones => this.phones = phones);
  }

  onDelete(id: string): void {
    this.phoneService.onDeletePhone(id).subscribe();
  }

  onEdit(name: string, image: string, price: number, model: string, color: string,
    screenSize: string, descpription: string, sku: string, id: string) {
    this.editPhoneForm.patchValue({
      phoneNameEdit: name,
      phoneImageEdit: image,
      phonePriceEdit: price,
      phoneModelEdit: model,
      phoneColorEdit: color,
      phoneScreenSizeEdit: screenSize,
      phoneDescriptionEdit: descpription,
      phoneSKUEdit: sku
    });

    this.editIndex = this.phones.findIndex(x => x.id === id);
  }
  
  onEditFormSave( id: string) {
    let postData = {
      name: this.editPhoneForm.value.phoneNameEdit, 
      price: this.editPhoneForm.value.phonePriceEdit,
      image: this.editPhoneForm.value.phoneImageEdit,
      model: this.editPhoneForm.value.phoneModelEdit,
      color: this.editPhoneForm.value.phoneColorEdit, 
      screenSize: this.editPhoneForm.value.phoneScreenSizeEdit,
      description: this.editPhoneForm.value.phoneDescriptionEdit, 
      sku: this.editPhoneForm.value.phoneSKUEdit
    }

    this.phoneService.onEditPhone(postData, id).subscribe()

  }

}
