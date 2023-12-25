import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { PriceType } from '../price-type.model';
import { PriceTypeService } from '../price-type.service';

@Component({
  selector: 'app-price-type-edit',
  templateUrl: './price-type-edit.component.html',
 // styleUrl: './price-type-edit.component.css'
})
export class PriceTypeEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: PriceType;

  constructor(private priceTypeService: PriceTypeService) { }

  ngOnInit() {
    this.subscription = this.priceTypeService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.priceTypeService.getRecord(index);
          this.slForm.setValue({
            code: this.editedItem.code,
            description: this.editedItem.description
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new PriceType(value.code, value.description);
    if (this.editMode) {
      this.priceTypeService.updateRecord(this.editedItemIndex, newRecord);
    } else {
      this.priceTypeService.addRecord(newRecord);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.priceTypeService.deleteRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
