import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BuildingArea } from './building-area.model';
import { ApiService } from 'src/app/ApiService.service';

@Injectable()
export class BuildingAreaService {

  recordsChanged = new Subject<BuildingArea[]>();
  startedEditing = new Subject<number>();
  model:"buildingareas";
  constructor(private apiService:ApiService ) { }
  private recordsApi: BuildingArea[]

  getApiRecords() {
    this.apiService.get<BuildingArea[]>('buildingareas').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi); 
    });
  }
  addApiRecord(row: BuildingArea) {
    console.log(row);
    this.apiService.post<BuildingArea>('buildingareas', row).subscribe((response: BuildingArea) => {
      console.log('BuildingArea created:', response);
      this.getApiRecords();
    });
    
    //return this.apiService.post<BuildingArea>('buildingareas', row);
  }
  updateApiRecord(id:number,row: any) {
    console.log(this.apiService.put<BuildingArea>(`buildingareas`,id, row));
   this.apiService.put<BuildingArea>('buildingareas',id,row).subscribe(response => {
    console.log(response);
   this.getApiRecords()
  });
  }
  getApiRecord(index:number) {
   return this.apiService.getID<BuildingArea>('buildingareas',index)
  }
  deleteApiRecord(id:number) {
    console.log(this.apiService.delete<BuildingArea>(`buildingareas`,id));
    this.apiService.delete<BuildingArea>(`buildingareas`,id).subscribe(response =>{
      console.log(response);
      this.getApiRecords();
    })
    
  }
}
