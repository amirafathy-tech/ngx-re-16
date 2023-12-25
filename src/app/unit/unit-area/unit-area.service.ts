import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UnitArea } from './unit-area.model';

@Injectable()
export class UnitAreaService {
  recordsChanged = new Subject<UnitArea[]>();
  startedEditing = new Subject<number>();

  private records: UnitArea[] = [
    new UnitArea(
        
      'UnitArea 1',
      'UnitArea 1 Desc'),
      new UnitArea(
        
        'UnitArea 2',
        'UnitArea 2 Desc'),
        new UnitArea(
            
            'UnitArea 3',
            'UnitArea 3 Desc'),
  ];


  getRecords() {
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(UnitArea: UnitArea) {
    this.records.push(UnitArea);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: UnitArea[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newUnitArea: UnitArea) {
    this.records[index] = newUnitArea;
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }

}
