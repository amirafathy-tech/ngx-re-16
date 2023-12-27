import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Profit } from '../profit.model';
import { NgForm } from '@angular/forms';
import { ProfitService } from '../profit.service';

@Component({
  selector: 'app-profit-edit',
  templateUrl: './profit-edit.component.html',
  //styleUrl: './profit-edit.component.css'
})
export class ProfitEditComponent {

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Profit;
  constructor(private profitService: ProfitService) { }

  ngOnInit() {
    this.subscription = this.profitService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.profitService.getApiRecord(index)
            .subscribe((record: Profit) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                profitId: this.editedItem.profitId,
                profitDescr: this.editedItem.profitDescr
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new Profit(value.profitId, value.profitDescr);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { profitCode: this.editedItemIndex, profitId: value.profitId, profitDescr: value.profitDescr };
      console.log(updatedRecord);

      this.profitService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.profitService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.profitService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
