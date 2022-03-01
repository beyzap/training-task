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
  editIndex: number = 0;

  accessoryForm = new FormGroup({
    accessoryName: new FormControl(''),
    accessoryPrice: new FormControl(''),
    accessoryImage: new FormControl(''),
    accessoryID: new FormControl(''),
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
    this.accessoryService.addAccessory(this.accessoryForm.value.accessoryName,
      this.accessoryForm.value.accessoryPrice,
      this.accessoryForm.value.accessoryImage,
      this.accessoryForm.value.accessoryID)
    this.accessoryForm.reset();
  }

  onDelete(id: number) {
    this.accessoryService.deleteAccessory(id)
  }


  onEdit(name: string, image: string, price: number, id: number) {

    this.editAccessoryForm.patchValue({
      accessoryNameEdit: name,
      accessoryImageEdit: image,
      accessoryPriceEdit: price,
    });

    this.editIndex = this.accessories.findIndex(x => x.id === id);

    this.accessoryService.editAccessory(id, this.editAccessoryForm.value.accessoryNameEdit,
      this.editAccessoryForm.value.accessoryPriceEdit,
      this.editAccessoryForm.value.accessoryImageEdit)


  }
  onEditFormSave(id: number) {
    this.accessoryService.editAccessory(id, this.editAccessoryForm.value.accessoryNameEdit,
      this.editAccessoryForm.value.accessoryPriceEdit,
      this.editAccessoryForm.value.accessoryImageEdit)

  }

}
