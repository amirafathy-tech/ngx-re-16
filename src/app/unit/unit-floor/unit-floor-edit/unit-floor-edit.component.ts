import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { UnitFloor } from '../unit-floor.model';
import { UnitFloorService } from '../unit-floor.service';

@Component({
  selector: 'app-unit-floor-edit',
  templateUrl: './unit-floor-edit.component.html',
  //styleUrl: './unit-floor-edit.component.css'
})
export class UnitFloorEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: UnitFloor;


  constructor(private unitFloorService: UnitFloorService) { }

  ngOnInit() {
    this.subscription = this.unitFloorService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.unitFloorService.getApiRecord(index)
            .subscribe((record: UnitFloor) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                ufloorId: this.editedItem.ufloorId,
                ufloorDescr: this.editedItem.ufloorDescr
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitFloor(value.ufloorId, value.ufloorDescr);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { ufloorCode: this.editedItemIndex, ufloorId: value.ufloorId, ufloorDescr: value.ufloorDescr };
      console.log(updatedRecord);

      this.unitFloorService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.unitFloorService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitFloorService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
