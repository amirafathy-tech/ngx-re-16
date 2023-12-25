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
          this.editedItem = this.unitAreaService.getRecord(index);
          this.slForm.setValue({
            code: this.editedItem.code,
            description: this.editedItem.description
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitArea(value.code, value.description);
    if (this.editMode) {
      this.unitAreaService.updateRecord(this.editedItemIndex, newRecord);
    } else {
      this.unitAreaService.addRecord(newRecord);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitAreaService.deleteRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
