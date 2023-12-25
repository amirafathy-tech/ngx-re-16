import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { Company } from './company.model';
import { ApiService } from '../ApiService.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CompanyService {
  recordsChanged = new Subject<Company[]>();
  startedEditing = new Subject<number>();
  model:"companies";
  constructor(private apiService:ApiService ,private http: HttpClient) { }
  private recordsApi: Company[]

  getApiRecords(){
  //: Observable<Company[]> {
   //return this.apiService.get<Company[]>('companies');
  //  return this.apiService.get<Company[]>('companies');
    this.apiService.get<Company[]>('companies').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi); 
    });
  }
  addApiRecord(company: Company) {
    this.apiService.post<Company>('companies', company).subscribe((response: Company) => {
      console.log('Company created:', response);
      this.getApiRecords();
    });
    
    return this.apiService.post<Company>('companies', company);
  }
  updateApiRecord(id:number,company: any) {
    console.log(this.apiService.put<Company>(`companies`,id, company));
   this.apiService.put<Company>('companies',id,company).subscribe(response => {
    console.log(response);
   this.getApiRecords()
  });
  }
  getApiRecord(index:number) {
   return this.apiService.getID<Company>('companies',index)
  }
  deleteApiRecord(id:number) {
    console.log(this.apiService.delete<Company>(`companies`,id));
    this.apiService.delete<Company>(`companies`,id).subscribe(response =>{
      //console.log(response);
      this.getApiRecords();
    })
    
  }
}
