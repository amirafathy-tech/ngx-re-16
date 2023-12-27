import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UnitStatus } from './unit-status.model';
import { ApiService } from 'src/app/ApiService.service';

@Injectable()
export class UnitStatusService {
  recordsChanged = new Subject<UnitStatus[]>();
  startedEditing = new Subject<number>();
  model:"unitstatuses";
  constructor(private apiService:ApiService ) { }
  private recordsApi: UnitStatus[]

  getApiRecords() {
    this.apiService.get<UnitStatus[]>('unitstatuses').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi); 
    });
  }
  addApiRecord(row: UnitStatus) {
    this.apiService.post<UnitStatus>('unitstatuses', row).subscribe((response: UnitStatus) => {
      console.log('UnitStatus created:', response);
      this.getApiRecords();
    });
    
    return this.apiService.post<UnitStatus>('unitstatuses', row);
  }
  updateApiRecord(id:number,row: any) {
    console.log(this.apiService.put<UnitStatus>(`unitstatuses`,id, row));
   this.apiService.put<UnitStatus>('unitstatuses',id,row).subscribe(response => {
    console.log(response);
   this.getApiRecords()
  });
  }
  getApiRecord(index:number) {
   return this.apiService.getID<UnitStatus>('unitstatuses',index)
  }
  deleteApiRecord(id:number) {
    console.log(this.apiService.delete<UnitStatus>(`unitstatuses`,id));
    this.apiService.delete<UnitStatus>(`unitstatuses`,id).subscribe(response =>{
      console.log(response);
      this.getApiRecords();
    })
    
  }

}
