import { Injectable } from '@angular/core';

import { Accessory } from './accessory-item/accessory-item.model';
import { ACCESSORIES } from './accessories-mock';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {

  constructor() { }

  getAccessories(): Accessory[] {
    return ACCESSORIES;
  }
}
