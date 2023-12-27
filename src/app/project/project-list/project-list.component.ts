import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/company/company.model';
import { Profit } from 'src/app/profit/profit.model';
import { City } from 'src/app/city/city.model';
import { ProfitService } from 'src/app/profit/profit.service';
import { CityService } from 'src/app/city/city.service';
import { CompanyService } from 'src/app/company/company.service';
import { ApiService } from 'src/app/ApiService.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  // styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  closeResult: string;
  @ViewChild('f', { static: false }) slForm: NgForm;
  @Input() project: Project;
  @Input() index: number;
  editedItemIndex: number;

  records: Project[];
  editForm: FormGroup;
  deleteId: number;
  subscription: Subscription;

  companyCodes: Company[];
  profitCodes: Profit[];
  locationCodes: City[];
  selectedCompanyCode: number;
  selectedProfitCode: number;
  selectedLocationCode: number;

  constructor(private projectService: ProjectService, private companyService: CompanyService, private profitService: ProfitService, private cityService: CityService, private apiService: ApiService, private modalService: NgbModal, private fb: FormBuilder) {
  }
  getCompany() {
    this.apiService.get<Company[]>('companies').subscribe(response => {
      console.log(response);
      this.companyCodes = response;
    });
  }
  getProfit() {
    this.apiService.get<Profit[]>('profits').subscribe(response => {
      console.log(response);
      this.profitCodes = response;
    });
  }
  getLocation() {
    this.apiService.get<City[]>('locations').subscribe(response => {
      console.log(response);
      this.locationCodes = response;
    });
  }
  ngOnInit() {
    //this.companyCodes=this.companyService.getApiRecords();//bug
    this.getCompany();
    this.getProfit();
    this.getLocation();
    this.projectService.getApiRecords();
    this.subscription = this.projectService.recordsChanged.subscribe((records: Project[]) => {
      this.records = records;
      console.log(this.records);
    });
    this.editForm = this.fb.group({
      companyCode: [''],
      profitCode: [''],
      locationCode: [''],
      projectId: [''],
      projectDescription: [''],
      validFrom: [''],
      profit: [''],
    })
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(this.selectedCompanyCode);
    console.log(parseInt(this.selectedCompanyCode.toString(), 10));
    const newRecord = new Project(
      value.projectId, value.projectDescription, value.validFrom, value.profit,
      parseInt(this.selectedCompanyCode.toString(), 10),
      parseInt(this.selectedProfitCode.toString(), 10),
      parseInt(this.selectedLocationCode.toString(), 10));
    console.log(newRecord);
    this.projectService.addApiRecord(newRecord);
    console.log(this.projectService.addApiRecord(newRecord));
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
    console.log(project.projectCode);
    this.editedItemIndex = project.projectCode;
    console.log(this.editedItemIndex);

    this.editForm.patchValue({
      companyCode: Number(project.companyCode),
      profitCode: Number(project.profitCode),
      locationCode: Number(project.locationCode),
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
    // console.log(this.updatedCompanyCode);
    console.log(this.editForm.value.companyCode);
    console.log(convertedCompanyCode);
    this.editForm.patchValue({
      companyCode: convertedCompanyCode,
      profitCode: convertedProfitCode,
      locationCode: convertedLocationCode
    });
    console.log(this.editForm.value);
    console.log(this.editedItemIndex);
    this.projectService.updateApiRecord(this.editedItemIndex, this.editForm.value);
    this.ngOnInit();
    this.modalService.dismissAll();
  }

  openDelete(targetModal, project: Project) {
    this.deleteId = project.projectCode;
    console.log(this.deleteId);
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  onDelete() {
    console.log(this.deleteId);
    this.projectService.deleteApiRecord(this.deleteId);
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



