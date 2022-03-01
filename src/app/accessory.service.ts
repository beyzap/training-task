import { Injectable } from '@angular/core';

import { Accessory } from './accessory-item/accessory-item.model';
import { ACCESSORIES } from './accessories-mock';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {

  accessories: Accessory[] = ACCESSORIES;

  constructor() { }
  

  getAccessories(): Observable<Accessory[]> {
    return of(this.accessories);
  }

  addAccessory(accessoryName: string, accessoryPrice: number, accessoryImage: string,
    accessoryID: number): void {

    let newAccessory: Accessory = new Accessory(accessoryName,
      accessoryPrice, accessoryImage,
      accessoryID)

    this.accessories.push(newAccessory);
  }

  deleteAccessory(id: number): Observable<Accessory[]> {
    let index = this.accessories.findIndex(x => x.id === id)
    this.accessories.splice(index, 1)
    return of(this.accessories);
  }

  editAccessory(id: number, accessoryNameEdit: string, 
                accessoryPriceEdit: number, accessoryImageEdit: string, ): Observable<Accessory[]> {

    this.accessories[id].name = accessoryNameEdit;
    this.accessories[id].image = accessoryImageEdit;
    this.accessories[id].price = accessoryPriceEdit;
    
    return of(this.accessories);
  }
}
