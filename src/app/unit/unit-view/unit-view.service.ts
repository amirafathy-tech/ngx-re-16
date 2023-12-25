import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UnitView } from './unit-view.model';

@Injectable()
export class UnitViewService{
  recordsChanged = new Subject<UnitView[]>();
  startedEditing = new Subject<number>();

  private records: UnitView[] = [
    new UnitView(
      'UnitView 1',
      'UnitView 1 Desc'),
      new UnitView(
        'UnitView 2',
        'UnitView 2 Desc'),
        new UnitView(
            'UnitView 3',
            'UnitView 3 Desc'),
  ];


  getRecords() {
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(UnitView: UnitView) {
    this.records.push(UnitView);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: UnitView[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newUnitView: UnitView) {
    this.records[index] = newUnitView;
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }

}
