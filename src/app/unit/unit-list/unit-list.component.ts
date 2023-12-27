
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Unit } from '../unit.model';
import { UnitService } from '../unit.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { UnitOrientation } from '../unit-orientation/unit-orientation.model';
import { UnitFixture } from '../unit-fixture/unit-fixture.model';
import { UnitStatus } from '../unit-status/unit-status.model';
import { UnitView } from '../unit-view/unit-view.model';
import { UsageType } from '../usage-type/usage-type.model';
import { UnitSubType } from '../unit-sub-type/unit-sub-type.model';
import { UnitFloor } from '../unit-floor/unit-floor.model';
import { Building } from 'src/app/building/building.model';
import { Area } from 'src/app/area/area.model';
import { ApiService } from 'src/app/ApiService.service';

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
  records: Unit[];
  editForm: FormGroup;
  deleteId: number;
  subscription: Subscription;

  uOrientationCodes: UnitOrientation[];
  uFixtureCodes: UnitFixture[];
  uStatusCodes: UnitStatus[];
  uViewCodes: UnitView[];
  uUsageTypeCodes: UsageType[];
  uSubTypeCodes: UnitSubType[];
  uFloorCodes: UnitFloor[];
  areaCodes: Area[];
  buildingCodes: Building[];

  selectedOrientationCode: number;
  selectedFixtureCode: number;
  selectedStatusCode: number;
  selectedViewCode: number;
  selectedUsageTypeCode: number;
  selectedSubTypeCode: number;
  selectedFloorCode: number;
  selectedAreaCode: number;
  selectedBuildingCode: number;
  constructor(private apiService: ApiService,
    private unitService: UnitService,
    private modalService: NgbModal, private fb: FormBuilder) {
  }
  getOrientation() {
    this.apiService.get<UnitOrientation[]>('unitorientations').subscribe(response => {
      console.log(response);
      this.uOrientationCodes = response;
    });
  }
  getFixture() {
    this.apiService.get<UnitFixture[]>('unitfixture').subscribe(response => {
      console.log(response);
      this.uFixtureCodes = response;
    });
  }
  getStatus() {
    this.apiService.get<UnitStatus[]>('unitstatuses').subscribe(response => {
      console.log(response);
      this.uStatusCodes = response;
    });
  }
  getFloor() {
    this.apiService.get<UnitFloor[]>('unitfloors').subscribe(response => {
      console.log(response);
      this.uFloorCodes = response;
    });
  }
  getUsageType() {
    this.apiService.get<UsageType[]>('usagetype').subscribe(response => {
      console.log(response);
      this.uUsageTypeCodes = response;
    });
  }
  getSubType() {
    this.apiService.get<UnitSubType[]>('unitsubtypes').subscribe(response => {
      console.log(response);
      this.uSubTypeCodes = response;
    });
  }
  getView() {
    this.apiService.get<UnitView[]>('unitviews').subscribe(response => {
      console.log(response);
      this.uViewCodes = response;
    });
  }
  getArea() {
    this.apiService.get<Area[]>('areas').subscribe(response => {
      console.log(response);
      this.areaCodes = response;
    });
  }
  getBuilding() {
    this.apiService.get<Building[]>('buildings').subscribe(response => {
      console.log(response);
      this.buildingCodes = response;
    });
  }
  ngOnInit() {
    //this.companyCodes=this.companyService.getApiRecords();//bug
    this.getOrientation();
    this.getFixture();
    this.getFloor();
    this.getStatus();
    this.getSubType();
    this.getUsageType();
    this.getView();
    this.getArea();
    this.getBuilding();
    this.unitService.getApiRecords();
    this.subscription = this.unitService.recordsChanged.subscribe((records: Unit[]) => {
      this.records = records;
      console.log(this.records);
    });
    this.editForm = this.fb.group({
      buildingCode: [''],
      areaCode: [''],
      unitFixtureCode: [''],
      unitFloorCode: [''],
      unitOrientationCode: [''],
      unitStatusCode: [''],
      unitSubtypeCode: [''],
      unitViewCode: [''],
      usageTypeCode: [''],
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
    const newRecord = new Unit(
      parseInt(this.selectedBuildingCode.toString(), 10),
      parseInt(this.selectedAreaCode.toString(), 10),
      parseInt(this.selectedFixtureCode.toString(), 10),
      parseInt(this.selectedFloorCode.toString(), 10),
      parseInt(this.selectedOrientationCode.toString(), 10),
      parseInt(this.selectedStatusCode.toString(), 10),
      parseInt(this.selectedSubTypeCode.toString(), 10),
      parseInt(this.selectedViewCode.toString(), 10),
      parseInt(this.selectedUsageTypeCode.toString(), 10),
      value.unitKey, value.description, value.oldNumber, value.blockingDate,
      value.blockingReason, value.salesPhase, value.constructionDate,
      value.unitDeliveryDate, value.area, value.areaValue,
      value.noOfRooms, value.price, value.validFrom,
      value.fromFloor, value.toFloor);
    console.log(newRecord);
    this.unitService.addApiRecord(newRecord);
    console.log(this.unitService.addApiRecord(newRecord));
    this.ngOnInit(); //reload the table
    this.modalService.dismissAll();
  }
  openDetails(targetModal, unit: Unit) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('buildingCode').setAttribute('value', String(unit.buildingCode));
    document.getElementById('areaCode').setAttribute('value', String(unit.areaCode));
    document.getElementById('unitFixtureCode').setAttribute('value', String(unit.unitFixtureCode));
    document.getElementById('unitOrientationCode').setAttribute('value', String(unit.unitOrientationCode));
    document.getElementById('unitFloorCode').setAttribute('value', String(unit.unitFloorCode));
    document.getElementById('unitViewCode').setAttribute('value', String(unit.unitViewCode));
    document.getElementById('unitStatusCode').setAttribute('value', String(unit.unitStatusCode));
    document.getElementById('unitSubtypeCode').setAttribute('value', String(unit.unitSubtypeCode));
    document.getElementById('usageTypeCode').setAttribute('value', String(unit.usageTypeCode));
    document.getElementById('unitKey').setAttribute('value', unit.unitKey);
    document.getElementById('description').setAttribute('value', unit.description);
    document.getElementById('oldNumber').setAttribute('value', String(unit.oldNumber));
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
    console.log("edit unit");
    console.log(unit);
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editedItemIndex = unit.unitCode;
    console.log(this.editedItemIndex);
    this.editForm.patchValue({
      buildingCode: Number(unit.buildingCode),
      areaCode: Number(unit.areaCode),
      unitFixtureCode: Number(unit.unitFixtureCode),
      unitFloorCode: Number(unit.unitFloorCode),
      unitOrientationCode: Number(unit.unitOrientationCode),
      unitStatusCode: Number(unit.unitStatusCode),
      unitSubtypeCode: Number(unit.unitSubtypeCode),
      unitViewCode: Number(unit.unitViewCode),
      usageTypeCode: Number(unit.usageTypeCode),
      //buildingCode:Number(this.updatedBuildingCode),
      // areaCode:Number(this.updatedAreaCode),
      // unitFixtureCode:Number(this.updatedFixtureCode),
      // unitFloorCode:Number(this.updatedFloorCode),
      // unitOrientationCode:Number(this.updatedOrientationCode),
      // unitStatusCode:Number(this.updatedStatusCode),
      // unitSubtypeCode:Number(this.updatedSubTypeCode),
      // unitViewCode:Number(this.updatedViewCode),
      // usageTypeCode:Number(this.updatedUsageTypeCode),
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
  onSave() { // for edit 
    console.log(this.editForm.value);
    const convertedBuildingCode = Number(this.editForm.value.buildingCode);
    const convertedAreaCode = Number(this.editForm.value.areaCode);
    const convertedFixtureCode = Number(this.editForm.value.unitFixtureCode);
    const convertedOrientationCode = Number(this.editForm.value.unitOrientationCode);
    const convertedFloorCode = Number(this.editForm.value.unitFloorCode);
    const convertedViewCode = Number(this.editForm.value.unitViewCode);
    const convertedStatusCode = Number(this.editForm.value.unitStatusCode);
    const convertedSubtypeCode = Number(this.editForm.value.unitSubtypeCode);
    const convertedUsageTypeCode = Number(this.editForm.value.usageTypeCode);
    this.editForm.patchValue({
      buildingCode: convertedBuildingCode,
      areaCode: convertedAreaCode,
      unitFixtureCode: convertedFixtureCode,
      unitOrientationCode: convertedOrientationCode,
      unitFloorCode: convertedFloorCode,
      unitViewCode: convertedViewCode,
      unitStatusCode: convertedStatusCode,
      unitSubtypeCode: convertedSubtypeCode,
      usageTypeCode: convertedUsageTypeCode
    });
    console.log(this.editForm.value);
    this.unitService.updateApiRecord(this.editedItemIndex, this.editForm.value);
    this.ngOnInit();
    this.modalService.dismissAll();
  }

  openDelete(targetModal, unit: Unit) {
    this.deleteId = unit.unitCode;
    console.log(this.deleteId);
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  onDelete() {
    console.log(this.deleteId);
    this.unitService.deleteApiRecord(this.deleteId);
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