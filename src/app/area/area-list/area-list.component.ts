import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Area } from '../area.model';
import { AreaService } from '../area.service';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
 // styleUrl: './area-list.component.css'
})
export class AreaListComponent  implements OnInit {
  closeResult: string;
   
  isProjectFlagged: boolean = false;
  isBuildingFlagged: boolean = false;
  isUnitFlagged: boolean = false;

  @ViewChild('f', { static: false }) slForm: NgForm;
  @Input() area: Area;
  @Input() index: number;
  editedItemIndex: number;

  areas: Area[];
  editForm: FormGroup;
  deleteId: number;

  constructor(private areaService: AreaService, private modalService: NgbModal, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.areas = this.areaService.getRecords();
    this.editForm = this.fb.group({
      areaCode: [''],
      areaMaster: [''],
      description: [''],
      projectFlag: [''],
      buildingFlag: [''],
      unitFlag: [''],
      unitOfMeasurement: [''],
    })
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newRecord = new Area(value.areaCode, value.areaMaster, value.description, 
      this.isProjectFlagged,
      this.isBuildingFlagged,
      this.isUnitFlagged, 
      value.unitOfMeasurement);
  
    this.areaService.addRecord(newRecord);
    console.log(newRecord);
    this.ngOnInit(); //reload the table
  }


  openDetails(targetModal, area: Area) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('areaCode').setAttribute('value', String(area.areaCode));
    document.getElementById('areaMaster').setAttribute('value', area.areaMaster);
    document.getElementById('description').setAttribute('value', area.description);
    document.getElementById('projectFlag').setAttribute('value', String(area.projectFlag));
    document.getElementById('buildingFlag').setAttribute('value', String(area.buildingFlag));
    document.getElementById('unitFlag').setAttribute('value', String(area.unitFlag));
    document.getElementById('unitOfMeasurement').setAttribute('value', String(area.unitOfMeasurement));
  }

  openEdit(targetModal, area: Area) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      areaCode: area.areaCode,
      areaMaster: area.areaMaster,
      description: area.description,
      projectFlag: area.projectFlag,
      buildingFlag: area.buildingFlag,
      unitFlag: area.unitFlag,
      unitOfMeasurement: area.unitOfMeasurement
    });
    this.isProjectFlagged = area.projectFlag;
    this.isBuildingFlagged = area.buildingFlag;
    this.isUnitFlagged = area.unitFlag;
  
  }
  onSave() {// for edit
      // Update the flag values in the editForm
  this.editForm.patchValue({
    projectFlag: this.isProjectFlagged,
    buildingFlag: this.isBuildingFlagged,
    unitFlag: this.isUnitFlagged
  });


    this.areaService.updateRecord(this.editForm.value.areaCode, this.editForm.value);
    this.ngOnInit();
    this.modalService.dismissAll();

  }

  openDelete(targetModal, area: Area) {
    this.deleteId = area.areaCode;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  onDelete() {
    console.log(this.deleteId);
    this.areaService.deleteRecord(this.deleteId);
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




