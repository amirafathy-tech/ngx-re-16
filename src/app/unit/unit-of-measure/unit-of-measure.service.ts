import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UnitOfMeasure } from './unit-of-measure.model';
import { ApiService } from 'src/app/ApiService.service';

@Injectable()
export class UnitOfMeasureService {
  recordsChanged = new Subject<UnitOfMeasure[]>();
  startedEditing = new Subject<number>();
  model:"measurements";
  constructor(private apiService:ApiService ) { }
  private recordsApi: UnitOfMeasure[]

  getApiRecords() {
    this.apiService.get<UnitOfMeasure[]>('measurements').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi); 
    });
  }
  addApiRecord(row: UnitOfMeasure) {
    this.apiService.post<UnitOfMeasure>('measurements', row).subscribe((response: UnitOfMeasure) => {
      console.log('UnitFloor created:', response);
      this.getApiRecords();
    });
    
    return this.apiService.post<UnitOfMeasure>('measurements', row);
  }
  updateApiRecord(id:number,row: any) {
    console.log(this.apiService.put<UnitOfMeasure>(`measurements`,id, row));
   this.apiService.put<UnitOfMeasure>('measurements',id,row).subscribe(response => {
    console.log(response);
   this.getApiRecords()
  });
  }
  getApiRecord(index:number) {
   return this.apiService.getID<UnitOfMeasure>('measurements',index)
  }
  deleteApiRecord(id:number) {
    console.log(this.apiService.delete<UnitOfMeasure>(`measurements`,id));
    this.apiService.delete<UnitOfMeasure>(`measurements`,id).subscribe(response =>{
      console.log(response);
      this.getApiRecords();
    })
    
  }

}
