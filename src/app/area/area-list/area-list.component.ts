import { UnitOfMeasure } from './../../unit/unit-of-measure/unit-of-measure.model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Area } from '../area.model';
import { AreaService } from '../area.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProjectArea } from 'src/app/project/project-area/project-area.model';
import { BuildingArea } from 'src/app/building/building-area/building-area.model';
import { UnitArea } from 'src/app/unit/unit-area/unit-area.model';
import { ApiService } from 'src/app/ApiService.service';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  // styleUrl: './area-list.component.css'
})
export class AreaListComponent implements OnInit {
  closeResult: string;
  // isProjectFlagged: boolean = false;
  // isBuildingFlagged: boolean = false;
  // isUnitFlagged: boolean = false;

  isProjectFlagged: string = "f";
  isBuildingFlagged: string = "f";
  isUnitFlagged: string = "f";

  @ViewChild('f', { static: false }) slForm: NgForm;
  @Input() area: Area;
  @Input() index: number;
  editedItemIndex: number;
  records: Area[];
  editForm: FormGroup;
  deleteId: number;
  subscription: Subscription;

  projectAreaCodes: ProjectArea[];
  buildingAreaCodes: BuildingArea[];
  unitAreaCodes: UnitArea[];
  measureCodes: UnitOfMeasure[];

  selectedProjectAreaCode: number;
  selectedBuildingAreaCode: number;
  selectedUnitAreaCode: number;
  selectedMeasureCode: number;
  constructor(private apiService: ApiService,
    private areaService: AreaService,
    private modalService: NgbModal, private fb: FormBuilder) {
  }
  getProjectArea() {
    this.apiService.get<ProjectArea[]>('projectareas').subscribe(response => {
      console.log(response);
      this.projectAreaCodes = response;
    });
  }
  getBuildingArea() {
    this.apiService.get<BuildingArea[]>('buildingareas').subscribe(response => {
      console.log(response);
      this.buildingAreaCodes = response;
    });
  }
  getUnitArea() {
    this.apiService.get<UnitArea[]>('unitareas').subscribe(response => {
      console.log(response);
      this.unitAreaCodes = response;
    });
  }
  getUnitMeasure() {
    this.apiService.get<UnitOfMeasure[]>('measurements').subscribe(response => {
      console.log(response);
      this.measureCodes = response;
    });
  }
  ngOnInit() {
    //this.companyCodes=this.companyService.getApiRecords();//bug
    this.getProjectArea();
    this.getBuildingArea();
    this.getUnitArea();
    this.getUnitMeasure();
    this.areaService.getApiRecords();
    this.subscription = this.areaService.recordsChanged.subscribe((records: Area[]) => {
      this.records = records;
      console.log(this.records);
    });
    this.editForm = this.fb.group({
      projectAreaCode: [''],
      buildingAreaCode: [''],
      unitAreaCode: [''],
      measurementCode: [''],

      areaMaster: [''],
      description: [''],
      projectFlag: [''],
      buildingFlag: [''],
      unitFlag: [''],
    })
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const projectFlagChar = value.projectFlag ? "t" : "f";
    const buildingFlagChar = value.projectFlag ? "t" : "f";
    const unitFlagChar = value.projectFlag ? "t" : "f";
    console.log(value.projectFlag);
    const newRecord = new Area(parseInt(this.selectedProjectAreaCode.toString(), 10),
      parseInt(this.selectedBuildingAreaCode.toString(), 10),
      parseInt(this.selectedUnitAreaCode.toString(), 10),
      parseInt(this.selectedMeasureCode.toString(), 10),
      value.areaMaster, value.description,
      projectFlagChar,
      buildingFlagChar,
      unitFlagChar);
    console.log(newRecord);
    this.areaService.addApiRecord(newRecord);
    console.log(this.areaService.addApiRecord(newRecord));
    this.ngOnInit(); //reload the table
    this.modalService.dismissAll();
  }

  openDetails(targetModal, area: Area) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('projectAreaCode').setAttribute('value', String(area.projectAreaCode));
    document.getElementById('buildingAreaCode').setAttribute('value', String(area.buildingAreaCode));
    document.getElementById('unitAreaCode').setAttribute('value', String(area.unitAreaCode));
    document.getElementById('measurementCode').setAttribute('value', String(area.measurementCode));
    document.getElementById('areaMaster').setAttribute('value', area.areaMaster);
    document.getElementById('description').setAttribute('value', area.description);
    document.getElementById('projectFlag').setAttribute('value', String(area.projectFlag));
    document.getElementById('buildingFlag').setAttribute('value', String(area.buildingFlag));
    document.getElementById('unitFlag').setAttribute('value', String(area.unitFlag));
  }

  openEdit(targetModal, area: Area) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    console.log(area);
    this.editedItemIndex = area.areaCode;
    console.log(this.editedItemIndex);

    this.editForm.patchValue({
      projectAreaCode: area.projectAreaCode,
      buildingAreaCode: area.buildingAreaCode,
      unitAreaCode: area.unitAreaCode,
      measurementCode: area.measurementCode,
      areaCode: area.areaCode,
      areaMaster: area.areaMaster,
      description: area.description,
      projectFlag: area.projectFlag,
      buildingFlag: area.buildingFlag,
      unitFlag: area.unitFlag
    });
    this.isProjectFlagged = area.projectFlag;
    this.isBuildingFlagged = area.buildingFlag;
    this.isUnitFlagged = area.unitFlag;

  }
  onSave() {// for edit 
    console.log(this.editForm.value);
    const projectFlagChar = this.editForm.value.projectFlag ? "t" : "f";
    const buildingFlagChar = this.editForm.value.buildingFlag ? "t" : "f";
    const unitFlagChar = this.editForm.value.unitFlag ? "t" : "f";

    const convertedProjectAreaCode = Number(this.editForm.value.projectAreaCode);
    const convertedBuildingAreaCode = Number(this.editForm.value.buildingAreaCode);
    const convertedunitAreaCode = Number(this.editForm.value.unitAreaCode);
    const convertedmeasurementCode = Number(this.editForm.value.measurementCode);
    this.editForm.patchValue({
      projectAreaCode: convertedProjectAreaCode,
      buildingAreaCode: convertedBuildingAreaCode,
      unitAreaCode: convertedunitAreaCode,
      measurementCode: convertedmeasurementCode,
      projectFlag: projectFlagChar,
      buildingFlag: buildingFlagChar,
      unitFlag: unitFlagChar
    });
    console.log(this.editForm.value);
    this.areaService.updateApiRecord(this.editedItemIndex, this.editForm.value);
    this.ngOnInit();
    this.modalService.dismissAll();
  }

  openDelete(targetModal, area: Area) {
    this.deleteId = area.areaCode;
    console.log(this.deleteId);

    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  onDelete() {
    console.log(this.deleteId);
    this.areaService.deleteApiRecord(this.deleteId);
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




