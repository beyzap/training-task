import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Phone } from './phone-item/phone-item.model';
import { PHONES } from './phones-mock';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  phones: Phone[] = PHONES;

  constructor() { }

  getPhones(): Observable<Phone[]> {
    return of(this.phones);
  }

  addPhone(phoneName: string, phonePrice: number, phoneImage: string,
    phoneModel: string, phoneColor: string, phoneScreenSize: string,
    phoneDescription: string, phoneSKU: string, phoneID: number): void {

    let newPhone: Phone = new Phone(phoneName,
      phonePrice, phoneImage,
      phoneModel, phoneColor,
      phoneScreenSize, phoneDescription,
      phoneSKU, phoneID)

    this.phones.push(newPhone);
  }


  deletePhone(id: number): Observable<Phone[]> {
    let index = this.phones.findIndex(x => x.id === id)
    this.phones.splice(index, 1)
    return of(this.phones);
  }

  editPhone(id: number, phoneNameEdit: string, phoneImageEdit: string, phonePriceEdit: number,
    phoneModelEdit: string, phoneColorEdit: string, phoneScreenSizeEdit: string, phoneDescriptionEdit: string,
    phoneSKUEdit: string): Observable<Phone[]> {

    this.phones[id].name = phoneNameEdit;
    this.phones[id].image = phoneImageEdit;
    this.phones[id].price = phonePriceEdit;
    this.phones[id].modelName = phoneModelEdit;
    this.phones[id].color = phoneColorEdit;
    this.phones[id].screenSize = phoneScreenSizeEdit;
    this.phones[id].description = phoneDescriptionEdit;
    this.phones[id].sku = phoneSKUEdit;
    return of(this.phones);
  }

}
