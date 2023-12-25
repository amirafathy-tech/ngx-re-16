import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { TableModule } from '@fundamental-ngx/core/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    // standalone: true,
    // imports: [FocusableGridDirective, TableModule, NgFor, LinkComponent, IconComponent]
})
export class PaymentComponent implements OnInit {
  closeResult: string;
  tableRows: any[];
  displayedRows: any[];
  searchTerm = '';
  confirmationReason: string;
  myForm: FormGroup;
  loading = false;

  constructor(private _dialogService: DialogService,private modalService: NgbModal, private _fb: FormBuilder, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.tableRows = [
          {
              column1: 'Apple',
              column2: 'Fruit',
              region: 'Virginia'
          },
          {
              column1: 'Banana',
              column2: 'Fruit',
              region: 'Costa Rica'
          },
          {
              column1: 'Kale',
              column2: 'Vegetable',
              region: 'Colorado'
          },
          {
              column1: 'Kiwi',
              column2: 'Fruit',
              region: 'New Zealand'
          },
          {
              column1: 'Spinach',
              column2: 'Vegetable',
              region: 'California'
          }
      ];
      this.displayedRows = this.tableRows;

      this.myForm = this._fb.group({
          nameInput: new FormControl(''),
          typeInput: new FormControl(''),
          regionInput: new FormControl('')
      });
  }
  openDialog(dialog: TemplateRef<any>): void {
      const dialogRef = this._dialogService.open(dialog, { responsivePadding: true });

      dialogRef.afterClosed.subscribe(
          (result) => {
              this.confirmationReason = 'Dialog closed with result: ' + result;
              this.tableRows.push({
                  column1: this.myForm.get('nameInput')?.value,
                  column2: this.myForm.get('typeInput')?.value,
                  region: this.myForm.get('regionInput')?.value
              });
              
              this.myForm.setValue({ nameInput: '', typeInput: '', regionInput: '' });
              this._cdr.detectChanges();
          },
          (error) => {
              this.confirmationReason = 'Dialog dismissed with result: ' + error;
              this._cdr.detectChanges();
          }
      );
  }

  openResizableDialog(template): void {
    this._dialogService.open(template, {
        width: '300px',
        resizable: true,
        responsivePadding: true,
        backdropClickCloseable: true,
        ariaLabelledBy: 'fd-dialog-header-4',
        ariaDescribedBy: 'fd-dialog-body-4'
    });
}

  // for add modal
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}