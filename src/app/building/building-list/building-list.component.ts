import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Building } from '../building.model';
import { BuildingService } from '../building.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Project } from 'src/app/project/project.model';
import { Profit } from 'src/app/profit/profit.model';
import { BuildingType } from 'src/app/building-type/building-type.model';
import { ProjectService } from 'src/app/project/project.service';
import { ApiService } from 'src/app/ApiService.service';
import { ProfitService } from 'src/app/profit/profit.service';
import { BuildingTypeService } from 'src/app/building-type/building-type.service';
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

  updatedProjectCode: number;
  updatedProfitCode: number;
  updatedBuildingTypeCode: number;

  constructor(private apiService: ApiService,
     private buildingService:BuildingService,
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
      numberOfFloors:[''],
      profit: [''],
    })
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(this.selectedProjectCode);
    console.log(parseInt(this.selectedProjectCode.toString(), 10));
    const newRecord = new Building(parseInt(this.selectedProfitCode.toString(), 10),
    parseInt(this.selectedProjectCode.toString(), 10), parseInt(this.selectedBuildingTypeCode.toString(), 10),
    value.buildingId,value.buildingDescription,value.oldNumber, value.validFrom,parseInt(value.numberOfFloors.toString(), 10), value.profit);
    console.log(newRecord);
    this.buildingService.addApiRecord(newRecord);
    console.log(this.buildingService.addApiRecord(newRecord));
    this.ngOnInit(); //reload the table
    this.modalService.dismissAll();
  }


  openDetails(targetModal, project: Project) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('companyCode').setAttribute('value', String(project.companyCode));
    document.getElementById('profitCode').setAttribute('value', String(project.profitCode));
    document.getElementById('locationCode').setAttribute('value', String(project.locationCode));
    document.getElementById('projectId').setAttribute('value', project.projectId);
    document.getElementById('projectDescription').setAttribute('value', project.projectDescription);
    document.getElementById('validFrom').setAttribute('value', String(project.validFrom));
    document.getElementById('profit').setAttribute('value', String(project.profit));
  }
 

  openEdit(targetModal, project: Project) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    console.log(project);
    this.editedItemIndex=project.id;
    console.log(this.editedItemIndex);
    
    this.editForm.patchValue({
      companyCode:Number(this.updatedProjectCode),
      profitCode:Number(this.updatedProfitCode),
      locationCode:Number(this.updatedBuildingTypeCode),
      projectId: project.projectId,
      projectDescription: project.projectDescription,
      validFrom: project.validFrom,
      profit: project.profit
    });
    
  }
  onSave() {// for edit 
    console.log(this.editForm.value);
    const convertedCompanyCode = Number(this.editForm.value.companyCode);
    const convertedProfitCode = Number(this.editForm.value.profitCode);
    const convertedLocationCode = Number(this.editForm.value.locationCode);
    console.log(this.updatedProjectCode);
    console.log(this.editForm.value.companyCode);
    console.log(convertedCompanyCode);
    this.editForm.patchValue({
      companyCode: convertedCompanyCode,
      profitCode:convertedProfitCode,
      locationCode:convertedLocationCode
    });
    console.log(this.editForm.value);
    this.buildingService.updateApiRecord(this.editedItemIndex, this.editForm.value);
    this.ngOnInit();
    this.modalService.dismissAll();
  }

  openDelete(targetModal, project: Project) {
    this.deleteId = project.id;
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


