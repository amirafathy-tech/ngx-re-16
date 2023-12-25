import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Unit } from './unit.model';
import { LocalDate } from 'js-joda';

@Injectable()
export class UnitService {
  recordsChanged = new Subject<Unit[]>();
  startedEditing = new Subject<number>();

  private records: Unit[] = [
    new Unit(
        1,
        'Unit 1',
        'Unit 1 Desc',
        1,
        LocalDate.of(2022, 11, 20), 
        'blocking',
        'salesphase',
        LocalDate.of(2022, 11, 20),
        LocalDate.of(2022, 11, 20),
        'area',
        20,
        1,
        1000,
        LocalDate.of(2022, 11, 20),
        1,
        2
      
      ),
      new Unit(
        2,
        'Unit 2',
        'Unit 2 Desc',
        1,
        LocalDate.of(2022, 11, 20), 
        'blocking',
        'salesphase',
        LocalDate.of(2022, 11, 20),
        LocalDate.of(2022, 11, 20),
        'area',
        20,
        1,
        1000,
        LocalDate.of(2022, 11, 20),
        1,
        2
        )];


  getRecords() {
   // console.log(this.records.slice());
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(Unit: Unit) {
    this.records.push(Unit);
    //console.log(this.records);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: Unit[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newUnit: Unit) {
    this.records[index] = newUnit;
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
