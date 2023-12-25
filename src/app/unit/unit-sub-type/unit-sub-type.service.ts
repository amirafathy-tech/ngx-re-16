import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UnitSubType } from './unit-sub-type.model';

@Injectable()
export class UnitSubTypeService {
  recordsChanged = new Subject<UnitSubType[]>();
  startedEditing = new Subject<number>();

  private records: UnitSubType[] = [
    new UnitSubType(
      'UnitSubType 1',
      'UnitSubType 1 Desc'),
      new UnitSubType(
        'UnitSubType 2',
        'UnitSubType 2 Desc'),
        new UnitSubType(
            'UnitSubType 3',
            'UnitSubType 3 Desc'),
  ];


  getRecords() {
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(UnitSubType: UnitSubType) {
    this.records.push(UnitSubType);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: UnitSubType[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newUnitSubType: UnitSubType) {
    this.records[index] = newUnitSubType;
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }

}
