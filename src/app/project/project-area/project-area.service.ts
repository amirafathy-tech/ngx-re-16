import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { ProjectArea } from './project-area.model';
import { ApiService } from 'src/app/ApiService.service';

@Injectable()
export class ProjectAreaService {

  recordsChanged = new Subject<ProjectArea[]>();
  startedEditing = new Subject<number>();
  model: "projectareas";
  constructor(private apiService: ApiService) { }
  private recordsApi: ProjectArea[]

  getApiRecords() {
    this.apiService.get<ProjectArea[]>('projectareas').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      console.log(this.recordsApi);

      this.recordsChanged.next(this.recordsApi);
    });
  }
  addApiRecord(row: ProjectArea) {
    this.apiService.post<ProjectArea>('projectareas', row).subscribe((response: ProjectArea) => {
      console.log('projectarea created:', response);
      this.getApiRecords();
    });

    return this.apiService.post<ProjectArea>('projectareas', row);
  }
  updateApiRecord(id: number, row: any) {
    console.log(this.apiService.put<ProjectArea>(`projectareas`, id, row));
    this.apiService.put<ProjectArea>('projectareas', id, row).subscribe(response => {
      console.log(response);
      this.getApiRecords()
    });
  }
  getApiRecord(index: number) {
    return this.apiService.getID<ProjectArea>('projectareas', index)
  }
  deleteApiRecord(id: number) {
    console.log(this.apiService.delete<ProjectArea>(`projectareas`, id));
    this.apiService.delete<ProjectArea>(`projectareas`, id).subscribe(response => {
      console.log(response);
      this.getApiRecords();
    })

  }
}
