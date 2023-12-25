import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { BuildingType } from './building-type.model';
import { ApiService } from '../ApiService.service';

@Injectable()
export class BuildingTypeService {
  recordsChanged = new Subject<BuildingType[]>();
  startedEditing = new Subject<number>();
  model:"buildingtypes";
  constructor(private apiService:ApiService ) { }
  private recordsApi: BuildingType[]

  getApiRecords() {
    this.apiService.get<BuildingType[]>('buildingtypes').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi); 
    });
  }
  addApiRecord(row: BuildingType) {
    this.apiService.post<BuildingType>('buildingtypes', row).subscribe((response: BuildingType) => {
      console.log('buildingtype created:', response);
      this.getApiRecords();
    });
    
    return this.apiService.post<BuildingType>('buildingtypes', row);
  }
  updateApiRecord(id:number,row: any) {
    console.log(this.apiService.put<BuildingType>(`buildingtypes`,id, row));
   this.apiService.put<BuildingType>('buildingtypes',id,row).subscribe(response => {
    console.log(response);
   this.getApiRecords()
  });
  }
  getApiRecord(index:number) {
   return this.apiService.getID<BuildingType>('buildingtypes',index)
  }
  deleteApiRecord(id:number) {
    console.log(this.apiService.delete<BuildingType>(`buildingtypes`,id));
    this.apiService.delete<BuildingType>(`buildingtypes`,id).subscribe(response =>{
      console.log(response);
      this.getApiRecords();
    })
    
  }
}
