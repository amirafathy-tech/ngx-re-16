import { Component, OnDestroy, OnInit } from '@angular/core';
import { CityService } from './city.service';
import { City } from './city.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
 // styleUrl: './city.component.css',
  providers: [CityService]
})
export class CityComponent implements OnInit ,OnDestroy{

  records: City[];
  private subscription: Subscription;
  constructor(private cityService: CityService) { }

  ngOnInit() {
   this.cityService.getApiRecords();
   this.subscription =this.cityService.recordsChanged.subscribe((records: City[]) => {
     this.records = records;
     console.log(this.records);
   });
  }
  onEditItem(index: number) {
    this.cityService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
