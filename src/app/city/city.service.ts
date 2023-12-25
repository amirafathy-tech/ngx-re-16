import { Injectable } from '@angular/core';

import { City } from './city.model';
import { Subject } from 'rxjs';
import { ApiService } from '../ApiService.service';

@Injectable()
export class CityService {
  recordsChanged = new Subject<City[]>();
  startedEditing = new Subject<number>();
  model:"locations";
  constructor(private apiService:ApiService ) { }
  private recordsApi: City[]

  getApiRecords() {
    this.apiService.get<City[]>('locations').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi); 
    });
  }
  addApiRecord(row: City) {
    this.apiService.post<City>('locations', row).subscribe((response: City) => {
      console.log('Locatiion created:', response);
      this.getApiRecords();
    });
    
    return this.apiService.post<City>('locations', row);
  }
  updateApiRecord(id:number,row: any) {
    console.log(this.apiService.put<City>(`locations`,id, row));
   this.apiService.put<City>('locations',id,row).subscribe(response => {
    console.log(response);
   this.getApiRecords()
  });
  }
  getApiRecord(index:number) {
   return this.apiService.getID<City>('locations',index)
  }
  deleteApiRecord(id:number) {
    console.log(this.apiService.delete<City>(`locations`,id));
    this.apiService.delete<City>(`locations`,id).subscribe(response =>{
      console.log(response);
      this.getApiRecords();
    })
    
  }

}
