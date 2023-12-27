import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Unit } from './unit.model';
import { LocalDate } from 'js-joda';
import { ApiService } from '../ApiService.service';

@Injectable()
export class UnitService {
  
  recordsChanged = new Subject<Unit[]>();
  startedEditing = new Subject<number>();
  model: "units";
  constructor(private apiService: ApiService) { }
  private recordsApi: Unit[]

  getApiRecords() {
    this.apiService.get<Unit[]>('units').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi);
    });
  }
  addApiRecord(row: Unit) {
    this.apiService.post<Unit>('units', row).subscribe((response: Unit) => {
      console.log('Unit created:', response);
      this.getApiRecords();
    });

  }
  updateApiRecord(id: number, row: any) {
    console.log(this.apiService.put<Unit>(`units`, id, row));
    this.apiService.put<Unit>('units', id, row).subscribe(response => {
      console.log(response);
      this.getApiRecords()
    });
  }
  getApiRecord(index: number) {
    return this.apiService.getID<Unit>('units', index)
  }
  deleteApiRecord(id: number) {
    console.log(this.apiService.delete<Unit>(`units`, id));
    this.apiService.delete<Unit>(`units`, id).subscribe(response => {
      console.log(response);
      this.getApiRecords();
    })

  }
}
