import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { UnitSubType } from '../unit-sub-type.model';
import { UnitSubTypeService } from '../unit-sub-type.service';

@Component({
  selector: 'app-unit-sub-type-edit',
  templateUrl: './unit-sub-type-edit.component.html',
  // styleUrl: './unit-sub-type-edit.component.css'
})
export class UnitSubTypeEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: UnitSubType;

  constructor(private unitSubTypeService: UnitSubTypeService) { }

  ngOnInit() {
    this.subscription = this.unitSubTypeService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.unitSubTypeService.getRecord(index);
          this.slForm.setValue({
            code: this.editedItem.code,
            description: this.editedItem.description
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitSubType(value.code, value.description);
    if (this.editMode) {
      this.unitSubTypeService.updateRecord(this.editedItemIndex, newRecord);
    } else {
      this.unitSubTypeService.addRecord(newRecord);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitSubTypeService.deleteRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
