import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { BuildingType } from '../building-type.model';
import { BuildingTypeService } from '../building-type.service';

@Component({
  selector: 'app-building-type-edit',
  templateUrl: './building-type-edit.component.html',
 // styleUrl: './building-type-edit.component.css'
})
export class BuildingTypeEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: BuildingType;


  constructor(private buildingTypeService: BuildingTypeService) { }

  ngOnInit() {
    this.subscription = this.buildingTypeService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.buildingTypeService.getApiRecord(index)
            .subscribe((record: BuildingType) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                buildingTypeId: this.editedItem.buildingTypeId,
                buildingTypeDescr: this.editedItem.buildingTypeDescr
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new BuildingType(value.buildingTypeId, value.buildingTypeDescr);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { buildingTypeCode: this.editedItemIndex, buildingTypeId: value.buildingTypeId, buildingTypeDescr: value.buildingTypeDescr };
      console.log(updatedRecord);

      this.buildingTypeService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.buildingTypeService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.buildingTypeService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 


}
