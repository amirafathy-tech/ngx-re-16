import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { UnitOfMeasure } from '../unit-of-measure.model';
import { UnitOfMeasureService } from '../unit-of-measure.service';

@Component({
  selector: 'app-unit-of-measure-edit',
  templateUrl: './unit-of-measure-edit.component.html',
  // styleUrl: './unit-of-measure-edit.component.css'
})
export class UnitOfMeasureEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: UnitOfMeasure;
  constructor(private unitOfMeasureService: UnitOfMeasureService) { }

  ngOnInit() {
    this.subscription = this.unitOfMeasureService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.unitOfMeasureService.getApiRecord(index)
            .subscribe((record: UnitOfMeasure) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                uomID: this.editedItem.uomID,
                uomDescr: this.editedItem.uomDescr
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitOfMeasure(value.uomID, value.uomDescr);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { measurementCode: this.editedItemIndex, uomID: value.uomID, uomDescr: value.uomDescr };
      console.log(updatedRecord);

      this.unitOfMeasureService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.unitOfMeasureService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitOfMeasureService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
