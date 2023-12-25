import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { UnitStatus } from '../unit-status.model';
import { UnitStatusService } from '../unit-status.service';

@Component({
  selector: 'app-unit-status-edit',
  templateUrl: './unit-status-edit.component.html',
 // styleUrl: './unit-status-edit.component.css'
})
export class UnitStatusEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: UnitStatus;

  constructor(private unitStatusService: UnitStatusService) { }

  ngOnInit() {
    this.subscription = this.unitStatusService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.unitStatusService.getRecord(index);
          this.slForm.setValue({
            code: this.editedItem.code,
            description: this.editedItem.description
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitStatus(value.code, value.description);
    if (this.editMode) {
      this.unitStatusService.updateRecord(this.editedItemIndex, newRecord);
    } else {
      this.unitStatusService.addRecord(newRecord);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitStatusService.deleteRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
