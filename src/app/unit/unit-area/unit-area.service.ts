import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UnitArea } from './unit-area.model';
import { ApiService } from 'src/app/ApiService.service';

@Injectable()
export class UnitAreaService {
  recordsChanged = new Subject<UnitArea[]>();
  startedEditing = new Subject<number>();
  model:"unitareas";
  constructor(private apiService:ApiService ) { }
  private recordsApi: UnitArea[]

  getApiRecords() {
    this.apiService.get<UnitArea[]>('unitareas').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi); 
    });
  }
  addApiRecord(row: UnitArea) {
    this.apiService.post<UnitArea>('unitareas', row).subscribe((response: UnitArea) => {
      console.log('UnitFloor created:', response);
      this.getApiRecords();
    });
    
    return this.apiService.post<UnitArea>('unitareas', row);
  }
  updateApiRecord(id:number,row: any) {
    console.log(this.apiService.put<UnitArea>(`unitareas`,id, row));
   this.apiService.put<UnitArea>('unitareas',id,row).subscribe(response => {
    console.log(response);
   this.getApiRecords()
  });
  }
  getApiRecord(index:number) {
   return this.apiService.getID<UnitArea>('unitareas',index)
  }
  deleteApiRecord(id:number) {
    console.log(this.apiService.delete<UnitArea>(`unitareas`,id));
    this.apiService.delete<UnitArea>(`unitareas`,id).subscribe(response =>{
      console.log(response);
      this.getApiRecords();
    })
    
  }
}
