import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Currency } from './currency.model';

@Injectable()
export class CurrencyService {
  recordsChanged = new Subject<Currency[]>();
  startedEditing = new Subject<number>();

  private records: Currency[] = [
    new Currency(
      'Currency 1',
      'Currency 1 Desc'),
      new Currency(
        'Currency 2',
        'Currency 2 Desc'),
        new Currency(
            'Currency 3',
            'Currency 3 Desc'),
  ];


  getRecords() {
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(Currency: Currency) {
    this.records.push(Currency);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: Currency[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newCurrency: Currency) {
    this.records[index] = newCurrency;
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }

}
