import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AccessoryService } from 'src/app/accessory.service';
import { Accessory } from './accessory-item.model';

@Component({
  selector: 'accessory-item',
  templateUrl: './accessory-item.component.html',
  styleUrls: ['./accessory-item.component.css']
})
export class AccessoryItemComponent implements OnInit {

  accessories: Accessory[] = [];
  addForm: boolean = false;
  editForm: boolean = false;
  editIndex: any;

  accessoryForm = new FormGroup({
    accessoryName: new FormControl(''),
    accessoryPrice: new FormControl(''),
    accessoryImage: new FormControl(''),
  });

  editAccessoryForm = new FormGroup({
    accessoryNameEdit: new FormControl(''),
    accessoryPriceEdit: new FormControl(''),
    accessoryImageEdit: new FormControl('')
  });

  constructor(private accessoryService: AccessoryService) { }

  ngOnInit(): void {
    this.getAccessories();
  }

  getAccessories(): void {
    this.accessoryService.getAccessories()
      .subscribe(accessories => this.accessories = accessories);
  }


  onSubmit() {
    let postData: Accessory = {
      name: this.accessoryForm.value.accessoryName,
      price: this.accessoryForm.value.accessoryPrice,
      image: this.accessoryForm.value.accessoryImage,
      id: '',
    }
    this.accessoryService.onAddAccessory(postData).subscribe(respData => this.accessories.push(respData));
    this.accessoryForm.reset();
  }

  onDelete(id: string) {
    this.accessoryService.onDeleteAccessory(id).subscribe(respData => this.accessories.push(respData))
  }


  onEdit(name: string, image: string, price: number, id: string) {
    this.editAccessoryForm.patchValue({
      accessoryNameEdit: name,
      accessoryImageEdit: image,
      accessoryPriceEdit: price,
    });

    this.editIndex = this.accessories.findIndex(x => x.id === id);
  }

  onEditFormSave(id: string) {

    let postData = {
      name: this.editAccessoryForm.value.accessoryNameEdit,
      price: this.editAccessoryForm.value.accessoryPriceEdit,
      image: this.editAccessoryForm.value.accessoryImageEdit,
    }
    this.accessoryService.onEditAccessory(postData, id).subscribe(respData => this.accessories.push(respData))
  }

}
