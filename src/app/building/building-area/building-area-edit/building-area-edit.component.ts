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
          this.editedItem = this.buildingAreaService.getRecord(index);
          this.slForm.setValue({
            code: this.editedItem.code,
            description: this.editedItem.description
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new BuildingArea(value.code, value.description);
    if (this.editMode) {
      this.buildingAreaService.updateRecord(this.editedItemIndex, newRecord);
    } else {
      this.buildingAreaService.addRecord(newRecord);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.buildingAreaService.deleteRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
