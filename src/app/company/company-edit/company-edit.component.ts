import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  // styleUrl: './company-edit.component.css'
  styles: [
    `
      .fd-button {
          margin-right: 12px;
          margin-bottom: 10px;
      }
  `
  ],
})
export class CompanyEditComponent {
  
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Company;


  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.subscription = this.companyService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.companyService.getApiRecord(index)
            .subscribe((record: Company) => {
              this.editedItem = record;
              console.log(this.editedItem);

              this.slForm.setValue({
                companyCodeId: this.editedItem.companyCodeId,
                companyCodeDescription: this.editedItem.companyCodeDescription
              });
            });
        });
  }

  onSubmitApi(form: NgForm) {
    const value = form.value;
    const newRecord = new Company(value.companyCodeId, value.companyCodeDescription);
    console.log(newRecord);

    if (this.editMode) {
      const updatedRecord = { companyCode: this.editedItemIndex, companyCodeId: value.companyCodeId, companyCodeDescription: value.companyCodeDescription };
      console.log(updatedRecord);

      this.companyService.updateApiRecord(this.editedItemIndex, updatedRecord);
    } else {
      this.companyService.addApiRecord(newRecord)
    }
    this.editMode = false;
    form.reset();

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.companyService.deleteApiRecord(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

