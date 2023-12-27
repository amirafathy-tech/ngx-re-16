import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { BuildingArea } from '../building-area.model';
import { BuildingAreaService } from '../building-area.service';

@Component({
  selector: 'app-building-area-edit',
  templateUrl: './building-area-edit.component.html',
 // styleUrl: './building-area-edit.component.css'
})
export class BuildingAreaEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: BuildingArea;


  constructor(private buildingAreaService: BuildingAreaService) { }

  ngOnInit() {
    this.subscription = this.buildingAreaService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.buildingAreaService.getApiRecord(index)
            .subscribe((record: BuildingArea) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                buildingArea: this.editedItem.buildingArea,
                description: this.editedItem.description
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new BuildingArea(value.buildingArea, value.description);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { buildingAreaCode: this.editedItemIndex, buildingArea: value.buildingArea, description: value.description };
      console.log(updatedRecord);

      this.buildingAreaService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.buildingAreaService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.buildingAreaService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
