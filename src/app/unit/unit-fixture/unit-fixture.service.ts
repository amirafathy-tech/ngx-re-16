import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UnitFixture } from './unit-fixture.model';
import { ApiService } from 'src/app/ApiService.service';
import { response } from 'express';

@Injectable()
export class UnitFixtureService {
  recordsChanged = new Subject<UnitFixture[]>();
  startedEditing = new Subject<number>();
  model:"unitfixture";
  constructor(private apiService:ApiService ) { }
  private recordsApi: UnitFixture[]

  getApiRecords() {
    this.apiService.get<UnitFixture[]>('unitfixture').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi); 
    });
  }
  addApiRecord(row: UnitFixture) {
    this.apiService.post<UnitFixture>('unitfixture', row).subscribe((response: UnitFixture) => {
      console.log('UnitFixture created:', response);
      this.getApiRecords();
    });
    
    return this.apiService.post<UnitFixture>('unitfixture', row);
  }
  updateApiRecord(id:number,row: any) {
    console.log(this.apiService.put<UnitFixture>(`unitfixture`,id, row));
   this.apiService.put<UnitFixture>('unitfixture',id,row).subscribe(response => {
    console.log(response);
   this.getApiRecords()
  });
  }
  getApiRecord(index:number) {
   return this.apiService.getID<UnitFixture>('unitfixture',index)
  }
  deleteApiRecord(id:number) {
    console.log(this.apiService.delete<UnitFixture>(`unitfixture`,id));
    this.apiService.delete<UnitFixture>(`unitfixture`,id).subscribe(response =>{
      console.log(response);
      this.getApiRecords();
    })
    
  }
}
