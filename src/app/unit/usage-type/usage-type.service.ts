import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UsageType } from './usage-type.model';

@Injectable()
export class UsageTypeService{
  recordsChanged = new Subject<UsageType[]>();
  startedEditing = new Subject<number>();

  private records: UsageType[] = [
    new UsageType(
      'UsageType 1',
      'UsageType 1 Desc'),
      new UsageType(
        'UsageType 2',
        'UsageType 2 Desc'),
        new UsageType(
            'UsageType 3',
            'UsageType 3 Desc'),
  ];


  getRecords() {
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(UsageType: UsageType) {
    this.records.push(UsageType);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: UsageType[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newUsageType: UsageType) {
    this.records[index] = newUsageType;
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }

}
