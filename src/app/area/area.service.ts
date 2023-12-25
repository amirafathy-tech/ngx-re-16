import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Area } from './area.model';

@Injectable()
export class AreaService {
  recordsChanged = new Subject<Area[]>();
  startedEditing = new Subject<number>();

  private records: Area[] = [
    new Area(
        1,
        'Area 1',
        'Area 1 Desc',
        true,
        true, 
        true,
        1
      ),
      new Area(
        2,
        'Area 2',
        'Area 2 Desc',
        true,
        true, 
        true,
        2
        )];


  getRecords() {
   // console.log(this.records.slice());
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(Area: Area) {
    this.records.push(Area);
    //console.log(this.records);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: Area[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newArea: Area) {
    this.records[index] = newArea;
    console.log(this.records)
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    console.log(this.records);
    this.recordsChanged.next(this.records.slice());
    console.log(this.recordsChanged);
  }

}
