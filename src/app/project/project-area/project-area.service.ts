import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { ProjectArea } from './project-area.model';

@Injectable()
export class ProjectAreaService {
  recordsChanged = new Subject<ProjectArea[]>();
  startedEditing = new Subject<number>();

  private records: ProjectArea[] = [
    new ProjectArea(
        
      'ProjectArea 1',
      'ProjectArea 1 Desc'),
      new ProjectArea(
        
        'ProjectArea 2',
        'ProjectArea 2 Desc'),
        new ProjectArea(
            
            'ProjectArea 3',
            'ProjectArea 3 Desc'),
  ];


  getRecords() {
    return this.records.slice();
  }

  getRecord(index: number) {
    return this.records[index];
  }
 

  addRecord(ProjectArea: ProjectArea) {
    this.records.push(ProjectArea);
    this.recordsChanged.next(this.records.slice());
  }

  addrecords(records: ProjectArea[]) {
    this.records.push(...records);
    this.recordsChanged.next(this.records.slice());
  }
  updateRecord(index: number, newProjectArea: ProjectArea) {
    this.records[index] = newProjectArea;
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
    this.recordsChanged.next(this.records.slice());
  }

}
