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
          this.editedItem = this.unitOfMeasureService.getRecord(index);
          this.slForm.setValue({
            code: this.editedItem.code,
            description: this.editedItem.description
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitOfMeasure(value.code, value.description);
    if (this.editMode) {
      this.unitOfMeasureService.updateRecord(this.editedItemIndex, newRecord);
    } else {
      this.unitOfMeasureService.addRecord(newRecord);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitOfMeasureService.deleteRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
