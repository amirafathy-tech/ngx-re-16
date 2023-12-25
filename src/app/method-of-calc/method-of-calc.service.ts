import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { MethodofCalc } from './method-of-calc.model';

@Injectable()
export class MethodofCalcService {
  recordsChanged = new Subject<MethodofCalc[]>();
  startedEditing = new Subject<number>();

  private records: MethodofCalc[] = [
    new MethodofCalc(
      'MethodofCalc 1',
      'MethodofCalc 1 Desc'),
      new MethodofCalc(
        'MethodofCalc 2',
        'MethodofCalc 2 Desc'),
        new MethodofCalc(
            'MethodofCalc 3',
            'MethodofCalc 3 Desc'),
  ];


  getRecords() {
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(MethodofCalc: MethodofCalc) {
    this.records.push(MethodofCalc);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: MethodofCalc[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newMethodofCalc: MethodofCalc) {
    this.records[index] = newMethodofCalc;
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }

}
