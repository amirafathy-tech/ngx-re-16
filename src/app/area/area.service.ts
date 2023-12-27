import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Area } from './area.model';
import { ApiService } from '../ApiService.service';

@Injectable()
export class AreaService {
  
  recordsChanged = new Subject<Area[]>();
  startedEditing = new Subject<number>();
  model: "areas";
  constructor(private apiService: ApiService) { }
  private recordsApi: Area[]

  getApiRecords() {
    this.apiService.get<Area[]>('areas').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi);
    });
  }
  addApiRecord(row: Area) {
    this.apiService.post<Area>('areas', row).subscribe((response: Area) => {
      console.log('Area created:', response);
      this.getApiRecords();
    });

    //return this.apiService.post<Building>('areas', row);
  }
  updateApiRecord(id: number, row: any) {
    console.log(this.apiService.put<Area>(`areas`, id, row));
    this.apiService.put<Area>('areas', id, row).subscribe(response => {
      console.log(response);
      this.getApiRecords()
    });
  }
  getApiRecord(index: number) {
    return this.apiService.getID<Area>('areas', index)
  }
  deleteApiRecord(id: number) {
    console.log(this.apiService.delete<Area>(`areas`, id));
    this.apiService.delete<Area>(`areas`, id).subscribe(response => {
      console.log(response);
      this.getApiRecords();
    })

  }
}
