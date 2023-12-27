import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { UnitArea } from '../unit-area.model';
import { UnitAreaService } from '../unit-area.service';

@Component({
  selector: 'app-unit-area-edit',
  templateUrl: './unit-area-edit.component.html',
  // styleUrl: './unit-area-edit.component.css'
})
export class UnitAreaEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: UnitArea;
  constructor(private unitAreaService: UnitAreaService) { }

  ngOnInit() {
    this.subscription = this.unitAreaService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.unitAreaService.getApiRecord(index)
            .subscribe((record: UnitArea) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                unitArea: this.editedItem.unitArea,
                description: this.editedItem.description
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitArea(value.unitArea, value.description);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { unitAreaCode: this.editedItemIndex, unitArea: value.unitArea, description: value.description };
      console.log(updatedRecord);

      this.unitAreaService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.unitAreaService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitAreaService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
