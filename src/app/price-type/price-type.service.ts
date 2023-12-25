import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { PriceType } from './price-type.model';

@Injectable()
export class PriceTypeService {
  recordsChanged = new Subject<PriceType[]>();
  startedEditing = new Subject<number>();

  private records: PriceType[] = [
    new PriceType(
      'PriceType 1',
      'PriceType 1 Desc'),
      new PriceType(
        'PriceType 2',
        'PriceType 2 Desc'),
        new PriceType(
            'PriceType 3',
            'PriceType 3 Desc'),
  ];


  getRecords() {
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(PriceType: PriceType) {
    this.records.push(PriceType);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: PriceType[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newPriceType: PriceType) {
    this.records[index] = newPriceType;
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }

}
