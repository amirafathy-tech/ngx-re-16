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
          this.editedItem = this.projectAreaService.getRecord(index);
          this.slForm.setValue({
            code: this.editedItem.code,
            description: this.editedItem.description
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new ProjectArea(value.code, value.description);
    if (this.editMode) {
      this.projectAreaService.updateRecord(this.editedItemIndex, newRecord);
    } else {
      this.projectAreaService.addRecord(newRecord);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.projectAreaService.deleteRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
