import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { UsageType } from '../usage-type.model';
import { UsageTypeService } from '../usage-type.service';

@Component({
  selector: 'app-usage-type-edit',
  templateUrl: './usage-type-edit.component.html',
 
})
export class UsageTypeEditComponent {


  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: UsageType;


  constructor(private usageTypeService: UsageTypeService) { }

  ngOnInit() {
    this.subscription = this.usageTypeService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.usageTypeService.getApiRecord(index)
            .subscribe((record: UsageType) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                usageId: this.editedItem.usageId,
                usageDescr: this.editedItem.usageDescr
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new UsageType(value.usageId, value.usageDescr);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { usageTypeCode: this.editedItemIndex, usageId: value.usageId, usageDescr: value.usageDescr };
      console.log(updatedRecord);

      this.usageTypeService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.usageTypeService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.usageTypeService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
