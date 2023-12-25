import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { LocalDate } from 'js-joda';
import { Project } from './project.model';
import { ApiService } from '../ApiService.service';

@Injectable()
export class ProjectService {
  recordsChanged = new Subject<Project[]>();
  startedEditing = new Subject<number>();
  model: "projects";
  constructor(private apiService: ApiService) { }
  private recordsApi: Project[]

  getApiRecords() {
    this.apiService.get<Project[]>('projects').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi);
    });
  }
  addApiRecord(row: Project) {
    this.apiService.post<Project>('projects', row).subscribe((response: Project) => {
      console.log('project created:', response);
      this.getApiRecords();
    });

    return this.apiService.post<Project>('projects', row);
  }
  updateApiRecord(id: number, row: any) {
    console.log(this.apiService.put<Project>(`projects`, id, row));
    this.apiService.put<Project>('projects', id, row).subscribe(response => {
      console.log(response);
      this.getApiRecords()
    });
  }
  getApiRecord(index: number) {
    return this.apiService.getID<Project>('projects', index)
  }
  deleteApiRecord(id: number) {
    console.log(this.apiService.delete<Project>(`projects`, id));
    this.apiService.delete<Project>(`projects`, id).subscribe(response => {
      console.log(response);
      this.getApiRecords();
    })

  }

}
