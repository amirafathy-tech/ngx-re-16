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
          this.editedItem = this.unitOrientationService.getRecord(index);
          this.slForm.setValue({
            code: this.editedItem.code,
            description: this.editedItem.description
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitOrientation(value.code, value.description);
    if (this.editMode) {
      this.unitOrientationService.updateRecord(this.editedItemIndex, newRecord);
    } else {
      this.unitOrientationService.addRecord(newRecord);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitOrientationService.deleteRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
