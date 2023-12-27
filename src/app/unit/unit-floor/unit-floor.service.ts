import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UnitFloor } from './unit-floor.model';
import { ApiService } from 'src/app/ApiService.service';

@Injectable()
export class UnitFloorService {
  recordsChanged = new Subject<UnitFloor[]>();
  startedEditing = new Subject<number>();
  model: "unitfloors";
  constructor(private apiService: ApiService) { }
  private recordsApi: UnitFloor[]

  getApiRecords() {
    this.apiService.get<UnitFloor[]>('unitfloors').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi);
    });
  }
  addApiRecord(row: UnitFloor) {
    this.apiService.post<UnitFloor>('unitfloors', row).subscribe((response: UnitFloor) => {
      console.log('UnitFloor created:', response);
      this.getApiRecords();
    });

    return this.apiService.post<UnitFloor>('unitfloors', row);
  }
  updateApiRecord(id: number, row: any) {
    console.log(this.apiService.put<UnitFloor>(`unitfloors`, id, row));
    this.apiService.put<UnitFloor>('unitfloors', id, row).subscribe(response => {
      console.log(response);
      this.getApiRecords()
    });
  }
  getApiRecord(index: number) {
    return this.apiService.getID<UnitFloor>('unitfloors', index)
  }
  deleteApiRecord(id: number) {
    console.log(this.apiService.delete<UnitFloor>(`unitfloors`, id));
    this.apiService.delete<UnitFloor>(`unitfloors`, id).subscribe(response => {
      console.log(response);
      this.getApiRecords();
    })

  }
}
