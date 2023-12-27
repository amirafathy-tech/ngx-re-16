import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Building } from '../building.model';
import { BuildingService } from '../building.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Project } from 'src/app/project/project.model';
import { Profit } from 'src/app/profit/profit.model';
import { BuildingType } from 'src/app/building-type/building-type.model';
import { ApiService } from 'src/app/ApiService.service';
@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  // styleUrl: './building-list.component.css'
})
export class BuildingListComponent implements OnInit {
  closeResult: string;
  @ViewChild('f', { static: false }) slForm: NgForm;
  @Input() building: Building;
  @Input() index: number;
  editedItemIndex: number;

  records: Building[];
  editForm: FormGroup;
  deleteId: number;
  subscription: Subscription;

  projectCodes: Project[];
  profitCodes: Profit[];
  buildingTypeCodes: BuildingType[];

  selectedProjectCode: number;
  selectedProfitCode: number;
  selectedBuildingTypeCode: number;

  constructor(private apiService: ApiService,
    private buildingService: BuildingService,
    private modalService: NgbModal, private fb: FormBuilder) {
  }
  getProject() {
    this.apiService.get<Project[]>('projects').subscribe(response => {
      console.log(response);
      this.projectCodes = response;
    });
  }
  getProfit() {
    this.apiService.get<Profit[]>('profits').subscribe(response => {
      console.log(response);
      this.profitCodes = response;
    });
  }
  getBuildingType() {
    this.apiService.get<BuildingType[]>('buildingtypes').subscribe(response => {
      console.log(response);
      this.buildingTypeCodes = response;
    });
  }
  ngOnInit() {
    //this.companyCodes=this.companyService.getApiRecords();//bug
    this.getProject();
    this.getProfit();
    this.getBuildingType();
    this.buildingService.getApiRecords();
    this.subscription = this.buildingService.recordsChanged.subscribe((records: Building[]) => {
      this.records = records;
      console.log(this.records);
    });
    this.editForm = this.fb.group({
      profitCode: [''],
      projectCode: [''],
      buildingTypeCode: [''],
      buildingId: [''],
      buildingDescription: [''],
      oldNumber: [''],
      validFrom: [''],
      numberOfFloors: [''],
      profit: [''],
    })
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(this.selectedProjectCode);
    console.log(parseInt(this.selectedProjectCode.toString(), 10));
    const newRecord = new Building(parseInt(this.selectedProfitCode.toString(), 10),
      parseInt(this.selectedProjectCode.toString(), 10),
      parseInt(this.selectedBuildingTypeCode.toString(), 10),
      value.buildingId, value.buildingDescription, value.oldNumber,
      value.validFrom, parseInt(value.numberOfFloors.toString(), 10), value.profit);
    console.log(newRecord);
    this.buildingService.addApiRecord(newRecord);
    console.log(this.buildingService.addApiRecord(newRecord));
    this.ngOnInit(); //reload the table
    this.modalService.dismissAll();
  }

  openDetails(targetModal, building: Building) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('profitCode').setAttribute('value', String(building.profitCode));
    document.getElementById('projectCode').setAttribute('value', String(building.projectCode));
    document.getElementById('buildingTypeCode').setAttribute('value', String(building.buildingTypeCode));
    document.getElementById('buildingId').setAttribute('value', building.buildingId);
    document.getElementById('buildingDescription').setAttribute('value', building.buildingDescription);
    document.getElementById('oldNumber').setAttribute('value', String(building.oldNumber));
    document.getElementById('validFrom').setAttribute('value', String(building.validFrom));
    document.getElementById('numberOfFloors').setAttribute('value', String(building.numberOfFloors));
    document.getElementById('profit').setAttribute('value', String(building.profit));
  }

  openEdit(targetModal, building: Building) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    console.log(building);
    this.editedItemIndex = building.buildingCode;
    console.log(this.editedItemIndex);

    this.editForm.patchValue({
      profitCode: Number(building.profitCode),
      projectCode: Number(building.projectCode),
      buildingTypeCode: Number(building.buildingTypeCode),
      buildingId: building.buildingId,
      buildingDescription: building.buildingDescription,
      oldNumber: building.oldNumber,
      validFrom: building.validFrom,
      numberOfFloors: Number(building.numberOfFloors),
      profit: building.profit
    });

  }
  onSave() {// for edit 
    console.log(this.editForm.value);
    const convertedProfitCode = Number(this.editForm.value.profitCode);
    const convertedProjectCode = Number(this.editForm.value.projectCode);
    const convertedBuildingTypeCode = Number(this.editForm.value.buildingTypeCode);
    console.log(this.editForm.value.companyCode);
    console.log(convertedBuildingTypeCode);
    this.editForm.patchValue({
      profitCode: convertedProfitCode,
      projectCode: convertedProjectCode,
      buildingTypeCode: convertedBuildingTypeCode
    });
    console.log(this.editForm.value);
    this.buildingService.updateApiRecord(this.editedItemIndex, this.editForm.value);
    this.ngOnInit();
    this.modalService.dismissAll();
  }

  openDelete(targetModal, building: Building) {
    this.deleteId = building.buildingCode;
    console.log(this.deleteId);

    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  onDelete() {
    console.log(this.deleteId);
    this.buildingService.deleteApiRecord(this.deleteId);
    this.ngOnInit();
    this.modalService.dismissAll();
    //this.onClear();
  }
  onClear() {
    this.slForm.reset();
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


