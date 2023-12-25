import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UnitOrientation } from './unit-orientation.model';

@Injectable()
export class UnitOrientationService {
  recordsChanged = new Subject<UnitOrientation[]>();
  startedEditing = new Subject<number>();

  private records: UnitOrientation[] = [
    new UnitOrientation(
      'UnitOrientation 1',
      'UnitOrientation 1 Desc'),
      new UnitOrientation(
        'UnitOrientation 2',
        'UnitOrientation 2 Desc'),
        new UnitOrientation(
            'UnitOrientation 3',
            'UnitOrientation 3 Desc'),
  ];


  getRecords() {
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(UnitOrientation: UnitOrientation) {
    this.records.push(UnitOrientation);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: UnitOrientation[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newUnitOrientation: UnitOrientation) {
    this.records[index] = newUnitOrientation;
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }

}
