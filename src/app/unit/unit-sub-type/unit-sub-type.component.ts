import { Component } from '@angular/core';
import { UnitSubTypeService } from './unit-sub-type.service';
import { UnitSubType } from './unit-sub-type.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-unit-sub-type',
  templateUrl: './unit-sub-type.component.html',
  // styleUrl: './unit-sub-type.component.css',
  providers: [UnitSubTypeService]
})
export class UnitSubTypeComponent {

  records: UnitSubType[];
  private subscription: Subscription;
  constructor(private unitSubTypeService: UnitSubTypeService) { }
 
  ngOnInit() {
   this.unitSubTypeService.getApiRecords();
   this.subscription =this.unitSubTypeService.recordsChanged.subscribe((records: UnitSubType[]) => {
     this.records = records;
     console.log(this.records);
   });
  }
  onEditItem(index: number) {
    this.unitSubTypeService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
}
