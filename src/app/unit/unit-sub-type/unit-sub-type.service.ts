import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UnitSubType } from './unit-sub-type.model';
import { ApiService } from 'src/app/ApiService.service';

@Injectable()
export class UnitSubTypeService {
  recordsChanged = new Subject<UnitSubType[]>();
  startedEditing = new Subject<number>();
  model: "unitsubtypes";
  constructor(private apiService: ApiService) { }
  private recordsApi: UnitSubType[]

  getApiRecords() {
    this.apiService.get<UnitSubType[]>('unitsubtypes').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi);
    });
  }
  addApiRecord(row: UnitSubType) {
    this.apiService.post<UnitSubType>('unitsubtypes', row).subscribe((response: UnitSubType) => {
      console.log('UnitFloor created:', response);
      this.getApiRecords();
    });

    return this.apiService.post<UnitSubType>('unitsubtypes', row);
  }
  updateApiRecord(id: number, row: any) {
    console.log(this.apiService.put<UnitSubType>(`unitsubtypes`, id, row));
    this.apiService.put<UnitSubType>('unitsubtypes', id, row).subscribe(response => {
      console.log(response);
      this.getApiRecords()
    });
  }
  getApiRecord(index: number) {
    return this.apiService.getID<UnitSubType>('unitsubtypes', index)
  }
  deleteApiRecord(id: number) {
    console.log(this.apiService.delete<UnitSubType>(`unitsubtypes`, id));
    this.apiService.delete<UnitSubType>(`unitsubtypes`, id).subscribe(response => {
      console.log(response);
      this.getApiRecords();
    })

  }
}
