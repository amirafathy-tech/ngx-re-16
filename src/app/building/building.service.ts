import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { LocalDate } from 'js-joda';
import { Building } from './building.model';
import { ApiService } from '../ApiService.service';

@Injectable()
export class BuildingService {
  recordsChanged = new Subject<Building[]>();
  startedEditing = new Subject<number>();
  model: "buildings";
  constructor(private apiService: ApiService) { }
  private recordsApi: Building[]

  getApiRecords() {
    this.apiService.get<Building[]>('buildings').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi);
    });
  }
  addApiRecord(row: Building) {
    this.apiService.post<Building>('buildings', row).subscribe((response: Building) => {
      console.log('building created:', response);
      this.getApiRecords();
    });

    //return this.apiService.post<Building>('buildings', row);
  }
  updateApiRecord(id: number, row: any) {
    console.log(this.apiService.put<Building>(`buildings`, id, row));
    this.apiService.put<Building>('buildings', id, row).subscribe(response => {
      console.log(response);
      this.getApiRecords()
    });
  }
  getApiRecord(index: number) {
    return this.apiService.getID<Building>('buildings', index)
  }
  deleteApiRecord(id: number) {
    console.log(this.apiService.delete<Building>(`buildings`, id));
    this.apiService.delete<Building>(`buildings`, id).subscribe(response => {
      console.log(response);
      this.getApiRecords();
    })

  }
}
