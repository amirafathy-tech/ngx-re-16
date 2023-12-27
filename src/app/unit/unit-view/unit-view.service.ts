import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UnitView } from './unit-view.model';
import { ApiService } from 'src/app/ApiService.service';

@Injectable()
export class UnitViewService {
  recordsChanged = new Subject<UnitView[]>();
  startedEditing = new Subject<number>();
  model: "unitviews";
  constructor(private apiService: ApiService) { }
  private recordsApi: UnitView[]

  getApiRecords() {
    this.apiService.get<UnitView[]>('unitviews').subscribe(response => {
      console.log(response);
      this.recordsApi = response;
      this.recordsChanged.next(this.recordsApi);
    });
  }
  addApiRecord(row: UnitView) {
    this.apiService.post<UnitView>('unitviews', row).subscribe((response: UnitView) => {
      console.log('UnitView created:', response);
      this.getApiRecords();
    });

    return this.apiService.post<UnitView>('unitviews', row);
  }
  updateApiRecord(id: number, row: any) {
    console.log(this.apiService.put<UnitView>(`unitviews`, id, row));
    this.apiService.put<UnitView>('unitviews', id, row).subscribe(response => {
      console.log(response);
      this.getApiRecords()
    });
  }
  getApiRecord(index: number) {
    return this.apiService.getID<UnitView>('unitviews', index)
  }
  deleteApiRecord(id: number) {
    console.log(this.apiService.delete<UnitView>(`unitviews`, id));
    this.apiService.delete<UnitView>(`unitviews`, id).subscribe(response => {
      console.log(response);
      this.getApiRecords();
    })

  }
}
