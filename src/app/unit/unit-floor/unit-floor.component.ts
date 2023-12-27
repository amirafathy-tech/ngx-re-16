import { Component } from '@angular/core';
import { UnitFloorService } from './unit-floor.service';
import { UnitFloor } from './unit-floor.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-unit-floor',
  templateUrl: './unit-floor.component.html',
  // styleUrl: './unit-floor.component.css',
  providers: [UnitFloorService]
})
export class UnitFloorComponent {

  records: UnitFloor[];
  private subscription: Subscription;
  constructor(private unitFloorService: UnitFloorService) { }

  ngOnInit() {
    this.unitFloorService.getApiRecords();
    this.subscription = this.unitFloorService.recordsChanged.subscribe((records: UnitFloor[]) => {
      this.records = records;
      console.log(this.records);
    });
  }
  onEditItem(index: number) {
    this.unitFloorService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
