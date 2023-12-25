import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { UnitView } from '../unit-view.model';
import { UnitViewService } from '../unit-view.service';

@Component({
  selector: 'app-unit-view-edit',
  templateUrl: './unit-view-edit.component.html',
  // styleUrl: './unit-view-edit.component.css'
})
export class UnitViewEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: UnitView;

  constructor(private unitViewService: UnitViewService) { }

  ngOnInit() {
    this.subscription = this.unitViewService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.unitViewService.getRecord(index);
          this.slForm.setValue({
            code: this.editedItem.code,
            description: this.editedItem.description
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitView(value.code, value.description);
    if (this.editMode) {
      this.unitViewService.updateRecord(this.editedItemIndex, newRecord);
    } else {
      this.unitViewService.addRecord(newRecord);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitViewService.deleteRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
