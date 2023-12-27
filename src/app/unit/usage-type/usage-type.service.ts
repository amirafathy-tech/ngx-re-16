import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UsageType } from './usage-type.model';
import { ApiService } from 'src/app/ApiService.service';

@Injectable()
export class UsageTypeService {
  recordsChanged = new Subject<UsageType[]>();
  startedEditing = new Subject<number>();
  model: "usagetype";
  constructor(private apiService: ApiService) { }
  private recordsApi: UsageType[]

  getApiRecords() {
    this.apiService.get<UsageType[]>('usagetype').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi);
    });
  }
  addApiRecord(row: UsageType) {
    this.apiService.post<UsageType>('usagetype', row).subscribe((response: UsageType) => {
      console.log('UnitFloor created:', response);
      this.getApiRecords();
    });

    return this.apiService.post<UsageType>('usagetype', row);
  }
  updateApiRecord(id: number, row: any) {
    console.log(this.apiService.put<UsageType>(`usagetype`, id, row));
    this.apiService.put<UsageType>('usagetype', id, row).subscribe(response => {
      console.log(response);
      this.getApiRecords()
    });
  }
  getApiRecord(index: number) {
    return this.apiService.getID<UsageType>('usagetype', index)
  }
  deleteApiRecord(id: number) {
    console.log(this.apiService.delete<UsageType>(`usagetype`, id));
    this.apiService.delete<UsageType>(`usagetype`, id).subscribe(response => {
      console.log(response);
      this.getApiRecords();
    })

  }

}
