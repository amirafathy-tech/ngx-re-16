import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { UnitOrientation } from '../unit-orientation.model';
import { UnitOrientationService } from '../unit-orientation.sevice';

@Component({
  selector: 'app-unit-orientation-edit',
  templateUrl: './unit-orientation-edit.component.html',
  //styleUrl: './unit-orientation-edit.component.css'
})
export class UnitOrientationEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: UnitOrientation;
  constructor(private unitOrientationService: UnitOrientationService) { }

  ngOnInit() {
    this.subscription = this.unitOrientationService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.unitOrientationService.getApiRecord(index)
            .subscribe((record: UnitOrientation) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                orientationId: this.editedItem.orientationId,
                orientationDescr: this.editedItem.orientationDescr
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitOrientation(value.orientationId, value.orientationDescr);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { orientationCode: this.editedItemIndex, orientationId: value.orientationId, orientationDescr: value.orientationDescr };
      console.log(updatedRecord);

      this.unitOrientationService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.unitOrientationService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitOrientationService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
