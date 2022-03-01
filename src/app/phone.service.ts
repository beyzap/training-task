import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';

import { Phone } from './phone-item/phone-item.model';
import { PHONES } from './phones-mock';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'userid':'1'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  phones: Phone[] = PHONES;

  constructor(private http: HttpClient) { }

  getPhones() {
    return (
      this.http.get<{ [key: string]: Phone }>
        ('https://training-task-37f8f-default-rtdb.firebaseio.com/posts.json')
        .pipe(
          map(responseData => {
            console.log(responseData)
            const phonesArray: Phone[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                phonesArray.push({ ...responseData[key], id: key });
              }
            }
            console.log(phonesArray)
            return phonesArray
          })
        )
    )
  }

  onAddPhone(postData: {
    name: string; price: number; image: string;
    model: string; color: string; screenSize: string;
    description: string; sku: string
  }): void {

    this.http.post('https://training-task-37f8f-default-rtdb.firebaseio.com/posts.json', postData)
      .subscribe(responseData => { console.log(responseData) })
  }

  onDeletePhone(id: string): Observable<unknown> {
    
    const url = `${"https://training-task-37f8f-default-rtdb.firebaseio.com/posts.json"}/${id}`;
    return this.http.delete(url)
  }


  deletePhone(id: number): Observable<Phone[]> {
    let index = 0
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
