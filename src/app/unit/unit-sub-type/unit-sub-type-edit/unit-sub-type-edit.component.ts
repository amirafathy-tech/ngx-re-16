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
          this.unitSubTypeService.getApiRecord(index)
            .subscribe((record: UnitSubType) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                subtypeId: this.editedItem.subtypeId,
                subtypeDescr: this.editedItem.subtypeDescr
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitSubType(value.subtypeId, value.subtypeDescr);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { unitSubtypeCode: this.editedItemIndex, subtypeId: value.subtypeId, subtypeDescr: value.subtypeDescr };
      console.log(updatedRecord);

      this.unitSubTypeService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.unitSubTypeService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitSubTypeService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
