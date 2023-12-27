import { Component } from '@angular/core';
import { UnitOrientationService } from './unit-orientation.sevice';
import { UnitOrientation } from './unit-orientation.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-unit-orientation',
  templateUrl: './unit-orientation.component.html',
 // styleUrl: './unit-orientation.component.css',
  providers: [UnitOrientationService]
})
export class UnitOrientationComponent {

  records: UnitOrientation[];
  private subscription: Subscription;
  constructor(private unitOrientationService: UnitOrientationService) { }

  ngOnInit() {
   this.unitOrientationService.getApiRecords();
   this.subscription =this.unitOrientationService.recordsChanged.subscribe((records: UnitOrientation[]) => {
     this.records = records;
     console.log(this.records);
   });
  }
  onEditItem(index: number) {
    this.unitOrientationService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
