import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { PhoneService } from 'src/app/phone.service';
import { Phone } from './phone-item.model';

@Component({
  selector: 'phone-item',
  templateUrl: './phone-item.component.html',
  styleUrls: ['./phone-item.component.css']
})
export class PhoneItemComponent implements OnInit {

  @Input() phones: Phone[] = [];

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
    phoneSKU: new FormControl(''),
    phoneID: new FormControl('')
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

  ngOnInit(): void {
    this.getPhones()
  }

  onSubmit() {
    this.phoneService.addPhone(this.phoneForm.value.phoneName,
      this.phoneForm.value.phonePrice, this.phoneForm.value.phoneImage,
      this.phoneForm.value.phoneModel, this.phoneForm.value.phoneColor,
      this.phoneForm.value.phoneScreenSize, this.phoneForm.value.phoneDescription,
      this.phoneForm.value.phoneSKU, this.phoneForm.value.phoneID).subscribe(phone => this.phones.push(phone))

    this.phoneForm.reset();
  }

  getPhones(): void {
    this.phoneService.getPhones()
      .subscribe(phones => this.phones = phones);
  }

  onDelete(id: number) {
    this.phoneService.deletePhone(id)
  }

  onEdit(name: string, image: string, price: number, model: string, color: string,
    screenSize: string, descpription: string, sku: string, id: number) {
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

    this.phoneService.editPhone(id, this.editPhoneForm.value.phoneNameEdit, this.editPhoneForm.value.phoneImageEdit,
      this.editPhoneForm.value.phonePriceEdit, this.editPhoneForm.value.phoneModelEdit,
      this.editPhoneForm.value.phoneColorEdit, this.editPhoneForm.value.phoneScreenSizeEdit,
      this.editPhoneForm.value.phoneDescriptionEdit, this.editPhoneForm.value.phoneSKUEdit)


  }
  onEditFormSave(id: number) {
    this.phoneService.editPhone(id, this.editPhoneForm.value.phoneNameEdit, this.editPhoneForm.value.phoneImageEdit,
      this.editPhoneForm.value.phonePriceEdit, this.editPhoneForm.value.phoneModelEdit,
      this.editPhoneForm.value.phoneColorEdit, this.editPhoneForm.value.phoneScreenSizeEdit,
      this.editPhoneForm.value.phoneDescriptionEdit, this.editPhoneForm.value.phoneSKUEdit)
  }

}
