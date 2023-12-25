import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { BuildingArea } from './building-area.model';

@Injectable()
export class BuildingAreaService {
  recordsChanged = new Subject<BuildingArea[]>();
  startedEditing = new Subject<number>();

  private records: BuildingArea[] = [
    new BuildingArea(
        
      'BuildingArea 1',
      'BuildingArea 1 Desc'),
      new BuildingArea(
        
        'BuildingArea 2',
        'BuildingArea 2 Desc'),
        new BuildingArea(
            
            'BuildingArea 3',
            'BuildingArea 3 Desc'),
  ];


  getRecords() {
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(BuildingArea: BuildingArea) {
    this.records.push(BuildingArea);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: BuildingArea[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newBuildingArea: BuildingArea) {
    this.records[index] = newBuildingArea;
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }

}
