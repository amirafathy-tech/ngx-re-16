import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UnitOfMeasure } from './unit-of-measure.model';

@Injectable()
export class UnitOfMeasureService {
  recordsChanged = new Subject<UnitOfMeasure[]>();
  startedEditing = new Subject<number>();

  private records: UnitOfMeasure[] = [
    new UnitOfMeasure(
      'UnitOfMeasure 1',
      'UnitOfMeasure 1 Desc'),
      new UnitOfMeasure(
        'UnitOfMeasure 2',
        'UnitOfMeasure 2 Desc'),
        new UnitOfMeasure(
            'UnitOfMeasure 3',
            'UnitOfMeasure 3 Desc'),
  ];


  getRecords() {
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(UnitOfMeasure: UnitOfMeasure) {
    this.records.push(UnitOfMeasure);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: UnitOfMeasure[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newUnitOfMeasure: UnitOfMeasure) {
    this.records[index] = newUnitOfMeasure;
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }

}
