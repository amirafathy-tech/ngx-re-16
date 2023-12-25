import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UnitStatus } from './unit-status.model';

@Injectable()
export class UnitStatusService {
  recordsChanged = new Subject<UnitStatus[]>();
  startedEditing = new Subject<number>();

  private records: UnitStatus[] = [
    new UnitStatus(
      'UnitStatus 1',
      'UnitStatus 1 Desc'),
      new UnitStatus(
        'UnitStatus 2',
        'UnitStatus 2 Desc'),
        new UnitStatus(
            'UnitStatus 3',
            'UnitStatus 3 Desc'),
  ];


  getRecords() {
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(UnitStatus: UnitStatus) {
    this.records.push(UnitStatus);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: UnitStatus[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newUnitStatus: UnitStatus) {
    this.records[index] = newUnitStatus;
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }

}
