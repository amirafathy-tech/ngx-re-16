import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Profit } from './profit.model';
import { ApiService } from '../ApiService.service';

@Injectable()
export class ProfitService {
  recordsChanged = new Subject<Profit[]>();
  startedEditing = new Subject<number>();
  model: "profits";
  constructor(private apiService: ApiService) { }
  private recordsApi: Profit[]

  getApiRecords() {
    this.apiService.get<Profit[]>('profits').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi);
    });
  }
  addApiRecord(row: Profit) {
    this.apiService.post<Profit>('profits', row).subscribe((response: Profit) => {
      console.log('Profit created:', response);
      this.getApiRecords();
    });

    return this.apiService.post<Profit>('profits', row);
  }
  updateApiRecord(id: number, row: any) {
    console.log(this.apiService.put<Profit>(`profits`, id, row));
    this.apiService.put<Profit>('profits', id, row).subscribe(response => {
      console.log(response);
      this.getApiRecords()
    });
  }
  getApiRecord(index: number) {
    return this.apiService.getID<Profit>('profits', index)
  }
  deleteApiRecord(id: number) {
    console.log(this.apiService.delete<Profit>(`profits`, id));
    this.apiService.delete<Profit>(`profits`, id).subscribe(response => {
      console.log(response);
      this.getApiRecords();
    })

  }
}