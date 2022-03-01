import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

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
  editIndex: number = 0;

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
      name: this.phoneForm.value.phoneName, 
      price: this.phoneForm.value.phonePrice,
      image: this.phoneForm.value.phoneImage,
      model: this.phoneForm.value.phoneModel,
      color: this.phoneForm.value.phoneColor, 
      screenSize: this.phoneForm.value.phoneScreenSize,
      description: this.phoneForm.value.phoneDescription, 
      sku: this.phoneForm.value.phoneSKU
    }
    this.phoneService.onAddPhone(postData)

    this.phoneForm.reset();
  }

  getPhones() {
    this.phoneService.getPhones()
      .subscribe(phones => this.phones = phones);
    console.log(this.phones)
  }

  onClick() {
    this.getPhones()
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

    this.editIndex = 0;



  }
  onEditFormSave(id: string) {

  }

}
