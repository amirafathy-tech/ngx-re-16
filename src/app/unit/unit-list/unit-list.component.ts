import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Unit } from '../unit.model';
import { UnitService } from '../unit.service';


@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
 // styleUrl: './unit-list.component.css'
})
export class UnitListComponent implements OnInit {
  closeResult: string;

  @ViewChild('f', { static: false }) slForm: NgForm;
  @Input() unit: Unit;
  @Input() index: number;
  editedItemIndex: number;

  units: Unit[];
  editForm: FormGroup;
  deleteId: number;

  constructor(private unitService: UnitService, private modalService: NgbModal, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.units = this.unitService.getRecords();
    //console.log(this.units);
    this.editForm = this.fb.group({
      unitCode: [''],
      unitKey: [''],
      description: [''],
      oldNumber: [''],
      blockingDate: [''],
      blockingReason: [''],
      salesPhase: [''],
      constructionDate: [''],
      unitDeliveryDate: [''],
      area: [''],
      areaValue: [''],
      noOfRooms: [''],
      price: [''],
      validFrom: [''],
      fromFloor: [''],
      toFloor: [''],
    })
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);
    console.log("after value");
    const newRecord = new Unit(value.unitCode, value.unitKey, value.description, value.oldNumber, value.blockingDate,
      value.blockingReason, value.salesPhase, value.constructionDate, value.unitDeliveryDate, value.area, value.areaValue,
      value.noOfRooms, value.price, value.validFrom, value.fromFloor, value.toFloor);
    // if (this.editMode) {
    //   this.buildingtypeService.updateRecord(this.editedItemIndex, newRecord);
    // } else {
    this.unitService.addRecord(newRecord);
    this.ngOnInit(); //reload the table
    //}
    //this.editMode = false;
    //form.reset();
  }


  openDetails(targetModal, unit: Unit) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('unitCode').setAttribute('value', String(unit.unitCode));
    document.getElementById('unitKey').setAttribute('value', unit.unitKey);
    document.getElementById('description').setAttribute('value', unit.description);
    document.getElementById('blockingDate').setAttribute('value', String(unit.blockingDate));
    document.getElementById('blockingReason').setAttribute('value', unit.blockingReason);

    document.getElementById('salesPhase').setAttribute('value', unit.salesPhase);
    document.getElementById('constructionDate').setAttribute('value', String(unit.constructionDate));
    document.getElementById('blockingDate').setAttribute('value', String(unit.blockingDate));
    document.getElementById('unitDeliveryDate').setAttribute('value', String(unit.unitDeliveryDate));

    document.getElementById('area').setAttribute('value', unit.area);
    document.getElementById('areaValue').setAttribute('value', String(unit.areaValue));
    document.getElementById('noOfRooms').setAttribute('value', String(unit.noOfRooms));
    document.getElementById('price').setAttribute('value', String(unit.price));

    document.getElementById('validFrom').setAttribute('value', String(unit.validFrom));
    document.getElementById('fromFloor').setAttribute('value', String(unit.fromFloor));
    document.getElementById('toFloor').setAttribute('value', String(unit.toFloor));
  }

  openEdit(targetModal, unit: Unit) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      unitCode: unit.unitCode,
      unitKey: unit.unitKey,
      description: unit.description,
      oldNumber: unit.oldNumber,
      blockingDate: unit.blockingDate,
      blockingReason: unit.blockingReason,
      salesPhase: unit.salesPhase,
      constructionDate: unit.constructionDate,
      unitDeliveryDate: unit.unitDeliveryDate,
      area: unit.area,
      areaValue: unit.areaValue,
      noOfRooms: unit.noOfRooms,
      price: unit.price,
      validFrom: unit.validFrom,
      fromFloor: unit.fromFloor,
      toFloor: unit.toFloor
    });
  }
  onSave() {// for edit

    this.unitService.updateRecord(this.editForm.value.unitCode, this.editForm.value);
    this.ngOnInit();
    this.modalService.dismissAll();

  }

  openDelete(targetModal, unit: Unit) {
    this.deleteId = unit.unitCode;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  onDelete() {
    console.log(this.deleteId);
    this.unitService.deleteRecord(this.deleteId);
    this.ngOnInit();
    this.modalService.dismissAll();
    //this.onClear();
  }
  onClear() {
    this.slForm.reset();
    //this.editMode = false;
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

