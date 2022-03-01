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
    this.accessories = this.accessoryService.getAccessories();
  }

  onSubmit() {
    this.accessories.push(new Accessory(this.accessoryForm.value.accessoryName,
      this.accessoryForm.value.accessoryPrice, this.accessoryForm.value.accessoryImage));

    this.accessoryForm.reset();
  }

  onDelete(image: string) {
    let index = this.accessories.findIndex(x => x.image === image)
    this.accessories.splice(index, 1)
  }

  onEdit(name: string, image: string, price: number) {
    this.editAccessoryForm.patchValue({
      accessoryNameEdit: name,
      accessoryImageEdit: image,
      accessoryPriceEdit: price
    });

    this.editIndex = this.accessories.findIndex(x => x.image === image);
    console.log(this.editIndex)
    console.log(this.accessories[this.editIndex])

  }
  onEditForm(image: string) {

    let index = this.accessories.findIndex(x => x.image === image);

    this.accessories[index].name = this.editAccessoryForm.value.accessoryNameEdit;
    this.accessories[index].image = this.editAccessoryForm.value.accessoryImageEdit;
    this.accessories[index].price = this.editAccessoryForm.value.accessoryPriceEdit;

  }

}
