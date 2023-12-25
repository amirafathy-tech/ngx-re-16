import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { MethodofCalc } from '../method-of-calc.model';
import { MethodofCalcService } from '../method-of-calc.service';

@Component({
  selector: 'app-method-of-calc-edit',
  templateUrl: './method-of-calc-edit.component.html',
 // styleUrl: './method-of-calc-edit.component.css'
})
export class MethodOfCalcEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: MethodofCalc;

  constructor(private methodofCalcService: MethodofCalcService) { }

  ngOnInit() {
    this.subscription = this.methodofCalcService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.methodofCalcService.getRecord(index);
          this.slForm.setValue({
            code: this.editedItem.code,
            description: this.editedItem.description
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new MethodofCalc(value.code, value.description);
    if (this.editMode) {
      this.methodofCalcService.updateRecord(this.editedItemIndex, newRecord);
    } else {
      this.methodofCalcService.addRecord(newRecord);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.methodofCalcService.deleteRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
