import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProjectArea } from '../project-area.model';
import { ProjectAreaService } from '../project-area.service';

@Component({
  selector: 'app-project-area-edit',
  templateUrl: './project-area-edit.component.html',
 // styleUrl: './project-area-edit.component.css'
})
export class ProjectAreaEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: ProjectArea;


  constructor(private projectAreaService: ProjectAreaService) { }

  ngOnInit() {
    this.subscription = this.projectAreaService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.projectAreaService.getApiRecord(index)
            .subscribe((record: ProjectArea) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                projectArea: this.editedItem.projectArea,
                description: this.editedItem.description
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new ProjectArea(value.projectArea, value.description);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { projectAreaCode: this.editedItemIndex, projectArea: value.projectArea, description: value.description };
      console.log(updatedRecord);

      this.projectAreaService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.projectAreaService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.projectAreaService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
}
