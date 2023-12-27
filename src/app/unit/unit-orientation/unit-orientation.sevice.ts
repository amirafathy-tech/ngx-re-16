import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UnitOrientation } from './unit-orientation.model';
import { ApiService } from 'src/app/ApiService.service';

@Injectable()
export class UnitOrientationService {
  recordsChanged = new Subject<UnitOrientation[]>();
  startedEditing = new Subject<number>();
  model: "unitorientations";
  constructor(private apiService: ApiService) { }
  private recordsApi: UnitOrientation[]

  getApiRecords() {
    this.apiService.get<UnitOrientation[]>('unitorientations').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi);
    });
  }
  addApiRecord(row: UnitOrientation) {
    this.apiService.post<UnitOrientation>('unitorientations', row).subscribe((response: UnitOrientation) => {
      console.log('UnitFloor created:', response);
      this.getApiRecords();
    });

    return this.apiService.post<UnitOrientation>('unitorientations', row);
  }
  updateApiRecord(id: number, row: any) {
    console.log(this.apiService.put<UnitOrientation>(`unitorientations`, id, row));
    this.apiService.put<UnitOrientation>('unitorientations', id, row).subscribe(response => {
      console.log(response);
      this.getApiRecords()
    });
  }
  getApiRecord(index: number) {
    return this.apiService.getID<UnitOrientation>('unitorientations', index)
  }
  deleteApiRecord(id: number) {
    console.log(this.apiService.delete<UnitOrientation>(`unitorientations`, id));
    this.apiService.delete<UnitOrientation>(`unitorientations`, id).subscribe(response => {
      console.log(response);
      this.getApiRecords();
    })

  }
}
