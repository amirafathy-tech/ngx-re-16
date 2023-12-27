import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { City } from '../city.model';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
 // styleUrl: './city-edit.component.css'
})
export class CityEditComponent implements OnInit, OnDestroy {
 
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: City;


  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.subscription = this.cityService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.cityService.getApiRecord(index)
            .subscribe((record: City) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                locationId: this.editedItem.locationId,
                regionalLocation: this.editedItem.regionalLocation
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new City(value.locationId, value.regionalLocation);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { locationCode: this.editedItemIndex, locationId: value.locationId, regionalLocation: value.regionalLocation };
      console.log(updatedRecord);

      this.cityService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.cityService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.cityService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
