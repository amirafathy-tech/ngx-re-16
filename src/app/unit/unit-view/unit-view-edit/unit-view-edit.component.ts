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
          this.unitViewService.getApiRecord(index)
            .subscribe((record: UnitView) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                viewId: this.editedItem.viewId,
                viewDescr: this.editedItem.viewDescr
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitView(value.viewId, value.viewDescr);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { unitViewCode: this.editedItemIndex, viewId: value.viewId, viewDescr: value.viewDescr };
      console.log(updatedRecord);

      this.unitViewService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.unitViewService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitViewService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
