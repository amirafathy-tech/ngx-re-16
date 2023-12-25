import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { UnitFixture } from '../unit-fixture.model';
import { UnitFixtureService } from '../unit-fixture.service';

@Component({
  selector: 'app-unit-fixture-edit',
  templateUrl: './unit-fixture-edit.component.html',
 // styleUrl: './unit-fixture-edit.component.css'
})
export class UnitFixtureEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: UnitFixture;


  constructor(private unitFixtureService: UnitFixtureService) { }

  ngOnInit() {
    this.subscription = this.unitFixtureService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.unitFixtureService.getApiRecord(index)
            .subscribe((record: UnitFixture) => {
              console.log(record);
              this.editedItem.uFixtureId=record.uFixtureId;
              this.editedItem.uFixtureDescr=record.uFixtureDescr;
              console.log(this.editedItem);
              
              this.editedItem = record;
              console.log(this.editedItem);
              this.slForm.setValue({
                uFixtureId: this.editedItem.uFixtureId,
                uFixtureDescr: this.editedItem.uFixtureDescr
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitFixture(value.uFixtureId, value.uFixtureDescr);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { unitFixtureCode: this.editedItemIndex, uFixtureId: value.uFixtureId, uFixtureDescr: value.uFixtureDescr };
      console.log(updatedRecord);

      this.unitFixtureService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.unitFixtureService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.unitFixtureService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
