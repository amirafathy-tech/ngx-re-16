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
              this.editedItem = record;
              console.log(this.editedItem);
              this.slForm.setValue({
                fixtureId: this.editedItem.fixtureId,
                fixtureDescr: this.editedItem.fixtureDescr
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new UnitFixture(value.fixtureId, value.fixtureDescr);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { unitFixtureCode: this.editedItemIndex, fixtureId: value.fixtureId, fixtureDescr: value.fixtureDescr };
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
    console.log(this.editedItemIndex);

    this.unitFixtureService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
