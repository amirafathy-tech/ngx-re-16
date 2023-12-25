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
          this.editedItem = this.usageTypeService.getRecord(index);
          this.slForm.setValue({
            code: this.editedItem.code,
            description: this.editedItem.description
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new UsageType(value.code, value.description);
    if (this.editMode) {
      this.usageTypeService.updateRecord(this.editedItemIndex, newRecord);
    } else {
      this.usageTypeService.addRecord(newRecord);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.usageTypeService.deleteRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
