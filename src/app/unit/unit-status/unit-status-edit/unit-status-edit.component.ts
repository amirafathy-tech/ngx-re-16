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
          this.unitStatusService.getApiRecord(index)
            .subscribe((record: UnitStatus) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                statusId: this.editedItem.statusId,
                statusDescr: this.editedItem.statusDescr
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitStatus(value.statusId, value.statusDescr);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { unitStatusCode: this.editedItemIndex, statusId: value.statusId, statusDescr: value.statusDescr };
      console.log(updatedRecord);

      this.unitStatusService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.unitStatusService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitStatusService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
